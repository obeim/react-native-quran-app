import Fav from "@/utils/Favs";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { useMemo, useState } from "react";
import { SearchInput } from "../home/components/SearchInput";
import { FavCard } from "./components/FavCard";

const Favs = () => {
  const [search, setSearch] = useState<string>();
  const { data, isLoading } = useQuery("favs", () => Fav.getFav());

  const { colorScheme } = useColorScheme();
  const queryClient = useQueryClient();

  const filteredData = useMemo(
    () =>
      search && data
        ? data?.filter((aya) => aya?.aya_text_emlaey?.includes(search))
        : data,
    [search, data]
  );

  return (
    <View className="px-5 bg-white dark:bg-darkBg">
      <View className="flex-row justify-between h-[10%] items-center">
        <Text className="text-2xl text-primary dark:text-primaryDark font-HelveticaRoman">
          المحفوظات
        </Text>
        <AntDesign
          name="close"
          style={{ padding: 8 }}
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          size={26}
          onPress={() => {
            router.back();
          }}
        />
      </View>

      {data && data?.length > 0 && (
        <View>
          <SearchInput
            value={search || ""}
            onChange={(value) => setSearch(value)}
          />
        </View>
      )}
      {isLoading && (
        <Text className="text-center font-HelveticaRoman mt-5 h-[80%] text-primary dark:text-primaryDark">
          جاري التحميل...
        </Text>
      )}
      {data?.length === 0 ? (
        <Text className="text-center font-HelveticaRoman mt-20 h-[80%] text-primary dark:text-primaryDark">
          لا يوجد عناصر محفوظة
        </Text>
      ) : (
        <ScrollView className="flex-col h-[80%] gap-y-3 pb-3 mt-2">
          {filteredData?.map((item) => (
            <View key={item.id}>
              <FavCard
                item={item}
                onFav={() => {
                  Fav.deleteFav(item.id);
                  queryClient.invalidateQueries({ queryKey: ["favs"] });
                }}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Favs;
