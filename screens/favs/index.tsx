import Fav from "@/utils/Favs";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import ArrowRight from "@/assets/icons/arrow_right.svg";
import { useMemo, useState } from "react";
import { SearchInput } from "../home/components/SearchInput";

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

      <View>
        <SearchInput
          value={search || ""}
          onChange={(value) => setSearch(value)}
        />
      </View>
      {isLoading && (
        <Text className="text-center font-HelveticaRoman mt-5 h-[80%] text-primary dark:text-primaryDark">
          جاري التحميل...
        </Text>
      )}
      {data?.length === 0 ? (
        <Text className="text-center font-HelveticaRoman mt-5 h-[80%] text-primary dark:text-primaryDark">
          لا يوجد عناصر محفوظة
        </Text>
      ) : (
        <ScrollView className="flex-col h-[80%] gap-y-4 pb-3 mt-2">
          {filteredData?.map((item) => (
            <View
              key={item.id}
              className="bg-lotion dark:bg-blackCoral rounded px-4 pb-3 pt-5"
            >
              <MaterialIcons
                name="bookmark"
                onPress={() => {
                  Fav.deleteFav(item.id);
                  queryClient.invalidateQueries({ queryKey: ["favs"] });
                }}
                fill="white"
                color="white"
                style={{ position: "absolute", top: 0, right: 0 }}
                size={22}
              />
              <Text className=" text-xl min-[600px]:text-2xl py-3 text-primary  dark:text-primaryDark !font-UthmanicHafs ">
                {item.text}
              </Text>
              <View className="justify-between flex-row">
                <View>
                  <Text className="text-primary  dark:text-primaryDark !font-UthmanicHaf">
                    سورة {item.sora_name}
                  </Text>
                  <Text className="text-primary  dark:text-primaryDark !font-UthmanicHaf text-xs mt-2">
                    الاية {item.number}
                  </Text>
                </View>

                <Pressable
                  onPress={() => {
                    if (item) Fav.goToFav({ ...item });
                  }}
                  className="flex-row py-3  pl-4"
                >
                  <Text className="text-primary  dark:text-primaryDark !font-HelveticaRoman">
                    متابعة
                  </Text>
                  <ArrowRight
                    style={{
                      // @ts-ignore
                      color: colorScheme === "dark" ? "#FAF0E6" : "#544981",
                    }}
                    width={20}
                    height={12}
                    className="mt-2"
                  />
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Favs;
