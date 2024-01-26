import { useCallback, type ReactNode } from "react";
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

  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  if (!I18nManager.isRTL) Updates.reloadAsync();
  openDatabase();

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
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
