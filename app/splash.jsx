import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useRouter } from "expo-router";

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/"); // Go to home screen
        }, 4500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <LinearGradient
            colors={["#000000", "#1c1c1c", "#3b0a45"]}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />

            <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "timing", duration: 1000 }}
            >
                <Image source={require("../assets/logo.jpg")} style={styles.logo} />
            </MotiView>

            <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 1000, duration: 800 }}
            >
                <Text style={styles.slogan}>Stream. Chill. FilmVera.</Text>
            </MotiView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    logo: { width: 150, height: 150, borderRadius: 20 },
    slogan: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        letterSpacing: 1,
        textAlign: "center",
    },
});
