import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import styles from './styles';

interface ClimateMaterialRippleProps {
  size?: number;
  color?: string;
  rippleCount?: number;
  duration?: number;
}

const ClimateMaterialRipple: React.FC<ClimateMaterialRippleProps> = ({
  size = Dimensions.get('window').width,
  color = '#1E90FF',
  rippleCount = 10,
  duration = 1500,
}) => {
  const animations = useRef(
    Array.from({ length: rippleCount }, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const loops = animations.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay((duration / rippleCount) * index),
          Animated.timing(anim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    loops.forEach(l => l.start());
    return () => loops.forEach(l => l.stop());
  }, [animations, duration, rippleCount]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.ripple,
            {
              backgroundColor: color,
              width: size,
              height: size,
              opacity: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

export default ClimateMaterialRipple;
