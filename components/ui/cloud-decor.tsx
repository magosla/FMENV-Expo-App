import { StyleSheet, View, ViewProps } from "react-native"

export const CloudDecor = ({ style }: ViewProps) => {

    return (
        <View style={[styles.wrapper, style]}>
            <View style={styles.in1} />
            <View style={styles.in2} />
            <View style={styles.in3} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        right: 16,
        top: 16,
        opacity: 0.2,
    },
    in1: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#D1D5DB' // Tailwind gray-300
    },
    in2: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#D1D5DB', // Tailwind gray-300
        marginTop: -32,
        marginLeft: 16
    },
    in3: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#D1D5DB', // Tailwind gray-300
        marginTop: -24,
        marginLeft: 32

    }
})