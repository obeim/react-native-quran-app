import { FlatList } from "react-native";
import { router } from "expo-router";
import JozzCard from "./JozzCard";
import useJozzs from "@/db/hooks/useJozzs";
const JozzTab = () => {
  const { jozzItems } = useJozzs();

  return (
    <FlatList
      data={jozzItems}
      scrollEnabled
      className="h-[60%] flex-2 flex-col "
      numColumns={2}
      contentContainerStyle={{ gap: 2 }}
      columnWrapperStyle={{ gap: 10 }}
      initialNumToRender={10}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <JozzCard
          onPress={() => {
            router.navigate(`/jozz/${item.id}`);
          }}
          key={item.id}
          jozz={item}
        />
      )}
    />
  );
};

export default JozzTab;
