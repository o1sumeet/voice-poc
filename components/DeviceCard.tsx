import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import {
  Lightbulb,
  Thermometer,
  Lock,
  Video,
  Speaker,
  Power,
  Tv,
  Wifi,
  Activity,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { SmartDevice } from '@/types';

interface DeviceCardProps {
  device: SmartDevice;
}

export default function DeviceCard({ device }: DeviceCardProps) {
  const [isOn, setIsOn] = useState(device.status === 'on');

  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const toggleDevice = () => {
    // Haptic feedback when pressed (only on native)
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Animation when pressed
    scale.value = withTiming(0.95, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });

    opacity.value = withTiming(0.7, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });

    // Revert animation
    setTimeout(() => {
      scale.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });

      opacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });

      setIsOn(!isOn);
    }, 100);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const getDeviceIcon = () => {
    const iconColor = isOn ? Colors.primary[500] : Colors.gray[400];
    const iconSize = 24;

    switch (device.type) {
      case 'light':
        return <Lightbulb size={iconSize} color={iconColor} />;
      case 'thermostat':
        return <Thermometer size={iconSize} color={iconColor} />;
      case 'lock':
        return <Lock size={iconSize} color={iconColor} />;
      case 'camera':
        return <Video size={iconSize} color={iconColor} />;
      case 'speaker':
        return <Speaker size={iconSize} color={iconColor} />;
      case 'vacuum':
        return <Power size={iconSize} color={iconColor} />;
      case 'tv':
        return <Tv size={iconSize} color={iconColor} />;
      case 'plug':
        return <Power size={iconSize} color={iconColor} />;
      case 'sensor':
        return <Activity size={iconSize} color={iconColor} />;
      default:
        return <Wifi size={iconSize} color={iconColor} />;
    }
  };

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      <TouchableOpacity
        style={[styles.card, isOn && styles.cardActive]}
        activeOpacity={0.9}
        onPress={toggleDevice}
      >
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>{getDeviceIcon()}</View>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text
            style={[
              styles.deviceStatus,
              isOn ? styles.deviceStatusOn : styles.deviceStatusOff,
            ]}
          >
            {isOn ? 'ON' : 'OFF'}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '50%',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.84,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    shadowColor: '#000', // Black shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    }, // Offset from the top left corner
    shadowOpacity: 0.25, // Opacity (0 to 1)
    shadowRadius: 3.84, // Radius of the blur
    backgroundColor: '#fff', // Optional background color
    borderRadius: 10, // Optional rounded corners
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  deviceName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: Colors.gray[800],
    marginTop: 12,
  },
  deviceStatus: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
  },
  deviceStatusOn: {
    color: Colors.primary[500],
  },
  deviceStatusOff: {
    color: Colors.gray[400],
  },
});
