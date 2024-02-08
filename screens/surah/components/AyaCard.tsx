import { Ayah } from "@/types";
import { Text, View } from "react-native";
import Bookmark from "@/assets/icons/bookmark.svg";
import { useMemo, useState } from "react";
import { useColorScheme } from "nativewind";

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
  const { colorScheme } = useColorScheme();

  const currentColor = useMemo(
    () => (colorScheme === "dark" ? "#FAF0E6" : "#544981"),
    [colorScheme]
  );
  return (
    <View
      className={`bg-lotion dark:bg-blackCoral pt-4 relative  ${
        isFirst && "mt-5"
      } `}
    >
      <Bookmark
        onPress={() => {
          setBookmark(!bookmark);
        }}
        fill={bookmark ? currentColor : "none"}
        color={currentColor}
        width={20}
        className="absolute -right-0 top-1 z-20"
        height={18}
      />
      <View
        className={`bg-lotion dark:bg-blackCoral flex flex-row justify-between items-start ${
          isLast && "border-b"
        } border-primary/5 dark:border-primaryDark/10 pb-3`}
      >
        <Text
          className=" text-xl py-3 text-primary dark:text-primaryDark !font-UthmanicHafs w-full"
          key={ayah.aya_no}
        >
          {ayah.aya_text} {`﴿${ayah.aya_no}﴾`}
        </Text>
      </View>
    </View>
  );
}
