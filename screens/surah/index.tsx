import { View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

const Surah = () => {
  const local = useLocalSearchParams();
  return (
    <View className="bg-white">
      <Text>سورة {local.id}</Text>
    </View>
  );
};

export default Surah;
