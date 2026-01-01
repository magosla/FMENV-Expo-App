import { ColorOptions } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';


type LinkHref = ComponentProps<typeof Link>['href']
type ExternalLink = {
    external: true
} & ({ href: LinkHref } | { href: string })
type InternalLink = Omit<ExternalLink, 'external'> &  {
    external?: false
}

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
    themeColor?: ColorOptions
    bgThemeColor?: ColorOptions
    lightColor?: string;
    darkColor?: string;
    bgLightColor?: string;
    bgDarkColor?: string;
    borderThemeColor?: ColorOptions,
    borderLightColor?: string;
    borderDarkColor?: string;
    shadowThemeColor?: ColorOptions
} &
    (ExternalLink | InternalLink)

export function ThemedLink({ href,
    bgDarkColor,
    bgLightColor,
    bgThemeColor,
    borderDarkColor,
    borderLightColor,
    borderThemeColor,
    darkColor,
    external,
    lightColor,
    shadowThemeColor,
    style,
    themeColor,
    ...rest }: Props) {
    const backgroundColor = useThemeColor({ light: bgLightColor, dark: bgDarkColor }, bgThemeColor);
    const color = useThemeColor({ light: lightColor, dark: darkColor }, themeColor);

    const borderColor = useThemeColor({ light: borderLightColor, dark: borderDarkColor }, borderThemeColor)
    const shadowColor = useThemeColor({}, shadowThemeColor)


    return (
        <Link
            style={[{
                color, backgroundColor, borderColor, shadowColor
            },
                style]}
            {...rest}
            target={external ? "_blank" : undefined}
            href={href as Href}
            onPress={external ? async (event) => {
                if (process.env.EXPO_OS !== 'web') {
                    // Prevent the default behavior of linking to the default browser on native.
                    event.preventDefault();
                    // Open the link in an in-app browser.
                    await openBrowserAsync(href as string, {
                        presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
                    });
                }
            } : rest.onPress}
        />
    );
}
