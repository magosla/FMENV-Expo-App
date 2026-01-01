import { ImageBackground, ImageBackgroundProps } from "expo-image"
import { PropsWithChildren } from "react"
import { StyleSheet } from "react-native"



export default function BackgroundImage({ style, children }: { style?: ImageBackgroundProps['style'] } & PropsWithChildren) {

    return (
        <ImageBackground
            style={[styles.bgImage, style]}
            contentFit="cover"
            contentPosition="top right"
            imageStyle={{ backgroundColor: '#0000FF00' }}
            source={require('@/assets/images/cloud_bg.png')}
        >
            {children}
        </ImageBackground>
    )
}



const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        justifyContent: 'center'
    }
})