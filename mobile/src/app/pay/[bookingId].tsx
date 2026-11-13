import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Page } from '@/components/Page';
import { BodyText, Button, Card, EmptyState, Field, Heading } from '@/components/ui';
import { useAppStore } from '@/store/AppStore';
import { useTheme } from '@/theme/theme';
import { formatCurrency } from '@/lib/format';
import { validateCard, type CardErrors } from '@/lib/payment';

const formatCardNumber = (value: string) =>
  value.replace(/\D/g, '').slice(0, 19).replace(/(\d{4})(?=\d)/g, '$1 ');

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

export default function PayScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { colors } = useTheme();
  const { bookings, updateBooking } = useAppStore();
  const booking = bookings.find((item) => item._id === bookingId);

  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState<CardErrors>({});

  if (!booking) {
    return (
      <Page>
        <EmptyState title="Booking not found" message="We couldn't find that booking." actionLabel="Go to my bookings" onAction={() => router.navigate('/bookings')} />
      </Page>
    );
  }

  if (booking.status === 'cancelled' || booking.isPaid) {
    return (
      <Page>
        <EmptyState
          title={booking.status === 'cancelled' ? 'This booking was cancelled' : 'This booking is already paid'}
          message="No further payment is needed."
          actionLabel="Back to my bookings"
          onAction={() => router.navigate('/bookings')}
        />
      </Page>
    );
  }

  const submit = () => {
    const nextErrors = validateCard({ number, expiry, cvc });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    updateBooking(booking._id, { isPaid: true, paymentMethod: 'Card' });
    router.replace(`/booking/${booking._id}`);
  };

  return (
    <Page>
      <Heading level={1}>Pay for your stay</Heading>
      <View style={{ borderRadius: 12, borderWidth: 1, borderColor: colors.warning, padding: 12, backgroundColor: colors.chip }}>
        <Text style={{ color: colors.text, fontSize: 14, lineHeight: 20 }}>
          Test mode: no real card is charged. Use 4242 4242 4242 4242 with any future expiry date and any 3-digit code.
        </Text>
      </View>

      <Card style={{ gap: 4 }}>
        <Field
          label="Card number"
          placeholder="4242 4242 4242 4242"
          value={number}
          onChangeText={(value) => setNumber(formatCardNumber(value))}
          keyboardType="number-pad"
          textContentType="creditCardNumber"
          autoComplete="cc-number"
          error={errors.number}
        />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Field
              label="Expiry"
              placeholder="MM/YY"
              value={expiry}
              onChangeText={(value) => setExpiry(formatExpiry(value))}
              keyboardType="number-pad"
              maxLength={5}
              error={errors.expiry}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Field
              label="Security code"
              placeholder="123"
              value={cvc}
              onChangeText={(value) => setCvc(value.replace(/\D/g, ''))}
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
              error={errors.cvc}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }}>
          <BodyText muted>Total due</BodyText>
          <BodyText style={{ fontWeight: '700' }}>{formatCurrency(booking.totalPrice)}</BodyText>
        </View>
        <Button label={`Pay ${formatCurrency(booking.totalPrice)}`} onPress={submit} />
      </Card>
    </Page>
  );
}
