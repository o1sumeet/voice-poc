import { SmartDevice } from '@/types';

export const mockDevices: SmartDevice[] = [
  {
    id: '1',
    name: 'Living Room Lights',
    type: 'light',
    status: 'on',
    location: {
      room: 'Living Room',
      coordinates: {
        latitude: 37.7858,
        longitude: -122.4064
      }
    },
    lastActivity: '5 min ago',
    icon: 'lightbulb'
  },
  {
    id: '2',
    name: 'Kitchen Thermostat',
    type: 'thermostat',
    status: 'on',
    batteryLevel: 78,
    location: {
      room: 'Kitchen',
      coordinates: {
        latitude: 37.7868,
        longitude: -122.4074
      }
    },
    lastActivity: '10 min ago',
    icon: 'thermometer'
  },
  {
    id: '3',
    name: 'Front Door Lock',
    type: 'lock',
    status: 'on',
    batteryLevel: 45,
    location: {
      room: 'Entrance',
      coordinates: {
        latitude: 37.7848,
        longitude: -122.4054
      }
    },
    lastActivity: '2 hours ago',
    icon: 'lock'
  },
  {
    id: '4',
    name: 'Backyard Camera',
    type: 'camera',
    status: 'on',
    batteryLevel: 89,
    location: {
      room: 'Backyard',
      coordinates: {
        latitude: 37.7838,
        longitude: -122.4044
      }
    },
    lastActivity: '1 min ago',
    icon: 'video'
  },
  {
    id: '5',
    name: 'Bedroom Speaker',
    type: 'speaker',
    status: 'off',
    batteryLevel: 23,
    location: {
      room: 'Bedroom',
      coordinates: {
        latitude: 37.7828,
        longitude: -122.4034
      }
    },
    lastActivity: '12 hours ago',
    icon: 'speaker'
  },
  {
    id: '6',
    name: 'Robot Vacuum',
    type: 'vacuum',
    status: 'off',
    batteryLevel: 15,
    location: {
      room: 'Dining Room',
      coordinates: {
        latitude: 37.7818,
        longitude: -122.4024
      }
    },
    lastActivity: '2 days ago',
    icon: 'power'
  },
  {
    id: '7',
    name: 'Living Room TV',
    type: 'tv',
    status: 'off',
    location: {
      room: 'Living Room'
    },
    lastActivity: '1 day ago',
    icon: 'tv'
  },
  {
    id: '8',
    name: 'Office Smart Plug',
    type: 'plug',
    status: 'on',
    batteryLevel: 100,
    location: {
      room: 'Office'
    },
    lastActivity: '30 min ago',
    icon: 'power'
  },
  {
    id: '9',
    name: 'Bathroom Motion Sensor',
    type: 'sensor',
    status: 'on',
    batteryLevel: 67,
    location: {
      room: 'Bathroom'
    },
    lastActivity: '45 min ago',
    icon: 'activity'
  }
];