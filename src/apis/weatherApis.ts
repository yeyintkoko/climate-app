import {
  CLIMACELL_API_KEY,
  CLIMACELL_URL,
  ClimacellUnitMap,
  OPEN_WEATHER_MAP_API_KEY,
  OPEN_WEATHER_MAP_URL,
  OpenWeatherUnitMap,
  WEATHERSTACK_API_KEY,
  WEATHERSTACK_URL,
  WeatherStackUnitMap,
} from '../config';
import {
  WeatherResponse,
  Units,
  WeatherAPI,
  WeatherInfo,
  OpenWeatherMapResponse,
  WeatherStackResponse,
  ClimacellResponse,
} from '../types/weatherDataTypes';
import { getCustomWeatherMessage } from '../utils/weather';
import { fetchLocationByCoordinates } from './locationApis';

const fetchWeather = async (url: string) => {
  console.log('Fetching weather from URL:', url);
  const response = await fetch(url);
  const data: WeatherResponse = await response.json();
  return data;
};

const handleOpenWeatherMapResponse = (
  data: OpenWeatherMapResponse,
): WeatherInfo => {
  if (data?.message) {
    throw new Error(`OPEN WEATHER MAP - OpenWeatherMap: ${data.message}`);
  }

  if (!data || !data.main || !data.weather) {
    throw new Error('Invalid data received from OpenWeatherMap API.');
  }

  return {
    cityName: data.name,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
  };
};

const handleWeatherStuckResponse = (
  data: WeatherStackResponse,
): WeatherInfo => {
  if (data?.error) {
    throw new Error(`WEATHER STACK - ${data.error.info}`);
  }

  if (!data || !data.current) {
    throw new Error('Invalid data received from WeatherStack API.');
  }

  return {
    cityName: data.location.name,
    temperature: data.current.temperature,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_speed,
    description: data.current.weather_descriptions[0],
  };
};

const handleCalimacellResponse = async (
  data: ClimacellResponse,
): Promise<WeatherInfo> => {
  if (data?.message) {
    throw new Error(`CLIMACELL -  ${data.message}`);
  }

  if (!data || !data.data || !data.data.values) {
    throw new Error('Invalid data received from Climacell API.');
  }

  const cityName =
    data.location.name ||
    (await fetchLocationByCoordinates(
      data.location.lat,
      data.location.lon,
    ).then(locationData => locationData.city || 'Unknown Location'));

  return {
    cityName,
    temperature: data.data.values.temperature,
    humidity: data.data.values.humidity,
    windSpeed: data.data.values.windSpeed,
    description: getCustomWeatherMessage(
      data.data.values.temperature,
      data.data.values.windSpeed,
      data.data.values.humidity,
    ),
  };
};

export const fetchWeatherByCity = async (
  cityName: string,
  unit: Units = Units.Celsius,
  api: WeatherAPI = WeatherAPI.OpenWeatherMap,
): Promise<WeatherInfo> => {
  if (api === WeatherAPI.OpenWeatherMap) {
    const queryParams = new URLSearchParams({
      q: cityName,
      appid: OPEN_WEATHER_MAP_API_KEY,
      units: OpenWeatherUnitMap[unit],
    });
    const url = `${OPEN_WEATHER_MAP_URL}?${queryParams.toString()}`;
    const data: OpenWeatherMapResponse = await fetchWeather(url);

    return handleOpenWeatherMapResponse(data);
  } else if (api === WeatherAPI.WeatherStack) {
    const queryParams = new URLSearchParams({
      access_key: WEATHERSTACK_API_KEY,
      query: cityName,
      units: WeatherStackUnitMap[unit],
    });
    const url = `${WEATHERSTACK_URL}?${queryParams.toString()}`;
    const data: WeatherStackResponse = await fetchWeather(url);

    return handleWeatherStuckResponse(data);
  } else {
    const queryParams = new URLSearchParams({
      location: cityName,
      apikey: CLIMACELL_API_KEY,
      units: ClimacellUnitMap[unit],
    });
    const url = `${CLIMACELL_URL}?${queryParams.toString()}`;
    const data: ClimacellResponse = await fetchWeather(url);

    return await handleCalimacellResponse(data);
  }
};

export const fetchWeatherByCoordinates = async (
  lat: number,
  lon: number,
  unit: Units = Units.Celsius,
  api: WeatherAPI = WeatherAPI.OpenWeatherMap,
): Promise<WeatherInfo> => {
  if (api === WeatherAPI.OpenWeatherMap) {
    const queryParams = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      appid: OPEN_WEATHER_MAP_API_KEY,
      units: OpenWeatherUnitMap[unit],
    });
    const url = `${OPEN_WEATHER_MAP_URL}?${queryParams.toString()}`;
    const data: OpenWeatherMapResponse = await fetchWeather(url);

    return handleOpenWeatherMapResponse(data);
  } else if (api === WeatherAPI.WeatherStack) {
    const queryParams = new URLSearchParams({
      query: `${lat},${lon}`,
      access_key: WEATHERSTACK_API_KEY,
      units: WeatherStackUnitMap[unit],
    });
    const url = `${WEATHERSTACK_URL}?${queryParams.toString()}`;
    const data: WeatherStackResponse = await fetchWeather(url);

    return handleWeatherStuckResponse(data);
  } else {
    const queryParams = new URLSearchParams({
      location: `${lat},${lon}`,
      apikey: CLIMACELL_API_KEY,
      units: ClimacellUnitMap[unit],
    });
    const url = `${CLIMACELL_URL}?${queryParams.toString()}`;
    const data: ClimacellResponse = await fetchWeather(url);

    return handleCalimacellResponse(data);
  }
};
