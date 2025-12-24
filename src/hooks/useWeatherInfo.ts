import { useCallback, useEffect, useState } from 'react';
import { WeatherInfo } from '../types/weatherDataTypes';
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

  const getWeatherByCity = useCallback(async () => {
    try {
      const data = await fetchWeatherByCity(cityName, unit, api);
      handleResponse(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [unit, cityName, api]);

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
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [unit, api]);

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
    getWeather();
  }, [getWeather]);

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
