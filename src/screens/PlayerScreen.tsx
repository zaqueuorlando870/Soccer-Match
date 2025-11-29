import React, { useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '../../App';
import { useAppTheme } from '../theme/AppTheme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fields, matches } from '../mockData';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_PADDING = 16;
const CARD_MARGIN = 8;
const CARD_WIDTH = width - (CARD_PADDING * 2);

interface Match {
  id: string;
  title: string;
  fieldId: string;
  scheduledAt: string;
  perPlayerFeeCents: number;
  maxPlayers: number;
  confirmedCount: number;
}

export function PlayerScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'PlayerNotifications'>>();
  const [confirmedMatchIds, setConfirmedMatchIds] = useState<string[]>([]);
  const { theme } = useAppTheme();
  const { colors } = theme;
  const [showNotifications, setShowNotifications] = useState(false);

  const handleConfirmAndPay = (matchId: string) => {
    if (confirmedMatchIds.includes(matchId)) return;
    setConfirmedMatchIds((prev) => [...prev, matchId]);
    Alert.alert('Payment simulated', 'Your availability is confirmed and funds sent to field wallet.');
  };

  const [activeTab, setActiveTab] = useState('today');
  
  const TabButton = ({ label, value, isActive }: { label: string; value: string; isActive: boolean }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(value)}
      style={[
        styles.tabButton,
        isActive && { backgroundColor: colors.card }
      ]}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.tabText,
        { color: isActive ? colors.accent : colors.textSecondary }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={[colors.accent, '#FF4D4D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Find Your Game</Text>
            <Text style={styles.headerSubtitle}>Discover and join nearby matches</Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowNotifications(true)}
            style={styles.notificationButton}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={22} color="white" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.contentContainer}>
        <View style={[styles.tabContainer, { backgroundColor: colors.pillBg }]}>
          <TabButton label="Today" value="today" isActive={activeTab === 'today'} />
          <TabButton label="Tomorrow" value="tomorrow" isActive={activeTab === 'tomorrow'} />
          <TabButton label="This Week" value="week" isActive={activeTab === 'week'} />
        </View>

      <FlatList
        data={matches as Match[]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const field = fields.find((f) => f.id === item.fieldId);
          const isConfirmed = confirmedMatchIds.includes(item.id);
          const matchDate = new Date(item.scheduledAt);
          const timeString = matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const dateString = matchDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
          
          return (
            <View style={[styles.matchCard, { 
              backgroundColor: colors.card,
              shadowColor: colors.textPrimary,
              borderColor: isConfirmed ? colors.accentSoft : 'transparent'
            }]}>
              <View style={styles.matchTimeContainer}>
                <Text style={[styles.matchTime, { color: colors.accent }]}>{timeString}</Text>
                <Text style={[styles.matchDate, { color: colors.textSecondary }]}>{dateString}</Text>
              </View>
              
              <View style={styles.matchContent}>
                <View style={styles.matchHeader}>
                  <Text style={[styles.matchTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: colors.accentSoft }]}>
                    <Text style={[styles.statusText, { color: colors.accent }]}>Open</Text>
                  </View>
                </View>
                
                <View style={styles.fieldInfo}>
                  <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                  <Text style={[styles.fieldName, { color: colors.textSecondary }]}>{field?.name || 'Unknown Field'}</Text>
                </View>
                
                <View style={styles.matchMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="people-outline" size={14} color={colors.textSecondary} />
                    <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                      {item.confirmedCount}/{item.maxPlayers} players
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="pricetag-outline" size={14} color={colors.textSecondary} />
                    <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                      ${(item.perPlayerFeeCents / 100).toFixed(2)}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.joinButton,
                    { 
                      backgroundColor: isConfirmed ? colors.accentSoft : colors.accent,
                      borderColor: isConfirmed ? colors.accent : 'transparent'
                    }
                  ]}
                  onPress={() => handleConfirmAndPay(item.id)}
                  disabled={isConfirmed}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.joinButtonText,
                    { color: isConfirmed ? colors.accent : 'white' }
                  ]}>
                    {isConfirmed ? 'Confirmed' : 'Join Match'}
                  </Text>
                  {!isConfirmed && (
                    <Ionicons name="arrow-forward" size={16} color="white" style={styles.buttonIcon} />
                  )}
                </TouchableOpacity>
                <View>
                  <Text style={{ fontSize: 11, fontWeight: '600', color: '#1d4ed8' }}>
                    ${(item.perPlayerFeeCents / 100).toFixed(2)} / player
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                    {item.confirmedCount}/{item.maxPlayers} joined
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.joinButton,
                  { 
                    backgroundColor: isConfirmed ? colors.accentSoft : colors.accent,
                    borderColor: isConfirmed ? colors.accent : 'transparent'
                  }
                ]}
                onPress={() => handleConfirmAndPay(item.id)}
                disabled={isConfirmed}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.joinButtonText,
                  { color: isConfirmed ? colors.accent : 'white' }
                ]}>
                  {isConfirmed ? 'Confirmed' : 'Join Match'}
                </Text>
                {!isConfirmed && (
                  <Ionicons name="arrow-forward" size={16} color="white" style={styles.buttonIcon} />
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
      </View>

      {showNotifications && (
        <View style={styles.notificationOverlay}>
          <SafeAreaView style={styles.notificationContainer}>
            <View style={[styles.notificationModal, { backgroundColor: colors.card }]}>
              <View style={styles.notificationHeader}>
                <Text style={[styles.notificationTitle, { color: colors.textPrimary }]}>
                  Notifications
                </Text>
                <TouchableOpacity
                  onPress={() => setShowNotifications(false)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="close" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
              <View style={{ padding: 16, alignItems: 'center' }}>
                <Text style={{ 
                  color: colors.textSecondary, 
                  marginBottom: 20, 
                  textAlign: 'center',
                  fontSize: 16
                }}>
                  No new notifications
                </Text>
                <TouchableOpacity
                  style={{ 
                    backgroundColor: colors.accent,
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: 8,
                    alignSelf: 'center'
                  }}
                  onPress={() => setShowNotifications(false)}
                >
                  <Text style={{ 
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 16
                  }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContainer: {
    width: '100%',
    alignItems: 'center',
  },
  notificationModal: {
    width: '80%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 20,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  notificationText: {
    marginBottom: 20,
  },
  closeButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    paddingBottom: 24,
    paddingHorizontal: CARD_PADDING,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: CARD_PADDING,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 120,
    paddingTop: 4,
  },
  matchCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  matchTimeContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    alignItems: 'center',
  },
  matchTime: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
  matchDate: {
    fontSize: 12,
    marginTop: 2,
  },
  matchContent: {
    marginRight: 60,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  fieldInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fieldName: {
    fontSize: 13,
    marginLeft: 4,
  },
  matchMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 13,
    marginLeft: 4,
  },
  joinButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  joinButtonText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
