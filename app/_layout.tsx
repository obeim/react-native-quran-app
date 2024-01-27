import { useCallback, type ReactNode, useEffect } from "react";
import { Slot, SplashScreen } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet, I18nManager } from "react-native";
import { useFonts } from "expo-font";
import { openDatabase } from "@/db/utils";
import * as Updates from "expo-updates";

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): ReactNode {
  const [fontsLoaded, fontError] = useFonts({
    "HelveticaNeueLTArabic-Bold": require("../assets/fonts/HelveticaNeueLTArabic-Bold.ttf"),
    "HelveticaNeueLTArabic-Roman": require("../assets/fonts/HelveticaNeueLTArabic-Roman.ttf"),
    "HelveticaNeueLTArabic-Light": require("../assets/fonts/HelveticaNeueLTArabic-Light.ttf"),
    HafsSmart: require("../assets/fonts/HafsSmart_08.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    await openDatabase();

    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);

    if (!I18nManager.isRTL) Updates.reloadAsync();

    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  useEffect(() => {
    onLayoutRootView();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});
