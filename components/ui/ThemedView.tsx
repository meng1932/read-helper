import React from 'react';
import { View, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ThemedViewProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}