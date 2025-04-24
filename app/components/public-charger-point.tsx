import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { PointOfInterestItem } from '../models/point-of-interest-item';
import { toDistance } from '../utils/distance';
import { BatteryCharging, Unplug } from 'lucide-react-native';
import { useMemo } from 'react';

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
  const statusText = useMemo(() => {
    if (isCharging) return 'Charging';
    return item.StatusType?.IsOperational ? 'Online' : 'Offline';
  }, [isCharging, item.StatusType?.IsOperational]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.AddressInfo?.Title ?? 'Unknown'}</Text>
        <Text style={styles.subtitle}>
          {item.OperatorInfo?.Title ?? 'Unknown Operator'} •{' '}
          {item.Connections[0]?.PowerKW ?? ''} kW •{' '}
          {toDistance(item.AddressInfo?.Distance ?? 0)}
        </Text>
      </View>
      <View style={styles.statusContainer}>
        {isCharging ? (
          <BatteryCharging color="green" size={22} strokeWidth={2} />
        ) : (
          <Unplug color="gray" size={22} strokeWidth={1.8} />
        )}
        <Text
          style={[
            styles.statusText,
            {
              color: statusColor,
              borderColor: statusColor,
            },
          ]}
        >
          {statusText}
        </Text>
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
    gap: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '400',
    borderWidth: 0.2,
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
});
