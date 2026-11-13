import React from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import { setState, useRooms } from "../../data/store";
import { useToast } from "../../context/ToastContext";
import { catalogRooms } from "../../data/catalog";
import { formatCurrency } from "../../lib/format";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ListRooms = () => {
	useDocumentTitle("List Rooms");
	const rooms = useRooms();
	const toast = useToast();
	const builtInIds = new Set(catalogRooms.map((room) => room._id));

	const toggleAvailability = (room) => {
		setState("roomOverrides", (overrides) => ({
			...overrides,
			[room._id]: !room.isAvailable,
		}));
		toast.show(
			`${room.roomType} is now ${room.isAvailable ? "closed" : "open"} for booking`,
			"info"
		);
	};

	const removeRoom = (room) => {
		if (!window.confirm(`Remove this ${room.roomType} from ${room.hotel.name}?`)) return;
		setState("addedRooms", (list) => list.filter((item) => item._id !== room._id));
		toast.show("Room removed");
	};

	return (
		<div>
			<Title
				align="left"
				title="Room Listings"
				subTitle="View, edit, and manage all listed rooms. Keep the information up-to-date to provide the best experience for our customers."
			/>

			<div className="flex items-center justify-between mt-8">
				<p className="text-gray-500">All Rooms ({rooms.length})</p>
				<Link
					to="/owner/add-room"
					className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary-dull"
				>
					Add room
				</Link>
			</div>
			<div className="w-full max-w-4xl text-left border border-gray-200 rounded-xl max-h-[28rem] overflow-y-auto overflow-x-auto bg-white mt-3">
				<table className="w-full min-w-[560px]">
					<thead className="bg-gray-50 sticky top-0">
						<tr>
							<th scope="col" className="py-3 px-4 text-gray-800 font-medium text-left">Room</th>
							<th scope="col" className="py-3 px-4 text-gray-800 font-medium text-left max-sm:hidden">Facilities</th>
							<th scope="col" className="py-3 px-4 text-gray-800 font-medium text-center">Price/Night</th>
							<th scope="col" className="py-3 px-4 text-gray-800 font-medium text-center">Open</th>
							<th scope="col" className="py-3 px-4 text-gray-800 font-medium text-center">Remove</th>
						</tr>
					</thead>
					<tbody className="text-sm">
						{rooms.map((room) => {
							const removable = !builtInIds.has(room._id);
							return (
								<tr key={room._id}>
									<td className="py-3 px-4 text-gray-700 border-t border-gray-200">
										{room.roomType}
										<span className="block text-xs text-gray-500">
											{room.hotel.name} · up to {room.maxGuests}
										</span>
									</td>
									<td className="py-3 px-4 text-gray-700 border-t border-gray-200 max-sm:hidden">
										{room.amenities.join(", ")}
									</td>
									<td className="py-3 px-4 text-gray-700 border-t border-gray-200 text-center">
										{formatCurrency(room.pricePerNight)}
									</td>
									<td className="py-3 px-4 border-t border-gray-200 text-center">
										<label className="relative inline-flex items-center cursor-pointer gap-3">
											<input
												type="checkbox"
												className="sr-only peer"
												checked={room.isAvailable}
												onChange={() => toggleAvailability(room)}
												aria-label={`Open ${room.roomType} for booking`}
											/>
											<div className="w-12 h-7 bg-slate-300 rounded-full peer-checked:bg-primary transition-colors duration-200"></div>
											<span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
										</label>
									</td>
									<td className="py-3 px-4 border-t border-gray-200 text-center">
										{removable ? (
											<button
												onClick={() => removeRoom(room)}
												className="px-3 py-1 text-xs rounded-full border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
											>
												Remove
											</button>
										) : (
											<span className="text-xs text-gray-500">Built-in</span>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ListRooms;
