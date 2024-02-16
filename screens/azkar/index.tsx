import { ScrollView, Text, View } from "react-native";
import { Header } from "../jozz/Header";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "react-query";
import { getAzkarByCate } from "@/db/repos/AzkarRepo";
import { ZekrCard } from "./components/ZekrCard";

export const Azkar = () => {
  const local = useLocalSearchParams();
  const { data, isLoading } = useQuery(
    "azkar",
    async () => getAzkarByCate(`${local.category}`),
    { cacheTime: Infinity }
  );

  return (
    <View className="h-full">
      <Header title={`${local.category}`} />
      <ScrollView className=" w-full bg-white  dark:bg-blackCoral h-[93%] px-5 overflow-hidden">
        {isLoading && (
          <Text className="text-center font-HelveticaRoman mt-5 text-primary dark:text-primaryDark">
            جاري التحميل...
          </Text>
        )}
        {data && (
          <View className="mt-4">
            {data?.map((zekr, i) => (
              <ZekrCard zekr={zekr} key={i} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Azkar;
