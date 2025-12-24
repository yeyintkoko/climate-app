export const getCustomWeatherMessage = (
  temperature: number,
  windSpeed?: number,
  humidity?: number,
): string => {
  let tempLabel: string;
  if (temperature < 10) {
    tempLabel = 'Cold';
  } else if (temperature <= 25) {
    tempLabel = 'Mild';
  } else {
    tempLabel = 'Hot';
  }

  let windLabel = '';
  if (windSpeed) {
    if (windSpeed < 5) {
      windLabel = 'Calm';
    } else if (windSpeed <= 40) {
      windLabel = 'Breezy';
    } else {
      windLabel = 'Windy';
    }
  }

  let humidityLabel = '';
  if (humidity) {
    if (humidity < 30) {
      humidityLabel = 'Dry';
    } else if (humidity <= 70) {
      humidityLabel = 'Comfortable';
    } else {
      humidityLabel = 'Humid';
    }
  }

  if (!windLabel || !humidityLabel) {
    return `The weather is currently ${tempLabel}.`;
  }

  return `The weather is currently ${tempLabel} and ${humidityLabel}, with ${windLabel} conditions.`;
};
