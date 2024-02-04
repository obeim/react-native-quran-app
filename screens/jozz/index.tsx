import { FlatList, View } from "react-native";
import { useQuery } from "react-query";
import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { getAyatAsJozz } from "@/db/repos/AyatRepo";
import useOnAyaScrolling from "@/utils/useOnAyaScrolling";
import useScrollToAya from "@/utils/useScrollToAya";
import { AyahItem } from "./components/AyahItem";

const Jozz = () => {
  const local = useLocalSearchParams();

  const { flatListRef, onScrollToIndexFailed } = useScrollToAya();

  const { isLoading, data, isFetched } = useQuery(
    "jozz",
    () => {
      return getAyatAsJozz(
        parseInt((local.id as string).split("s")[0] as string)
      );
    },
    { cacheTime: Infinity }
  );

  const { viewabilityConfigCallbackPairs } = useOnAyaScrolling({
    type: "jozz",
  });

  return (
    !isLoading &&
    isFetched && (
      <View className="h-full">
        <Header title={`الجزء ${(local.id as string).split("s")[0]}`} />
        <FlatList
          ref={flatListRef as any}
          data={data}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current as any
          }
          initialNumToRender={
            parseInt((local.id as string).split("s")[1]) + 2 || undefined
          }
          onScrollToIndexFailed={onScrollToIndexFailed}
          renderItem={({ item, index }) => (
            <AyahItem {...{ item, index, data: data }} />
          )}
          className="w-full bg-lotion dark:bg-blackCoral h-[91%] px-5 overflow-hidden"
        />
      </View>
    )
  );
};

export default Jozz;
