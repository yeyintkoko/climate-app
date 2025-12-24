import { routes } from '../utils/routes';

export interface OpenWeatherMapResponse {
  name: string;
  main: {
    humidity: number;
    temp: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

export interface WeatherStackResponse {
  location: {
    name: string;
  };
  current: {
    temperature: number;
    weather_descriptions: string[];
    humidity: number;
    wind_speed: number;
  };
}

export interface ClimacellResponse {
  data: {
    values: {
      temperature: number;
      humidity: number;
      windSpeed: number;
      precipitationProbability: number;
    };
  };
  location: {
    name: string;
    lat: number;
    lon: number;
  };
}

export type WeatherResponse = OpenWeatherMapResponse &
  WeatherStackResponse &
  ClimacellResponse;

export interface WeatherInfo {
  cityName: string;
  temperature: number;
  humidity?: number;
  windSpeed?: number;
  description: string;
}

// metric for Celsius, imperial for Fahrenheit
export type OpenWeatherMapUnits = 'metric' | 'imperial';

// m for Metric (Celsius), f for Fahrenheit
export type WeatherStackUnits = 'm' | 'f';

export type ClimacellUnits = 'metric' | 'imperial';

export enum Units {
  Celsius = 'Celsius',
  Fahrenheit = 'Fahrenheit',
}

export enum WeatherAPI {
  OpenWeatherMap = 'Open Weather Map',
  WeatherStack = 'Weather Stack',
  Climacell = 'Climacell',
}

export type LatLon = {
  latitude: number;
  longitude: number;
};

export type NavKey = keyof typeof routes;

export type NavContext = {
  currentScreen: NavKey;
  navigateTo: (s: NavKey) => void;
  api: WeatherAPI;
  changeApi: (newApi: WeatherAPI) => void;
  unit: Units;
  setUnit: (u: Units) => void;
  cityName: string;
  setCityName: (c: string) => void;
};
