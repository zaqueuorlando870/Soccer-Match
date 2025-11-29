import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

type League = {
  id: string;
  name: string;
  icon: 'soccer' | 'trophy-outline';
};

type Team = {
  name: string;
  logo: string;
};

type Match = {
  id: string;
  team1: Team;
  team2: Team;
  time: string;
  league: string;
  score?: string;
  isLive?: boolean;
};

type PlayerFeedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlayerFeed'>;

// Mock data
const topLeagues: League[] = [
  { id: '1', name: 'All', icon: 'soccer' },
  { id: '2', name: 'Premier League', icon: 'trophy-outline' },
  { id: '3', name: 'La Liga', icon: 'trophy-outline' },
  { id: '4', name: 'Serie A', icon: 'trophy-outline' },
  { id: '5', name: 'Bundesliga', icon: 'trophy-outline' },
];

const liveMatch = {
  id: 'live-1',
  league: 'Premier League',
  gameWeek: 'Game Week 3',
  team1: { name: 'Man Utd', logo: 'https://via.placeholder.com/60' },
  team2: { name: 'Forest', logo: 'https://via.placeholder.com/60' },
  score: '3:2',
  time: '90+5',
  isLive: true
};

const upcomingMatches: Match[] = [
  {
    id: '1',
    team1: { name: 'Barcelona', logo: 'https://via.placeholder.com/50' },
    team2: { name: 'Real Madrid', logo: 'https://via.placeholder.com/50' },
    time: 'Today 08:00 PM',
    league: 'La Liga'
  },
  {
    id: '2',
    team1: { name: 'Liverpool', logo: 'https://via.placeholder.com/50' },
    team2: { name: 'Man City', logo: 'https://via.placeholder.com/50' },
    time: 'Saturday 09:00 PM',
    league: 'Premier League'
  }
];

export function PlayerFeedScreen() {
  const navigation = useNavigation<PlayerFeedScreenNavigationProp>();
  const [activeLeague, setActiveLeague] = useState('1');

  const renderTopLeagues = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top League</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.leaguesContainer}
      >
        {topLeagues.map((league) => (
          <TouchableOpacity 
            key={league.id}
            style={[
              styles.leagueItem, 
              activeLeague === league.id && styles.activeLeagueItem
            ]}
            onPress={() => setActiveLeague(league.id)}
          >
            {league.icon === 'soccer' ? (
              <FontAwesome5 name="futbol" size={20} color="#E60000" />
            ) : (
              <Ionicons 
                name={league.icon} 
                size={20} 
                color={activeLeague === league.id ? '#E60000' : '#666'} 
              />
            )}
            <Text style={[
              styles.leagueName,
              activeLeague === league.id && styles.activeLeagueName
            ]}>
              {league.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderLiveMatch = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Live Match</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.liveMatchCard}>
        <View style={styles.liveMatchHeader}>
          <Text style={styles.liveMatchLeague}>{liveMatch.league}</Text>
          <View style={styles.liveMatchGameWeek}>
            <View style={styles.liveIndicator} />
            <Text style={styles.liveMatchGameWeekText}>{liveMatch.gameWeek}</Text>
          </View>
        </View>
        
        <View style={styles.matchTeams}>
          <View style={styles.teamContainer}>
            <Image 
              source={{ uri: liveMatch.team1.logo }} 
              style={styles.teamLogo} 
              resizeMode="contain"
            />
            <Text style={styles.teamName}>{liveMatch.team1.name}</Text>
          </View>
          
          <View style={styles.matchScoreContainer}>
            <Text style={styles.matchScore}>{liveMatch.score}</Text>
            <View style={styles.matchTimeBadge}>
              <Text style={styles.matchTimeText}>{liveMatch.time}</Text>
            </View>
          </View>
          
          <View style={styles.teamContainer}>
            <Image 
              source={{ uri: liveMatch.team2.logo }} 
              style={styles.teamLogo} 
              resizeMode="contain"
            />
            <Text style={styles.teamName}>{liveMatch.team2.name}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderUpcomingMatches = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Matches</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      {upcomingMatches.map((match) => (
        <View key={match.id} style={styles.upcomingMatchCard}>
          <View style={styles.upcomingMatchTeams}>
            <View style={styles.teamContainer}>
              <Image 
                source={{ uri: match.team1.logo }} 
                style={styles.upcomingTeamLogo} 
                resizeMode="contain"
              />
              <Text style={styles.upcomingTeamName}>{match.team1.name}</Text>
            </View>
            
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
              <Text style={styles.matchTime}>{match.time}</Text>
            </View>
            
            <View style={styles.teamContainer}>
              <Image 
                source={{ uri: match.team2.logo }} 
                style={styles.upcomingTeamLogo} 
                resizeMode="contain"
              />
              <Text style={styles.upcomingTeamName}>{match.team2.name}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Balbalan</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderTopLeagues()}
        {renderLiveMatch()}
        {renderUpcomingMatches()}
      </ScrollView>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Header styles
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Content styles
  content: {
    flex: 1,
    padding: 16,
  },
  
  // Section styles
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  seeAllText: {
    color: '#E60000',
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Leagues section
  leaguesContainer: {
    paddingVertical: 8,
  },
  leagueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    marginRight: 12,
  },
  activeLeagueItem: {
    backgroundColor: '#F0E9FF',
    borderWidth: 1,
    borderColor: '#E60000',
  },
  leagueName: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  activeLeagueName: {
    color: '#E60000',
  },
  
  // Live match card
  liveMatchCard: {
    backgroundColor: '#E60000',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#E60000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  liveMatchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  liveMatchLeague: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  liveMatchGameWeek: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E60000',
    marginRight: 6,
  },
  liveMatchGameWeekText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '500',
  },
  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  teamName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  matchScoreContainer: {
    alignItems: 'center',
  },
  matchScore: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  matchTimeBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchTimeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Upcoming matches
  upcomingMatchCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  upcomingMatchTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcomingTeamLogo: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  upcomingTeamName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  vsContainer: {
    alignItems: 'center',
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  matchTime: {
    fontSize: 12,
    color: '#64748B',
  },
  
});

export default PlayerFeedScreen;