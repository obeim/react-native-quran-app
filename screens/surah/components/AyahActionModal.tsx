import { Modal, Pressable, Text, View } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { storage } from "@/utils";
export function AyahActionModal({
  opened,
  close,
  onPlay,
  onPressMeaning,
  showMeaning,
  saved = false,
  onSave,
  showSave = true,
}: {
  opened: boolean;
  close: () => void;
  onPlay?: () => void;
  onPressMeaning?: () => void;
  onSave?: () => void;
  showMeaning?: boolean;
  saved: boolean;
  showSave?: boolean;
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
        {storage.getString("view_pref") === "page" && showSave && (
          <Pressable
            onPress={onSave}
            className=" flex-row items-center py-5  border-b-[0.5px] border-primary/40 dark:border-white/40 w-full justify-center"
          >
            <MaterialIcons
              name="bookmark"
              color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
              size={17}
            />
            <Text className="text-primary dark:text-white font-HelveticaRoman mx-3 text-sm">
              {saved ? "الغاء العلامة" : "علامة مرجعية"}
            </Text>
          </Pressable>
        )}
      </View>
    </Modal>
  );
}
