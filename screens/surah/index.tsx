import { View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { FlatList, ScrollView, Text } from "react-native";
import { useQuery } from "react-query";
import { getSuraWithAyat } from "@/db/repos/SurahsRepo";
import useOnAyaScrolling from "@/utils/useOnAyaScrolling";
import useScrollToAya from "@/utils/useScrollToAya";
import { AyahItem } from "./components/AyahItem";
import { Fragment, useState } from "react";
import { Ayah, Surah as SurahType } from "@/types";

const Surah = () => {
  const local = useLocalSearchParams();
  const [layout, setLayout] = useState<"page" | "ayat">("ayat");

  const { flatListRef, onScrollToIndexFailed } = useScrollToAya();
  const { isLoading, data, isFetched } = useQuery(
    "sura",
    () => {
      return getSuraWithAyat(parseInt((local.id as string).split("s")[0]));
    },
    { cacheTime: Infinity }
  );
  const { viewabilityConfigCallbackPairs } = useOnAyaScrolling({});

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
          {layout === "page" && (
            <ScrollView
              pagingEnabled
              className=" px-2 h-[93%] py-3 bg-lotion dark:bg-blackCoral"
            >
              {local.id !== "1" && local.id !== "9" && (
                <Text className="mt-5 text-primary dark:text-primaryDark font-UthmanicHafs text-xl text-center ">
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </Text>
              )}
              {data && <PageComponent data={data} />}
            </ScrollView>
          )}
          {layout === "ayat" && (
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
                  {...{ item, id: local.id as string, index, data: data }}
                />
              )}
              className="w-full bg-lotion dark:bg-blackCoral h-[93%] px-5 overflow-hidden"
            />
          )}
        </View>
      </View>
    )
  );
};

export default Surah;
interface SurahwithAyat extends SurahType {
  ayat: Ayah[];
}
interface PageProps {
  currentPage?: number;
  nextPage?: number;
  data: SurahwithAyat;
}
const PageComponent = ({ currentPage = 1, nextPage = 1, data }: PageProps) => {
  return (
    <View className="bg-lotion dark:bg-blackCoral">
      <Text className="text-center text-xl py-3 mb-9 leading-[49px] text-primary dark:text-primaryDark !font-UthmanicHafs w-full">
        {data?.ayat.map((aya) => aya.aya_text_tashkil + `  (${aya.aya_no})  `)}
      </Text>
    </View>
  );
};
