import { FeedItem } from '@/types';

export const mockFeedItems: FeedItem[] = [
  {
    id: '1',
    title: 'Front door unlocked',
    description: 'The front door was unlocked remotely',
    timestamp: '10:32 AM',
    type: 'activity',
    deviceId: '3',
    read: false
  },
  {
    id: '2',
    title: 'Motion detected',
    description: 'Backyard camera detected motion',
    timestamp: '9:45 AM',
    type: 'alert',
    deviceId: '4',
    read: false
  },
  {
    id: '3',
    title: 'Thermostat updated',
    description: 'Kitchen thermostat set to 72°F',
    timestamp: '8:20 AM',
    type: 'update',
    deviceId: '2',
    read: true
  },
  {
    id: '4',
    title: 'Low battery',
    description: 'Robot vacuum battery below 20%',
    timestamp: 'Yesterday',
    type: 'notification',
    deviceId: '6',
    read: true
  },
  {
    id: '5',
    title: 'System update available',
    description: 'New firmware available for 3 devices',
    timestamp: 'Yesterday',
    type: 'update',
    read: true
  },
  {
    id: '6',
    title: 'Speaker disconnected',
    description: 'Bedroom speaker went offline',
    timestamp: '2 days ago',
    type: 'alert',
    deviceId: '5',
    read: true
  },
  {
    id: '7',
    title: 'Schedule created',
    description: 'Living room lights will turn on at sunset',
    timestamp: '3 days ago',
    type: 'notification',
    deviceId: '1',
    read: true
  }
];