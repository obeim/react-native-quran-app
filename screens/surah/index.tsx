import { View } from "@/components/Themed";
import useSura from "@/db/hooks/useSura";
import { useLocalSearchParams } from "expo-router";
import { Surah as SurahType } from "@/types/Suar";
import { Header } from "./Header";
import { FlatList, Text } from "react-native";
import { AyaCard } from "./components/AyaCard";

const Surah = () => {
  const local = useLocalSearchParams();
  const { data, loading } = useSura(parseInt(local.id as string));
  return (
    !loading && (
      <View className="bg-white">
        <Header data={data as SurahType} />
        <View className="p-2 bg-white">
          <FlatList
            data={data.ayat}
            renderItem={({ item, index }) => (
              <>
                {local.id !== "1" && index === 0 && (
                  <Text className="mt-5 text-primary font-HelveticaRoman text-lg text-center ">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </Text>
                )}
                <AyaCard
                  ayah={item}
                  isFirst={index === 0}
                  isLast={index + 1 !== data.ayat.length}
                />
              </>
            )}
            className="w-full bg-lotion h-[91%]  px-5 rounded-2xl overflow-hidden"
          />
        </View>
      </View>
    )
  );
};

export default Surah;
