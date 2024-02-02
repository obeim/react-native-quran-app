import { View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { FlatList, Text } from "react-native";
import { AyaCard } from "./components/AyaCard";
import { useQuery } from "react-query";
import { getSuraWithAyat } from "@/db/repos/SurahsRepo";
import useOnAyaScrolling from "@/utils/useOnAyaScrolling";

const Surah = () => {
  const local = useLocalSearchParams();

  const { isLoading, data, isFetched } = useQuery(
    "sura",
    () => {
      return getSuraWithAyat(parseInt(local.id as string));
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
        <View className=" bg-white">
          <FlatList
            data={data?.ayat}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current as any
            }
            renderItem={({ item, index }) => (
              <View className="bg-lotion" key={index}>
                {local.id !== "1" && local.id !== "9" && index === 0 && (
                  <Text className="mt-5 text-primary font-UthmanicHafs text-lg text-center ">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </Text>
                )}
                <AyaCard
                  ayah={item}
                  isFirst={index === 0}
                  isLast={index + 1 !== data?.ayat.length}
                />
              </View>
            )}
            className="w-full bg-lotion h-[93%] px-5 overflow-hidden"
          />
        </View>
      </View>
    )
  );
};

export default Surah;
