import { ImageBackground, ImageStyle } from "expo-image"
import { PropsWithChildren } from "react"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"



export default function BackgroundImage({ style, imageStyle, children }: { style?: StyleProp<ViewStyle>, imageStyle?: StyleProp<ImageStyle> } & PropsWithChildren) {

    return (
        <ImageBackground
            style={[styles.bgImage, style]}
            contentFit="cover"
            contentPosition="top right"
            imageStyle={[{ backgroundColor: '#0000FF00' }, imageStyle]}
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