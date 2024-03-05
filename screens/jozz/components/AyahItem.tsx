import { Text, View } from "react-native";

import { memo } from "react";
import { Ayah } from "@/types";
import { AyaCard } from "@/screens/surah/components/AyaCard";
import { AyatBottomNav } from "./AyatBottomNav";

export const AyahItem = memo(
  ({
    item,
    index,
    data,
    onPress,
    marked,
  }: {
    item: Ayah;
    index: number;
    data: any;
    onPress?: () => void;
    marked: boolean;
  }) => (
    <View className="bg-lotion dark:bg-blackCoral">
      {!item.sora_name_ar.includes("no") && (
        <Text className="my-2  bg-primary dark:bg-darkBg mx-auto text-white dark:text-primaryDark font-UthmanicHafs text-lg w-full text-center">
          {item.sora_name_ar}
        </Text>
      )}
      <AyaCard
        marked={marked}
        onPress={onPress}
        ayah={item}
        isFirst={index === 0}
        isLast={index + 1 !== data?.length}
        index={index}
      />
      {data?.length - 1 === index && <AyatBottomNav type="jozz" />}
    </View>
  ),

  (prevProps, nextProps) => {
    return prevProps.item.aya_no === nextProps.item.aya_no;
  }
);
