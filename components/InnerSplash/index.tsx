import { useColorScheme } from "nativewind";
import { Image, View } from "react-native";

const InnerSplash = () => {
  const { colorScheme } = useColorScheme();
  const splash =
    colorScheme === "dark"
      ? require("../../assets/images/dark_splash.png")
      : require("../../assets/images/splash.png");

  return (
    <View className="bg-lotion dark:bg-darkBg w-full h-full flex-1 justify-center items-center">
      <Image className="w-full h-full" source={splash} />
    </View>
  );
};

export default InnerSplash;
