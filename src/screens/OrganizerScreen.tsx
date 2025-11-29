import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert } from 'react-native';
import { fields, matches as initialMatches } from '../mockData';

export function OrganizerScreen() {
  const [matches, setMatches] = useState(initialMatches);
  const [title, setTitle] = useState('');
  const [fieldId, setFieldId] = useState(fields[0]?.id ?? '');
  const [fee, setFee] = useState('500');

  const handleCreateMatch = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a title');
      return;
    }
    const feeCents = Math.round(Number(fee || '0') * 100);
    const newMatch = {
      id: `m${matches.length + 1}`,
      title,
      fieldId,
      scheduledAt: new Date().toISOString(),
      perPlayerFeeCents: feeCents,
      maxPlayers: 14,
      confirmedCount: 0,
      status: 'pending' as const,
    };
    setMatches((prev) => [newMatch, ...prev]);
    setTitle('');
    Alert.alert('Match created', 'Your match has been created (mocked).');
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: '#f3f4f6', paddingHorizontal: 16, paddingTop: 16 }}
    >
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 8, color: '#111827' }}>
        Create match
      </Text>
      <TextInput
        placeholder="Match title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: '#d1d5db',
          padding: 10,
          borderRadius: 10,
          marginBottom: 8,
          backgroundColor: '#ffffff',
        }}
      />
      <Text style={{ marginBottom: 4 }}>Field</Text>
      <FlatList
        data={fields}
        keyExtractor={(f) => f.id}
        horizontal
        renderItem={({ item }) => {
          const selected = item.id === fieldId;
          return (
            <Text
              onPress={() => setFieldId(item.id)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                marginRight: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: selected ? '#0f766e' : '#d1d5db',
                color: selected ? '#0f766e' : '#4b5563',
                backgroundColor: selected ? '#ecfdf5' : '#f9fafb',
                fontSize: 12,
              }}
            >
              {item.name}
            </Text>
          );
        }}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        placeholder="Per-player fee (e.g. 700)"
        keyboardType="numeric"
        value={fee}
        onChangeText={setFee}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 8 }}
      />
      <Button title="Create Match" onPress={handleCreateMatch} />

      <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 12, color: '#111827' }}>
        Your matches (mocked)
      </Text>
      <FlatList
        data={matches}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => {
          const field = fields.find((f) => f.id === item.fieldId);
          return (
            <View
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 14,
                padding: 12,
                marginBottom: 8,
                borderWidth: 1,
                borderColor: '#e5e7eb',
              }}
            >
              <Text style={{ fontWeight: '600', color: '#111827' }}>{item.title}</Text>
              <Text style={{ color: '#4b5563', fontSize: 13 }}>{field?.name}</Text>
              <Text style={{ color: '#6b7280', fontSize: 12 }}>
                Fee per player:{' '}
                {(item.perPlayerFeeCents / 100).toFixed(2)} | Confirmed: {item.confirmedCount}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
