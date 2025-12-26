import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '../../hooks/useNavigation';
import { useEffect, useState } from 'react';

interface TopbarProps {
  cityName: string;
  setCityName: (name: string) => void;
}

const Topbar: React.FC<TopbarProps> = ({
  setCityName,
  cityName,
}: TopbarProps) => {
  const { navigateTo } = useNavigation();
  const [inputText, setInputText] = useState(cityName);

  const updateCityName = () => {
    setCityName(inputText);
  };

  const getLocalWeather = () => {
    setInputText('');
  };

  useEffect(() => {
    if (!inputText) {
      setCityName('');
    }
  }, [inputText, setCityName]);

  return (
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
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={updateCityName}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={updateCityName}
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
        onPress={getLocalWeather}
        accessibilityLabel="Current Location"
      >
        <Image
          source={require('../../assets/images/location.png')}
          style={styles.navIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Topbar;
