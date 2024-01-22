import { View } from "@/components/Themed";
import { Ayah } from "@/types/Suar";
import { Text } from "react-native";
import Bookmark from "@/assets/icons/bookmark.svg";
import { useState } from "react";

export function AyaCard({
  ayah,
  isLast,
  isFirst,
}: {
  ayah: Ayah;
  isLast: boolean;
  isFirst: boolean;
}) {
  const [bookmark, setBookmark] = useState(false);
  return (
    <View className={`bg-lotion py-5 px-3 ${isFirst && "mt-5"} `}>
      <View
        className={`bg-lotion flex flex-row justify-between items-start ${
          isLast && "border-b"
        } border-primary/10 pb-6`}
      >
        <Text
          className=" text-lg text-primary font-HelveticaRoman w-[85%]"
          key={ayah.id}
        >
          {ayah.text} {`(${ayah.number_in_surah})`}
        </Text>
        <Bookmark
          onPress={() => {
            setBookmark(!bookmark);
          }}
          fill={bookmark ? "#544981" : "none"}
          width={20}
          height={23}
        />
      </View>
    </View>
  );
}
