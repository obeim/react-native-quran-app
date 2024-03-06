import Fav from "@/utils/Favs";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Pressable, Text, View } from "react-native";
import ArrowRight from "@/assets/icons/arrow_right.svg";
import { FavType } from "@/types";

export function FavCard({ item, onFav }: { item: FavType; onFav: () => void }) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="bg-lotion dark:bg-blackCoral rounded px-4 pb-3 pt-5">
      <MaterialIcons
        name="bookmark"
        onPress={onFav}
        color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
        style={{ position: "absolute", top: 0, right: 0 }}
        size={22}
      />
      <Text className=" text-xl min-[600px]:text-2xl py-3 text-primary  dark:text-primaryDark !font-UthmanicHafs ">
        {item.text}
      </Text>
      <View className="justify-between flex-row">
        <View>
          <Text className="text-primary  dark:text-primaryDark !font-UthmanicHaf">
            سورة {item.sora_name}
          </Text>
          <Text className="text-primary  dark:text-primaryDark !font-UthmanicHaf text-xs mt-2">
            الاية {item.number}
          </Text>
        </View>

        <Pressable
          onPress={() => {
            if (item) Fav.goToFav({ ...item });
          }}
          className="flex-row py-3  pl-4"
        >
          <Text className="text-primary  dark:text-primaryDark !font-HelveticaRoman">
            متابعة
          </Text>
          <ArrowRight
            style={{
              // @ts-ignore
              color: colorScheme === "dark" ? "#FAF0E6" : "#544981",
            }}
            width={20}
            height={12}
            className="mt-2"
          />
        </Pressable>
      </View>
    </View>
  );
}
