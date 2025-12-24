import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from './hooks/useNavigation';
import { routes } from './utils/routes';
import { NavigationProvider } from './providers/NavigationProvider';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </NavigationProvider>
    </SafeAreaProvider>
  );
};

const AppContent = () => {
  const { currentScreen } = useNavigation();
  const ScreenComponent = routes[currentScreen];

  return (
    <SafeAreaView style={styles.container}>
      <ScreenComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
