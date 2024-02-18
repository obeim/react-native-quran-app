import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Ayah } from "@/types";
import usePagedAyat from "@/utils/usePagedAyat";
import { PageProps } from "./AyaView";
import { PageBottomBar } from "@/screens/surah/components/PageBottomBar";
import { LegacyRef, useEffect, useRef } from "react";
import { storage } from "@/utils";

export const PageView = ({ data, onPress }: PageProps) => {
  const listRef = useRef<ScrollView>();
  const { ayat, nextPage, PrevPage, totalPages, currentPage } = usePagedAyat({
    data: data,
  });

  useEffect(() => {
    if (ayat)
      storage.set(
        "recent",
        JSON.stringify({
          type: "jozz",
          name: ayat[0]?.sora_name_ar.split(",")[0],
          page: currentPage,
          id: ayat[0]?.jozz,
        })
      );
  }, [currentPage, ayat]);

  return (
    <View className="h-[95%] bg-lotion dark:bg-blackCoral">
      <ScrollView
        ref={listRef as LegacyRef<ScrollView>}
        bounces={false}
        decelerationRate={0}
        className=" px-2 h-[94%] mb-9 "
      >
        {ayat[0].sora_name_ar.includes("no") && (
          <Text className="text-primary/30 dark:text-primaryDark/40 px-3 my-3 ">
            سورة {ayat[0].sora_name_ar.split(",")[0]}
          </Text>
        )}
        {ayat && (
          <View className="bg-lotion dark:bg-blackCoral mb-9 flex flex-col items-start">
            <Text className="text-[20px] min-[600px]:text-4xl leading-[49px] text-primary dark:text-primaryDark !font-UthmanicHafs w-full text-justify px-2 ">
              {ayat.map((aya: Ayah, i: number) => (
                <Text
                  key={i}
                  onPress={() => {
                    // clicking on aya view
                    onPress?.(aya);
                  }}
                >
                  {!aya.sora_name_ar.includes("no") && (
                    <Text className="text-primary/30 dark:text-primaryDark/40">
                      {`${i !== 0 ? "\n" : ""}  سورة ${aya.sora_name_ar}\n`}
                    </Text>
                  )}

                  <Text>{aya.aya_text + `﴿${aya.aya_no}﴾ `}</Text>
                </Text>
              ))}
            </Text>
          </View>
        )}
      </ScrollView>
      <PageBottomBar
        type="jozz"
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
      />
    </View>
  );
};
