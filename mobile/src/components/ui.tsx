import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  useWindowDimensions,
  StyleProp,
  TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/theme';

export const MIN_TOUCH = 44;

// Responsive layout: one column on phones, two on small tablets, three on large ones.
export const useColumns = (): { columns: number; contentWidth: number } => {
  const { width } = useWindowDimensions();
  const columns = width >= 960 ? 3 : width >= 600 ? 2 : 1;
  return { columns, contentWidth: Math.min(width, 1100) };
};

export const Screen = ({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.screen, { backgroundColor: colors.background }, style]}>
      {children}
    </SafeAreaView>
  );
};

export const Heading = ({
  children,
  level = 1,
  style,
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  style?: StyleProp<TextStyle>;
}) => {
  const { colors } = useTheme();
  const size = level === 1 ? 28 : level === 2 ? 20 : 17;
  return (
    <Text
      accessibilityRole="header"
      style={[{ color: colors.text, fontSize: size, fontWeight: '700', lineHeight: size * 1.25 }, style]}
    >
      {children}
    </Text>
  );
};

export const BodyText = ({
  children,
  muted = false,
  style,
  selectable,
}: {
  children: React.ReactNode;
  muted?: boolean;
  style?: StyleProp<TextStyle>;
  selectable?: boolean;
}) => {
  const { colors } = useTheme();
  return (
    <Text selectable={selectable} style={[{ color: muted ? colors.muted : colors.text, fontSize: 15, lineHeight: 22 }, style]}>
      {children}
    </Text>
  );
};

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  hint?: string;
  style?: StyleProp<ViewStyle>;
};

export const Button = ({ label, onPress, variant = 'primary', disabled = false, hint, style }: ButtonProps) => {
  const { colors } = useTheme();
  const palette = {
    primary: { bg: colors.primary, fg: colors.primaryText, border: colors.primary },
    secondary: { bg: colors.surface, fg: colors.text, border: colors.border },
    ghost: { bg: 'transparent', fg: colors.primary, border: 'transparent' },
    danger: { bg: 'transparent', fg: colors.danger, border: colors.danger },
  }[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: palette.bg, borderColor: palette.border, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      <Text style={{ color: palette.fg, fontWeight: '600', fontSize: 15 }}>{label}</Text>
    </Pressable>
  );
};

export const Field = ({
  label,
  error,
  hint,
  ...inputProps
}: TextInputProps & { label: string; error?: string; hint?: string }) => {
  const { colors } = useTheme();
  const errorId = error ? `${label}-error` : undefined;
  return (
    <View style={styles.field}>
      <Text style={{ color: colors.text, fontWeight: '600', marginBottom: 6 }} nativeID={`${label}-label`}>
        {label}
      </Text>
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={hint}
        accessibilityState={{ disabled: inputProps.editable === false }}
        placeholderTextColor={colors.muted}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...inputProps}
        style={[
          styles.input,
          { color: colors.text, backgroundColor: colors.surface, borderColor: error ? colors.danger : colors.border },
        ]}
      />
      {error ? (
        <Text nativeID={errorId} accessibilityLiveRegion="polite" style={{ color: colors.danger, marginTop: 6, fontSize: 13 }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export const Chip = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.primary : colors.chip,
          borderColor: selected ? colors.primary : colors.border,
        },
      ]}
    >
      <Text style={{ color: selected ? colors.primaryText : colors.text, fontSize: 14, fontWeight: '500' }}>{label}</Text>
    </Pressable>
  );
};

export const StarRating = ({ rating }: { rating: number }) => {
  const { colors } = useTheme();
  const rounded = Math.round(rating);
  return (
    <Text
      accessible
      accessibilityLabel={`Rated ${rating.toFixed(1)} out of 5`}
      style={{ color: colors.warning, fontSize: 15, letterSpacing: 1 }}
    >
      {'★'.repeat(rounded)}
      <Text style={{ color: colors.border }}>{'★'.repeat(5 - rounded)}</Text>
    </Text>
  );
};

export const Card = ({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, style]}>
      {children}
    </View>
  );
};

export const EmptyState = ({
  title,
  message,
  actionLabel,
  onAction,
}: {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) => (
  <Card style={{ alignItems: 'center', gap: 10, borderStyle: 'dashed' }}>
    <Heading level={2}>{title}</Heading>
    <BodyText muted style={{ textAlign: 'center' }}>
      {message}
    </BodyText>
    {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} style={{ marginTop: 6 }} /> : null}
  </Card>
);

export const Row = ({ label, value }: { label: string; value: string }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      <Text style={{ color: colors.muted, fontSize: 14 }}>{label}</Text>
      <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600', flexShrink: 1, textAlign: 'right' }}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  button: {
    minHeight: MIN_TOUCH,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: { marginBottom: 14 },
  input: {
    minHeight: MIN_TOUCH,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  chip: {
    minHeight: 36,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 6 },
});
