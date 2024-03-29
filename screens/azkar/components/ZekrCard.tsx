import { Clipboard, Text, View } from "react-native";
import { Azkar } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ZekerCount } from "./ZekerCount";
import { copyToCliporad, storage } from "@/utils";
import { useQuery } from "react-query";
export function ZekrCard({
  zekr,
  setCompletedCount,
}: {
  zekr: Azkar;
  setCompletedCount?: Dispatch<SetStateAction<number>>;
}) {
  const [currentCount, setCount] = useState<number>(zekr?.count);

  const { data: fontSize } = useQuery("fontSize", () =>
    storage.getString("fontSize")
  );

  useEffect(() => {
    if (zekr.count) setCount(zekr.count);
  }, [zekr?.count]);

  return (
    <View className="bg-lotion w-full dark:bg-darkBg my-2  pt-5 rounded-xl overflow-hidden">
      <Text
        onLongPress={() => {
          copyToCliporad(
            zekr.zekr
              .replace("(", "")
              .replace(")", "")
              .replace(")", "")
              .replace("(", "")
          );
        }}
        style={{ fontSize: parseInt(fontSize || "20") }}
        className={`font-UthmanicHafs text-primary dark:text-primaryDark text-justify px-5 pb-3`}
      >
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
      {zekr.count != 0 && (
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
