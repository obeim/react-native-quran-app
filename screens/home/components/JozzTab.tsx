import { FlatList, Text } from "react-native";
import { router } from "expo-router";
import JozzCard from "./JozzCard";
import useJozzList from "@/utils/db/useJozzList";
const JozzTab = ({ search }: { search: string }) => {
  const data = useJozzList();

  const filterdData = data?.filter
    ? data?.filter((item) => item.name.includes(search))
    : [];

  return (
    <FlatList
      data={filterdData}
      scrollEnabled
      className="h-[56%] flex-2 flex-col mt-3"
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
