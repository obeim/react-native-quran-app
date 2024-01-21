import { FlatList } from "react-native";
import { SurahCard } from "./SurahCard";
import suar from "@/constants/Suar";
import { router } from "expo-router";

const SurahTab = () => {
  return (
    <FlatList
      data={suar}
      scrollEnabled
      className="h-[53%]  flex-2 flex-col "
      numColumns={2}
      contentContainerStyle={{ gap: 2 }}
      columnWrapperStyle={{ gap: 10 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <SurahCard
          onPress={() => {
            router.navigate(`/surah/${item.number}`);
          }}
          key={item.number}
          sura={item}
        />
      )}
    />
  );
};

export default SurahTab;
