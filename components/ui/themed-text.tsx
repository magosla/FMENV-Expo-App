import { StyleSheet, Text, type TextProps } from 'react-native';
import { ColorOptions } from '@/constants/theme';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'small' | 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  themeColor?: ColorOptions
  bgThemeColor?: ColorOptions
  borderThemeColor?: ColorOptions
  shadowThemeColor?: ColorOptions;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  themeColor,
  shadowThemeColor, borderThemeColor, bgThemeColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, themeColor || 'foreground');
  const tintColor = useThemeColor({}, themeColor || 'tint');
  const backgroundColor = useThemeColor({}, bgThemeColor);
  const borderColor = useThemeColor({}, borderThemeColor)
  const shadowColor = useThemeColor({}, shadowThemeColor)

  return (
    <Text
      style={[
        { color, backgroundColor, borderColor, shadowColor },
        type === 'small' ? styles.small : undefined,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? { ...styles.link, color: tintColor } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});
