import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { ColorOptions } from '@/constants/theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  bgThemeColor?: ColorOptions;
  borderThemeColor?: ColorOptions;
  shadowThemeColor?: ColorOptions;
};

export function ThemedView({ style, lightColor, darkColor,
  shadowThemeColor, borderThemeColor, bgThemeColor,
  ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, bgThemeColor);

  const borderColor = useThemeColor({}, borderThemeColor)
  const shadowColor = useThemeColor({}, shadowThemeColor)

  return <View style={[{
    backgroundColor, borderColor, shadowColor
  },
    style]} {...otherProps} />;
}
