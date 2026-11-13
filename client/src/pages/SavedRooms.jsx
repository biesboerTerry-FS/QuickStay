import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import HotelCard from "../components/HotelCard";
import { useRooms, useStore } from "../data/store";
import useDocumentTitle from "../hooks/useDocumentTitle";

const SavedRooms = () => {
	useDocumentTitle("Saved rooms");
	const savedIds = useStore("saved");
	const rooms = useRooms();
	const saved = savedIds
		.map((id) => rooms.find((room) => room._id === id))
		.filter(Boolean);

	return (
		<div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
			<Title
				title="Saved Rooms"
				subTitle="Rooms you've hearted are kept here so you can compare them and book when you're ready."
				align="left"
			/>

			{saved.length === 0 ? (
				<div className="mt-10 max-w-xl rounded-2xl border border-dashed border-gray-300 p-8 text-center">
					<p className="text-lg font-medium text-gray-800">Nothing saved yet</p>
					<p className="text-sm text-gray-500 mt-2">
						Tap the heart on any room to save it.
					</p>
					<Link
						to="/rooms"
						className="inline-block mt-5 px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dull"
					>
						Browse hotels
					</Link>
				</div>
			) : (
				<div className="flex flex-wrap gap-6 mt-10">
					{saved.map((room, index) => (
						<HotelCard key={room._id} room={room} index={index} />
					))}
				</div>
			)}
		</div>
	);
};

export default SavedRooms;
