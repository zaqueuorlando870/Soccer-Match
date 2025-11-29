import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PlayerScreen as PlayerMatchesScreen } from './src/screens/PlayerScreen';
import { PlayerFeedScreen } from './src/screens/PlayerFeedScreen';
import { PlayerProfileScreen } from './src/screens/PlayerProfileScreen';
import { PlayerNotificationsScreen } from './src/screens/PlayerNotificationsScreen';
import { OrganizerScreen } from './src/screens/OrganizerScreen';
import { FieldManagerScreen } from './src/screens/FieldManagerScreen';
import { AdminScreen } from './src/screens/AdminScreen';
import { MatchDetailScreen } from './src/screens/MatchDetailScreen';
import { FieldDetailScreen } from './src/screens/FieldDetailScreen';
import { ThemeContext, useAppTheme, darkTheme } from './src/theme/AppTheme';

export type RootTabParamList = {
  Feed: undefined;
  Matches: undefined;
  Profile: undefined;
  Organizer: undefined;
  FieldManager: undefined;
  Admin: undefined;
};

type RoleKey = 'Player' | 'Organizer' | 'FieldManager' | 'Admin';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: { role: RoleKey };
  PlayerNotifications: undefined;
  MatchDetail: { matchId: string };
  FieldDetail: { fieldId: string };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

import { Animated } from 'react-native';

type TabIconProps = {
  focused: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  activeColor: string; // background color when active (red)
  inactiveColor: string; // icon color when inactive (gray)
};

function TabIcon({ focused, iconName, activeColor, inactiveColor }: TabIconProps) {
  const scale = React.useRef(new Animated.Value(focused ? 1 : 0.9)).current;
  const opacity = React.useRef(new Animated.Value(focused ? 1 : 0.7)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: focused ? 1 : 0.9,
        useNativeDriver: true,
        friction: 6,
        tension: 80,
      }),
      Animated.timing(opacity, {
        toValue: focused ? 1 : 0.7,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused, opacity, scale]);

  const iconColor = focused ? '#ffffff' : inactiveColor;
  const size = focused ? 52 : 30;

  return (
    <Animated.View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: [{ scale }],
        marginTop: focused ? -18 : 0,
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: focused ? activeColor : 'transparent',
          borderWidth: focused ? 0 : 0,
          borderColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name={iconName} size={focused ? 30 : 30} color={iconColor} />
      </View>
    </Animated.View>
  );
}

function OnboardingScreen({ navigation }: { navigation: any }) {
  const {
    theme: { colors },
  } = useAppTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={['top', 'left', 'right']}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingBottom: 32,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 24,
            flex: 1,
          }}
        >
          <View style={{ flex: 1.4 }}>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 14,
                fontWeight: '600',
                marginBottom: 8,
              }}
            >
              Play better, every week
            </Text>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 34,
                lineHeight: 40,
                fontWeight: '800',
                marginBottom: 12,
              }}
            >
              Stronger
              {"\n"}
              Every Match
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 14,
                lineHeight: 20,
                maxWidth: 260,
              }}
            >
              Discover nearby games, confirm your spot, and keep track of every match you play.
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 16,
            }}
          >
            <View
              style={{
                width: '100%',
                aspectRatio: 3 / 5,
                borderRadius: 32,
                overflow: 'hidden',
                backgroundColor: colors.card,
                shadowColor: '#000',
                shadowOpacity: 0.12,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 8 },
                elevation: 4,
              }}
            >
              <Image
                source={require('./assets/messi-bg.jpg')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            backgroundColor: colors.accent,
            borderRadius: 999,
            paddingVertical: 16,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 4,
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            Get started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function RegisterScreen({ navigation }: { navigation: any }) {
  const {
    theme: { colors },
  } = useAppTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 }}
      edges={['top', 'left', 'right']}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{ fontSize: 24, fontWeight: '700', marginBottom: 12, color: colors.accent }}
        >
          Create account
        </Text>
        <Text style={{ color: colors.textSecondary, marginBottom: 24 }}>
          Register to track your matches and manage your profile.
        </Text>

        <View style={{ width: '100%', maxWidth: 380 }}>
          <View style={{ marginBottom: 14 }}>
            <Text
              style={{
                color: colors.textSecondary,
                marginBottom: 6,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              Name
            </Text>
            <TextInput
              placeholder="Your name"
              placeholderTextColor={colors.textSecondary}
              style={{
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 16,
                paddingVertical: 10,
                color: colors.textPrimary,
                backgroundColor: colors.card,
              }}
            />
          </View>

          <View style={{ marginBottom: 14 }}>
            <Text
              style={{
                color: colors.textSecondary,
                marginBottom: 6,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              Email
            </Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 16,
                paddingVertical: 10,
                color: colors.textPrimary,
                backgroundColor: colors.card,
              }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                color: colors.textSecondary,
                marginBottom: 6,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              Password
            </Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              style={{
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 16,
                paddingVertical: 10,
                color: colors.textPrimary,
                backgroundColor: colors.card,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.replace('MainTabs', { role: 'Player' })}
            style={{
              backgroundColor: colors.accent,
              borderRadius: 999,
              paddingVertical: 12,
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: '600', color: '#ffffff', fontSize: 16 }}>Register</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 4,
            }}
          >
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 4 }}
            >
              <Text style={{ color: colors.accent, fontSize: 13, fontWeight: '600' }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
function LoginScreen({ navigation }: { navigation: any }) {
  const {
    theme: { colors },
  } = useAppTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 }}
      edges={['top', 'left', 'right']}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{ fontSize: 24, fontWeight: '700', marginBottom: 12, color: colors.accent }}
        >
          Login
        </Text>
        <View style={{ width: '100%', maxWidth: 380 }}>
          <View style={{ marginBottom: 14 }}>
            <Text
              style={{
                color: colors.textSecondary,
                marginBottom: 6,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              Email
            </Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 16,
                paddingVertical: 10,
                color: colors.textPrimary,
                backgroundColor: colors.card,
              }}
            />
          </View>

          <View style={{ marginBottom: 8 }}>
            <Text
              style={{
                color: colors.textSecondary,
                marginBottom: 6,
                fontSize: 13,
                fontWeight: '500',
              }}
            >
              Password
            </Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              style={{
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 16,
                paddingVertical: 10,
                color: colors.textPrimary,
                backgroundColor: colors.card,
              }}
            />
          </View>

          <View
            style={{
              alignItems: 'flex-end',
              marginBottom: 20,
            }}
          >
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Forgot password?</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.replace('MainTabs', { role: 'Player' })}
            style={{
              backgroundColor: colors.accent,
              borderRadius: 999,
              paddingVertical: 12,
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: '600', color: '#ffffff', fontSize: 16 }}>Login</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 4,
            }}
          >
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
              Dont have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={{ marginLeft: 4 }}
            >
              <Text style={{ color: colors.accent, fontSize: 13, fontWeight: '600' }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 24,
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            Sign in to continue. You can always update your profile and roles later inside the app.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function MainTabs({ route }: { route: any }) {
  const role: RoleKey = route?.params?.role ?? 'Player';
  const {
    theme: { colors },
  } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          position: 'absolute',
          marginLeft: 40,
          marginRight: 40,
          bottom: 26,
          backgroundColor: colors.card,
          borderTopWidth: 0,
          height: 74,
          paddingBottom: 14,
          paddingTop: 10,
          borderRadius: 32,
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 6 },
          elevation: 10,
        },
        tabBarItemStyle: {
          borderRadius: 999,
          marginHorizontal: 6,
        },
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';

          if (route.name === 'Feed') iconName = 'home-outline';
          else if (route.name === 'Matches') iconName = 'football-outline';
          else if (route.name === 'Profile') iconName = 'person-circle-outline';
          else if (route.name === 'Organizer') iconName = 'clipboard-outline';
          else if (route.name === 'FieldManager') iconName = 'business-outline';
          else if (route.name === 'Admin') iconName = 'settings-outline';

          // activeColor: red circle behind icon when focused
          // inactiveColor: gray icon when not focused
          return (
            <TabIcon
              focused={focused}
              iconName={iconName}
              activeColor={colors.accent}
              inactiveColor={colors.textSecondary}
            />
          );
        },
      })}
    >
      {role === 'Player' && (
        <>
          <Tab.Screen
            name="Feed"
            component={PlayerFeedScreen}
            options={{ title: 'Feed' }}
          />
          <Tab.Screen
            name="Matches"
            component={PlayerMatchesScreen}
            options={{ title: 'Matches' }}
          />
          <Tab.Screen
            name="Profile"
            component={PlayerProfileScreen}
            options={{ title: 'Profile' }}
          />
        </>
      )}
      {role === 'Organizer' && (
        <Tab.Screen
          name="Organizer"
          component={OrganizerScreen}
          options={{ title: 'Organizer' }}
        />
      )}
      {role === 'FieldManager' && (
        <Tab.Screen
          name="FieldManager"
          component={FieldManagerScreen}
          options={{ title: 'Field manager' }}
        />
      )}
      {role === 'Admin' && (
        <Tab.Screen name="Admin" component={AdminScreen} options={{ title: 'Admin' }} />
      )}
    </Tab.Navigator>
  );
}

export default function App() {
  const theme = darkTheme;

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
    },
  };

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme: () => {} }}>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="dark" />
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="PlayerNotifications"
              component={PlayerNotificationsScreen}
              options={{ headerShown: true, title: 'Notifications' }}
            />
            <Stack.Screen
              name="MatchDetail"
              component={MatchDetailScreen}
              options={{ headerShown: true, title: 'Match Details' }}
            />
            <Stack.Screen
              name="FieldDetail"
              component={FieldDetailScreen}
              options={{ headerShown: true, title: 'Field Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
}
