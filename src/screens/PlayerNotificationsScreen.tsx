import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../theme/AppTheme';

export function PlayerNotificationsScreen() {
  const { theme } = useAppTheme();
  const { colors } = theme;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 16, paddingBottom: 12 }}
      edges={['top', 'left', 'right']}
    >
      <View style={{ flex: 1, paddingTop: 16 }}>
        <Text
          style={{ fontSize: 22, fontWeight: '700', marginBottom: 8, color: colors.accent }}
        >
          Notifications
        </Text>
        <Text style={{ color: colors.textSecondary }}>
          This is a placeholder notifications screen. Show match invites, updates and alerts here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
