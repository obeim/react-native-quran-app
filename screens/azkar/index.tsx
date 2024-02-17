import { Alert, ScrollView, Text, View } from "react-native";
import { Header } from "../jozz/Header";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "react-query";
import { getAzkarByCate } from "@/db/repos/AzkarRepo";
import { ZekrCard } from "./components/ZekrCard";
import { useEffect, useState } from "react";
import CompletedModal from "./components/CompletedModal";

export const Azkar = () => {
  const local = useLocalSearchParams();
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [completeModal, setCompleteModal] = useState(false);

  const { data, isLoading } = useQuery(
    "azkar",
    async () => getAzkarByCate(local.category as string),
    { cacheTime: Infinity }
  );

  useEffect(() => {
    if (completedCount === data?.length) {
      setCompleteModal(true);
    }
  }, [completedCount]);

  return (
    <View className="h-full">
      <CompletedModal
        opened={completeModal}
        close={() => setCompleteModal(false)}
      />
      <Header title={`${local.category}`} />
      <ScrollView className=" w-full bg-white  dark:bg-blackCoral h-[93%] px-5 overflow-hidden">
        {isLoading && (
          <Text className="text-center font-HelveticaRoman mt-5 text-primary dark:text-primaryDark">
            جاري التحميل...
          </Text>
        )}
        {data && !isLoading && (
          <View className="mt-4">
            {data?.map((zekr, i) => (
              <ZekrCard
                setCompletedCount={setCompletedCount}
                zekr={zekr}
                key={i}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Azkar;
