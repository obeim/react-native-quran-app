import { FlatList, Text } from "react-native";
import SurahCard from "./SurahCard";
import { router } from "expo-router";
import useSuar from "@/db/hooks/useSuar";
import { useEffect, useMemo } from "react";

const SurahTab = ({ search }: { search: string }) => {
  const searcQuery = useMemo(() => {
    if (search) return { where: { name_ar: { contains: `%${search}%` } } };
    else return {};
  }, [search]);

  const { loading, data } = useSuar({
    order: { number: "ASC" },
    ...searcQuery,
  });

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <FlatList
      data={data}
      scrollEnabled
      className="h-[60%]  flex-2 flex-col "
      numColumns={2}
      contentContainerStyle={{ gap: 2 }}
      columnWrapperStyle={{ gap: 10 }}
      initialNumToRender={10}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      refreshing={loading}
      renderItem={({ item }) => (
        <SurahCard
          onPress={() => {
            router.push(`/surah/${item.number}`);
          }}
          key={item.number}
          sura={item}
        />
      )}
    />
  );
};

export default SurahTab;
