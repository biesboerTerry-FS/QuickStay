import { describe, expect, it } from "vitest";
import { filterRooms, sortRooms } from "../roomFilters";

const hotel = (city) => ({ name: `${city} Hotel`, city, address: "x" });

const rooms = [
	{ _id: "a", roomType: "Single Bed", pricePerNight: 150, maxGuests: 1, isAvailable: true, createdAt: "2025-01-01T00:00:00Z", hotel: hotel("London") },
	{ _id: "b", roomType: "Double Bed", pricePerNight: 300, maxGuests: 2, isAvailable: true, createdAt: "2025-03-01T00:00:00Z", hotel: hotel("New York") },
	{ _id: "c", roomType: "Family Suite", pricePerNight: 600, maxGuests: 4, isAvailable: true, createdAt: "2025-02-01T00:00:00Z", hotel: hotel("London") },
	{ _id: "d", roomType: "Luxury Room", pricePerNight: 700, maxGuests: 2, isAvailable: false, createdAt: "2025-04-01T00:00:00Z", hotel: hotel("London") },
];

describe("filterRooms", () => {
	it("hides rooms that are closed for booking", () => {
		expect(filterRooms(rooms, {}).map((r) => r._id)).not.toContain("d");
	});

	it("matches destination case-insensitively", () => {
		expect(filterRooms(rooms, { destination: "london" }).map((r) => r._id)).toEqual(["a", "c"]);
	});

	it("filters by room type and price range", () => {
		expect(filterRooms(rooms, { types: ["Double Bed", "Family Suite"] }).map((r) => r._id)).toEqual(["b", "c"]);
		expect(filterRooms(rooms, { prices: ["0-200"] }).map((r) => r._id)).toEqual(["a"]);
	});

	it("filters by guest count", () => {
		expect(filterRooms(rooms, { guests: 3 }).map((r) => r._id)).toEqual(["c"]);
	});

	it("excludes rooms booked for the chosen dates", () => {
		const bookings = [
			{ _id: "bk", roomId: "b", checkInDate: "2030-07-01", checkOutDate: "2030-07-05", status: "pending" },
		];
		const result = filterRooms(rooms, {
			dates: { checkIn: "2030-07-03", checkOut: "2030-07-04" },
			bookings,
		});
		expect(result.map((r) => r._id)).toEqual(["a", "c"]);
	});

	it("sorts by price and newest", () => {
		expect(filterRooms(rooms, { sort: "price-asc" }).map((r) => r._id)).toEqual(["a", "b", "c"]);
		expect(filterRooms(rooms, { sort: "price-desc" }).map((r) => r._id)).toEqual(["c", "b", "a"]);
		expect(filterRooms(rooms, { sort: "newest" }).map((r) => r._id)).toEqual(["b", "c", "a"]);
	});
});

describe("sortRooms", () => {
	it("does not mutate its input", () => {
		const input = [...rooms];
		sortRooms(input, "price-desc");
		expect(input.map((r) => r._id)).toEqual(rooms.map((r) => r._id));
	});
});
