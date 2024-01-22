import { FlatList, Text } from "react-native";
import SurahCard from "./SurahCard";
import { router } from "expo-router";
import useSuar from "@/db/hooks/useSuar";

const SurahTab = () => {
  const { loading, data } = useSuar({
    order: { number: "ASC" },
  });

  return (
    !loading && (
      <FlatList
        data={data}
        scrollEnabled
        className="h-[53%]  flex-2 flex-col "
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
              router.navigate(`/surah/${item.number}`);
            }}
            key={item.number}
            sura={item}
          />
        )}
      />
    )
  );
};

export default SurahTab;
