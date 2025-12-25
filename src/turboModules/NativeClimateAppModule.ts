import { TurboModule, TurboModuleRegistry } from 'react-native';
import { LatLon } from '../types/weatherDataTypes';

export interface Spec extends TurboModule {
  getCurrentPosition(): Promise<LatLon>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ClimateAppModule');
