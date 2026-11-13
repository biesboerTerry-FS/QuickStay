import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setState, useBookings } from "../data/store";
import { validateCard } from "../lib/payment";
import { formatCurrency } from "../lib/format";
import { useToast } from "../context/ToastContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

const inputClass =
	"w-full rounded-lg border border-gray-300 px-3 py-2.5 mt-1.5 outline-none focus:border-primary";

const formatCardNumber = (value) =>
	value
		.replace(/\D/g, "")
		.slice(0, 19)
		.replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (value) => {
	const digits = value.replace(/\D/g, "").slice(0, 4);
	return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

const PaymentPage = () => {
	const { bookingId } = useParams();
	const bookings = useBookings();
	const navigate = useNavigate();
	const toast = useToast();
	const booking = bookings.find((item) => item._id === bookingId);

	const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
	const [errors, setErrors] = useState({});

	useDocumentTitle(booking ? `Pay · ${booking.hotel.name}` : "Pay for booking");

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

	if (booking.status === "cancelled" || booking.isPaid) {
		return (
			<div className="flex flex-col items-center justify-center text-center px-6 py-40 min-h-[70vh]">
				<h1 className="font-playfair text-3xl text-gray-800">
					{booking.status === "cancelled" ? "This booking was cancelled" : "This booking is already paid"}
				</h1>
				<Link to="/my-bookings" className="mt-4 text-primary hover:underline">
					Back to my bookings
				</Link>
			</div>
		);
	}

	const submit = (event) => {
		event.preventDefault();
		const nextErrors = validateCard(card);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		setState("bookings", (list) =>
			list.map((item) =>
				item._id === booking._id
					? { ...item, isPaid: true, paymentMethod: "Card" }
					: item
			)
		);
		toast.show("Payment received. Your stay is confirmed.");
		navigate(`/booking-confirmed/${booking._id}`);
	};

	return (
		<div className="pt-32 md:pt-40 pb-24 px-4 md:px-16 lg:px-24 xl:px-32 flex justify-center">
			<div className="w-full max-w-md">
				<h1 className="font-playfair text-3xl text-gray-800">Pay for your stay</h1>
				<div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
					Test mode: no real card is charged. Use the test card
					4242 4242 4242 4242 with any future expiry date and any 3-digit code.
				</div>

				<form
					onSubmit={submit}
					noValidate
					className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-5 shadow-lg shadow-gray-900/5"
				>
					<div>
						<label htmlFor="card-number" className="text-sm font-medium text-gray-800">
							Card number
						</label>
						<input
							id="card-number"
							inputMode="numeric"
							autoComplete="cc-number"
							placeholder="4242 4242 4242 4242"
							value={card.number}
							onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
							className={inputClass}
						/>
						{errors.number && <p className="text-xs text-red-600 mt-1">{errors.number}</p>}
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="card-expiry" className="text-sm font-medium text-gray-800">
								Expiry
							</label>
							<input
								id="card-expiry"
								inputMode="numeric"
								autoComplete="cc-exp"
								placeholder="MM/YY"
								value={card.expiry}
								onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
								className={inputClass}
							/>
							{errors.expiry && <p className="text-xs text-red-600 mt-1">{errors.expiry}</p>}
						</div>
						<div>
							<label htmlFor="card-cvc" className="text-sm font-medium text-gray-800">
								Security code
							</label>
							<input
								id="card-cvc"
								inputMode="numeric"
								autoComplete="cc-csc"
								placeholder="123"
								maxLength={4}
								value={card.cvc}
								onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "") })}
								className={inputClass}
							/>
							{errors.cvc && <p className="text-xs text-red-600 mt-1">{errors.cvc}</p>}
						</div>
					</div>

					<div className="flex justify-between text-sm text-gray-600 border-t border-gray-200 pt-4">
						<span>Total due</span>
						<span className="font-medium text-gray-800">{formatCurrency(booking.totalPrice)}</span>
					</div>
					<button
						type="submit"
						className="py-3 rounded-xl bg-primary text-white hover:bg-primary-dull active:scale-95 transition-all cursor-pointer"
					>
						Pay {formatCurrency(booking.totalPrice)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default PaymentPage;
