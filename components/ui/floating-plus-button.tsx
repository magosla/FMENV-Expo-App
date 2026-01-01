import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

const { width } = Dimensions.get('window');

export function FloatingPlusButton() {
    return (
        <View style={[styles.wrapper, { left: (width / 2) - 32 }]}>
            <Pressable style={styles.pressable} android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', radius: 32 }}>
                <View style={styles.in1} />
                <View style={styles.in2} />
                <Ionicons name="add" size={28} color="white" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { position: 'absolute', bottom: 80, zIndex: 10 },
    pressable: {
        width: 64,
        height: 64,
        backgroundColor: '#2563eb', // Tailwind blue-600
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "rgba(0, 0, 0, 0.35)",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 19,
        elevation: 8,
    },
    in1: {
        position: 'absolute',
        width: 64, height: 64, borderRadius: 32,
        borderWidth: 4, borderColor: '#4ade80', opacity: 0.5,
        transform: [{ scale: 1.2 }]
    },
    in2: {
        position: 'absolute',
        width: 64, height: 64, borderRadius: 32,
        borderWidth: 4, borderColor: '#4ade80', opacity: 0.3,
        transform: [{ scale: 1.4 }]
    }

})