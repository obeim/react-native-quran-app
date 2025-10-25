import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { useMemo } from "react";

import { useKeepAwake } from "expo-keep-awake";
import { useGetSurahWithAyat } from "@/utils/db/useGetSurahWithAyat";
import SurahBody from "./components/SurahBody";

const Surah = () => {
  useKeepAwake();
  const local = useLocalSearchParams();

  const surahId = useMemo(
    () => parseInt((local.id as string).split("s")[0]),
    [local.id]
  );
  const data = useGetSurahWithAyat(surahId);

  if (!data) return null;

  return (
    <View className="h-full">
      <SurahBody data={data} />
    </View>
  );
};

export default Surah;
