import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Mic } from 'lucide-react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

export function VoiceButton() {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const handlePress = () => {
    // Animation when pressed
    scale.value = withTiming(0.9, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });
    
    // Revert animation
    setTimeout(() => {
      scale.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      
      // Navigate to voice screen
      router.push('/voice');
    }, 100);
  };
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.buttonContainer, animatedStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[Colors.primary[400], Colors.primary[600]]}
            style={styles.gradient}
          >
            <Mic size={28} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    top: -14,
  },
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  button: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});