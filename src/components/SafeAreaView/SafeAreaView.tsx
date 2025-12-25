import React from 'react';
import { View, Platform, StatusBar, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

const SafeAreaView = ({ children, style }: Props) => {
  return <View style={[styles.safeArea, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
  },
});

export default SafeAreaView;
