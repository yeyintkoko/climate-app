import React from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import styles from './styles';
import { useWeatherInfo } from '../../hooks/useWeatherInfo';
import { Units } from '../../types/weatherDataTypes';
import { useNavigation } from '../../hooks/useNavigation';

const Home = () => {
  const {
    weatherInfo,
    unit,
    setUnit,
    refreshing,
    onRefresh,
    loading,
    error,
    getWeather,
    cityName,
    setCityName,
    getWeatherByCity,
  } = useWeatherInfo();
  const { navigateTo } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('Settings')}
          accessibilityLabel="Settings"
        >
          <Image
            source={require('../../assets/images/setting.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search city"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            value={cityName}
            onChangeText={setCityName}
            onSubmitEditing={getWeatherByCity}
            clearButtonMode="while-editing"
            returnKeyType="search"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={getWeatherByCity}
            accessibilityLabel="Search"
          >
            <Image
              source={require('../../assets/images/search.png')}
              style={styles.searchIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCityName('')}
          accessibilityLabel="Current Location"
        >
          <Image
            source={require('../../assets/images/location.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error ? (
          <View style={styles.center}>
            <Text style={styles.error}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={getWeather}>
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        ) : weatherInfo ? (
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
                setUnit(
                  unit === Units.Celsius ? Units.Fahrenheit : Units.Celsius,
                )
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
        ) : (
          <View style={styles.center}>
            <Text style={styles.hint}>
              Pull down to refresh and fetch current location weather.
            </Text>
          </View>
        )}
      </ScrollView>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1E90FF" />
        </View>
      )}
    </View>
  );
};

export default Home;
