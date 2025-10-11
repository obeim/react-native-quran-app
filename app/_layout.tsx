import { useCallback, type ReactNode } from "react";
import { SplashScreen, Stack } from "expo-router";
import { StyleSheet, I18nManager } from "react-native";
import { useFonts } from "expo-font";
import { useColorScheme } from "nativewind";
import RNAppRestart from "@brandingbrand/react-native-app-restart";
import { storage } from "@/utils";
import { RootSiblingParent } from "react-native-root-siblings";
import { SQLiteProvider } from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): ReactNode {
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
    <SQLiteProvider
      databaseName="quran.db"
      assetSource={{ assetId: require("../assets/quran.db") }}
    >
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
              statusBarStyle: colorScheme === "dark" ? "light" : "dark",
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
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
