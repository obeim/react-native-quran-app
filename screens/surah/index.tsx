import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { FlatList, View } from "react-native";
import { useQuery } from "react-query";
import { getSuraWithAyat } from "@/db/repos/SurahsRepo";
import useOnAyaScrolling from "@/utils/useOnAyaScrolling";
import useScrollToAya from "@/utils/useScrollToAya";
import { AyahItem } from "./components/AyahItem";
import { useState } from "react";
import { Ayah, Surah as SurahType } from "@/types";
import { PageView } from "./components/PageView";

const Surah = () => {
  const local = useLocalSearchParams();
  const [layout, setLayout] = useState<"page" | "ayat">("ayat");

  const { isLoading, data, isFetched } = useQuery(
    "sura",
    () => {
      return getSuraWithAyat(parseInt((local.id as string).split("s")[0]));
    },
    { cacheTime: Infinity }
  );

  return (
    !isLoading &&
    isFetched && (
      <View>
        <Header
          layout={layout}
          setLayout={setLayout}
          title={data?.name_ar?.slice(5)}
          subtitle={` ${data?.ayat?.length} أيات - ${
            { Meccan: "مكية", Medinan: "مدنية" }[data?.type || "Meccan"]
          }`}
        />
        <View className=" bg-white dark:bg-darkBg">
          {
            { page: <PageView data={data} />, ayat: <AyatView data={data} /> }[
              layout
            ]
          }
        </View>
      </View>
    )
  );
};

export default Surah;
interface SurahwithAyat extends SurahType {
  ayat: Ayah[];
}
export interface PageProps {
  data?: SurahwithAyat;
}
function AyatView({ data }: PageProps) {
  const local = useLocalSearchParams();

  const { flatListRef, onScrollToIndexFailed } = useScrollToAya();
  const { viewabilityConfigCallbackPairs } = useOnAyaScrolling({});

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
        <AyahItem {...{ item, id: local.id as string, index, data: data }} />
      )}
      className="w-full bg-lotion dark:bg-blackCoral h-[93%] px-5 overflow-hidden"
    />
  );
}
