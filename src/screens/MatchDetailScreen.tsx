import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { matches, fields } from '../mockData';
import type { RootStackParamList } from '../../App';

export function MatchDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'MatchDetail'>>();
  const match = matches.find((m) => m.id === route.params.matchId);

  if (!match) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text>Match not found (mock data).</Text>
      </View>
    );
  }

  const field = fields.find((f) => f.id === match.fieldId);

  return (
    <View
      style={{ flex: 1, backgroundColor: '#f3f4f6', paddingHorizontal: 16, paddingTop: 16 }}
    >
      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 4 }}>
          {match.title}
        </Text>
        {field && (
          <Text style={{ fontSize: 14, color: '#4b5563', marginBottom: 4 }}>{field.name}</Text>
        )}
        <Text style={{ color: '#6b7280', fontSize: 12, marginBottom: 8 }}>
          Scheduled: {new Date(match.scheduledAt).toLocaleString()}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Players</Text>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
              {match.confirmedCount}/{match.maxPlayers}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: '#ecfdf5',
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#0f766e' }}>
              {match.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 8 }}>
          Pricing
        </Text>
        <Text style={{ color: '#4b5563', fontSize: 13 }}>
          Fee per player:{' '}
          <Text style={{ fontWeight: '600' }}>
            ₦{(match.perPlayerFeeCents / 100).toFixed(2)}
          </Text>
        </Text>
      </View>

      {field && (
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 16,
            padding: 14,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 8 }}>
            Venue
          </Text>
          <Text style={{ color: '#4b5563', fontSize: 13 }}>{field.name}</Text>
          <Text style={{ color: '#6b7280', fontSize: 12 }}>{field.address}</Text>
        </View>
      )}
    </View>
  );
}
