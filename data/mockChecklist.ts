import { ChecklistItem } from '@/types';

export const mockChecklist: ChecklistItem[] = [
  {
    id: '1',
    title: 'Turn off all lights',
    description: 'When leaving for work',
    completed: true,
    time: '8:00 AM',
    deviceIds: ['1']
  },
  {
    id: '2',
    title: 'Lock all doors',
    description: 'Security check before bed',
    completed: false,
    time: '10:00 PM',
    deviceIds: ['3']
  },
  {
    id: '3',
    title: 'Start robot vacuum',
    description: 'Clean living room and kitchen',
    completed: false,
    time: '2:00 PM',
    deviceIds: ['6']
  },
  {
    id: '4',
    title: 'Check security cameras',
    description: 'Review footage from last night',
    completed: false,
    deviceIds: ['4']
  }
];