import { Surah } from "@/types";
import { memo } from "react";
import { Text, View, Pressable } from "react-native";

const SurahCard = ({
  sura,
  onPress,
}: {
  sura: Surah;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className=" bg-lotion basis-2  my-2 p-3 w-full rounded-[17px] px-6 flex-1 flex-row  items-start"
    >
      <Text className="text-darkGray/20 text-base">{sura.number}</Text>
      <View className="ml-1">
        <Text className="text-primary font-HelveticaRoman text-xl">
          {sura.name_ar.split("سورة")[1]}
        </Text>
        <Text className="text-secondary/30 text-center">
          {{ Meccan: "مكية", Medinan: "مدنية" }[sura.type]}
        </Text>
      </View>
    </Pressable>
  );
};

export default memo(SurahCard);
