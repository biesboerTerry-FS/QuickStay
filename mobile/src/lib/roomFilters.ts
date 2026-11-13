import { isRoomFree } from './bookings';
import type { Room, StoredBooking } from '@/data/types';

export type SortOption = 'price-asc' | 'price-desc' | 'newest' | '';

export type RoomFilters = {
  destination?: string;
  types?: string[];
  prices?: string[];
  guests?: number;
  dates?: { checkIn: string; checkOut: string } | null;
  bookings?: StoredBooking[];
  sort?: SortOption;
};

export const sortRooms = (rooms: Room[], sort: SortOption = ''): Room[] => {
  const sorted = [...rooms];
  if (sort === 'price-asc') sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
  if (sort === 'price-desc') sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
  if (sort === 'newest') {
    sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  return sorted;
};

export const filterRooms = (rooms: Room[], filters: RoomFilters): Room[] => {
  const term = (filters.destination ?? '').trim().toLowerCase();
  const types = filters.types ?? [];
  const prices = filters.prices ?? [];
  const guests = filters.guests ?? 0;
  const bookings = filters.bookings ?? [];

  const filtered = rooms.filter((room) => {
    if (!room.isAvailable) return false;
    if (term && !room.hotel.city.toLowerCase().includes(term)) return false;
    if (types.length && !types.includes(room.roomType)) return false;
    if (
      prices.length &&
      !prices.some((range) => {
        const [min, max] = range.split('-').map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    ) {
      return false;
    }
    if (guests && room.maxGuests < guests) return false;
    if (filters.dates && !isRoomFree(room._id, filters.dates.checkIn, filters.dates.checkOut, bookings)) {
      return false;
    }
    return true;
  });

  return sortRooms(filtered, filters.sort ?? '');
};
