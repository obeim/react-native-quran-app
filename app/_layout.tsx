import { useCallback, type ReactNode } from "react";
import { SplashScreen, Stack } from "expo-router";
import { SafeAreaView, StyleSheet, I18nManager } from "react-native";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";
import { useColorScheme } from "nativewind";
import RNAppRestart from "@brandingbrand/react-native-app-restart";
import { storage } from "@/utils";
import { RootSiblingParent } from "react-native-root-siblings";

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): ReactNode {
  const queryClient = new QueryClient();
  const { colorScheme, setColorScheme } = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    "HelveticaNeueLTArabic-Bold": require("../assets/fonts/HelveticaNeueLTArabic-Bold.ttf"),
    "HelveticaNeueLTArabic-Roman": require("../assets/fonts/HelveticaNeueLTArabic-Roman.ttf"),
    "HelveticaNeueLTArabic-Light": require("../assets/fonts/HelveticaNeueLTArabic-Light.ttf"),
    UthmanicHafs: require("../assets/fonts/UthmanicHafs.ttf"),
  });

  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  if (!I18nManager.isRTL) RNAppRestart.restartApplication();

  const onLayoutRootView = useCallback(async () => {
    let localTheme = storage.getString("theme") as "dark" | "light";
    if (localTheme && localTheme !== colorScheme) {
      setColorScheme(localTheme);
    }
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, !!fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootSiblingParent>
        <SafeAreaView
          onLayout={() => {
            onLayoutRootView();
          }}
          style={{
            ...styles.container,
            backgroundColor: colorScheme === "dark" ? "#352F44" : "white",
          }}
          className=" bg-white dark:bg-darkBg "
        >
          <Stack
            screenOptions={{
              headerShown: false,
              statusBarColor: "#352F44",
              contentStyle: {
                padding: 0,
                margin: 0,
                backgroundColor: colorScheme === "dark" ? "#352F44" : "white",
              },
              animation: "slide_from_bottom",
            }}
          />
        </SafeAreaView>
      </RootSiblingParent>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
