import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Speech from 'expo-speech';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withRepeat,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { Mic, MicOff, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

const COMMANDS = [
  { command: "Show me the dashboard", description: "Navigate to device dashboard" },
  { command: "Show me the map", description: "Navigate to map view" },
  { command: "Turn on living room lights", description: "Control living room lights" },
  { command: "Set thermostat to 72 degrees", description: "Adjust thermostat" },
  { command: "Lock all doors", description: "Secure all smart locks" },
  { command: "Show me my profile", description: "Navigate to profile page" },
  { command: "What's on my checklist today?", description: "View today's checklist" },
  { command: "Show me today's feed", description: "View today's activity feed" }
];

export default function VoiceScreen() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [processing, setProcessing] = useState(false);
  
  const pulseAnimation = useSharedValue(1);
  
  useEffect(() => {
    if (listening) {
      pulseAnimation.value = withRepeat(
        withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
      
      // Simulate listening - in a real app, you'd use a proper voice recognition API
      const timer = setTimeout(() => {
        setTranscript("Show me the dashboard");
        setListening(false);
        setProcessing(true);
        
        // Simulate processing
        setTimeout(() => {
          setProcessing(false);
          // Simulate response
          speakResponse("Opening the dashboard");
          
          // Navigate to dashboard
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }, 1500);
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      pulseAnimation.value = withSpring(1);
    }
  }, [listening]);
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseAnimation.value }],
    };
  });
  
  const speakResponse = (text: string) => {
    Speech.speak(text, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
    });
  };
  
  const toggleListening = () => {
    if (listening) {
      setListening(false);
      setTranscript("");
    } else {
      setListening(true);
      setTranscript("");
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={['rgba(244, 247, 254, 1)', 'rgba(255, 255, 255, 0.9)']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Voice Assistant</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X size={24} color={Colors.gray[700]} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.micContainer}>
        <Animated.View style={[styles.pulseCircle, animatedStyles]}>
          <TouchableOpacity
            style={[
              styles.micButton,
              listening && styles.micButtonActive
            ]}
            onPress={toggleListening}
          >
            {listening ? (
              <Mic size={32} color="white" />
            ) : (
              <MicOff size={32} color="white" />
            )}
          </TouchableOpacity>
        </Animated.View>
        
        <Text style={styles.statusText}>
          {listening ? "Listening..." : processing ? "Processing..." : "Tap to speak"}
        </Text>
        
        {transcript !== "" && (
          <View style={styles.transcriptContainer}>
            <Text style={styles.transcriptText}>"{transcript}"</Text>
          </View>
        )}
      </View>
      
      <View style={styles.commandsSection}>
        <Text style={styles.commandsTitle}>Available Voice Commands</Text>
        <ScrollView style={styles.commandsList}>
          {COMMANDS.map((item, index) => (
            <View key={index} style={styles.commandItem}>
              <Text style={styles.commandText}>"{item.command}"</Text>
              <Text style={styles.commandDescription}>{item.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
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
  closeButton: {
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
  micContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  pulseCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(129, 140, 248, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.gray[600],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  micButtonActive: {
    backgroundColor: Colors.primary[600],
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: Colors.gray[800],
    marginBottom: 16,
  },
  transcriptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transcriptText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.gray[800],
    textAlign: 'center',
  },
  commandsSection: {
    flex: 1,
    marginHorizontal: 20,
  },
  commandsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.gray[800],
    marginBottom: 16,
  },
  commandsList: {
    flex: 1,
  },
  commandItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  commandText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: Colors.gray[800],
    marginBottom: 4,
  },
  commandDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
  },
});