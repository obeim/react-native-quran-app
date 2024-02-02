import { Pressable, View } from "react-native";
import BigArrow from "@/assets/icons/big_arrow.svg";
import { Text } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";

export function Header({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex flex-row justify-between   px-2  pb-4  h-[7%]  bg-white dark:bg-darkBg items-center">
      <Pressable
        onPress={() => {
          router.back();
        }}
        className="bg-white dark:bg-darkBg flex-3  items-center"
      >
        <Text className="font-HelveticaRoman text-lg text-primary dark:text-primaryDark/80 text-center">
          {title}
        </Text>
        <Text className="font-HelveticaRoman text-primary/30 dark:text-primaryDark/40 text-xs">
          {subtitle}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          router.back();
        }}
        className=" h-10 items-center justify-end !w-10 flex-3 "
      >
        <BigArrow
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          height={24}
          width={20}
        />
      </Pressable>
    </View>
  );
}
