import { Alert, Dimensions, ScrollView, Text, View } from "react-native";
import { Header } from "../jozz/Header";
import { useLocalSearchParams } from "expo-router";
import { getAzkarByCate } from "@/services/AzkarService";
import { ZekrCard } from "./components/ZekrCard";
import { useEffect, useState } from "react";
import CompletedModal from "./components/CompletedModal";
import { Bar } from "react-native-progress";
import { useColorScheme } from "nativewind";
import { useKeepAwake } from "expo-keep-awake";

export const Azkar = () => {
  useKeepAwake();
  const local = useLocalSearchParams();
  const { colorScheme } = useColorScheme();
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [completeModal, setCompleteModal] = useState(false);

  const data = getAzkarByCate(local.category as string);

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
      {data && (
        <Bar
          progress={completedCount / data?.length}
          width={Dimensions.get("screen").width}
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          borderWidth={0}
          height={1}
        />
      )}
      <ScrollView className=" w-full bg-white  dark:bg-blackCoral h-[93%] px-5 ">
        {data && (
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
