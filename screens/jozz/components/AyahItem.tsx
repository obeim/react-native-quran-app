import { View } from "@/components/Themed";
import { Text } from "react-native";

import { memo } from "react";
import { Ayah } from "@/types";
import { AyaCard } from "@/screens/surah/components/AyaCard";

export const AyahItem = memo(
  ({ item, index, data }: { item: Ayah; index: number; data: any }) => (
    <View key={index} className="bg-lotion dark:bg-blackCoral">
      {!item.sora_name_ar.includes("no") && (
        <Text className="my-2  bg-primary dark:bg-darkBg mx-auto text-white dark:text-primaryDark font-UthmanicHafs text-lg w-full text-center">
          {item.sora_name_ar}
        </Text>
      )}
      <AyaCard
        ayah={item}
        isFirst={index === 0}
        isLast={index + 1 !== data?.length}
      />
    </View>
  ),

  (prevProps, nextProps) => {
    return prevProps.item.aya_no === nextProps.item.aya_no;
  }
);
