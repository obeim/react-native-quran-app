import { View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { FlatList } from "react-native";
import { useQuery } from "react-query";
import { getSuraWithAyat } from "@/db/repos/SurahsRepo";
import useOnAyaScrolling from "@/utils/useOnAyaScrolling";
import useScrollToAya from "@/utils/useScrollToAya";
import { AyahItem } from "./components/AyahItem";

const Surah = () => {
  const local = useLocalSearchParams();
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
          title={data?.name_ar?.slice(5)}
          subtitle={` ${data?.ayat?.length} أيات - ${
            { Meccan: "مكية", Medinan: "مدنية" }[data?.type || "Meccan"]
          }`}
        />
        <View className=" bg-white dark:bg-darkBg">
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
        </View>
      </View>
    )
  );
};

export default Surah;
