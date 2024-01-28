import { View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { Surah as SurahType } from "@/types/Suar";
import { Header } from "./Header";
import { FlatList, Text } from "react-native";
import { AyaCard } from "./components/AyaCard";
import { useQuery } from "react-query";
import { getSuraWithAyat } from "@/db/repos/SurahsRepo";

const Surah = () => {
  const local = useLocalSearchParams();
  const { isLoading, data, isFetched } = useQuery(
    "sura",
    () => {
      return getSuraWithAyat(parseInt(local.id as string));
    },
    { cacheTime: Infinity }
  );

  return (
    !isLoading &&
    isFetched && (
      <View className="bg-white">
        <Header
          title={data?.name_ar?.slice(5)}
          subtitle={` ${data?.ayat?.length} أيات - ${
            { Meccan: "مكية", Medinan: "مدنية" }[data?.type || "Meccan"]
          }`}
        />
        <View className="p-2 bg-white">
          <FlatList
            data={data?.ayat}
            renderItem={({ item, index }) => (
              <>
                {local.id !== "1" && local.id !== "9" && index === 0 && (
                  <Text className="mt-5 text-primary font-HafsSmart text-lg text-center ">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </Text>
                )}
                <AyaCard
                  ayah={item}
                  isFirst={index === 0}
                  isLast={index + 1 !== data?.ayat.length}
                />
              </>
            )}
            className="w-full bg-lotion h-[91%]  px-5 rounded-2xl overflow-hidden"
          />
        </View>
      </View>
    )
  );
};

export default Surah;
