import Fav from "@/utils/Favs";
import { PanResponder, ScrollView, Text, View } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { useMemo, useState } from "react";
import { SearchInput } from "../home/components/SearchInput";
import { FavCard } from "./components/FavCard";
import { Header } from "../jozz/Header";
import { useKeepAwake } from "expo-keep-awake";

const Favs = () => {
  useKeepAwake();
  const [search, setSearch] = useState<string>();
  const { data, isLoading } = useQuery("favs", () => Fav.getFav());

  const queryClient = useQueryClient();

  const filteredData = useMemo(
    () =>
      data?.filter && search
        ? data?.filter((aya) => aya?.aya_text_emlaey?.includes(search))
        : data,
    [search, data]
  );

  return (
    <View className=" bg-white dark:bg-darkBg">
      <Header title="العلامات المرجعية" />

      <View className="px-5">
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
        {filteredData?.length === 0 ? (
          <Text className="text-center font-HelveticaRoman mt-20 h-[80%] text-primary dark:text-primaryDark">
            لا يوجد علامات مرجعية
          </Text>
        ) : (
          <ScrollView className="flex-col h-[80%] gap-y-3 pb-3 mt-2">
            {filteredData?.reverse()?.map((item) => (
              <View key={item.id}>
                <FavCard
                  onDelete={() => {
                    Fav.deleteFav(item.id);
                    queryClient.invalidateQueries({ queryKey: ["favs"] });
                  }}
                  item={item}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Favs;
