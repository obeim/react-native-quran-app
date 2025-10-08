import { FlatList, Text } from "react-native";
import SurahCard from "./SurahCard";
import { router } from "expo-router";
import { Surah } from "@/types";

const SurahTab = ({ data, search }: { data: Surah[]; search: string }) => {
  const filterdData = data?.filter
    ? data?.filter((item) => item.name_ar.includes(search))
    : [];

  return (
    <FlatList
      data={filterdData}
      scrollEnabled
      className="h-[80%] flex-col mt-3"
      numColumns={2}
      contentContainerStyle={{ gap: 2 }}
      ListEmptyComponent={
        <Text className="my-8 text-center text-primaryDark font-HelveticaLight">
          لا يوجد سور
        </Text>
      }
      columnWrapperStyle={{ gap: 10 }}
      showsVerticalScrollIndicator={false}
      renderItem={RenderSurah}
      keyExtractor={(item, index) => item.name_ar}
    />
  );
};

export default SurahTab;

const RenderSurah = ({ item }: { item: Surah }) => (
  <SurahCard
    onPress={() => {
      router.push(`/surah/${item.number}`);
    }}
    key={item.number}
    sura={item}
  />
);
