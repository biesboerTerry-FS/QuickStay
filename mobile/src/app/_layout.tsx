import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppStoreProvider } from '@/store/AppStore';
import { ThemeProvider, useTheme } from '@/theme/theme';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppStoreProvider>
        <RootStack />
      </AppStoreProvider>
    </ThemeProvider>
  );
}

function RootStack() {
  const { colors, isDark } = useTheme();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="room/[id]" options={{ title: 'Room details' }} />
        <Stack.Screen name="book/[id]" options={{ title: 'Confirm booking' }} />
        <Stack.Screen name="booking/[bookingId]" options={{ title: 'Your booking' }} />
        <Stack.Screen name="pay/[bookingId]" options={{ title: 'Payment' }} />
      </Stack>
    </>
  );
}
