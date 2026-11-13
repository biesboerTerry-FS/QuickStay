import type { ImageSourcePropType } from 'react-native';

export type Amenity = 'Free WiFi' | 'Free Breakfast' | 'Room Service' | 'Mountain View' | 'Pool Access';

export type Hotel = {
  _id: string;
  name: string;
  address: string;
  city: string;
  contact: string;
  lat: number;
  lng: number;
};

export type Room = {
  _id: string;
  hotel: Hotel;
  roomType: 'Single Bed' | 'Double Bed' | 'Family Suite' | 'Luxury Room';
  pricePerNight: number;
  maxGuests: number;
  amenities: Amenity[];
  images: ImageSourcePropType[];
  isAvailable: boolean;
  createdAt: string;
};

export type StoredBooking = {
  _id: string;
  roomId: string;
  userId: string;
  userName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  paymentMethod: 'Pay At Hotel' | 'Card';
  isPaid: boolean;
  status: 'pending' | 'cancelled';
  createdAt: string;
};

export type Booking = StoredBooking & {
  room?: Room;
  hotelName: string;
  address: string;
};

export type Review = {
  id: string;
  roomId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

export type SearchEntry = {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  savedAt: string;
};

export type Guest = { id: string; name: string };
