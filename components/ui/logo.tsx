import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Image, ImageProps } from "expo-image";

type LogoProp = Omit<ImageProps, "contentFit" | "source">

export default function Logo(props: Readonly<LogoProp>) {
    const colorScheme = useColorScheme()

    return <Image
        {...props}
        contentFit="contain"
        source={
            colorScheme === 'dark' ?
                require('@/assets/images/logo-dark.png') :
                require('@/assets/images/logo.png')
        }
    />;
}
