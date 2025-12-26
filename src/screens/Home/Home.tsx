import React, { useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import styles from './styles';
import { useWeatherInfo } from '../../hooks/useWeatherInfo';
import ClimateLoader from '../../components/ClimateLoader/ClimateLoader';
import Topbar from '../../components/Topbar/Topbar';
import TryAgain from '../../components/TryAgain/TryAgain';
import ContentCard from '../../components/ContentCard/ContentCard';

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
    clearFallback,
  } = useWeatherInfo();

  const handleTryAgain = useCallback(() => {
    clearFallback();
    getWeather();
  }, [clearFallback, getWeather]);

  return (
    <View style={styles.container}>
      <Topbar cityName={cityName} setCityName={setCityName} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error ? (
          <TryAgain onPress={handleTryAgain} error={error} />
        ) : weatherInfo ? (
          <ContentCard
            weatherInfo={weatherInfo}
            setUnit={setUnit}
            unit={unit}
          />
        ) : (
          !loading && (
            <View style={styles.center}>
              <Text style={styles.hint}>
                Pull down to refresh and fetch current location weather.
              </Text>
            </View>
          )
        )}
      </ScrollView>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ClimateLoader />
        </View>
      )}
    </View>
  );
};

export default Home;
