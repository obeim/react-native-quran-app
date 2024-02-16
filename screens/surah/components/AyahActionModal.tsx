import { Modal, Pressable, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
export function AyahActionModal({
  opened,
  close,
  onPlay,
  onPressMeaning,
  showMeaning,
}: {
  opened: boolean;
  close: () => void;
  onPlay?: () => void;
  onPressMeaning?: () => void;
  showMeaning?: boolean;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <Modal
      onRequestClose={() => close()}
      visible={opened}
      transparent
      animationType="fade"
    >
      <Pressable
        onPress={() => {
          close();
        }}
        className="bg-black/40 w-full h-full absolute"
      ></Pressable>
      <View
        className="bg-lotion dark:bg-darkBg bottom-0  w-1/3 shadow my-auto mx-auto rounded-xl items-center pt-2  border  border-primary dark:border-primaryDark"
        style={{
          shadowRadius: 5,
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowColor: "#000000",
          elevation: 4,
        }}
      >
        <Pressable
          onPress={onPlay}
          className=" flex-row items-center py-5  border-b-[0.5px] border-primary/40 dark:border-white/40 w-full justify-center"
        >
          <View className="rotate-180">
            <FontAwesome5
              name="play"
              size={12}
              color={colorScheme === "dark" ? "white" : "#544981"}
            />
          </View>
          <Text className="text-primary dark:text-white font-HelveticaRoman mx-3 text-sm">
            تشغيل الأية
          </Text>
        </Pressable>
        {showMeaning && (
          <Pressable
            onPress={onPressMeaning}
            className=" flex-row items-center py-5 border-b-[0.5px] border-primary/40 dark:border-white/40 w-full justify-center"
          >
            <View className="rotate-180">
              <FontAwesome5
                name="book"
                size={12}
                color={colorScheme === "dark" ? "white" : "#544981"}
              />
            </View>
            <Text className="text-primary dark:text-white font-HelveticaRoman mx-3 text-sm">
              معاني الأية
            </Text>
          </Pressable>
        )}
      </View>
    </Modal>
  );
}
