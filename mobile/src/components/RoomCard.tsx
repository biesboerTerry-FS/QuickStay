import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { Room } from '@/data/types';
import { seedReviewsFor } from '@/data/catalog';
import { useAppStore } from '@/store/AppStore';
import { useTheme } from '@/theme/theme';
import { BodyText, Heading, MIN_TOUCH, StarRating, useColumns } from './ui';
import { formatCurrency } from '@/lib/format';

export const averageRating = (roomId: string, extra: { roomId: string; rating: number }[] = []) => {
  const all = [...seedReviewsFor(roomId), ...extra.filter((item) => item.roomId === roomId)];
  const total = all.reduce((sum, review) => sum + review.rating, 0);
  return { average: all.length ? total / all.length : 0, count: all.length };
};

export const SaveButton = ({ roomId }: { roomId: string }) => {
  const { saved, toggleSaved } = useAppStore();
  const { colors } = useTheme();
  const isSaved = saved.includes(roomId);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isSaved ? 'Remove from saved rooms' : 'Save room'}
      accessibilityState={{ selected: isSaved }}
      onPress={() => toggleSaved(roomId)}
      hitSlop={8}
      style={[styles.save, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={20} color={isSaved ? colors.danger : colors.text} />
    </Pressable>
  );
};

export const RoomCard = ({ room }: { room: Room }) => {
  const { reviews } = useAppStore();
  const { colors } = useTheme();
  const { average, count } = averageRating(room._id, reviews);
  const label = `${room.hotel.name}, ${room.roomType}, ${formatCurrency(room.pricePerNight)} per night, rated ${average.toFixed(1)} from ${count} reviews`;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={label}
        accessibilityHint="Opens room details"
        onPress={() => router.push(`/room/${room._id}`)}
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        <Image source={room.images[0]} style={styles.image} accessibilityIgnoresInvertColors resizeMode="cover" />
        <View style={styles.body}>
          <Text style={{ color: colors.muted, fontSize: 13 }}>{room.hotel.city}</Text>
          <Heading level={3}>{room.hotel.name}</Heading>
          <BodyText muted style={{ fontSize: 14 }}>
            {room.roomType} · up to {room.maxGuests} guests
          </BodyText>
          <View style={styles.ratingRow}>
            <StarRating rating={average} />
            <Text style={{ color: colors.muted, fontSize: 13 }}>
              {average.toFixed(1)} ({count})
            </Text>
          </View>
          <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700', marginTop: 6 }}>
            {formatCurrency(room.pricePerNight)}
            <Text style={{ color: colors.muted, fontWeight: '400', fontSize: 14 }}> / night</Text>
          </Text>
        </View>
      </Pressable>
      <View style={styles.saveSlot}>
        <SaveButton roomId={room._id} />
      </View>
    </View>
  );
};

export const RoomGrid = ({ rooms }: { rooms: Room[] }) => {
  const { columns, contentWidth } = useColumns();
  const gap = 16;
  const itemWidth = columns === 1 ? '100%' : (Math.min(contentWidth, 1100) - 40 - gap * (columns - 1)) / columns;
  return (
    <View style={[styles.grid, { gap }]}>
      {rooms.map((room) => (
        <View key={room._id} style={{ width: itemWidth }}>
          <RoomCard room={room} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  card: { borderWidth: 1, borderRadius: 16, overflow: 'hidden', position: 'relative' },
  image: { width: '100%', height: 190 },
  body: { padding: 14, gap: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  saveSlot: { position: 'absolute', top: 10, right: 10 },
  save: {
    width: MIN_TOUCH,
    height: MIN_TOUCH,
    borderRadius: MIN_TOUCH / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
