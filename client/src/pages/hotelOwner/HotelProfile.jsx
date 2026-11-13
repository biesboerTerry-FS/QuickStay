import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { setState, useRooms, useStore } from "../../data/store";
import { useToast } from "../../context/ToastContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const fieldClass =
	"w-full border border-gray-300 rounded-lg px-3 py-2 mt-1.5 text-sm outline-none focus:border-primary";

const HotelProfile = () => {
	useDocumentTitle("Hotel Profile");
	const profile = useStore("profile");
	const rooms = useRooms();
	const toast = useToast();
	const [hotel, setHotel] = useState(profile);
	const [dirty, setDirty] = useState(false);

	useEffect(() => {
		setHotel(profile);
	}, [profile]);

	const amenities = [...new Set(rooms.flatMap((room) => room.amenities))];

	const handleChange = (event) => {
		const { name, value } = event.target;
		setHotel((prev) => ({ ...prev, [name]: value }));
		setDirty(true);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setState("profile", {
			name: hotel.name.trim(),
			address: hotel.address.trim(),
			city: hotel.city.trim(),
			contact: hotel.contact.trim(),
		});
		setDirty(false);
		toast.show("Hotel profile saved");
	};

	return (
		<div>
			<Title
				align="left"
				title="Hotel Profile"
				subTitle="Keep your property details accurate. Guests see this information on every listing and booking."
			/>

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
				<form
					onSubmit={handleSubmit}
					className="xl:col-span-2 bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-5"
				>
					<div>
						<label htmlFor="name" className="text-sm font-medium text-gray-800">
							Hotel name
						</label>
						<input id="name" name="name" type="text" value={hotel.name} onChange={handleChange} required className={fieldClass} />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div>
							<label htmlFor="city" className="text-sm font-medium text-gray-800">
								City
							</label>
							<input id="city" name="city" type="text" value={hotel.city} onChange={handleChange} required className={fieldClass} />
						</div>
						<div>
							<label htmlFor="contact" className="text-sm font-medium text-gray-800">
								Contact number
							</label>
							<input id="contact" name="contact" type="tel" value={hotel.contact} onChange={handleChange} required className={fieldClass} />
						</div>
					</div>
					<div>
						<label htmlFor="address" className="text-sm font-medium text-gray-800">
							Address
						</label>
						<input id="address" name="address" type="text" value={hotel.address} onChange={handleChange} required className={fieldClass} />
					</div>
					<div className="flex items-center gap-4">
						<button
							type="submit"
							disabled={!dirty}
							className="bg-primary hover:bg-primary-dull text-white px-8 py-2.5 rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
						>
							Save changes
						</button>
						{dirty && <p className="text-sm text-gray-500">Unsaved changes</p>}
					</div>
				</form>

				<div className="flex flex-col gap-6">
					<div className="bg-white border border-gray-200 rounded-xl p-6">
						<p className="text-sm text-gray-500">Listed rooms</p>
						<p className="text-2xl font-semibold text-gray-800 mt-1">{rooms.length}</p>
					</div>
					<div className="bg-white border border-gray-200 rounded-xl p-6">
						<p className="text-sm font-medium text-gray-800">Amenities offered</p>
						<div className="flex flex-wrap gap-2 mt-3">
							{amenities.map((amenity) => (
								<span key={amenity} className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
									{amenity}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HotelProfile;
