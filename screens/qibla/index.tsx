import { View, Text } from "react-native";
import QiblaCompass from "@/components/QiblaCompass";
import { useColorScheme } from "nativewind";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const Qibla = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="pt-10 px-4 bg-white dark:bg-darkBg">
      <View className="mb-20 flex-row justify-between">
        <Text className="text-2xl text-primary dark:text-primaryDark font-HelveticaRoman">
          أتجاه القبلة
        </Text>
        <AntDesign
          name="close"
          style={{ padding: 8 }}
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          size={26}
          onPress={() => {
            router.back();
          }}
        />
      </View>
      <View className="mx-auto my-auto">
        <QiblaCompass
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          backgroundColor="transparent"
          compassImage={
            colorScheme === "dark"
              ? require("../../assets/images/compass_dark.png")
              : require("../../assets/images/compass_light.png")
          }
          textStyles={{
            textAlign: "center",
            fontSize: 24,
            fontFamily: "HelveticaNeueLTArabic-Roman",
          }}
        />
      </View>
    </View>
  );
};

export default Qibla;
