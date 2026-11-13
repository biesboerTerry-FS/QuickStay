import { describe, expect, it } from "vitest";
import {
	bookingStatus,
	bookingToIcs,
	bookingsToCsv,
	canCancel,
	createBooking,
	isRoomFree,
	isValidRange,
	nightsBetween,
} from "../bookings";

const room = {
	_id: "room_1",
	roomType: "Double Bed",
	pricePerNight: 200,
	hotel: { name: "Test Hotel", address: "1 Main St, City", city: "City" },
};

const existing = {
	_id: "bk_1",
	roomId: "room_1",
	checkInDate: "2030-05-10",
	checkOutDate: "2030-05-13",
	status: "pending",
	isPaid: false,
};

describe("nightsBetween and isValidRange", () => {
	it("counts nights between two dates", () => {
		expect(nightsBetween("2030-05-10", "2030-05-13")).toBe(3);
	});

	it("requires check-out after check-in", () => {
		expect(isValidRange("2030-05-10", "2030-05-10")).toBe(false);
		expect(isValidRange("2030-05-10", "2030-05-11")).toBe(true);
		expect(isValidRange("", "2030-05-11")).toBe(false);
	});
});

describe("isRoomFree", () => {
	it("detects overlapping stays for the same room", () => {
		expect(isRoomFree("room_1", "2030-05-12", "2030-05-14", [existing])).toBe(false);
	});

	it("allows back-to-back stays", () => {
		expect(isRoomFree("room_1", "2030-05-13", "2030-05-15", [existing])).toBe(true);
	});

	it("ignores other rooms and cancelled bookings", () => {
		expect(isRoomFree("room_2", "2030-05-11", "2030-05-12", [existing])).toBe(true);
		expect(
			isRoomFree("room_1", "2030-05-11", "2030-05-12", [
				{ ...existing, status: "cancelled" },
			])
		).toBe(true);
	});
});

describe("createBooking", () => {
	const user = { id: "user_1", fullName: "Ada Lovelace" };

	it("prices the stay by nights and starts unpaid", () => {
		const booking = createBooking({
			room,
			checkIn: "2030-06-01",
			checkOut: "2030-06-04",
			guests: "2",
			paymentMethod: "Pay At Hotel",
			user,
		});
		expect(booking.totalPrice).toBe(600);
		expect(booking.isPaid).toBe(false);
		expect(booking.status).toBe("pending");
		expect(booking.guests).toBe(2);
		expect(booking.userName).toBe("Ada Lovelace");
		expect(booking.roomId).toBe("room_1");
	});

	it("gives every booking a unique id", () => {
		const first = createBooking({ room, checkIn: "2030-06-01", checkOut: "2030-06-02", guests: 1, paymentMethod: "Card", user });
		const second = createBooking({ room, checkIn: "2030-06-01", checkOut: "2030-06-02", guests: 1, paymentMethod: "Card", user });
		expect(first._id).not.toBe(second._id);
	});
});

describe("status and cancellation", () => {
	it("reports a human status", () => {
		expect(bookingStatus({ status: "cancelled", isPaid: true })).toBe("Cancelled");
		expect(bookingStatus({ status: "pending", isPaid: true })).toBe("Paid");
		expect(bookingStatus({ status: "pending", isPaid: false })).toBe("Pending");
	});

	it("only allows cancelling future, active bookings", () => {
		expect(canCancel({ status: "pending", checkInDate: "2999-01-01" })).toBe(true);
		expect(canCancel({ status: "pending", checkInDate: "2000-01-01" })).toBe(false);
		expect(canCancel({ status: "cancelled", checkInDate: "2999-01-01" })).toBe(false);
	});
});

describe("exports", () => {
	const resolved = {
		...existing,
		userName: "Ada, \"the\" Great",
		guests: 2,
		totalPrice: 600,
		paymentMethod: "Pay At Hotel",
		room,
		hotel: room.hotel,
	};

	it("builds a valid calendar event", () => {
		const ics = bookingToIcs(resolved);
		expect(ics).toContain("BEGIN:VEVENT");
		expect(ics).toContain("DTSTART;VALUE=DATE:20300510");
		expect(ics).toContain("DTEND;VALUE=DATE:20300513");
		expect(ics).toContain("SUMMARY:Stay at Test Hotel");
	});

	it("escapes quotes in CSV cells", () => {
		const csv = bookingsToCsv([resolved]);
		expect(csv).toContain('"Ada, ""the"" Great"');
		expect(csv.split("\n")).toHaveLength(2);
	});
});
