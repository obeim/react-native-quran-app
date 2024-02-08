import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

export function PageBottomBar({
  PrevPage,
  nextPage,
  currentPage,
  totalPages,
  type = "surah",
}: {
  PrevPage: () => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  type?: "jozz" | "surah";
}) {
  const local = useLocalSearchParams();
  const id = parseInt((local.id as string) || "");
  const isLastSuraOrJozz = useMemo(
    () => (type === "jozz" && id === 30) || (type === "surah" && id === 114),
    [type, id]
  );

  const { colorScheme } = useColorScheme();
  return (
    <View className="h-[7%] absolute bottom-0 flex-1 flex-row  w-full justify-between bg-white dark:bg-darkBg  items-center">
      <Pressable
        onPress={() => {
          if (currentPage === 1 && id > 1) router.replace(`/${type}/${id - 1}`);
          else PrevPage();
        }}
        className="h-full flex-3 flex-row justify-start w-1/3 items-center pl-4 pt-4"
      >
        <MaterialIcons
          name="arrow-forward-ios"
          size={30}
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
        />
        {currentPage === 1 && id > 1 && (
          <Text className="font-HelveticaRoman mb-2 ml-1 text-primary dark:text-primaryDark">
            السابق
          </Text>
        )}
      </Pressable>

      <View className="my-auto flex-3 flex-row pt-4">
        <Text className="text-primary dark:text-primaryDark text-center">
          {currentPage}
        </Text>
        <Text className="text-primary dark:text-primaryDark text-center">
          {totalPages} {" / "}
        </Text>
      </View>
      <Pressable
        className="h-full flex-3 flex-row justify-end w-1/3 items-center pr-5 pt-4"
        onPress={() => {
          if (currentPage === totalPages && !isLastSuraOrJozz)
            router.replace(
              `/${type}/${parseInt((local.id as string) || "") + 1}`
            );
          else nextPage();
        }}
      >
        {currentPage === totalPages && !isLastSuraOrJozz && (
          <Text className="font-HelveticaRoman text-primary dark:text-primaryDark">
            التالي
          </Text>
        )}
        <MaterialIcons
          name="arrow-back-ios"
          size={30}
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
        />
      </Pressable>
    </View>
  );
}
