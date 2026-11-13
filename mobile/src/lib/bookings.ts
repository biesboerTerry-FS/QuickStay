import { toDay, todayIso } from './format';
import type { Booking, Room, StoredBooking } from '@/data/types';

const DAY_MS = 24 * 60 * 60 * 1000;

export const makeId = (): string =>
  `bk_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export const nightsBetween = (checkIn: string, checkOut: string): number =>
  Math.round((Date.parse(toDay(checkOut)) - Date.parse(toDay(checkIn))) / DAY_MS);

export const isValidRange = (checkIn: string, checkOut: string): boolean =>
  Boolean(checkIn && checkOut) && nightsBetween(checkIn, checkOut) >= 1;

const rangesOverlap = (aStart: string, aEnd: string, bStart: string, bEnd: string) =>
  toDay(aStart) < toDay(bEnd) && toDay(bStart) < toDay(aEnd);

export const isRoomFree = (
  roomId: string,
  checkIn: string,
  checkOut: string,
  bookings: StoredBooking[],
): boolean =>
  !bookings.some(
    (booking) =>
      booking.roomId === roomId &&
      booking.status !== 'cancelled' &&
      rangesOverlap(checkIn, checkOut, booking.checkInDate, booking.checkOutDate),
  );

export const bookingStatus = (booking: Pick<StoredBooking, 'status' | 'isPaid'>): string => {
  if (booking.status === 'cancelled') return 'Cancelled';
  return booking.isPaid ? 'Paid' : 'Pending';
};

export const canCancel = (booking: StoredBooking): boolean =>
  booking.status !== 'cancelled' && toDay(booking.checkInDate) > todayIso();

export const createBooking = (args: {
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  paymentMethod: StoredBooking['paymentMethod'];
  guest: { id: string; name: string };
}): StoredBooking => ({
  _id: makeId(),
  roomId: args.room._id,
  userId: args.guest.id,
  userName: args.guest.name,
  checkInDate: toDay(args.checkIn),
  checkOutDate: toDay(args.checkOut),
  guests: args.guests,
  totalPrice: nightsBetween(args.checkIn, args.checkOut) * args.room.pricePerNight,
  paymentMethod: args.paymentMethod,
  isPaid: false,
  status: 'pending',
  createdAt: new Date().toISOString(),
});

export const toBooking = (stored: StoredBooking, room: Room | undefined): Booking => ({
  ...stored,
  room,
  hotelName: room?.hotel.name ?? 'QuickStay hotel',
  address: room?.hotel.address ?? '',
});
