import { createContext } from 'react';
import type { NavContext } from '../types/weatherDataTypes';
import { useNavigationProvider } from '../hooks/useNavigation';

const NavigationContext = createContext<NavContext | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigationContext = useNavigationProvider();

  return (
    <NavigationContext.Provider value={navigationContext}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
