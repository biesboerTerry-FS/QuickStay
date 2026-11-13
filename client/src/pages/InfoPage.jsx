import React, { useState } from "react";
import { Link } from "react-router-dom";
import { infoPages } from "../data/infoPages";
import useDocumentTitle from "../hooks/useDocumentTitle";

const inputClass =
	"w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none focus:border-primary";

const ContactForm = () => {
	const [submitted, setSubmitted] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		topic: "Booking",
		message: "",
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitted(true);
		setForm({ name: "", email: "", topic: "Booking", message: "" });
	};

	if (submitted) {
		return (
			<div className="max-w-xl rounded-xl border border-green-200 bg-green-50 p-6 text-green-700">
				Thanks for reaching out. Our team will reply to your email
				within two working days.
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-xl flex flex-col gap-4 bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.08)] p-6 rounded-xl"
		>
			<div>
				<label htmlFor="contact-name" className="font-medium text-gray-800">
					Name
				</label>
				<input
					id="contact-name"
					type="text"
					required
					value={form.name}
					onChange={(e) => setForm({ ...form, name: e.target.value })}
					className={inputClass}
				/>
			</div>
			<div>
				<label htmlFor="contact-email" className="font-medium text-gray-800">
					Email
				</label>
				<input
					id="contact-email"
					type="email"
					required
					value={form.email}
					onChange={(e) => setForm({ ...form, email: e.target.value })}
					className={inputClass}
				/>
			</div>
			<div>
				<label htmlFor="contact-topic" className="font-medium text-gray-800">
					Topic
				</label>
				<select
					id="contact-topic"
					value={form.topic}
					onChange={(e) => setForm({ ...form, topic: e.target.value })}
					className={inputClass}
				>
					<option value="Booking">Booking</option>
					<option value="Payment">Payment</option>
					<option value="Cancellation">Cancellation</option>
					<option value="Hotel listing">Hotel listing</option>
					<option value="Other">Other</option>
				</select>
			</div>
			<div>
				<label htmlFor="contact-message" className="font-medium text-gray-800">
					Message
				</label>
				<textarea
					id="contact-message"
					required
					rows={5}
					value={form.message}
					onChange={(e) => setForm({ ...form, message: e.target.value })}
					className={`${inputClass} resize-y`}
				/>
			</div>
			<button
				type="submit"
				className="bg-primary hover:bg-primary-dull transition-all text-white rounded-md py-3 cursor-pointer"
			>
				Send message
			</button>
		</form>
	);
};

const Section = ({ section }) => {
	const { heading, paragraphs = [], items = [], variant } = section;

	return (
		<section className="mt-14">
			<h2 className="font-playfair text-2xl md:text-3xl text-gray-800">
				{heading}
			</h2>

			{paragraphs.map((text, index) => (
				<p key={index} className="text-gray-500 mt-4 max-w-3xl leading-relaxed">
					{text}
				</p>
			))}

			{variant === "cards" && (
				<div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((item) => (
						<div
							key={item.title}
							className="flex flex-col gap-2 border border-gray-200 rounded-xl p-6 bg-white shadow-sm"
						>
							<h3 className="text-lg font-medium text-gray-800">
								{item.title}
							</h3>
							{item.meta && (
								<p className="text-xs uppercase tracking-wide text-primary">
									{item.meta}
								</p>
							)}
							<p className="text-gray-500 text-sm leading-relaxed">
								{item.description}
							</p>
						</div>
					))}
				</div>
			)}

			{variant === "faq" && (
				<div className="flex flex-col gap-3 mt-6 max-w-3xl">
					{items.map((item) => (
						<details
							key={item.title}
							className="group border border-gray-200 rounded-lg bg-white px-5 py-4"
						>
							<summary className="cursor-pointer font-medium text-gray-800 list-none flex justify-between items-center">
								{item.title}
								<span className="text-gray-500 group-open:rotate-45 transition-transform text-xl">
									+
								</span>
							</summary>
							<p className="text-gray-500 mt-3 text-sm leading-relaxed">
								{item.description}
							</p>
						</details>
					))}
				</div>
			)}

			{variant === "links" && (
				<ul className="grid gap-3 mt-6 sm:grid-cols-2">
					{items.map((item) => (
						<li key={item.path}>
							<Link
								to={item.path}
								className="text-primary hover:underline"
							>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};

const InfoPage = ({ slug }) => {
	const page = infoPages[slug];
	useDocumentTitle(page?.title);

	if (!page) return null;

	return (
		<div className="pt-28 md:pt-35 pb-24 px-4 md:px-16 lg:px-24 xl:px-32">
			<div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
				<div className="md:w-1/2">
					<h1 className="font-playfair text-4xl md:text-[44px] text-gray-800">
						{page.title}
					</h1>
					<p className="text-base md:text-lg text-gray-500 mt-4 max-w-xl leading-relaxed">
						{page.subtitle}
					</p>
				</div>
				{page.image && (
					<img
						src={page.image}
						alt=""
						className="md:w-1/2 w-full max-h-72 object-cover rounded-xl shadow-lg"
					/>
				)}
			</div>

			{page.sections.map((section) => (
				<Section key={section.heading} section={section} />
			))}

			{page.showContactForm && (
				<section className="mt-14">
					<h2 className="font-playfair text-2xl md:text-3xl text-gray-800">
						Send us a message
					</h2>
					<div className="mt-6">
						<ContactForm />
					</div>
				</section>
			)}
		</div>
	);
};

export default InfoPage;
