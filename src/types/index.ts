export type RootStackParamList = {
  PlayerFeed: undefined;
  PlayerNotifications: undefined;
  // Add other screen params as needed
};

export type Team = {
  name: string;
  logo: string;
};

export type Match = {
  id: string;
  team1: Team;
  team2: Team;
  time: string;
  league: string;
  score?: string;
  isLive?: boolean;
};

export type League = {
  id: string;
  name: string;
  icon: string;
};
