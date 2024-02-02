import { Pressable, Text, View } from "react-native";
import ArrowRight from "@/assets/icons/arrow_right.svg";
import { router, useFocusEffect } from "expo-router";
import { storage } from "@/utils";
import { useCallback, useState } from "react";
import { Recent } from "@/types";
import { useColorScheme } from "nativewind";

export function MainCard() {
  const [recent, setRecent] = useState<Recent>();
  const { colorScheme } = useColorScheme();
  useFocusEffect(
    useCallback(() => {
      let recentJSON = storage.getString("recent");
      if (recentJSON) setRecent(JSON.parse(recentJSON));
    }, [])
  );

  return (
    <View className="mt-5 bg-lotion dark:bg-blackCoral w-full  rounded-[17px] px-6 relative py-6">
      {recent ? (
        <>
          <View className="h-6 flex flex-col justify-center ">
            <Text className="font-HelveticaRoman text-xl text-primary dark:text-primaryDark/80  ">
              {recent.type === "surah" ? recent?.name : `الجزء ${recent.id}`}
            </Text>
            <Text className=" text-secondary/30 dark:text-primaryDark/70 text-xs font-HelveticaLight">
              {recent.type === "surah"
                ? `الأية : ${recent?.aya}`
                : `${recent.name} الأية : ${recent?.aya}`}
            </Text>
          </View>
          <Pressable
            className="flex-[0.2] h-6 flex-row items-center absolute right-3 top-6 text-primar dark:text-primaryDark/80 "
            onPress={() => {
              router.push(
                `/${recent.type === "surah" ? "surah" : "jozz"}/${recent.id}s${
                  recent.index
                }`
              );
            }}
          >
            <Text className="font-HelveticaBold text-primary dark:text-primaryDark/80 ">
              متابعة القراءة
            </Text>
            <ArrowRight
              style={{
                // @ts-ignore
                color: colorScheme === "dark" ? "#FAF0E6" : "#544981",
              }}
              width={22}
              height={12}
              className="mt-2"
            />
          </Pressable>
        </>
      ) : (
        <Text className="text-center font-HelveticaRoman text-primary/20 dark:text-primaryDark/30">
          لم يتم قراءة شئ موخرا
        </Text>
      )}
    </View>
  );
}
