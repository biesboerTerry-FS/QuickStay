import React, { useState } from "react";
import { assets } from "../assets/assets";
import Title from "./Title";
import { setState } from "../data/store";
import { useToast } from "../context/ToastContext";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsLetter = () => {
	const toast = useToast();
	const [email, setEmail] = useState("");

	const subscribe = (event) => {
		event.preventDefault();
		const value = email.trim();
		if (!emailPattern.test(value)) {
			toast.show("Please enter a valid email address.", "error");
			return;
		}
		setState("newsletter", (list) =>
			list.includes(value) ? list : [...list, value]
		);
		setEmail("");
		toast.show("You're subscribed. Watch your inbox for inspiration!");
	};

	return (
		<div>
			<div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-gray-900 text-white">
				<Title
					as="h2"
					inverse
					title="Stay Inspired"
					subTitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration."
				/>
				<form
					onSubmit={subscribe}
					noValidate
					className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6"
				>
					<input
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						aria-label="Email address"
						className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-66 w-full"
						placeholder="Enter your email"
					/>
					<button
						type="submit"
						className="flex items-center justify-center gap-2 group bg-primary hover:bg-primary-dull px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all cursor-pointer"
					>
						Subscribe
						<img
							className="w-3.5 invert group-hover:translate-x-1 transition-all"
							src={assets.arrowIcon}
							alt=""
						/>
					</button>
				</form>
				<p className="text-gray-300 mt-6 text-xs text-center">
					By subscribing, you agree to our Privacy Policy and consent
					to receive updates.
				</p>
			</div>
		</div>
	);
};

export default NewsLetter;
