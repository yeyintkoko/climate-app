import { Units } from './types/weatherDataTypes';

export const OpenWeatherUnitMap = {
  [Units.Celsius]: 'metric',
  [Units.Fahrenheit]: 'imperial',
};

export const WeatherStackUnitMap = {
  [Units.Celsius]: 'm',
  [Units.Fahrenheit]: 'f',
};

export const ClimacellUnitMap = {
  [Units.Celsius]: 'metric',
  [Units.Fahrenheit]: 'imperial',
};

export const OPEN_WEATHER_MAP_API_KEY = 'b80524b41f3ced960cdbf36268e8f1c4';
export const WEATHERSTACK_API_KEY = '4cd9fe7e59a29e106c4c0d3ae47c1e09';
export const CLIMACELL_API_KEY = 'k7yiwLvKZ3NV1DTeqC9mAnKfMnrEYil8';

export const OPEN_WEATHER_MAP_URL =
  'https://api.openweathermap.org/data/2.5/weather';
export const WEATHERSTACK_URL = 'http://api.weatherstack.com/current';
// Formerly ClimaCell is now Tomorrow.io
export const CLIMACELL_URL = 'https://api.tomorrow.io/v4/weather/realtime';

export const GEO_LOCATION_URL =
  'https://api.bigdatacloud.net/data/reverse-geocode-client';
