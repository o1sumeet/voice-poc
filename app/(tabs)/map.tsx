import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import * as Location from 'expo-location';
import Colors from '@/constants/Colors';
import { mockDevices } from '@/data/mockDevices';
import { Layers, Navigation, ZoomIn, ZoomOut } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  
  // Filter devices with location coordinates
  const devicesWithLocation = mockDevices.filter(
    device => device.location?.coordinates
  );

  // For web, we'll use a placeholder until we implement a web-compatible map solution
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="dark" />
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Device Locations</Text>
          <Text style={styles.headerSubtitle}>Map view is not available on web</Text>
        </View>
        
        <View style={styles.deviceList}>
          {devicesWithLocation.map((device) => (
            <TouchableOpacity 
              key={device.id} 
              style={styles.deviceItem}
              onPress={() => setSelectedDevice(device.id)}
            >
              <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
              <View style={styles.deviceContent}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Text style={styles.deviceLocation}>
                  Location: {device.location?.room}
                </Text>
                <Text style={styles.coordinates}>
                  {device.location?.coordinates?.latitude.toFixed(4)}, {' '}
                  {device.location?.coordinates?.longitude.toFixed(4)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  // Import MapView only for native platforms
  const MapView = require('react-native-maps').default;
  const { Marker } = require('react-native-maps');
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={INITIAL_REGION}
          region={
            location
              ? {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : INITIAL_REGION
          }
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
              pinColor={Colors.secondary[500]}
            />
          )}
          
          {devicesWithLocation.map((device) => (
            <Marker
              key={device.id}
              coordinate={{
                latitude: device.location?.coordinates?.latitude || 0,
                longitude: device.location?.coordinates?.longitude || 0,
              }}
              title={device.name}
              description={`${device.type} - ${device.status}`}
              pinColor={device.status === 'on' ? Colors.primary[500] : Colors.gray[400]}
              onPress={() => setSelectedDevice(device.id)}
            />
          ))}
        </MapView>
        
        {errorMsg && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        )}
        
        <View style={styles.mapControlsContainer}>
          <TouchableOpacity style={styles.mapControlButton}>
            <ZoomIn size={24} color={Colors.gray[700]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlButton}>
            <ZoomOut size={24} color={Colors.gray[700]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlButton}>
            <Navigation size={24} color={Colors.gray[700]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlButton}>
            <Layers size={24} color={Colors.gray[700]} />
          </TouchableOpacity>
        </View>
      </View>
      
      {selectedDevice && (
        <View style={styles.deviceInfoContainer}>
          <BlurView intensity={80} tint="light" style={styles.blurBackground}>
            <View style={styles.deviceInfo}>
              {devicesWithLocation.filter(d => d.id === selectedDevice).map(device => (
                <View key={device.id}>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  <Text style={styles.deviceDetails}>
                    {device.type.charAt(0).toUpperCase() + device.type.slice(1)} • {
                      device.status === 'on' ? 'Online' : 
                      device.status === 'off' ? 'Offline' : 'Disconnected'
                    }
                  </Text>
                  <Text style={styles.deviceLocation}>
                    Location: {device.location?.room}
                  </Text>
                  
                  <View style={styles.deviceActions}>
                    <TouchableOpacity 
                      style={[
                        styles.deviceActionButton,
                        { backgroundColor: device.status === 'on' ? Colors.primary[500] : Colors.gray[300] }
                      ]}
                    >
                      <Text style={styles.deviceActionText}>
                        {device.status === 'on' ? 'Turn Off' : 'Turn On'}
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.deviceActionButton, styles.deviceActionSecondary]}
                      onPress={() => setSelectedDevice(null)}
                    >
                      <Text style={styles.deviceActionTextSecondary}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </BlurView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.gray[900],
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.gray[600],
  },
  deviceList: {
    padding: 20,
  },
  deviceItem: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  deviceContent: {
    padding: 16,
  },
  coordinates: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[500],
    marginTop: 4,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width,
    height,
  },
  errorContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(254, 202, 202, 0.9)',
    padding: 16,
    borderRadius: 8,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.error[700],
    textAlign: 'center',
  },
  mapControlsContainer: {
    position: 'absolute',
    right: 16,
    top: 100,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapControlButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 231, 235, 0.5)',
  },
  deviceInfoContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  blurBackground: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  deviceInfo: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  deviceName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.gray[900],
    marginBottom: 4,
  },
  deviceDetails: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.gray[700],
    marginBottom: 8,
  },
  deviceLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 16,
  },
  deviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deviceActionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  deviceActionSecondary: {
    backgroundColor: 'rgba(229, 231, 235, 0.5)',
    marginRight: 0,
    marginLeft: 8,
  },
  deviceActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: 'white',
  },
  deviceActionTextSecondary: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: Colors.gray[700],
  },
});