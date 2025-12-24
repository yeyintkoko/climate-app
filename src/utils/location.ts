import { LatLon } from '../types/weatherDataTypes';

export const getCurrentLocation = async (): Promise<LatLon> => {
  return new Promise((resolve, reject) => {
    resolve({ latitude: 16.7829197929382, longitude: 96.12767310893865 });

    // navigator.geolocation.getCurrentPosition(
    //   (position: { coords: { latitude: number; longitude: number } }) => {
    //     resolve({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     });
    //   },
    //   (error: unknown) => {
    //     reject(error);
    //   },
    //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    // );
  });
};
