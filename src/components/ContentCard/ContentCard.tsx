import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Units, WeatherInfo } from '../../types/weatherDataTypes';
import { useNavigation } from '../../hooks/useNavigation';

interface ContentCardProps {
  weatherInfo: WeatherInfo;
  setUnit: (unit: Units) => void;
  unit: Units;
}

const ContentCard: React.FC<ContentCardProps> = ({
  weatherInfo,
  setUnit,
  unit,
}: ContentCardProps) => {
  const { navigateTo } = useNavigation();

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => navigateTo('Settings')}
        accessibilityLabel="More Options"
      >
        <Image
          source={require('../../assets/images/three-dots.png')}
          style={styles.moreIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.city}>{weatherInfo.cityName}</Text>
      <TouchableOpacity
        onPress={() =>
          setUnit(unit === Units.Celsius ? Units.Fahrenheit : Units.Celsius)
        }
      >
        <Text style={styles.temp}>
          {Math.round(weatherInfo.temperature)}°
          {unit === Units.Celsius ? 'C' : 'F'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.desc}>{weatherInfo.description}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>
          Humidity: {weatherInfo.humidity ?? '—'}%
        </Text>
        <Text style={styles.metaText}>
          Wind: {weatherInfo.windSpeed ?? '—'} m/s
        </Text>
      </View>
    </View>
  );
};

export default ContentCard;
