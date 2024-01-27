import { Pressable, Text, View } from "react-native";
import Doc from "@/assets/icons/doc.svg";
import ArrowRight from "@/assets/icons/arrow_right.svg";
import { router } from "expo-router";

export function MainCard() {
  return (
    <View className="mt-5 bg-lotion w-full  rounded-[17px] px-6 relative py-6">
      <View className="h-8 flex flex-col justify-center">
        <Text className="font-HelveticaRoman text-xl pt-2 text-primary">
          الفاتحة
        </Text>
        <Text className="text-secondary/30 font-HelveticaLight">الأية : 1</Text>
      </View>
      <Pressable
        className="flex-[0.2] h-8 flex-row items-center absolute right-3 top-6"
        onPress={() => {
          router.push("/surah/1");
        }}
      >
        <Text className=" font-HelveticaBold  text-primary">
          متابعة القراءة
        </Text>
        <ArrowRight width={22} height={12} className="mt-2" />
      </Pressable>
    </View>
  );
}
