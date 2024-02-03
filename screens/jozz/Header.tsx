import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";

export function Header({ title }: { title?: string }) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex flex-row justify-between   px-4  py-4 h-[8%] bg-white dark:bg-darkBg items-center">
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
          className="bg-white dark:bg-darkBg items-center h-10 inline-flex justify-center"
        >
          <Text className="font-HelveticaRoman text-lg text-primary dark:text-primaryDark">
            {title}
          </Text>
        </Pressable>
      </View>
      <Pressable>
        <Entypo
          name="text"
          size={24}
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
        />
      </Pressable>
    </View>
  );
}
