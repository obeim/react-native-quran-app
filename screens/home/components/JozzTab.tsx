import { FlatList } from "react-native";
import { router } from "expo-router";
import JozzCard from "./JozzCard";
import { useQuery } from "react-query";
const JozzTab = () => {
  const { data } = useQuery(
    "jozzs",
    async () => {
      let JozzArray: { id: number; name: string }[] = [];
      Array.apply(0, Array(30)).forEach((item, index) => {
        JozzArray.push({
          id: index + 1,
          name: `الجزء ${index + 1}`,
        });
      });
      return JozzArray;
    },
    { cacheTime: Infinity }
  );

  return (
    <FlatList
      data={data}
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
            router.push(`/jozz/${item.id}`);
          }}
          key={item.id}
          jozz={item}
        />
      )}
    />
  );
};

export default JozzTab;
