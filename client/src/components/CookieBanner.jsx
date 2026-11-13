import React, { useState } from "react";
import { Link } from "react-router-dom";

const KEY = "quickstay:cookie-consent";

const CookieBanner = () => {
	const [consent, setConsent] = useState(() => localStorage.getItem(KEY));

	if (consent) return null;

	const choose = (value) => {
		localStorage.setItem(KEY, value);
		setConsent(value);
	};

	return (
		<div
			role="dialog"
			aria-label="Cookie consent"
			className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[90] rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl text-sm text-gray-600"
		>
			<p className="font-medium text-gray-800">We use cookies</p>
			<p className="mt-2 leading-relaxed">
				QuickStay stores your search, saved rooms and bookings in your
				browser so the site works. You can read more in our{" "}
				<Link to="/privacy" className="text-primary hover:underline">
					privacy policy
				</Link>
				.
			</p>
			<div className="flex gap-3 mt-4">
				<button
					onClick={() => choose("accepted")}
					className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dull cursor-pointer"
				>
					Accept
				</button>
				<button
					onClick={() => choose("declined")}
					className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer"
				>
					Decline
				</button>
			</div>
		</div>
	);
};

export default CookieBanner;
