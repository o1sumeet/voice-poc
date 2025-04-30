import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import { mockUserProfile } from '@/data/mockUserProfile';
import {
  Settings,
  Bell,
  Moon,
  Mic,
  ChevronRight,
  LogOut,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState(mockUserProfile);

  const toggleSetting = (setting: keyof typeof userProfile.preferences) => {
    setUserProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [setting]: !prev.preferences[setting],
      },
    }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={['rgba(244, 247, 254, 1)', 'rgba(255, 255, 255, 0.9)']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={Colors.gray[700]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: userProfile.avatar }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingIconContainer}>
                <Bell size={20} color={Colors.gray[600]} />
              </View>
              <Text style={styles.settingText}>Notifications</Text>
              <Switch
                value={userProfile.preferences.notifications}
                onValueChange={() => toggleSetting('notifications')}
                trackColor={{
                  false: Colors.gray[300],
                  true: Colors.primary[300],
                }}
                thumbColor={
                  userProfile.preferences.notifications
                    ? Colors.primary[500]
                    : Colors.gray[100]
                }
                ios_backgroundColor={Colors.gray[300]}
              />
            </View>

            <View style={styles.separator} />

            <View style={styles.settingRow}>
              <View style={styles.settingIconContainer}>
                <Moon size={20} color={Colors.gray[600]} />
              </View>
              <Text style={styles.settingText}>Dark Mode</Text>
              <Switch
                value={userProfile.preferences.darkMode}
                onValueChange={() => toggleSetting('darkMode')}
                trackColor={{
                  false: Colors.gray[300],
                  true: Colors.primary[300],
                }}
                thumbColor={
                  userProfile.preferences.darkMode
                    ? Colors.primary[500]
                    : Colors.gray[100]
                }
                ios_backgroundColor={Colors.gray[300]}
              />
            </View>

            <View style={styles.separator} />

            <View style={styles.settingRow}>
              <View style={styles.settingIconContainer}>
                <Mic size={20} color={Colors.gray[600]} />
              </View>
              <Text style={styles.settingText}>Voice Control</Text>
              <Switch
                value={userProfile.preferences.voiceControl}
                onValueChange={() => toggleSetting('voiceControl')}
                trackColor={{
                  false: Colors.gray[300],
                  true: Colors.primary[300],
                }}
                thumbColor={
                  userProfile.preferences.voiceControl
                    ? Colors.primary[500]
                    : Colors.gray[100]
                }
                ios_backgroundColor={Colors.gray[300]}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <View style={styles.settingCard}>
            <TouchableOpacity style={styles.linkRow}>
              <View style={styles.settingIconContainer}>
                <HelpCircle size={20} color={Colors.gray[600]} />
              </View>
              <Text style={styles.settingText}>Help & Support</Text>
              <ChevronRight size={20} color={Colors.gray[400]} />
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.linkRow}>
              <View style={styles.settingIconContainer}>
                <ShieldCheck size={20} color={Colors.gray[600]} />
              </View>
              <Text style={styles.settingText}>Privacy & Security</Text>
              <ChevronRight size={20} color={Colors.gray[400]} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color={Colors.error[500]} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
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
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.gray[900],
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
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
  profileCard: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.gray[900],
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.gray[600],
    marginBottom: 16,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.primary[500],
    borderRadius: 8,
  },
  editProfileText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'white',
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
  settingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(229, 231, 235, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.gray[800],
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray[200],
    marginLeft: 68,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(254, 226, 226, 0.5)',
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.error[600],
    marginLeft: 8,
  },
});
