import {
	hotelDummyData,
	roomsDummyData,
	userDummyData,
} from "../assets/assets";
import roomImg1 from "../assets/roomImg1.png";
import roomImg2 from "../assets/roomImg2.png";
import roomImg3 from "../assets/roomImg3.png";
import roomImg4 from "../assets/roomImg4.png";

export const defaultRoomImages = [roomImg1, roomImg2, roomImg3, roomImg4];

const newYorkHotel = {
	...hotelDummyData,
	city: "New York",
	lat: 40.7128,
	lng: -74.006,
};

const seedRooms = roomsDummyData.map((room, index) => ({
	...room,
	hotel: { ...newYorkHotel, ...room.hotel, lat: 40.7128, lng: -74.006 },
	maxGuests: [2, 2, 3, 1][index] ?? 2,
}));

const cityHotels = {
	london: {
		_id: "hotel_london",
		name: "Thames Crown Hotel",
		address: "12 Riverside Walk, Southbank",
		contact: "+44 20 7946 0100",
		city: "London",
		lat: 51.5072,
		lng: -0.1276,
		owner: userDummyData,
	},
	dubai: {
		_id: "hotel_dubai",
		name: "Dubai Marina Lodge",
		address: "45 Marina Boulevard, Dubai Marina",
		contact: "+971 4 555 0100",
		city: "Dubai",
		lat: 25.2048,
		lng: 55.2708,
		owner: userDummyData,
	},
	singapore: {
		_id: "hotel_singapore",
		name: "Orchard Grand Suites",
		address: "8 Orchard Road, Central",
		contact: "+65 6555 0100",
		city: "Singapore",
		lat: 1.3521,
		lng: 103.8198,
		owner: userDummyData,
	},
};

const makeRoom = (_id, hotel, roomType, pricePerNight, amenities, maxGuests, createdAt) => ({
	_id,
	hotel,
	roomType,
	pricePerNight,
	amenities,
	images: defaultRoomImages,
	isAvailable: true,
	maxGuests,
	createdAt,
	updatedAt: createdAt,
	__v: 0,
});

const cityRooms = [
	makeRoom("room_london_double", cityHotels.london, "Double Bed", 289, ["Free WiFi", "Free Breakfast"], 2, "2025-06-01T09:00:00.000Z"),
	makeRoom("room_london_family", cityHotels.london, "Family Suite", 459, ["Free WiFi", "Pool Access", "Room Service"], 4, "2025-06-02T09:00:00.000Z"),
	makeRoom("room_dubai_luxury", cityHotels.dubai, "Luxury Room", 699, ["Mountain View", "Pool Access", "Free WiFi"], 2, "2025-06-03T09:00:00.000Z"),
	makeRoom("room_dubai_family", cityHotels.dubai, "Family Suite", 549, ["Pool Access", "Room Service"], 4, "2025-06-04T09:00:00.000Z"),
	makeRoom("room_singapore_single", cityHotels.singapore, "Single Bed", 179, ["Free WiFi"], 1, "2025-06-05T09:00:00.000Z"),
	makeRoom("room_singapore_double", cityHotels.singapore, "Double Bed", 259, ["Free Breakfast", "Room Service"], 2, "2025-06-06T09:00:00.000Z"),
];

export const catalogRooms = [...seedRooms, ...cityRooms];

export const hotelProfileDefaults = {
	name: hotelDummyData.name,
	address: hotelDummyData.address,
	city: hotelDummyData.city,
	contact: hotelDummyData.contact,
};

const reviewTemplates = [
	{ name: "Emma R.", rating: 5, comment: "Spotless room, friendly staff and a view that made the trip. Would book again." },
	{ name: "Liam J.", rating: 4, comment: "Great location and comfortable beds. Breakfast was a highlight." },
	{ name: "Sophia L.", rating: 5, comment: "Check-in was smooth and the amenities were exactly as listed." },
];

export const seedReviewsFor = (roomId) => {
	const offset =
		[...roomId].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
		reviewTemplates.length;
	return [0, 1].map((i) => ({
		id: `${roomId}-seed-${i}`,
		roomId,
		...reviewTemplates[(offset + i) % reviewTemplates.length],
		date: `2025-05-0${i + 1}`,
	}));
};
