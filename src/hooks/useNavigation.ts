import { useCallback, useContext, useState } from 'react';
import NavigationContext from '../providers/NavigationProvider';
import {
  NavContext,
  NavKey,
  Units,
  WeatherAPI,
} from '../types/weatherDataTypes';

export const useNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
};

export const useNavigationProvider = (): NavContext => {
  const [currentScreen, setCurrentScreen] = useState<NavKey>('Home');
  const [api, setApi] = useState<WeatherAPI>(WeatherAPI.OpenWeatherMap);
  const [unit, setUnit] = useState<Units>(Units.Celsius);
  const [cityName, setCityName] = useState('');

  const navigateTo = useCallback((screen: NavKey) => {
    setCurrentScreen(screen);
  }, []);

  const changeApi = useCallback((newApi: WeatherAPI) => {
    setApi(newApi);
  }, []);

  return {
    currentScreen,
    navigateTo,
    api,
    changeApi,
    unit,
    setUnit,
    cityName,
    setCityName,
  };
};
