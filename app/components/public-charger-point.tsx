import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { PointOfInterestItem } from '../models/point-of-interest-item';
import { BatteryCharging, Unplug } from 'lucide-react-native';
import React, { useMemo } from 'react';

interface PublicChargingPointProps {
  item: PointOfInterestItem;
  isCharging: boolean;
  onPress: () => void;
}

export const PublicChargerPoint = ({
  item,
  isCharging,
  onPress,
}: PublicChargingPointProps) => {
  const statusColor = item.StatusType?.IsOperational ? 'green' : 'red';
  const statusText = item.StatusType?.IsOperational ? 'Online' : 'Offline';
  const powerText = useMemo(() => {
    if (item.Connections[0]?.PowerKW) {
      return `${item.Connections[0]?.PowerKW} kW`;
    }

    return '';
  }, [item.Connections]);

  const distanceText = useMemo(() => {
    if (item.AddressInfo?.Distance) {
      const metric = item.AddressInfo?.Distance === 1 ? 'm' : 'km';
      return `${item.AddressInfo?.Distance.toFixed(1)} ${metric}`;
    }

    return '';
  }, [item.AddressInfo?.Distance]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.AddressInfo?.Title || 'Unknown'}</Text>
        <Text style={styles.subtitle}>
          <Text style={{ color: statusColor }}>{statusText}</Text> • {powerText} •{' '}
          {distanceText}
        </Text>
      </View>
      <View style={styles.statusContainer}>
        {isCharging ? (
          <>
            <BatteryCharging color="green" size={24} strokeWidth={2} />
            <Text
              style={[
                styles.statusText,
                {
                  color: statusColor,
                },
              ]}
            >
              Charging
            </Text>
          </>
        ) : (
          <Unplug color="#666" size={22} strokeWidth={1.8} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 18,
    borderCurve: 'continuous',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 12.5,
    fontWeight: '400',
    color: '#666',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    borderRadius: 10,
  },
});
