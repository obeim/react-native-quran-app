import { Text, View } from "react-native";
import { AyaCard } from "./AyaCard";
import { memo } from "react";
import { Ayah } from "@/types";
import { AyatBottomNav } from "@/screens/jozz/components/AyatBottomNav";

export const AyahItem = memo(
  ({
    item,
    index,
    data,
    id,
    onPress,
    marked,
  }: {
    item: Ayah;
    index: number;
    data: any;
    id: string;
    onPress?: () => void;
    marked: boolean;
  }) => {
    return (
      <View className="bg-lotion dark:bg-blackCoral h-30" key={index}>
        {id !== "1" && id !== "9" && index === 0 && (
          <Text className="mt-5 text-primary dark:text-primaryDark font-UthmanicHafs text-lg text-center ">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </Text>
        )}
        <AyaCard
          marked={marked}
          ayah={item}
          isFirst={index === 0}
          isLast={index + 1 !== data?.ayat.length}
          onPress={onPress}
        />
        {data?.ayat?.length - 1 === index && <AyatBottomNav type="surah" />}
      </View>
    );
  },

  (prevProps, nextProps) => {
    return prevProps.item.aya_no === nextProps.item.aya_no;
  }
);
