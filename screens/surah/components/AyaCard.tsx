import { Ayah } from "@/types";
import { Text, View } from "react-native";
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
    <View className={`bg-lotion pt-4 relative  ${isFirst && "mt-5"} `}>
      <Bookmark
        onPress={() => {
          setBookmark(!bookmark);
        }}
        fill={bookmark ? "#544981" : "none"}
        width={20}
        className="absolute -right-0 top-1 z-20"
        height={18}
      />
      <View
        className={`bg-lotion flex flex-row justify-between items-start ${
          isLast && "border-b"
        } border-primary/5 pb-3`}
      >
        <Text
          className=" text-xl py-3 text-primary !font-UthmanicHafs w-full"
          key={ayah.aya_no}
        >
          {ayah.aya_text_tashkil} {`(${ayah.aya_no})`}
        </Text>
      </View>
    </View>
  );
}
