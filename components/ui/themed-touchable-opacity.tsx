import { type TouchableOpacityProps, TouchableOpacity } from 'react-native';

import { ColorOptions } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTouchableOpacityProps = TouchableOpacityProps & {
    lightColor?: string;
    darkColor?: string;
    bgThemeColor?: ColorOptions;
    borderThemeColor?: ColorOptions;
    shadowThemeColor?: ColorOptions;
};

export function ThemedTouchableOpacity({ style, lightColor, darkColor,
    shadowThemeColor, borderThemeColor, bgThemeColor,
    ...otherProps }: ThemedTouchableOpacityProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, bgThemeColor);

    const borderColor = useThemeColor({}, borderThemeColor)
    const shadowColor = useThemeColor({}, shadowThemeColor)

    return <TouchableOpacity style={[{
        backgroundColor, borderColor, shadowColor
    },
        style]} {...otherProps} />;
}
