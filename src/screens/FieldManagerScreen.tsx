import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert } from 'react-native';
import { fields, wallets, payoutRequests as initialPayouts, promotions as initialPromos, matches } from '../mockData';

export function FieldManagerScreen() {
  const managedField = fields[0]; // mocked single field
  const [wallet] = useState(() => wallets.find((w) => w.fieldId === managedField.id)!);
  const [payoutRequests, setPayoutRequests] = useState(initialPayouts);
  const [promos, setPromos] = useState(initialPromos);
  const [payoutAmount, setPayoutAmount] = useState('100');
  const [promoTitle, setPromoTitle] = useState('');

  const handleRequestPayout = () => {
    const amountCents = Math.round(Number(payoutAmount || '0') * 100);
    if (amountCents <= 0) {
      Alert.alert('Validation', 'Enter a positive amount');
      return;
    }
    if (amountCents > wallet.balanceCents) {
      Alert.alert('Insufficient funds', 'Not enough balance in wallet (mocked check).');
      return;
    }
    const req = {
      id: `p${payoutRequests.length + 1}`,
      fieldId: managedField.id,
      managerName: 'Mock Manager',
      amountCents,
      status: 'requested' as const,
      requestedAt: new Date().toISOString(),
    };
    setPayoutRequests((prev) => [req, ...prev]);
    setPayoutAmount('');
    Alert.alert('Payout requested', 'Payout request created (mocked).');
  };

  const handleCreatePromo = () => {
    if (!promoTitle.trim()) {
      Alert.alert('Validation', 'Enter a promo title');
      return;
    }
    const promo = {
      id: `promo${promos.length + 1}`,
      fieldId: managedField.id,
      title: promoTitle,
      description: 'Custom field promotion (mocked).',
      isActive: true,
    };
    setPromos((prev) => [promo, ...prev]);
    setPromoTitle('');
    Alert.alert('Promotion created', 'Promotion created (mocked).');
  };

  const upcomingMatches = matches.filter((m) => m.fieldId === managedField.id);

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
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 4, color: '#111827' }}>
          Field manager
        </Text>
        <Text style={{ color: '#4b5563' }}>{managedField.name}</Text>
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontWeight: '600', marginBottom: 8, color: '#111827' }}>Wallet (mocked)</Text>
        <Text style={{ color: '#4b5563', fontSize: 13 }}>
          Balance: {(wallet.balanceCents / 100).toFixed(2)}
        </Text>
        <Text style={{ color: '#4b5563', fontSize: 13 }}>
          Pending payouts: {(wallet.pendingPayoutCents / 100).toFixed(2)}
        </Text>
        <Text style={{ color: '#4b5563', fontSize: 13 }}>
          Total earned: {(wallet.totalEarnedCents / 100).toFixed(2)}
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
        <Text style={{ marginBottom: 8, fontWeight: '600', color: '#111827' }}>
          Request payout
        </Text>
        <TextInput
          placeholder="Amount (e.g. 1000)"
          keyboardType="numeric"
          value={payoutAmount}
          onChangeText={setPayoutAmount}
          style={{
            borderWidth: 1,
            borderColor: '#d1d5db',
            padding: 10,
            borderRadius: 10,
            marginBottom: 8,
            backgroundColor: '#f9fafb',
          }}
        />
        <Button title="Request Payout" onPress={handleRequestPayout} />
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <Text style={{ marginBottom: 8, fontWeight: '600', color: '#111827' }}>Promotions</Text>
        <TextInput
          placeholder="New promotion title"
          value={promoTitle}
          onChangeText={setPromoTitle}
          style={{
            borderWidth: 1,
            borderColor: '#d1d5db',
            padding: 10,
            borderRadius: 10,
            marginBottom: 8,
            backgroundColor: '#f9fafb',
          }}
        />
        <Button title="Create Promotion" onPress={handleCreatePromo} />
        <FlatList
          data={promos}
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
              <Text style={{ color: '#6b7280', fontSize: 12 }}>
                {item.isActive ? 'Active' : 'Inactive'}
              </Text>
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
        <Text style={{ marginBottom: 8, fontWeight: '600', color: '#111827' }}>
          Upcoming matches
        </Text>
        <FlatList
          data={upcomingMatches}
          keyExtractor={(m) => m.id}
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
              <Text style={{ color: '#6b7280', fontSize: 12 }}>Status: {item.status}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
