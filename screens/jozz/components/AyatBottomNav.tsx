import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { router, useLocalSearchParams } from "expo-router";

export function AyatBottomNav({ type }: { type: "jozz" | "surah" }) {
  const local = useLocalSearchParams();
  const { colorScheme } = useColorScheme();

  const isLastSuraOrJozz =
    (type === "jozz" && local.id === "30") ||
    (type === "surah" && local.id === "114");

  return (
    <View className=" flex-2 flex-row justify-between pb-3 h-24">
      {local.id !== "1" ? (
        <Pressable
          onPress={() => {
            router.replace(
              `/${type}/${parseInt((local.id as string) || "") - 1}`
            );
          }}
          className=" flex-3 flex-row justify-start items-center w-1/3 pl-1 pt-4"
        >
          <MaterialIcons
            name="arrow-forward-ios"
            size={30}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />

          <Text className="font-HelveticaRoman mb-2 ml-1 text-primary dark:text-primaryDark">
            السابق
          </Text>
        </Pressable>
      ) : (
        <View></View>
      )}
      {!isLastSuraOrJozz ? (
        <Pressable
          className="flex-3 flex-row justify-end w-1/3 items-center pr-1 pt-4"
          onPress={() => {
            router.replace(
              `/${type}/${parseInt((local.id as string) || "") + 1}`
            );
          }}
        >
          <Text className="font-HelveticaRoman text-primary dark:text-primaryDark">
            التالي
          </Text>

          <MaterialIcons
            name="arrow-back-ios"
            size={30}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        </Pressable>
      ) : (
        <View></View>
      )}
    </View>
  );
}
