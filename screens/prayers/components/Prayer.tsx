import { Text, View } from "react-native";

export function Prayer({ title, value }: { title: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center bg-lotion dark:bg-blackCoral p-5 rounded-md mt-5">
      <Text className="text-2xl font-HelveticaRoman text-primary dark:text-primaryDark">
        {title}
      </Text>
      <Text className="text-xl font-HelveticaRoman text-primary dark:text-primaryDark">
        {value}
      </Text>
    </View>
  );
}
