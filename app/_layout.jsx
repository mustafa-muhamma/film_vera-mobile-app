
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { AppProvider } from "../context/appContext";

export default function RootLayout() {
    useEffect(() => {
        const timer = setTimeout(() => {
            SplashScreen.hideAsync();
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AppProvider>
            <SafeAreaProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="splash" />
                    <Stack.Screen name="index" />
                </Stack>
            </SafeAreaProvider>
        </AppProvider>

    );
}
