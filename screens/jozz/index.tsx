import { View } from "react-native";
import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";

import { useGetAyatAsJozz } from "@/utils/db/useGetAyatAsJozz";
import JozzBody from "./components/JozzBody";

const Jozz = () => {
  useKeepAwake();
  const local = useLocalSearchParams();

  const jozzId = useMemo(
    () => parseInt((local?.id as string).split("s")[0]),
    [local?.id]
  );

  const data = useGetAyatAsJozz(jozzId);

  if (!data) return null;

  return (
    <View className="h-full">
      <JozzBody jozzId={jozzId} data={data} />
    </View>
  );
};

export default Jozz;
