import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Bell, Search } from 'lucide-react-native';
import GreetingHeader from '@/components/GreetingHeader';
import DeviceCard from '@/components/DeviceCard';
import FeedList from '@/components/FeedList';
import ChecklistSection from '@/components/ChecklistSection';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { mockDevices } from '@/data/mockDevices';
import { mockFeedItems } from '@/data/mockFeedItems';
import { mockChecklist } from '@/data/mockChecklist';

export default function HomeScreen() {
  const [favoriteDevices, setFavoriteDevices] = useState(
    mockDevices.filter((_, index) => index < 4)
  );

  const [todaysFeed, setTodaysFeed] = useState(
    mockFeedItems.filter((_, index) => index < 5)
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(244, 247, 254, 1)', 'rgba(255, 255, 255, 0.8)']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <GreetingHeader />
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color={Colors.gray[700]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color={Colors.gray[700]} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorites</Text>
          <View style={styles.devicesGrid}>
            {favoriteDevices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </View>
        </View>

        <ChecklistSection checklist={mockChecklist} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Feed</Text>
          <FeedList feed={todaysFeed} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 16,
    color: Colors.gray[800],
  },
  devicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
});
