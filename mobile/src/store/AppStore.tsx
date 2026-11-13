import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Guest, Review, SearchEntry, StoredBooking } from '@/data/types';

type StoreData = {
  bookings: StoredBooking[];
  saved: string[];
  reviews: Review[];
  searches: SearchEntry[];
  newsletter: string[];
  guest: Guest | null;
};

const STORAGE_KEY = 'quickstay.store.v1';

const emptyData: StoreData = {
  bookings: [],
  saved: [],
  reviews: [],
  searches: [],
  newsletter: [],
  guest: null,
};

// Demo account used until Clerk is connected to the mobile app.
export const DEMO_GUEST: Guest = { id: 'guest_demo', name: 'Demo Guest' };

type StoreValue = StoreData & {
  loaded: boolean;
  toggleSaved: (roomId: string) => void;
  addBooking: (booking: StoredBooking) => void;
  updateBooking: (id: string, patch: Partial<StoredBooking>) => void;
  addReview: (review: Review) => void;
  addSearch: (entry: SearchEntry) => void;
  subscribe: (email: string) => void;
  signIn: () => void;
  signOut: () => void;
};

const AppStoreContext = createContext<StoreValue | null>(null);

export const AppStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<StoreData>(emptyData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setData({ ...emptyData, ...JSON.parse(raw) });
      })
      .catch(() => undefined)
      .finally(() => setLoaded(true));
  }, []);

  const update = useCallback((updater: (current: StoreData) => StoreData) => {
    setData((current) => {
      const next = updater(current);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => undefined);
      return next;
    });
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      ...data,
      loaded,
      toggleSaved: (roomId) =>
        update((current) => ({
          ...current,
          saved: current.saved.includes(roomId)
            ? current.saved.filter((id) => id !== roomId)
            : [...current.saved, roomId],
        })),
      addBooking: (booking) =>
        update((current) => ({ ...current, bookings: [booking, ...current.bookings] })),
      updateBooking: (id, patch) =>
        update((current) => ({
          ...current,
          bookings: current.bookings.map((item) => (item._id === id ? { ...item, ...patch } : item)),
        })),
      addReview: (review) => update((current) => ({ ...current, reviews: [review, ...current.reviews] })),
      addSearch: (entry) =>
        update((current) => ({
          ...current,
          searches: [
            entry,
            ...current.searches.filter(
              (item) =>
                item.destination !== entry.destination ||
                item.checkIn !== entry.checkIn ||
                item.checkOut !== entry.checkOut,
            ),
          ].slice(0, 5),
        })),
      subscribe: (email) =>
        update((current) => ({
          ...current,
          newsletter: current.newsletter.includes(email) ? current.newsletter : [...current.newsletter, email],
        })),
      signIn: () => update((current) => ({ ...current, guest: DEMO_GUEST })),
      signOut: () => update((current) => ({ ...current, guest: null })),
    }),
    [data, loaded, update],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
};

export const useAppStore = (): StoreValue => {
  const value = useContext(AppStoreContext);
  if (!value) throw new Error('useAppStore must be used inside AppStoreProvider');
  return value;
};
