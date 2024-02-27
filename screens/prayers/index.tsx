import { Timings } from "@/types";
import useGetPrayersTime from "@/utils/useGetPrayersTime";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { Circle } from "react-native-progress";

const PrayerTimes = () => {
  const { timings, isLoading, error } = useGetPrayersTime();
  const { colorScheme } = useColorScheme();

  return (
    <View className="mt-10 px-5 ">
      <View className="flex-row justify-between">
        <Text className="text-2xl text-primary dark:text-primaryDark font-HelveticaRoman">
          مواقيت الصلاة
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

      {isLoading && (
        <Text className="text-center font-HelveticaRoman mt-5 text-primary dark:text-primaryDark">
          جاري التحميل...
        </Text>
      )}
      {!isLoading && error && <Text>{error}</Text>}
      {timings && (
        <ScrollView className="flex-col mt-6 h-[90%]">
          <Prayer title="الفجر" value={timings.Fajr.split(" ")[0]} />
          <Prayer title="الشروق" value={timings.Sunrise.split(" ")[0]} />
          <Prayer title="الظُّهْر" value={timings.Dhuhr.split(" ")[0]} />
          <Prayer title="العَصر" value={timings.Asr.split(" ")[0]} />
          <Prayer title="المَغرب" value={timings.Maghrib.split(" ")[0]} />
          <Prayer title="العِشاء" value={timings.Isha.split(" ")[0]} />
        </ScrollView>
      )}
    </View>
  );
};

export default PrayerTimes;
function Prayer({ title, value }: { title: string; value: string }) {
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
