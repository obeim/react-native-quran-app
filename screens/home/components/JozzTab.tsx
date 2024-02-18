import { FlatList, Text } from "react-native";
import { router } from "expo-router";
import JozzCard from "./JozzCard";
import { useQuery } from "react-query";
import { useMemo } from "react";
const JozzTab = ({ search }: { search: string }) => {
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

  const filterdData = useMemo(
    () =>
      data?.filter ? data?.filter((item) => item.name.includes(search)) : [],
    [search, data]
  );

  return (
    <FlatList
      data={filterdData}
      scrollEnabled
      className="h-[60%] min-[600px]:h-[62%] flex-2 flex-col mt-3"
      numColumns={2}
      contentContainerStyle={{ gap: 2 }}
      columnWrapperStyle={{ gap: 10 }}
      initialNumToRender={10}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={
        <Text className="my-8 text-center text-gray-300 font-HelveticaLight">
          لا يوجد
        </Text>
      }
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
