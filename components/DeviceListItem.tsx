import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { SmartDevice } from '@/types';
import Colors from '@/constants/Colors';
import { BlurView } from 'expo-blur';
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
  ChevronRight
} from 'lucide-react-native';

interface DeviceListItemProps {
  device: SmartDevice;
}

export default function DeviceListItem({ device }: DeviceListItemProps) {
  const [isEnabled, setIsEnabled] = useState(device.status === 'on');
  
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };
  
  const getDeviceIcon = () => {
    const iconColor = isEnabled ? Colors.primary[500] : Colors.gray[400];
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
  
  const getBatteryStatusColor = () => {
    if (!device.batteryLevel) return Colors.gray[400];
    
    if (device.batteryLevel > 50) return Colors.success[500];
    if (device.batteryLevel > 20) return Colors.warning[500];
    return Colors.error[500];
  };
  
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.container}>
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
        
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            {getDeviceIcon()}
          </View>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.deviceName}>{device.name}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.roomName}>
                {device.location?.room}
              </Text>
              
              {device.batteryLevel !== undefined && (
                <View style={styles.batteryContainer}>
                  <View 
                    style={[
                      styles.batteryLevel, 
                      { 
                        width: `${device.batteryLevel}%`,
                        backgroundColor: getBatteryStatusColor()
                      }
                    ]} 
                  />
                  <Text style={styles.batteryText}>{device.batteryLevel}%</Text>
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.controlsContainer}>
            <Switch
              trackColor={{ false: Colors.gray[300], true: Colors.primary[300] }}
              thumbColor={isEnabled ? Colors.primary[500] : Colors.gray[100]}
              ios_backgroundColor={Colors.gray[300]}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <ChevronRight size={20} color={Colors.gray[400]} style={styles.chevron} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  detailsContainer: {
    flex: 1,
  },
  deviceName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    marginRight: 8,
  },
  batteryContainer: {
    height: 6,
    width: 40,
    backgroundColor: Colors.gray[200],
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 4,
  },
  batteryLevel: {
    height: '100%',
    borderRadius: 3,
  },
  batteryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[600],
    position: 'absolute',
    right: -24,
    top: -4,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    marginLeft: 8,
  },
});