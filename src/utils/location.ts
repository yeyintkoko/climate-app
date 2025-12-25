import ClimateAppModule from '../turboModules/NativeClimateAppModule';
import { LatLon } from '../types/weatherDataTypes';

export const getCurrentLocation = async (): Promise<LatLon> => {
  return ClimateAppModule.getCurrentPosition();
};
