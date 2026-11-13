import type { Hotel, Review, Room } from './types';

import roomImg1 from '../../assets/images/roomImg1.png';
import roomImg2 from '../../assets/images/roomImg2.png';
import roomImg3 from '../../assets/images/roomImg3.png';
import roomImg4 from '../../assets/images/roomImg4.png';

export const roomImages = [roomImg1, roomImg2, roomImg3, roomImg4];

export const cities = ['Dubai', 'Singapore', 'New York', 'London'];

const urbanza: Hotel = {
  _id: '67f76393197ac559e4089b72',
  name: 'Urbanza Suites',
  address: 'Main Road 123 Street, 23 Colony',
  city: 'New York',
  contact: '+0123456789',
  lat: 40.7128,
  lng: -74.006,
};

const thames: Hotel = {
  _id: 'hotel_london',
  name: 'Thames Crown Hotel',
  address: '12 Riverside Walk, Southbank',
  city: 'London',
  contact: '+44 20 7946 0100',
  lat: 51.5072,
  lng: -0.1276,
};

const marina: Hotel = {
  _id: 'hotel_dubai',
  name: 'Dubai Marina Lodge',
  address: '45 Marina Boulevard, Dubai Marina',
  city: 'Dubai',
  contact: '+971 4 555 0100',
  lat: 25.2048,
  lng: 55.2708,
};

const orchard: Hotel = {
  _id: 'hotel_singapore',
  name: 'Orchard Grand Suites',
  address: '8 Orchard Road, Central',
  city: 'Singapore',
  contact: '+65 6555 0100',
  lat: 1.3521,
  lng: 103.8198,
};

const room = (
  _id: string,
  hotel: Hotel,
  roomType: Room['roomType'],
  pricePerNight: number,
  amenities: Room['amenities'],
  maxGuests: number,
  createdAt: string,
  images = roomImages,
): Room => ({
  _id,
  hotel,
  roomType,
  pricePerNight,
  amenities,
  maxGuests,
  images,
  isAvailable: true,
  createdAt,
});

export const rooms: Room[] = [
  room('67f7647c197ac559e4089b96', urbanza, 'Double Bed', 399, ['Room Service', 'Mountain View', 'Pool Access'], 2, '2025-04-10T06:26:04.013Z', [roomImg1, roomImg2, roomImg3, roomImg4]),
  room('67f76452197ac559e4089b8e', urbanza, 'Double Bed', 299, ['Room Service', 'Mountain View', 'Pool Access'], 2, '2025-04-10T06:25:22.593Z', [roomImg2, roomImg3, roomImg4, roomImg1]),
  room('67f76406197ac559e4089b82', urbanza, 'Double Bed', 249, ['Free WiFi', 'Free Breakfast', 'Room Service'], 3, '2025-04-10T06:24:06.285Z', [roomImg3, roomImg4, roomImg1, roomImg2]),
  room('67f763d8197ac559e4089b7a', urbanza, 'Single Bed', 199, ['Free WiFi', 'Room Service', 'Pool Access'], 1, '2025-04-10T06:23:20.252Z', [roomImg4, roomImg1, roomImg2, roomImg3]),
  room('room_london_double', thames, 'Double Bed', 289, ['Free WiFi', 'Free Breakfast'], 2, '2025-06-01T09:00:00.000Z'),
  room('room_london_family', thames, 'Family Suite', 459, ['Free WiFi', 'Pool Access', 'Room Service'], 4, '2025-06-02T09:00:00.000Z', [roomImg2, roomImg3, roomImg4, roomImg1]),
  room('room_dubai_luxury', marina, 'Luxury Room', 699, ['Mountain View', 'Pool Access', 'Free WiFi'], 2, '2025-06-03T09:00:00.000Z', [roomImg3, roomImg4, roomImg1, roomImg2]),
  room('room_dubai_family', marina, 'Family Suite', 549, ['Pool Access', 'Room Service'], 4, '2025-06-04T09:00:00.000Z', [roomImg4, roomImg1, roomImg2, roomImg3]),
  room('room_singapore_single', orchard, 'Single Bed', 179, ['Free WiFi'], 1, '2025-06-05T09:00:00.000Z', [roomImg1, roomImg2, roomImg3, roomImg4]),
  room('room_singapore_double', orchard, 'Double Bed', 259, ['Free Breakfast', 'Room Service'], 2, '2025-06-06T09:00:00.000Z', [roomImg2, roomImg3, roomImg4, roomImg1]),
];

const reviewTemplates = [
  { name: 'Emma R.', rating: 5, comment: 'Spotless room, friendly staff and a view that made the trip. Would book again.' },
  { name: 'Liam J.', rating: 4, comment: 'Great location and comfortable beds. Breakfast was a highlight.' },
  { name: 'Sophia L.', rating: 5, comment: 'Check-in was smooth and the amenities were exactly as listed.' },
];

export const seedReviewsFor = (roomId: string): Review[] => {
  const offset =
    [...roomId].reduce((sum, char) => sum + char.charCodeAt(0), 0) % reviewTemplates.length;
  return [0, 1].map((i) => {
    const template = reviewTemplates[(offset + i) % reviewTemplates.length];
    return {
      id: `${roomId}-seed-${i}`,
      roomId,
      name: template.name,
      rating: template.rating,
      comment: template.comment,
      date: `2025-05-0${i + 1}`,
    };
  });
};

export const findRoom = (id: string | undefined): Room | undefined =>
  rooms.find((item) => item._id === id);
