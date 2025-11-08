import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView, AnimatePresence } from "moti";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
    const router = useRouter();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            // Start fade-out animation
            setVisible(false);
            // Navigate just after animation completes
            setTimeout(() => {
                router.replace("/(tabs)");
            }, 800);
        }, 2500); // Total display duration
        return () => clearTimeout(timer);
    }, []);

    return (
        <LinearGradient colors={["#000000", "#1c1c1c", "#3b0a45"]} style={styles.container}>
            <StatusBar barStyle="light-content" />

            <AnimatePresence>
                {visible && (
                    <MotiView
                        from={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{
                            type: "timing",
                            duration: 700,
                        }}
                        style={styles.center}
                    >
                        <Image source={require("../../assets/logo.jpg")} style={styles.logo} />

                        <MotiView
                            from={{ opacity: 0, translateY: 10 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ delay: 700, duration: 700 }}
                        >
                            <Text style={styles.slogan}>Stream. Chill. FilmVera.</Text>
                        </MotiView>
                    </MotiView>
                )}
            </AnimatePresence>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    center: { alignItems: "center" },
    logo: { width: width * 0.4, height: width * 0.4, borderRadius: 20 },
    slogan: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        letterSpacing: 1,
        textAlign: "center",
    },
});
