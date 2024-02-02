import { View } from "@/components/Themed";
import { Text } from "react-native";
import { AyaCard } from "./AyaCard";
import { memo } from "react";
import { Ayah } from "@/types";

export const AyahItem = memo(
  ({
    item,
    index,
    data,
    id,
  }: {
    item: Ayah;
    index: number;
    data: any;
    id: string;
  }) => (
    <View className="bg-lotion dark:bg-blackCoral h-30" key={index}>
      {id !== "1" && id !== "9" && index === 0 && (
        <Text className="mt-5 text-primary dark:text-primaryDark/70 font-UthmanicHafs text-lg text-center ">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </Text>
      )}
      <AyaCard
        ayah={item}
        isFirst={index === 0}
        isLast={index + 1 !== data?.ayat.length}
      />
    </View>
  ),

  (prevProps, nextProps) => {
    return prevProps.item.aya_no === nextProps.item.aya_no;
  }
);
