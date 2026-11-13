import React from "react";
import { Link, useParams } from "react-router-dom";
import { useBookings } from "../data/store";
import { bookingStatus, bookingToIcs } from "../lib/bookings";
import { downloadFile } from "../lib/download";
import { formatCurrency, formatDay } from "../lib/format";
import useDocumentTitle from "../hooks/useDocumentTitle";

const BookingConfirmed = () => {
	useDocumentTitle("Booking confirmed");
	const { bookingId } = useParams();
	const bookings = useBookings();
	const booking = bookings.find((item) => item._id === bookingId);

	if (!booking) {
		return (
			<div className="flex flex-col items-center justify-center text-center px-6 py-40 min-h-[70vh]">
				<h1 className="font-playfair text-3xl text-gray-800">Booking not found</h1>
				<Link to="/my-bookings" className="mt-4 text-primary hover:underline">
					Go to my bookings
				</Link>
			</div>
		);
	}

	const addToCalendar = () =>
		downloadFile(
			`quickstay-${booking._id}.ics`,
			bookingToIcs(booking),
			"text/calendar"
		);

	return (
		<div className="pt-32 md:pt-40 pb-24 px-4 md:px-16 lg:px-24 xl:px-32 flex justify-center">
			<div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-8 shadow-lg shadow-gray-900/5 text-center">
				<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
					✓
				</div>
				<h1 className="font-playfair text-3xl text-gray-800 mt-5">
					{booking.status === "cancelled" ? "Booking cancelled" : "Booking confirmed"}
				</h1>
				<p className="text-gray-500 mt-2">
					Reference <span className="font-mono text-gray-700">{booking._id}</span>
				</p>

				<div className="mt-8 text-left border border-gray-200 rounded-xl p-6">
					<p className="font-playfair text-2xl text-gray-800">{booking.hotel.name}</p>
					<p className="text-sm text-gray-500">
						{booking.room.roomType} · {booking.hotel.address}
					</p>
					<dl className="grid grid-cols-2 gap-y-3 text-sm mt-5">
						<dt className="text-gray-500">Check-in</dt>
						<dd className="text-right">{formatDay(booking.checkInDate)}</dd>
						<dt className="text-gray-500">Check-out</dt>
						<dd className="text-right">{formatDay(booking.checkOutDate)}</dd>
						<dt className="text-gray-500">Guests</dt>
						<dd className="text-right">{booking.guests}</dd>
						<dt className="text-gray-500">Total</dt>
						<dd className="text-right font-medium">{formatCurrency(booking.totalPrice)}</dd>
						<dt className="text-gray-500">Payment</dt>
						<dd className="text-right">
							{bookingStatus(booking)} · {booking.paymentMethod}
						</dd>
					</dl>
				</div>

				<div className="flex flex-wrap justify-center gap-3 mt-8">
					{booking.status !== "cancelled" && (
						<button
							onClick={addToCalendar}
							className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer"
						>
							Add to calendar
						</button>
					)}
					<Link
						to="/my-bookings"
						className="px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dull"
					>
						View my bookings
					</Link>
				</div>
			</div>
		</div>
	);
};

export default BookingConfirmed;
