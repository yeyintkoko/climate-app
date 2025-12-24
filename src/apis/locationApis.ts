import { GEO_LOCATION_URL } from '../config';
import { LocationInfo } from '../types/locationDataTypes';

export const fetchLocationByCoordinates = async (
  latitude: number,
  longitude: number,
): Promise<LocationInfo> => {
  const queryParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    localityLanguage: 'en',
  });

  const response = await fetch(`${GEO_LOCATION_URL}?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch location data.');
  }

  const data: LocationInfo = await response.json();
  return data;
};
