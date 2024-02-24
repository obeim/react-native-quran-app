import { Ayah } from "@/types";
import { Pressable, Text, View, Clipboard } from "react-native";
import Bookmark from "@/assets/icons/bookmark.svg";
import { useMemo, useState } from "react";
import { useColorScheme } from "nativewind";
import Fav from "@/utils/Favs";
import { useQueryClient } from "react-query";
import { copyToCliporad } from "@/utils";

export function AyaCard({
  ayah,
  isLast,
  isFirst,
  onPress,
  marked,
}: {
  ayah: Ayah;
  isLast: boolean;
  isFirst: boolean;
  onPress?: () => void;
  marked: boolean;
}) {
  const [bookmark, setBookmark] = useState(marked);
  const { colorScheme } = useColorScheme();
  const queryClient = useQueryClient();

  const currentColor = useMemo(
    () => (colorScheme === "dark" ? "#FAF0E6" : "#544981"),
    [colorScheme]
  );

  return (
    <Pressable
      className={`bg-lotion dark:bg-blackCoral pt-4 relative  ${
        isFirst && "mt-5"
      } `}
    >
      <Bookmark
        onPress={() => {
          setBookmark(!bookmark);
          if (!bookmark)
            Fav.addFav({
              text: ayah.aya_text,
              id: ayah.id,
              sora_name: ayah.sora_name_ar,
              number: ayah.aya_no,
              sora: ayah.sora,
            });
          else Fav.deleteFav(ayah.id);
          queryClient.invalidateQueries({ queryKey: ["favs"] });
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
          onPress={onPress}
          onLongPress={() => {
            copyToCliporad(ayah.aya_text);
          }}
          className=" text-xl min-[600px]:text-2xl py-3 text-primary  dark:text-primaryDark !font-UthmanicHafs "
          key={ayah.aya_no}
        >
          {ayah.sora !== 1
            ? ayah.aya_text.replace(
                "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
                ""
              )
            : ayah.aya_text}{" "}
          {`﴿${ayah.aya_no}﴾`}
        </Text>
      </View>
    </Pressable>
  );
}
