import { Pressable, View } from "react-native";
import BigArrow from "@/assets/icons/big_arrow.svg";
import Menu from "@/assets/icons/Menu.svg";
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
    <View className="flex flex-row justify-between  py-4 px-2 h-[9%]  bg-white items-center">
      <View></View>
      <Pressable
        onPress={() => {
          router.back();
        }}
        className="bg-white flex-1 items-center"
      >
        <Text className="font-HelveticaRoman text-lg text-primary">
          {title}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          router.back();
        }}
        className=" h-10 items-center justify-end !w-10 flex-3 "
      >
        <BigArrow height={28} width={20} />
      </Pressable>
    </View>
  );
}
