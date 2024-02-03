import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";

export function Header({
  title,
  subtitle,
  layout,
  setLayout,
}: {
  title?: string;
  subtitle?: string;
  setLayout: React.Dispatch<React.SetStateAction<"ayat" | "page">>;
  layout: "ayat" | "page";
}) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex flex-row justify-between  pl-4  py-4 h-[8%] bg-white dark:bg-darkBg items-center">
      <View className="inline-flex flex-row items-center justify-center h-full">
        <Pressable
          onPress={() => {
            router.back();
          }}
          className="  items-center justify-end !w-10 flex-3 "
        >
          <AntDesign
            name="arrowright"
            size={24}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            router.back();
          }}
          className="bg-white dark:bg-darkBg flex-3  items-center"
        >
          <Text className="font-HelveticaRoman text-lg text-primary dark:text-primaryDark text-center">
            {title}
          </Text>
          <Text className="font-HelveticaRoman text-primary/30 dark:text-primaryDark/70 text-xs">
            {subtitle}
          </Text>
        </Pressable>
      </View>
      <Pressable
        className=" w-24 pr-4  h-32  inline-flex justify-center"
        onPress={() => {
          if (layout === "ayat") setLayout("page");
          else setLayout("ayat");
        }}
      >
        {layout === "ayat" && (
          <Entypo
            size={24}
            name="text"
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        )}

        {layout === "page" && (
          <Feather
            name="list"
            size={24}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        )}
      </Pressable>
    </View>
  );
}
