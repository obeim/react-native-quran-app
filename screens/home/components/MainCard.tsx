import { Pressable, Text, View } from "react-native";
import Doc from "@/assets/icons/doc.svg";
import ArrowRight from "@/assets/icons/arrow_right.svg";
import { router } from "expo-router";

export function MainCard() {
  return (
    <View className="mt-5 bg-lotion p-3 w-full  rounded-[17px] px-6 pt-6 pb-7 ">
      <View className="flex-1 flex flex-row gap-2 items-start  pb-5">
        <Doc width={20} height={20} />
        <Text className="font-HelveticaRoman h-20 text-secondary/20 text-base">
          ماتم قراءته موخرا
        </Text>
      </View>
      <Text className="font-HelveticaRoman text-5xl pt-10 text-primary">
        الفاتحة
      </Text>
      <View className="flex-1 flex-row  justify-between items-center pt-4">
        <Text className="text-secondary/30 h-8 font-HelveticaLight">
          الأية : 1
        </Text>
        <Pressable
          className="flex-[0.2] h-8 flex-row items-center "
          onPress={() => {
            router.navigate("/surah");
          }}
        >
          <Text className=" font-HelveticaBold  text-primary">متابعة</Text>
          <ArrowRight width={22} height={12} className="mt-2" />
        </Pressable>
      </View>
    </View>
  );
}
