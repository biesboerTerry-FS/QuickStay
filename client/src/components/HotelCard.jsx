import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import SaveButton from "./SaveButton";

const HotelCard = ({ room, index, rating = 4.5, reviewCount }) => {
	return (
		<div className="group relative max-w-70 w-full rounded-2xl overflow-hidden bg-white text-gray-600 shadow-lg shadow-gray-900/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
			<SaveButton roomId={room._id} className="absolute top-3 right-3 z-10" />
			<Link
				to={"/rooms/" + room._id}
				onClick={() => window.scrollTo(0, 0)}
				className="block"
			>
				<img
					src={room.images[0]}
					alt={`${room.hotel.name} ${room.roomType}`}
					className="w-full h-48 object-cover"
				/>
				{index % 2 === 0 && (
					<p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full">
						Best Seller
					</p>
				)}
				<div className="p-4 pt-5">
					<div className="flex items-center justify-between gap-2">
						<p className="font-playfair text-xl font-medium text-gray-800">
							{room.hotel.name}
						</p>
						<div className="flex items-center gap-1 text-sm text-gray-700">
							<img src={assets.starIconFilled} alt="" className="w-4" />
							{rating.toFixed(1)}
						</div>
					</div>
					<div className="flex items-center gap-1 text-sm">
						<img src={assets.locationIcon} alt="" />
						<span>{room.hotel.address}</span>
					</div>
					<p className="text-xs text-gray-500 mt-1">
						{room.roomType} · up to {room.maxGuests} guests
						{reviewCount !== undefined && ` · ${reviewCount} reviews`}
					</p>
					<div className="flex items-center justify-between mt-4">
						<p>
							<span className="text-xl text-gray-800">
								${room.pricePerNight}
							</span>
							/night
						</p>
						<span className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white group-hover:bg-primary-dull transition-all">
							Book Now
						</span>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default HotelCard;
