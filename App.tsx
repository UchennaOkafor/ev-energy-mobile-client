import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { PointOfInterestItem } from './app/models/point-of-interest-item';
import * as Location from 'expo-location';
import { PublicChargerPointList } from './app/components/public-charger-point-list';
import { fetchChargingPointsByDistance, startChargingSession } from './app/api';

export default function App() {
  const [chargingItems, setChargingItems] = useState<PointOfInterestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChargingPoint, setCurrentChargingPoint] =
    useState<PointOfInterestItem | null>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      // let enabled = await Location.hasServicesEnabledAsync();
      // console.log('Enabled', enabled);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(() => {
    const initialize = async () => {
      const location = await Location.getCurrentPositionAsync();
      console.log(location);

      const data = await fetchChargingPointsByDistance(
        location.coords.latitude,
        location.coords.longitude
      );
      setChargingItems(data);
      setIsLoading(false);
    };
    initialize();
  }, []);

  const onChargingPointPressed = useCallback(
    async (item: PointOfInterestItem) => {
      if (item.StatusType.IsOperational) {
        const result = await startChargingSession(item.ID);
        if (result) {
          setCurrentChargingPoint(item);
        } else {
          Alert.alert('Failed to start charging session');
        }
      } else {
        Alert.alert('Charger is not operational');
      }
    },
    [setCurrentChargingPoint]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>ev.energy - Nearby chargers</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Finding nearby chargers...</Text>
        </View>
      ) : (
        <PublicChargerPointList
          items={chargingItems}
          currentChargingPoint={currentChargingPoint}
          onPress={onChargingPointPressed}
          style={styles.chargerList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 14,
  },
  chargerList: {
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '300',
  },
});
