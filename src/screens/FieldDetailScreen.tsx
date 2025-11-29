import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { fields, matches } from '../mockData';
import type { RootStackParamList } from '../../App';

export function FieldDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'FieldDetail'>>();
  const field = fields.find((f) => f.id === route.params.fieldId);

  if (!field) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text>Field not found (mock data).</Text>
      </View>
    );
  }

  const fieldMatches = matches.filter((m) => m.fieldId === field.id);

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
          shadowOpacity: 0.04,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 4, color: '#111827' }}>
          {field.name}
        </Text>
        <Text style={{ color: '#4b5563', marginBottom: 6 }}>{field.address}</Text>
        <Text style={{ color: '#6b7280', fontSize: 13 }}>
          Default pricing:{' '}
          <Text style={{ fontWeight: '600' }}>
            ₦{(field.pricingDefaultCents / 100).toFixed(2)}
          </Text>{' '}
          | Listing fee:{' '}
          <Text style={{ fontWeight: '600' }}>
            ₦{(field.listingFeeCents / 100).toFixed(2)}
          </Text>
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#111827' }}>
          Matches at this field
        </Text>
        {fieldMatches.map((m) => (
          <View
            key={m.id}
            style={{
              backgroundColor: '#f9fafb',
              borderRadius: 12,
              padding: 10,
              marginBottom: 8,
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <Text style={{ fontWeight: '600', color: '#111827' }}>{m.title}</Text>
            <Text style={{ color: '#6b7280', fontSize: 12 }}>
              Scheduled: {new Date(m.scheduledAt).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
