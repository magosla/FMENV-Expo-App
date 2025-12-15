/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#1e40af';
const tintColorDark = '#3f59a8ff';

export type ColorOptions = keyof (typeof Colors['light'])

export const Colors = {
  light: {
    background: '#ffffff',
    backgroundAccent: '#cbfbf1',
    backgroundError: '#ffedd4',
    backgroundInfo: '#dbeafe',
    backgroundMuted: '#dbdbdbc9',
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#fafafa',
    backgroundSuccess: '#dcfce7',
    backgroundWarning: '#fef9c2',
    foreground: '#11181C',
    foregroundAccent: '#0679c0',
    foregroundError: '#f54a00',
    foregroundInfo: '#2b7fff',
    foregroundMuted: '#d3d1d1ff',
    foregroundPrimary: '#111827',
    foregroundSecondary: '#4b5563',
    foregroundSuccess: '#008236',
    foregroundWarning: '#f0b100',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    tint: tintColorLight,
  },
  dark: {
    background: '#0f172b',
    backgroundAccent: '#cbfbf1',
    backgroundError: '#ffedd4c9',
    backgroundInfo: '#dbeafe',
    backgroundMuted: '#a1a1a1c9',
    backgroundPrimary: '#314158',
    backgroundSecondary: '#6a7282',
    backgroundSuccess: '#dcfce7c9',
    backgroundWarning: '#fef9c2',
    foreground: '#ffffff',
    foregroundAccent: '#0679c0ff',
    foregroundError: '#f54a00c9',
    foregroundInfo: '#2b7fffc9',
    foregroundMuted: '#e5e5e5c9',
    foregroundPrimary: '#fbf9fa',
    foregroundSecondary: '#f9f3f4',
    foregroundSuccess: '#008236c9',
    foregroundWarning: '#f0b100c9',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    tint: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
