import { FlatList, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import useGetAzkarCategories from "@/utils/db/useGetAzkarCategories";

export const AzkarTab = ({ search }: { search: string }) => {
  const data = useGetAzkarCategories();

  const filterdData = data?.filter
    ? data?.filter((item) => item?.cat_name?.includes(search))
    : [];

  return (
    <View>
      {data && (
        <FlatList
          data={filterdData}
          scrollEnabled
          className="h-[90%] flex-col mt-3"
          contentContainerStyle={{ gap: 2 }}
          initialNumToRender={data.length}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <Text className="my-8 text-center text-gray-300 font-HelveticaLight">
              لا يوجد
            </Text>
          }
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                router.push(`/azkar/${item.cat_name}`);
              }}
              key={index}
              className=" bg-lotion dark:bg-blackCoral basis-2  my-2 p-3 w-full rounded-[17px] px-6  flex-row  items-center"
            >
              <Text className="text-primary dark:text-primaryDark font-HelveticaRoman text-xl text-center w-full">
                {item.cat_name}
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};
