import { useCallback, useEffect, useRef, useState } from 'react';
import { WeatherAPI, WeatherInfo } from '../types/weatherDataTypes';
import {
  fetchWeatherByCity,
  fetchWeatherByCoordinates,
} from '../apis/weatherApis';
import { getCurrentLocation } from '../utils/location';
import { useNavigation } from './useNavigation';

export const useWeatherInfo = () => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const { api, changeApi, unit, setUnit, cityName, setCityName } =
    useNavigation();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const fallbackRef = useRef<Set<string>>(new Set());

  const handleResponse = (data: WeatherInfo): void => {
    setWeatherInfo(data);
    setError('');
  };

  const handleError = (err: unknown): void => {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Something went wrong in fetching weather data.');
    }
    setWeatherInfo(null);
  };

  const handleFallback = useCallback(() => {
    if (!fallbackRef.current.has(api)) {
      fallbackRef.current.add(api);
      const apis: WeatherAPI[] = Object.values(WeatherAPI);
      const nextApi = apis.find(it => !fallbackRef.current.has(it));
      if (nextApi) {
        changeApi(nextApi);
      }
    }
  }, [api, changeApi]);

  const clearFallback = (fallbacks: Set<string>) => {
    fallbacks.clear();
  };

  const getWeatherByCity = useCallback(async () => {
    try {
      const data = await fetchWeatherByCity(cityName, unit, api);
      handleResponse(data);
      clearFallback(fallbackRef.current);
    } catch (err) {
      handleError(err);
      handleFallback();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [cityName, unit, api, handleFallback]);

  const getWeatherByCurrentLocation = useCallback(async () => {
    try {
      const { latitude, longitude } = await getCurrentLocation();
      const data = await fetchWeatherByCoordinates(
        latitude,
        longitude,
        unit,
        api,
      );
      handleResponse(data);
      clearFallback(fallbackRef.current);
    } catch (err) {
      handleError(err);
      handleFallback();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [unit, api, handleFallback]);

  const getWeatherInfo = useCallback(() => {
    if (cityName) {
      getWeatherByCity();
    } else {
      getWeatherByCurrentLocation();
    }
  }, [cityName, getWeatherByCity, getWeatherByCurrentLocation]);

  const getWeather = useCallback(() => {
    setLoading(true);
    getWeatherInfo();
  }, [getWeatherInfo]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getWeatherInfo();
  }, [getWeatherInfo]);

  useEffect(() => {
    // Here, getWeather shoud be called only when screen loaded.
    // To prevent calling api on effect of cityName change on every key press in search input.
    if (!cityName) {
      getWeather();
    }
  }, [cityName, getWeather]);

  return {
    weatherInfo,
    unit,
    setUnit,
    cityName,
    setCityName,
    api,
    changeApi,
    loading,
    refreshing,
    onRefresh,
    getWeatherByCity,
    getWeatherByCurrentLocation,
    getWeather,
    error,
  };
};
