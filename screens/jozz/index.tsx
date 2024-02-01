import { FlatList, Text, View } from "react-native";
import { useQuery } from "react-query";
import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { AyaCard } from "../surah/components/AyaCard";
import { getAyatAsJozz } from "@/db/repos/AyatRepo";
import { useState } from "react";

const Jozz = () => {
  const local = useLocalSearchParams();
  const { isLoading, data, isFetched } = useQuery(
    "jozz",
    () => {
      return getAyatAsJozz(parseInt(local.id as string));
    },
    { cacheTime: Infinity }
  );
  const [currentSora, setCurrentSora] = useState();

  return (
    !isLoading &&
    isFetched && (
      <View className="h-full">
        <Header title={`الجزء ${local.id}`} />
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View key={index}>
              {item.sora_name_ar !== "no" && (
                <Text className="my-2  bg-primary mx-auto text-white font-UthmanicHafs text-lg w-1/2  text-center">
                  {item.sora_name_ar}
                </Text>
              )}
              <AyaCard
                ayah={item}
                isFirst={index === 0}
                isLast={index + 1 !== data?.length}
              />
            </View>
          )}
          className="w-full bg-lotion h-[91%]  px-5  overflow-hidden"
        />
      </View>
    )
  );
};

export default Jozz;
