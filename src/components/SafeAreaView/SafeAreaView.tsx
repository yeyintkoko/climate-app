import React from 'react';
import { View, Platform, StatusBar, StyleSheet, ViewStyle } from 'react-native';

interface SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  style,
}: SafeAreaViewProps) => {
  return <View style={[styles.safeArea, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
  },
});

export default SafeAreaView;
