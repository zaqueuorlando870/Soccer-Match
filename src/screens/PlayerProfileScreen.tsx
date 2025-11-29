import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '../../App';
import { useAppTheme } from '../theme/AppTheme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function PlayerProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'MainTabs'>>();
  const { theme } = useAppTheme();
  const { colors } = theme;
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 16, paddingBottom: 12 }}
      edges={['top', 'left', 'right']}
    >
      <View style={{ flex: 1, paddingTop: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Text
            style={{ fontSize: 22, fontWeight: '700', color: colors.accent }}
          >
            Profile
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => setShowNotifications(true)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={{ marginRight: 8 }}
            >
              <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ color: colors.textSecondary }}>
          This is a placeholder player profile screen. Add player info, stats, and settings here.
        </Text>

        <View style={{ marginTop: 24 }}>
          <Text
            style={{ fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 }}
          >
            Other roles
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 13, marginBottom: 12 }}>
            If you also organize matches or manage fields, you can switch to those roles here.
          </Text>
          <View style={{ gap: 8 }}>
            <TouchableOpacity
              onPress={() => navigation.replace('MainTabs', { role: 'Organizer' })}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <Text style={{ color: colors.textPrimary, fontWeight: '600', fontSize: 14 }}>
                Switch to organizer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.replace('MainTabs', { role: 'FieldManager' })}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <Text style={{ color: colors.textPrimary, fontWeight: '600', fontSize: 14 }}>
                Switch to field manager
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {showNotifications && (
        <SafeAreaView
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: colors.background,
            paddingHorizontal: 16,
            paddingBottom: 24,
          }}
          edges={['top', 'left', 'right']}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary }}
            >
              Notifications
            </Text>
            <TouchableOpacity
              onPress={() => setShowNotifications(false)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
            You have no new notifications yet. Profile-related alerts will appear here.
          </Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
