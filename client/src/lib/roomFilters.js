import { isRoomFree } from "./bookings";

export const sortRooms = (rooms, sort) => {
	const sorted = [...rooms];
	if (sort === "price-asc") {
		sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
	} else if (sort === "price-desc") {
		sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
	} else if (sort === "newest") {
		sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	}
	return sorted;
};

export const filterRooms = (
	rooms,
	{
		destination = "",
		types = [],
		prices = [],
		guests = 0,
		dates = null,
		bookings = [],
		sort = "",
	}
) => {
	const term = destination.trim().toLowerCase();

	const filtered = rooms.filter((room) => {
		if (!room.isAvailable) return false;
		if (term && !room.hotel.city.toLowerCase().includes(term)) return false;
		if (types.length && !types.includes(room.roomType)) return false;
		if (
			prices.length &&
			!prices.some((range) => {
				const [min, max] = range.split("-").map(Number);
				return room.pricePerNight >= min && room.pricePerNight <= max;
			})
		) {
			return false;
		}
		if (guests && room.maxGuests < guests) return false;
		if (
			dates &&
			!isRoomFree(room._id, dates.checkIn, dates.checkOut, bookings)
		) {
			return false;
		}
		return true;
	});

	return sortRooms(filtered, sort);
};
