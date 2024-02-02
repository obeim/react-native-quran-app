import { useCallback, type ReactNode } from "react";
import { SplashScreen, Stack } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet, I18nManager } from "react-native";
import { useFonts } from "expo-font";
import * as Updates from "expo-updates";
import { openDatabase } from "@/db/utils";
import { QueryClient, QueryClientProvider } from "react-query";

SplashScreen.preventAutoHideAsync();
export default function RootLayout(): ReactNode {
  const queryClient = new QueryClient();

  const [fontsLoaded, fontError] = useFonts({
    "HelveticaNeueLTArabic-Bold": require("../assets/fonts/HelveticaNeueLTArabic-Bold.ttf"),
    "HelveticaNeueLTArabic-Roman": require("../assets/fonts/HelveticaNeueLTArabic-Roman.ttf"),
    "HelveticaNeueLTArabic-Light": require("../assets/fonts/HelveticaNeueLTArabic-Light.ttf"),
    UthmanicHafs: require("../assets/fonts/UthmanicHafs.ttf"),
  });
  openDatabase();

  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  if (!I18nManager.isRTL) Updates.reloadAsync();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView
        onLayout={() => {
          onLayoutRootView();
        }}
        style={styles.container}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { padding: 0, margin: 0, backgroundColor: "white" },
            animation: "slide_from_bottom",
          }}
        />
      </SafeAreaView>
    </QueryClientProvider>
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
