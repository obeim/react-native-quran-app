import { Ayah } from "@/types";
import { Pressable, Text, View } from "react-native";
import Bookmark from "@/assets/icons/bookmark.svg";
import { useMemo, useState } from "react";
import { useColorScheme } from "nativewind";
import Fav from "@/utils/Favs";
import { useQuery, useQueryClient } from "react-query";
import { copyToCliporad, storage } from "@/utils";
import { usePathname } from "expo-router";

export function AyaCard({
  ayah,
  isLast,
  isFirst,
  onPress,
  marked,
  index,
}: {
  ayah: Ayah;
  isLast: boolean;
  isFirst: boolean;
  onPress?: () => void;
  marked: boolean;
  index: number;
}) {
  const [bookmark, setBookmark] = useState(marked);
  const { colorScheme } = useColorScheme();
  const queryClient = useQueryClient();
  const { data: fontSize } = useQuery("fontSize", () =>
    storage.getString("fontSize")
  );
  const pathname = usePathname();

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
          let type: { jozz?: number; sora?: number } = {};

          if (pathname.includes("jozz")) type.jozz = ayah?.jozz;
          else type.sora = ayah?.sora;

          setBookmark(!bookmark);
          if (!bookmark)
            Fav.addFav({
              text: ayah.aya_text,
              id: ayah.id,
              index: index,
              sora_name: ayah.sora_name_ar,
              number: ayah.aya_no,
              ...type,
              aya_text_emlaey: ayah.aya_text_emlaey,
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
          style={{ fontSize: parseInt(fontSize || "20") }}
          className={` py-3 text-primary  dark:text-primaryDark !font-UthmanicHafs `}
          key={ayah.aya_no}
        >
          {ayah.sora !== 1 && ayah.aya_no === 1
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
