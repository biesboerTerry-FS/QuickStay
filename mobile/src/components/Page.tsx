import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Screen, useColumns } from './ui';

export const Page = ({
  children,
  refreshKey,
}: {
  children: React.ReactNode;
  refreshKey?: string;
}) => {
  const { contentWidth } = useColumns();
  return (
    <Screen>
      <ScrollView
        key={refreshKey}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.column, { maxWidth: contentWidth }]}>{children}</View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 48, alignItems: 'center' },
  column: { width: '100%', gap: 16 },
});
