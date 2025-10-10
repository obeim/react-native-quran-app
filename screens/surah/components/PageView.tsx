import { ScrollView, Text, View } from "react-native";
import { Ayah } from "@/types";
import usePagedAyat from "@/utils/usePagedAyat";
import { PageProps } from "./AyatView";
import { PageBottomBar } from "./PageBottomBar";
import { LegacyRef, useEffect, useRef } from "react";
import { copyToCliporad, storage } from "@/utils";

export const PageView = ({
  data,
  onPressAyah,
  setCurrentPage,
  Favs,
}: PageProps) => {
  const listRef = useRef<ScrollView>(null);

  const { ayat, nextPage, PrevPage, totalPages, currentPage } = usePagedAyat({
    data: data?.ayat,
  });

  const fontSize = storage.getString("fontSize");

  useEffect(() => {
    if (data && currentPage)
      storage.set(
        "recent",
        JSON.stringify({
          type: "surah",
          name: data?.name_ar.replace("سورة", ""),
          page: currentPage,
          id: data?.id,
        })
      );
  }, []);

  useEffect(() => {
    if (data)
      storage.set(
        "recent",
        JSON.stringify({
          type: "surah",
          name: data?.name_ar.replace("سورة", ""),
          page: currentPage,
          id: data?.id,
        })
      );
    setCurrentPage?.(currentPage);
  }, [currentPage, data]);

  return (
    <View className="h-[95%] bg-lotion dark:bg-blackCoral">
      <ScrollView
        ref={listRef as LegacyRef<ScrollView>}
        bounces={false}
        decelerationRate={0}
        className=" px-2 h-[94%] py-3 mb-9 "
      >
        <Text className="text-primary/30 dark:text-primaryDark/40 px-3">
          الجزء {ayat[ayat?.length - 1].jozz}
        </Text>
        {currentPage === 1 &&
          (ayat[0] as Ayah).sora !== 1 &&
          (ayat[0] as Ayah).sora !== 9 && (
            <Text className="mb-3 text-primary dark:text-primaryDark font-UthmanicHafs text-xl text-center ">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </Text>
          )}
        {ayat && (
          <View className="bg-lotion dark:bg-blackCoral mb-9">
            <Text
              style={{ fontSize: parseInt(fontSize || "20") }}
              className={`text-justify py-1 px-2  leading-[49px] text-primary dark:text-primaryDark !font-UthmanicHafs w-full`}
            >
              {ayat.map((aya: Ayah) => (
                <Text
                  className={`${
                    Favs?.some((fav) => fav.id == aya.id) &&
                    "bg-primary/10 dark:bg-gray-200/10 "
                  }`}
                  onPress={() => {
                    onPressAyah?.(aya);
                  }}
                  onLongPress={() => {
                    copyToCliporad(aya.aya_text);
                  }}
                  key={aya.id}
                >
                  {(aya.sora !== 1 && aya.aya_no === 1
                    ? aya.aya_text.replace(
                        "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
                        ""
                      )
                    : aya.aya_text) + `﴿${aya.aya_no}﴾ `}
                </Text>
              ))}
            </Text>
          </View>
        )}
      </ScrollView>
      <PageBottomBar
        nextPage={() => {
          nextPage();
          listRef.current?.scrollTo({ y: 0 });
        }}
        PrevPage={() => {
          PrevPage();
          listRef.current?.scrollTo({ y: 0 });
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        type="surah"
      />
    </View>
  );
};
