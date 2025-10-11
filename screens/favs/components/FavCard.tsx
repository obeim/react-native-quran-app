import Fav from "@/services/Favs";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  Text,
  View,
} from "react-native";
import ArrowRight from "@/assets/icons/arrow_right.svg";
import { FavType } from "@/types";
import { useState } from "react";

export function FavCard({
  item,
  onDelete,
}: {
  item: FavType;
  onDelete: () => void;
}) {
  const { colorScheme } = useColorScheme();
  const [position] = useState(new Animated.ValueXY());
  const windowWidth = Dimensions.get("window").width;

  const panResponder = (id: number) => {
    let dx = 0;

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        dx = gestureState.dx;
        if (dx > 40) position.setValue({ x: gestureState.moveX / 3, y: 0 });
      },
      onPanResponderRelease: () => {
        if (dx > (windowWidth * 50) / 100) {
          // Swipe right threshold, you can adjust this value
          onDelete();
        } else {
          position.setValue({ x: 0, y: 0 });
        }
      },
    });
  };
  return (
    <Animated.View
      {...panResponder(item.id).panHandlers}
      className="bg-lotion dark:bg-blackCoral rounded px-4 pb-2 pt-3 relative"
      style={{ transform: [...position.getTranslateTransform()] }}
    >
      <Text className=" text-lg min-[600px]:text-xl py-3 text-primary  dark:text-primaryDark !font-UthmanicHafs ">
        {item.text}
      </Text>
      <View className="justify-between flex-row ">
        <View>
          <Text className="text-primary dark:text-primaryDark !font-UthmanicHaf">
            سورة {item.sora_name}{" "}
          </Text>
          <Text className="text-primary dark:text-primaryDark !font-UthmanicHaf text-xs mt-1">
            الاية {item.number}
          </Text>
        </View>
        {item.jozz && (
          <Text className="text-primary/20 dark:text-primaryDark/20 absolute right-0 -top-3 text-xs">
            الجزء {item.jozz}{" "}
          </Text>
        )}
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
    </Animated.View>
  );
}
