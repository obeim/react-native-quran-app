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
    <View className={`bg-lotion pb-2 pt-7 relative px-3 ${isFirst && "mt-5"} `}>
      <Bookmark
        onPress={() => {
          setBookmark(!bookmark);
        }}
        fill={bookmark ? "#544981" : "none"}
        width={20}
        className="absolute right-0 z-20"
        height={23}
      />
      <View
        className={`bg-lotion flex flex-row justify-between items-start ${
          isLast && "border-b"
        } border-primary/10 pb-6`}
      >
        <Text
          className=" text-lg text-primary font-HafsSmart w-full"
          key={ayah.aya_no}
        >
          {ayah.aya_text_tashkil} {`(${ayah.aya_no})`}
        </Text>
      </View>
    </View>
  );
}
