import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { fields, wallets, ads, promotions } from '../mockData';

export function AdminScreen() {
  return (
    <View
      style={{ flex: 1, backgroundColor: '#f3f4f6', paddingHorizontal: 16, paddingTop: 16 }}
    >
      <Text
        style={{ fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#111827' }}
      >
        Admin overview (mocked)
      </Text>

      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#111827' }}>Fields</Text>
        <FlatList
          data={fields}
          keyExtractor={(f) => f.id}
          renderItem={({ item }) => {
            const wallet = wallets.find((w) => w.fieldId === item.id);
            return (
              <View
                style={{
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 8,
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  backgroundColor: '#f9fafb',
                }}
              >
                <Text style={{ fontWeight: '600', color: '#111827' }}>{item.name}</Text>
                <Text style={{ color: '#4b5563' }}>{item.address}</Text>
                {wallet && (
                  <Text style={{ color: '#6b7280', fontSize: 12 }}>
                    Wallet balance: {(wallet.balanceCents / 100).toFixed(2)}
                  </Text>
                )}
              </View>
            );
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#111827' }}>Promotions</Text>
        <FlatList
          data={promotions}
          keyExtractor={(p) => p.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                borderRadius: 10,
                marginTop: 8,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                backgroundColor: '#f9fafb',
              }}
            >
              <Text style={{ fontWeight: '600', color: '#111827' }}>{item.title}</Text>
              <Text style={{ color: '#4b5563' }}>{item.description}</Text>
            </View>
          )}
        />
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#111827' }}>Ads</Text>
        <FlatList
          data={ads}
          keyExtractor={(a) => a.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                borderRadius: 10,
                marginTop: 8,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                backgroundColor: '#f9fafb',
              }}
            >
              <Text style={{ fontWeight: '600', color: '#111827' }}>{item.title}</Text>
              <Text style={{ color: '#4b5563' }}>{item.description}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
