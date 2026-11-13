import heroImage from "../assets/heroImage.png";
import roomImg1 from "../assets/roomImg1.png";
import roomImg2 from "../assets/roomImg2.png";
import roomImg3 from "../assets/roomImg3.png";
import roomImg4 from "../assets/roomImg4.png";

export const infoPages = {
	about: {
		title: "About QuickStay",
		subtitle:
			"We make it simple to find and book stays you will remember, from city boutiques to beachfront resorts.",
		image: heroImage,
		sections: [
			{
				heading: "Our story",
				paragraphs: [
					"QuickStay started with a simple frustration: finding a good hotel shouldn't mean opening twenty tabs. We built a single place to compare rooms, read honest details and book with confidence.",
					"Today we work with independent hotels, small chains and luxury properties across major cities, and we keep the focus on clear pricing and real photos.",
				],
			},
			{
				heading: "What we value",
				variant: "cards",
				items: [
					{
						title: "Transparent pricing",
						description:
							"The price you see is the price you pay. Taxes and fees are shown before you confirm.",
					},
					{
						title: "Trusted hosts",
						description:
							"Every hotel is reviewed by our team before it goes live on the platform.",
					},
					{
						title: "Support that answers",
						description:
							"Our guest support team is available every day to help with changes and questions.",
					},
				],
			},
		],
	},

	experience: {
		title: "The QuickStay Experience",
		subtitle:
			"Beyond a comfortable bed: the small touches that make a stay feel effortless.",
		image: roomImg1,
		sections: [
			{
				heading: "Ways to make your stay special",
				variant: "cards",
				items: [
					{
						title: "Romantic getaways",
						description:
							"Suites with city or mountain views, late checkout and in-room dining options.",
					},
					{
						title: "Family escapes",
						description:
							"Family suites with extra beds, breakfast included and pool access for the kids.",
					},
					{
						title: "Business trips",
						description:
							"Fast Wi-Fi, quiet rooms, flexible check-in and easy receipts for expenses.",
					},
					{
						title: "Wellness retreats",
						description:
							"Pool access, spa packages and quiet floors designed for rest.",
					},
				],
			},
			{
				heading: "Inside every room",
				paragraphs: [
					"Our hotels are checked against a standard list of comforts, including cleanliness, safe check-in, and reliable Wi-Fi. You can filter by the amenities that matter to you on the Hotels page.",
				],
			},
		],
	},

	careers: {
		title: "Careers",
		subtitle:
			"Help travellers find their perfect stay. We are a small team that moves quickly and cares about the details.",
		image: roomImg2,
		sections: [
			{
				heading: "Open roles",
				variant: "cards",
				items: [
					{
						title: "Senior Frontend Engineer",
						meta: "Remote · Full time",
						description:
							"Build the booking experience in React, with a focus on performance and accessibility.",
					},
					{
						title: "Hotel Partnerships Manager",
						meta: "New York · Full time",
						description:
							"Bring independent hotels onto QuickStay and help them get their listings right.",
					},
					{
						title: "Customer Support Specialist",
						meta: "London · Part time",
						description:
							"Help guests with bookings, changes and cancellations across time zones.",
					},
				],
			},
			{
				heading: "Don't see a fit?",
				paragraphs: [
					"Send us your résumé and a short note about what you'd like to work on. We read every application.",
				],
			},
		],
	},

	press: {
		title: "Press",
		subtitle:
			"News, announcements and media resources from the QuickStay team.",
		image: roomImg3,
		sections: [
			{
				heading: "Latest news",
				variant: "cards",
				items: [
					{
						title: "QuickStay adds 40 new boutique hotels",
						meta: "March 2026",
						description:
							"Our latest expansion brings independent properties to six new cities.",
					},
					{
						title: "Introducing flexible cancellation",
						meta: "January 2026",
						description:
							"Many rooms now offer free cancellation up to 48 hours before check-in.",
					},
				],
			},
			{
				heading: "Media contact",
				paragraphs: [
					"For interviews, logos or high-resolution images, email press@quickstay.example.",
				],
			},
		],
	},

	blog: {
		title: "The QuickStay Blog",
		subtitle:
			"Travel tips, city guides and stories from our hosts and guests.",
		image: roomImg4,
		sections: [
			{
				heading: "Recent posts",
				variant: "cards",
				items: [
					{
						title: "A weekend in the city: a 48-hour guide",
						meta: "5 min read",
						description:
							"How to see the highlights without rushing, and where to stay within walking distance.",
					},
					{
						title: "Packing light for longer trips",
						meta: "4 min read",
						description:
							"Five essentials that fit in a carry-on and still cover every situation.",
					},
					{
						title: "Choosing a room that fits your group",
						meta: "6 min read",
						description:
							"Bed types, floor plans and amenities to check before you book for families or friends.",
					},
				],
			},
		],
	},

	partners: {
		title: "Partners",
		subtitle:
			"We work with hotels, travel agencies and local businesses to make every stay better.",
		image: heroImage,
		sections: [
			{
				heading: "Partnership types",
				variant: "cards",
				items: [
					{
						title: "Hotels & resorts",
						description:
							"List your rooms, manage availability and reach guests searching for your city.",
					},
					{
						title: "Travel agencies",
						description:
							"Access rates and inventory through our partner API for your own customers.",
					},
					{
						title: "Local experiences",
						description:
							"Tour operators and restaurants can offer packages that guests add during booking.",
					},
				],
			},
			{
				heading: "Become a partner",
				paragraphs: [
					"Email partners@quickstay.example with your business details and we will be in touch within two working days.",
				],
			},
		],
	},

	help: {
		title: "Help Center",
		subtitle: "Quick answers to the questions guests ask most often.",
		sections: [
			{
				heading: "Bookings",
				variant: "faq",
				items: [
					{
						title: "How do I book a room?",
						description:
							"Open a room from the Hotels page, choose your check-in and check-out dates, then select Check Availability and follow the steps.",
					},
					{
						title: "Can I change my dates?",
						description:
							"Yes. Go to My Bookings and select the reservation. Date changes depend on the hotel's policy and availability.",
					},
					{
						title: "Where can I see my bookings?",
						description:
							"Sign in and open My Bookings from your profile menu to see upcoming and past stays.",
					},
				],
			},
			{
				heading: "Payments",
				variant: "faq",
				items: [
					{
						title: "Which payment methods are accepted?",
						description:
							"Major credit and debit cards are accepted. Some hotels also offer Pay At Hotel.",
					},
					{
						title: "Why is my booking marked Pending?",
						description:
							"A booking stays pending until payment is confirmed. You can pay from My Bookings using Pay Now.",
					},
				],
			},
			{
				heading: "Account",
				variant: "faq",
				items: [
					{
						title: "How do I log out?",
						description:
							"Select your avatar in the top right corner and choose Sign out.",
					},
				],
			},
		],
	},

	safety: {
		title: "Safety Information",
		subtitle:
			"How we protect guests and hosts, and what you can do to stay safe while travelling.",
		sections: [
			{
				heading: "How we protect you",
				variant: "cards",
				items: [
					{
						title: "Verified hotels",
						description:
							"Every property is checked against our safety standards before it is listed.",
					},
					{
						title: "Secure payments",
						description:
							"Payments are processed through encrypted connections and we never store full card numbers.",
					},
					{
						title: "Reported issues",
						description:
							"Report a problem from your booking and our team will respond within one business day.",
					},
				],
			},
			{
				heading: "Tips for your stay",
				paragraphs: [
					"Keep your room key with you, lock the door and window when you leave, and let someone know your check-out plans. In an emergency, contact local services first and then our support team.",
				],
			},
		],
	},

	cancellation: {
		title: "Cancellation Options",
		subtitle:
			"Plans change. Here is how cancellations work for each type of booking.",
		sections: [
			{
				heading: "Policy types",
				variant: "cards",
				items: [
					{
						title: "Free cancellation",
						description:
							"Cancel at no charge up to 48 hours before check-in. Look for the Free cancellation label on the room.",
					},
					{
						title: "Partial refund",
						description:
							"Cancel up to 7 days before check-in for a refund minus a one-night fee.",
					},
					{
						title: "Non-refundable",
						description:
							"Lower price with no refund. Check the terms before you confirm.",
					},
				],
			},
			{
				heading: "How to cancel",
				paragraphs: [
					"Open My Bookings, select the reservation and choose Cancel. If the option is not available, contact support with your booking ID.",
				],
			},
		],
	},

	contact: {
		title: "Contact Us",
		subtitle:
			"Questions about a booking or a hotel? Send us a message and we will reply by email.",
		showContactForm: true,
		sections: [
			{
				heading: "Other ways to reach us",
				variant: "cards",
				items: [
					{
						title: "Email",
						description: "support@quickstay.example",
					},
					{
						title: "Phone",
						description: "+1 (800) 555-0123, 9am to 9pm daily",
					},
					{
						title: "Office",
						description: "Main Road 123 Street, 23 Colony, New York",
					},
				],
			},
		],
	},

	accessibility: {
		title: "Accessibility",
		subtitle:
			"We want QuickStay to work for everyone, including people who use screen readers, keyboards or assistive devices.",
		sections: [
			{
				heading: "Our commitment",
				paragraphs: [
					"We aim to meet WCAG 2.1 AA guidelines across the website. This includes keyboard navigation, readable colour contrast, text alternatives for images and clear form labels.",
					"If you find something that is hard to use, tell us. We will work on it and reply with an update.",
				],
			},
			{
				heading: "Request help with a booking",
				paragraphs: [
					"Need assistance with check-in, room features or accessible rooms? Contact support and mention the accommodation you need.",
				],
			},
		],
	},

	privacy: {
		title: "Privacy Policy",
		subtitle: "How we collect, use and protect your personal information.",
		sections: [
			{
				heading: "Information we collect",
				paragraphs: [
					"We collect the details you give us when you create an account or make a booking, such as your name, email address, payment status and travel dates.",
				],
			},
			{
				heading: "How we use it",
				paragraphs: [
					"We use your information to process bookings, send confirmations and improve the service. We do not sell your personal data.",
				],
			},
			{
				heading: "Your choices",
				paragraphs: [
					"You can update your details or request deletion of your account by contacting support.",
				],
			},
		],
	},

	terms: {
		title: "Terms of Use",
		subtitle: "The rules that apply when you use QuickStay.",
		sections: [
			{
				heading: "Using QuickStay",
				paragraphs: [
					"You must be at least 18 years old to make a booking. You agree to provide accurate information and to use the site only for lawful purposes.",
				],
			},
			{
				heading: "Bookings and payments",
				paragraphs: [
					"A booking is confirmed when payment is received or when the hotel confirms a Pay At Hotel reservation. Prices shown include the amounts listed at checkout.",
				],
			},
			{
				heading: "Changes to these terms",
				paragraphs: [
					"We may update these terms from time to time. Continued use of the site after an update means you accept the new terms.",
				],
			},
		],
	},

	sitemap: {
		title: "Sitemap",
		subtitle: "Every page on QuickStay in one place.",
		sections: [
			{
				heading: "Explore",
				variant: "links",
				items: [
					{ title: "Home", path: "/" },
					{ title: "Hotels", path: "/rooms" },
					{ title: "Experience", path: "/experience" },
					{ title: "About", path: "/about" },
					{ title: "My Bookings", path: "/my-bookings" },
				],
			},
			{
				heading: "Company",
				variant: "links",
				items: [
					{ title: "Careers", path: "/careers" },
					{ title: "Press", path: "/press" },
					{ title: "Blog", path: "/blog" },
					{ title: "Partners", path: "/partners" },
				],
			},
			{
				heading: "Support",
				variant: "links",
				items: [
					{ title: "Help Center", path: "/help" },
					{ title: "Safety Information", path: "/safety" },
					{ title: "Cancellation Options", path: "/cancellation" },
					{ title: "Contact Us", path: "/contact" },
					{ title: "Accessibility", path: "/accessibility" },
				],
			},
			{
				heading: "Legal",
				variant: "links",
				items: [
					{ title: "Privacy", path: "/privacy" },
					{ title: "Terms", path: "/terms" },
				],
			},
		],
	},
};
