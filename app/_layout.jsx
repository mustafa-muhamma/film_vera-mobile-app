import { Stack, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/themeContext";
import { AppProvider } from "../context/appContext";
import { WishlistProvider } from "../context/wishListContext";
import HeaderBar from "../component/HeaderBar";
import ThemedStatusBar from "../component/ThemedStatusBar";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const pathname = usePathname();
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setAppReady(true);
            await SplashScreen.hideAsync();
        };
        prepare();
    }, []);

    if (!appReady) return null;

    const isSplash = pathname?.includes("splash");

    return (
        <ThemeProvider>
            <AppProvider>
                <WishlistProvider>
                    <SafeAreaProvider>
                        <ThemedStatusBar />
                        {!isSplash && <HeaderBar />}
                        <Stack screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="splash/index" />
                            <Stack.Screen name="(tabs)" />
                        </Stack>
                    </SafeAreaProvider>
                </WishlistProvider>
            </AppProvider>
        </ThemeProvider>
    );
}
