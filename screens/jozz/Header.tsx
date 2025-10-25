import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { storage } from "@/utils";
import { AudioPlayer, useAudioPlayerStatus } from "expo-audio";

export function Header({
  title,
  layout,
  setLayout,
  player,
}: {
  title?: string;
  setLayout?: React.Dispatch<React.SetStateAction<"ayat" | "page">>;
  layout?: "ayat" | "page";
  player?: AudioPlayer;
}) {
  const { colorScheme } = useColorScheme();
  const status = player ? useAudioPlayerStatus(player) : null;

  return (
    <View className="flex flex-row justify-between pl-4 py-4 h-[8%] bg-white dark:bg-darkBg items-center">
      <Pressable
        onPress={() => {
          player?.pause();
        }}
        className="  z-40 right-12 flex-2 items-center w-20 absolute  "
      >
        {status?.playing && (
          <AntDesign
            name="pause"
            size={27}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        )}
      </Pressable>
      <View className="inline-flex flex-row items-center justify-center h-full">
        <Pressable
          onPress={() => {
            router.back();
          }}
          className="  items-center justify-end !w-10 flex-3 "
        >
          <AntDesign
            name="arrow-right"
            size={24}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            router.back();
          }}
          className="bg-white dark:bg-darkBg items-center h-10 inline-flex justify-center"
        >
          <Text className="font-HelveticaRoman text-lg text-primary dark:text-primaryDark">
            {title}
          </Text>
        </Pressable>
      </View>
      {layout && (
        <Pressable
          className=" w-[50px] pr-4  h-32  inline-flex justify-center"
          onPress={() => {
            if (layout === "ayat") {
              storage.set("view_pref", "page");
              setLayout?.("page");
            } else {
              setLayout?.("ayat");
              storage.set("view_pref", "ayat");
            }
          }}
        >
          {layout === "ayat" && (
            <Entypo
              size={24}
              name="text"
              color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
            />
          )}

          {layout === "page" && (
            <Feather
              name="list"
              size={24}
              color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
            />
          )}
        </Pressable>
      )}
    </View>
  );
}
