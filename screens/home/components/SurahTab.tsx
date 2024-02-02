import { FlatList, Text } from "react-native";
import SurahCard from "./SurahCard";
import { router } from "expo-router";
import { Surah } from "@/types";
import { useMemo } from "react";

const SurahTab = ({ data, search }: { data: Surah[]; search: string }) => {
  const filterdData = useMemo(
    () =>
      data.filter ? data?.filter((item) => item.name_ar.includes(search)) : [],
    [search, data]
  );

  return (
    <FlatList
      data={filterdData}
      scrollEnabled
      className="h-[60%] mt-3 flex-2 flex-col "
      numColumns={2}
      contentContainerStyle={{ gap: 2 }}
      ListEmptyComponent={
        <Text className="my-8 text-center text-gray-300 font-HelveticaLight">
          لا يوجد سور
        </Text>
      }
      columnWrapperStyle={{ gap: 10 }}
      showsVerticalScrollIndicator={false}
      renderItem={renderSurah}
    />
  );
};

export default SurahTab;

const renderSurah = ({ item }: { item: Surah }) => (
  <SurahCard
    onPress={() => {
      router.push(`/surah/${item.number}`);
    }}
    key={item.number}
    sura={item}
  />
);
