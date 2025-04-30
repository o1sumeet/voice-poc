export interface SmartDevice {
  id: string;
  name: string;
  type: DeviceType;
  status: 'on' | 'off' | 'offline';
  batteryLevel?: number;
  location?: {
    room: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  lastActivity?: string;
  icon: string;
}

export type DeviceType = 
  | 'light'
  | 'thermostat'
  | 'lock'
  | 'camera'
  | 'speaker'
  | 'vacuum'
  | 'tv'
  | 'plug'
  | 'sensor';

export interface FeedItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'alert' | 'notification' | 'update' | 'activity';
  deviceId?: string;
  read: boolean;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  time?: string;
  deviceIds?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    voiceControl: boolean;
  };
  favorites: string[]; // Array of device IDs
}