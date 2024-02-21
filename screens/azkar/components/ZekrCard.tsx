import { Text, View } from "react-native";
import { Azkar } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ZekerCount } from "./ZekerCount";
export function ZekrCard({
  zekr,
  setCompletedCount,
}: {
  zekr: Azkar;
  setCompletedCount?: Dispatch<SetStateAction<number>>;
}) {
  const [currentCount, setCount] = useState<number>(zekr?.count);
  useEffect(() => {
    if (zekr.count) setCount(zekr.count);
  }, [zekr?.count]);

  return (
    <View className="bg-lotion w-full dark:bg-darkBg my-2  pt-5 rounded-xl overflow-hidden">
      <Text className="font-UthmanicHafs text-primary dark:text-primaryDark text-lg min-[600px]:text-3xl   text-center px-5 pb-3">
        {zekr.zekr
          .replace("(", "")
          .replace(")", "")
          .replace(")", "")
          .replace("(", "")}
      </Text>
      {zekr.reference && zekr.reference.trim().length > 0 && (
        <Text className="text-primary/40 dark:text-primaryDark/30 mb-3 px-3 text-right font-UthmanicHafs">
          {zekr.description} - {zekr.reference}
        </Text>
      )}

      {zekr.count && (
        <ZekerCount
          currentCount={currentCount}
          onPress={() => {
            if (currentCount == 1) setCompletedCount?.((pre) => pre + 1);
            if (currentCount > 0) setCount(currentCount - 1);
          }}
          onReset={() => {
            setCount(zekr.count);
            if (currentCount === 0) setCompletedCount?.((pre) => pre - 1);
          }}
        />
      )}
    </View>
  );
}
