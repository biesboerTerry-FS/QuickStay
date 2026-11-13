import React, { useState } from 'react';
import { Linking, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Page } from '@/components/Page';
import { BodyText, Button, Card, Chip, Field, Heading } from '@/components/ui';
import { useAppStore } from '@/store/AppStore';
import { useTheme, type ThemeMode } from '@/theme/theme';

const WEB_URL = process.env.EXPO_PUBLIC_WEB_URL ?? 'https://your-domain.example';

const links = [
  { label: 'About QuickStay', path: '/about' },
  { label: 'Help center', path: '/help' },
  { label: 'Cancellation options', path: '/cancellation' },
  { label: 'Contact us', path: '/contact' },
  { label: 'Privacy policy', path: '/privacy' },
  { label: 'Terms of use', path: '/terms' },
];

const modes: { label: string; value: ThemeMode }[] = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProfileScreen() {
  const { colors, mode, setMode } = useTheme();
  const { guest, signIn, signOut, subscribe, newsletter } = useAppStore();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const onSubscribe = () => {
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setMessage({ text: 'Enter a valid email address.', ok: false });
      return;
    }
    subscribe(value);
    setEmail('');
    setMessage({ text: newsletter.includes(value) ? 'You are already subscribed.' : 'Thanks for subscribing!', ok: true });
  };

  return (
    <Page>
      <Heading level={1}>Account</Heading>

      <Card style={{ gap: 12 }}>
        <Heading level={2}>{guest ? guest.name : 'Not signed in'}</Heading>
        <BodyText muted>
          {guest
            ? 'Your bookings and saved rooms are kept on this device.'
            : 'Sign in to book stays, pay, and review hotels.'}
        </BodyText>
        {guest ? (
          <Button label="Sign out" variant="secondary" onPress={signOut} />
        ) : (
          <Button label="Sign in as demo guest" onPress={signIn} hint="Creates a local demo account until Clerk is connected" />
        )}
      </Card>

      <Card style={{ gap: 12 }}>
        <Heading level={2}>Appearance</Heading>
        <View accessibilityRole="radiogroup" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {modes.map((option) => (
            <Chip key={option.value} label={option.label} selected={mode === option.value} onPress={() => setMode(option.value)} />
          ))}
        </View>
      </Card>

      <Card style={{ gap: 12 }}>
        <Heading level={2}>Stay updated</Heading>
        <BodyText muted>Inspiration and special offers, once a month at most.</BodyText>
        <Field
          label="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          placeholder="you@example.com"
        />
        {message ? (
          <Text accessibilityLiveRegion="polite" style={{ color: message.ok ? colors.success : colors.danger }}>
            {message.text}
          </Text>
        ) : null}
        <Button label="Subscribe" onPress={onSubscribe} />
      </Card>

      <Card style={{ gap: 10 }}>
        <Heading level={2}>Help and legal</Heading>
        {links.map((link) => (
          <Button
            key={link.path}
            label={link.label}
            variant="ghost"
            hint="Opens in your browser"
            onPress={() => Linking.openURL(`${WEB_URL}${link.path}`)}
          />
        ))}
      </Card>

      <BodyText muted style={{ textAlign: 'center' }}>
        QuickStay {Constants.expoConfig?.version ?? '1.0.0'}
      </BodyText>
    </Page>
  );
}
