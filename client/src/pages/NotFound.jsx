import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-28 min-h-[70vh]">
			<p className="font-playfair text-7xl md:text-8xl text-primary">404</p>
			<h1 className="font-playfair text-3xl md:text-4xl text-gray-800 mt-4">
				We can't find that page
			</h1>
			<p className="text-gray-500 mt-3 max-w-md leading-relaxed">
				The link may be broken or the page may have moved. Try one of
				these instead.
			</p>
			<div className="flex flex-wrap justify-center gap-3 mt-8">
				<Link
					to="/"
					className="px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dull transition-all"
				>
					Back to home
				</Link>
				<Link
					to="/rooms"
					className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
				>
					Browse hotels
				</Link>
				<Link
					to="/help"
					className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
				>
					Help center
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
