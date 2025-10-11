import { useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";
import useOnAyaScrolling from "@/utils/useOnAyaScrolling";
import useScrollToAya from "@/utils/useScrollToAya";
import { AyahItem } from "./AyahItem";
import { Ayah, FavType, Surah as SurahType } from "@/types";

interface SurahwithAyat extends SurahType {
  ayat: Ayah[];
}
export interface PageProps {
  data?: SurahwithAyat;
  onPressAyah?: (aya: Ayah) => void;
  Favs?: FavType[];
  setCurrentPage?: (value: number) => void;
}
export function AyatView({ data, onPressAyah, Favs }: PageProps) {
  const local = useLocalSearchParams();

  const { flatListRef, onScrollToIndexFailed } = useScrollToAya();
  const { viewabilityConfigCallbackPairs } = useOnAyaScrolling({
    type: "surah",
  });

  return (
    <FlatList
      ref={flatListRef as any}
      data={data?.ayat}
      viewabilityConfigCallbackPairs={
        viewabilityConfigCallbackPairs.current as any
      }
      initialNumToRender={
        parseInt((local.id as string).split("s")[1]) + 2 || undefined
      }
      onScrollToIndexFailed={onScrollToIndexFailed}
      renderItem={({ item, index }) => (
        <AyahItem
          marked={Favs?.some((fav) => fav.id == item.id) || false}
          onPress={() => {
            onPressAyah?.(item);
          }}
          {...{ item, id: local.id as string, index, data: data }}
        />
      )}
      className="w-full bg-lotion dark:bg-blackCoral h-[96%] px-5 overflow-hidden"
    />
  );
}
