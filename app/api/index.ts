import { PointOfInterestItem } from '../models/point-of-interest-item';

export const fetchChargingPointsByDistance = async (
  latitude: number,
  longitude: number
): Promise<PointOfInterestItem[]> => {
  const apiKey = process.env.EXPO_PUBLIC_OPEN_CHARGER_API_KEY;
  const url = `https://api.openchargemap.io/v3/poi?key=${apiKey}&latitude=${latitude}&longitude=${longitude}&distance=100`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const startChargingSession = async (
  chargingPointId: number
): Promise<boolean> => {
  const url = `https://example.ev.energy/chargingsession`;

  const body = {
    user: 1,
    car_id: 1,
    charger_id: chargingPointId,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    return true;
  }
};
