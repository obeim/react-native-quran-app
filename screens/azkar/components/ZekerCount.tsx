import { Text, View } from "react-native";
import { Motion } from "@legendapp/motion";
import FingerPress from "@/assets/icons/finger_press.svg";
import { useColorScheme } from "nativewind";
import { AntDesign } from "@expo/vector-icons";

export function ZekerCount({
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
            damping: 10,
            stiffness: 300,
          }}
        >
          <Text className="text-primary dark:text-primaryDark text-center font-HelveticaRoman">
            أعادة تعيين
          </Text>
        </Motion.View>
      </Motion.Pressable>

      {currentCount > 0 ? (
        <Motion.Pressable
          className=" w-1/2"
          onPress={() => {
            onPress();
          }}
        >
          <View className="flex-row items-center justify-center bg-neutral-200  dark:bg-[#1D1924]/70 py-3 rounded mt-2">
            <Motion.Text
              transition={{
                type: "tween",
                duration: 100,
              }}
              whileTap={{ scale: 0.7 }}
              className="text-primary dark:text-primaryDark  text-center"
            >
              {currentCount}
            </Motion.Text>
            <FingerPress
              height={24}
              color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
            />
          </View>
        </Motion.Pressable>
      ) : (
        <Motion.View
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 100 }}
          className=" w-1/2 items-center justify-center py-3 mt-2"
        >
          <AntDesign name="check" size={24} color="green" />
        </Motion.View>
      )}
    </View>
  );
}
