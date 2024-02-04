import { Image, View } from "react-native";

const InnerSplash = () => {
  return (
    <View className="bg-darkBg w-full h-full flex-1 justify-center items-center">
      <Image
        className="w-full h-full"
        source={require("../../assets/images/dark_splash.png")}
      />
    </View>
  );
};

export default InnerSplash;
