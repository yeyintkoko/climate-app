import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { WeatherAPI } from '../../types/weatherDataTypes';
import { useWeatherInfo } from '../../hooks/useWeatherInfo';
import { useNavigation } from '../../hooks/useNavigation';

export const Settings = () => {
  const { api, changeApi } = useWeatherInfo();
  const { navigateTo } = useNavigation();

  const apis: WeatherAPI[] = Object.values(WeatherAPI);

  const renderItem = ({ item }: { item: WeatherAPI }) => {
    const selected = api === item;

    return (
      <TouchableOpacity
        style={styles.itemRow}
        onPress={() => changeApi(item)}
        accessibilityLabel={`Select ${item}`}
      >
        <Text style={styles.itemText}>{item}</Text>
        {selected && (
          <Image
            source={require('../../assets/images/check.png')}
            style={styles.checkIcon}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigateTo('Home')}
          accessibilityLabel="Back"
        >
          <Image
            source={require('../../assets/images/left.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <FlatList
        data={apis}
        keyExtractor={item => item}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Settings;
