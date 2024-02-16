import { Text, View } from "react-native";
import { Azkar } from "@/types";
import { Motion } from "@legendapp/motion";
import { useEffect, useState } from "react";
import FingerPress from "@/assets/icons/finger_press.svg";
import { useColorScheme } from "nativewind";
export function ZekrCard({ zekr }: { zekr: Azkar }) {
  const [currentCount, setCount] = useState<number>(zekr?.count);
  useEffect(() => {
    if (zekr.count) setCount(zekr.count);
  }, [zekr?.count]);

  return (
    <View className="bg-lotion w-full dark:bg-darkBg my-2  pt-5 rounded-xl overflow-hidden">
      <Text className="font-UthmanicHafs text-primary dark:text-primaryDark text-lg text-center px-5 pb-3">
        {zekr.zekr
          .replace("(", "")
          .replace(")", "")
          .replace(")", "")
          .replace("(", "")}
      </Text>
      {zekr.reference && (
        <Text className="text-primary/40 dark:text-primaryDark/30 mb-3 px-3 text-right font-UthmanicHafs">
          {zekr.reference}
        </Text>
      )}

      {zekr.count && (
        <ZekerCount
          currentCount={currentCount}
          onPress={() => {
            if (currentCount > 0) setCount(currentCount - 1);
          }}
          onReset={() => {
            setCount(zekr.count);
          }}
        />
      )}
    </View>
  );
}
function ZekerCount({
  onPress,
  currentCount,
  onReset,
}: {
  onPress: () => void;
  currentCount: number;
  onReset: () => void;
}) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-2 flex-row justify-between w-full items-center">
      <Motion.Pressable
        className=" w-1/2"
        onPress={() => {
          onReset();
        }}
      >
        <Motion.View
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
        >
          <Text className="text-primary dark:text-primaryDark text-center font-HelveticaRoman">
            أعادة تعيين
          </Text>
        </Motion.View>
      </Motion.Pressable>

      <Motion.Pressable
        className=" w-1/2"
        onPress={() => {
          onPress();
        }}
      >
        <Motion.View
          whileTap={{ scale: 0.9 }}
          className="flex-row items-center justify-center bg-neutral-200  dark:bg-[#1D1924]/70 py-3 rounded mt-2"
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
        >
          <Text className="text-primary dark:text-primaryDark  text-center">
            {currentCount}
          </Text>
          <FingerPress
            height={24}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        </Motion.View>
      </Motion.Pressable>
    </View>
  );
}
