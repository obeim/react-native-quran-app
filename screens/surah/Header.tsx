import { Pressable, View } from "react-native";
import BigArrow from "@/assets/icons/big_arrow.svg";
import { Text } from "react-native";
import { router } from "expo-router";

export function Header({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <View className="flex flex-row justify-between  pb-4 pt-2 px-2 h-[7%]  bg-white items-center">
      <Pressable
        onPress={() => {
          router.back();
        }}
        className="bg-white flex-3  items-center"
      >
        <Text className="font-HelveticaRoman text-lg text-primary text-center">
          {title}
        </Text>
        <Text className="font-HelveticaRoman text-primary/30 text-xs">
          {subtitle}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          router.back();
        }}
        className=" h-10 items-center justify-end !w-10 flex-3 "
      >
        <BigArrow height={24} width={20} />
      </Pressable>
    </View>
  );
}
