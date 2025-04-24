import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  Alert,
  Button,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { PointOfInterestItem } from './app/models/point-of-interest-item';
import * as Location from 'expo-location';
import { PublicChargerPointList } from './app/components/public-charger-point-list';
import { fetchChargingPointsByDistance, startChargingSession } from './app/api';
import { AppState } from './app/models/app-state';

export default function App() {
  const [chargingItems, setChargingItems] = useState<PointOfInterestItem[]>([]);
  const [currentChargingPoint, setCurrentChargingPoint] =
    useState<PointOfInterestItem | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.Loading);

  const appStatusMessage = useMemo(() => {
    switch (appState) {
      case AppState.Loading:
        return 'Finding nearby chargers...';
      case AppState.LocationPermissionDenied:
        return 'Permission to access location was denied';
      case AppState.Error:
        return 'Error';
      default:
        return null;
    }
  }, [appState]);

  useEffect(() => {
    const initialize = async () => {
      const location = await getCurrentLocation();
      if (!location) {
        setAppState(AppState.LocationPermissionDenied);
        return;
      }

      const data = await fetchChargingPointsByDistance(
        location.coords.latitude,
        location.coords.longitude
      );

      setChargingItems(data);
      setAppState(AppState.Ready);
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
        Alert.alert('Charger is offline');
      }
    },
    [setCurrentChargingPoint]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>ev.energy - Nearby chargers</Text>
      {appState !== AppState.Ready ? (
        <View style={styles.loadingContainer}>
          {appState === AppState.Loading && <ActivityIndicator />}
          {!!appState && (
            <Text style={styles.appStatusMessage}>{appStatusMessage}</Text>
          )}
          {appState === AppState.LocationPermissionDenied && (
            <Button
              title="Grant location permission"
              onPress={() => Linking.openSettings()}
            />
          )}
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

  async function getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    return await Location.getCurrentPositionAsync({});
  }
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
  appStatusMessage: {
    fontSize: 18,
    fontWeight: '300',
  },
});
