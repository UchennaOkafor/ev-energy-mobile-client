import { FlatList, StyleProp, StyleSheet, ViewStyle, Text } from 'react-native';
import { PointOfInterestItem } from '../models/point-of-interest-item';
import { PublicChargerPoint } from './public-charger-point';
import { useCallback } from 'react';

interface PublicChargerPointListProps {
  items: PointOfInterestItem[];
  currentChargingPoint: PointOfInterestItem | null;
  onPress: (item: PointOfInterestItem) => void;
  style?: StyleProp<ViewStyle>;
}

export const PublicChargerPointList = ({
  items,
  currentChargingPoint,
  onPress,
  style,
}: PublicChargerPointListProps) => {
  const keyExtractor = useCallback(
    (item: PointOfInterestItem) => item.ID.toString(),
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: PointOfInterestItem }) => (
      <PublicChargerPoint
        item={item}
        isCharging={item.ID === currentChargingPoint?.ID}
        onPress={() => onPress(item)}
      />
    ),
    [currentChargingPoint, onPress]
  );

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={
        <Text style={styles.emptyText}>Sorry no charging points available</Text>
      }
      style={style}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});
