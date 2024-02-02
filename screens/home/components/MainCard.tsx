import { Pressable, Text, View } from "react-native";
import ArrowRight from "@/assets/icons/arrow_right.svg";
import { router, useFocusEffect } from "expo-router";
import { storage } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { Recent } from "@/types";

export function MainCard() {
  const [recent, setRecent] = useState<Recent>();
  useFocusEffect(
    useCallback(() => {
      let recentJSON = storage.getString("recent");
      if (recentJSON) setRecent(JSON.parse(recentJSON));
    }, [])
  );

  return (
    <View className="mt-5 bg-lotion w-full  rounded-[17px] px-6 relative py-6">
      {recent ? (
        <>
          <View className="h-10 flex flex-col justify-center">
            <Text className="font-HelveticaRoman text-xl  text-primary">
              {recent.type === "surah" ? recent?.name : `الجزء ${recent.id}`}
            </Text>
            <Text className="text-secondary/30 font-HelveticaLight">
              {recent.type === "surah"
                ? `الأية : ${recent?.aya}`
                : `${recent.name} الأية : ${recent?.aya}`}
            </Text>
          </View>
          <Pressable
            className="flex-[0.2] h-8 flex-row items-center absolute right-3 top-6"
            onPress={() => {
              router.push(
                `/${recent.type === "surah" ? "surah" : "jozz"}/${recent.id}`
              );
            }}
          >
            <Text className=" font-HelveticaBold  text-primary">
              متابعة القراءة
            </Text>
            <ArrowRight width={22} height={12} className="mt-2" />
          </Pressable>
        </>
      ) : (
        <Text className="text-center font-HelveticaRoman text-primary/20">
          لم يتم قراءة شئ موخرا
        </Text>
      )}
    </View>
  );
}
