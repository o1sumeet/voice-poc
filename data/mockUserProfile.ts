import { UserProfile } from '@/types';

export const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Jon Doe',
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS1bfx6JrzE33k9F_WeZ9c0znIlRKa9DeRD-oYkD2f2Xo21deXRALEZIUfYqqX5d7tIEE&usqp=CAU',
  email: 'jonDoe@example.com',
  preferences: {
    notifications: true,
    darkMode: false,
    voiceControl: true,
  },
  favorites: ['1', '2', '3', '4'],
};
