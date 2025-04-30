import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export default function GreetingHeader() {
  const [greeting, setGreeting] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    updateGreeting();

    // Update greeting every minute (for time changes)
    const intervalId = setInterval(updateGreeting, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const updateGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    let greetingText = '';
    let periodText = '';

    if (hour >= 5 && hour < 12) {
      greetingText = 'Good morning';
      periodText = 'morning';
    } else if (hour >= 12 && hour < 18) {
      greetingText = 'Good afternoon';
      periodText = 'afternoon';
    } else {
      greetingText = 'Good evening';
      periodText = 'evening';
    }

    setGreeting(greetingText);
    setTimeOfDay(periodText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{greeting}</Text>
      <Text style={styles.name}>Jon</Text>
      <Text style={styles.subtitle}>Welcome to your {timeOfDay} dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  greeting: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.gray[700],
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.gray[900],
    marginVertical: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
  },
});
