import { FlatList, Pressable, Text, View } from "react-native";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getCategories } from "@/db/repos/CategoryRepo";
import { router } from "expo-router";

export const AzkarTab = ({ search }: { search: string }) => {
  const { data, isLoading } = useQuery(
    "category",
    async () => getCategories(),
    { cacheTime: Infinity }
  );

  const filterdData = useMemo(
    () =>
      data?.filter
        ? data?.filter((item) => item?.cat_name?.includes(search))
        : [],
    [search, data]
  );

  return (
    <View>
      {isLoading && (
        <Text className="text-center font-HelveticaRoman mt-5 text-primary dark:text-primaryDark">
          جاري التحميل...
        </Text>
      )}
      {data && (
        <FlatList
          data={filterdData}
          scrollEnabled
          className="h-[71%] min-[600px]:h-[76.5%]  flex-col mt-3"
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
