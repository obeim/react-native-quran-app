import { ScrollView, Text, View } from "react-native";
import { Prayer } from "./components/Prayer";
import { Header } from "../jozz/Header";
import { useGetPrayersTime } from "@/utils/useGetPrayersTime";

const PrayerTimes = () => {
  const { timings, isLoading, error } = useGetPrayersTime();

  return (
    <View className=" bg-white dark:bg-darkBg">
      <Header title="مواقيت الصلاة" />
      <View className="px-5">
        {isLoading && (
          <Text className="text-center font-HelveticaRoman mt-5 h-[90%] text-primary dark:text-primaryDark">
            جاري التحميل...
          </Text>
        )}
        {!isLoading && error && (
          <Text className="text-center mt-6 text-primary dark:text-primaryDark font-HelveticaRoman">
            {error}
          </Text>
        )}
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
    </View>
  );
};

export default PrayerTimes;
