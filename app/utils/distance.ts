export const toDistance = (value: number) => {
  const distanceInMeters = value;

  return distanceInMeters < 1000
    ? `${Math.round(distanceInMeters)} m`
    : `${(distanceInMeters / 1000).toFixed(1)} km`;
};
