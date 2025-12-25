import { StyleSheet } from 'react-native';
import { useNavigation } from './hooks/useNavigation';
import { routes } from './utils/routes';
import { NavigationProvider } from './providers/NavigationProvider';
import SafeAreaView from './components/SafeAreaView/SafeAreaView';

const App = () => {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
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
