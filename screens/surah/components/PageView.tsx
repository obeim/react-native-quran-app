import { Pressable, ScrollView, Text, View } from "react-native";
import { Ayah } from "@/types";
import usePagedAyat from "@/utils/usePagedAyat";
import { PageProps } from "..";

export const PageView = ({ data }: PageProps) => {
  const { ayat, nextPage, PrevPage, totalPages, currentPage, isLast } =
    usePagedAyat({
      data: data,
    });

  return (
    <View className="h-[95%] bg-lotion dark:bg-blackCoral">
      <ScrollView
        bounces={false}
        decelerationRate={0}
        className=" px-2 h-[94%] py-3 mb-9 "
      >
        <Text className="text-primary/30 dark:text-primaryDark/40 px-3">
          الجزء {ayat[ayat.length - 1].jozz}
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
            <Text className="text-justify text-[19px] py-1 px-2  leading-[49px] text-primary dark:text-primaryDark !font-UthmanicHafs w-full">
              {ayat.map(
                (aya: Ayah) => aya.aya_text_tashkil + `  ﴿${aya.aya_no}﴾  `
              )}
            </Text>
          </View>
        )}
      </ScrollView>
      <View className="h-[8%]  pb-3 absolute bottom-0 flex-1 flex-row  w-full justify-between bg-white dark:bg-darkBg  items-center">
        <Pressable
          onPress={() => {
            PrevPage();
          }}
          className="h-full flex-3 justify-center  px-7"
        >
          <Text className="font-HelveticaRoman  text-primary dark:text-primaryDark">
            السابق
          </Text>
        </Pressable>

        <View className="my-auto flex-3 flex-row">
          <Text className="text-white text-center"> {currentPage}</Text>
          <Text className="text-white text-center">
            {totalPages} {" / "}
          </Text>
        </View>
        <Pressable
          className="h-full flex-3 justify-center  px-7"
          onPress={() => {
            nextPage();
          }}
        >
          <Text className="font-HelveticaRoman  text-primary dark:text-primaryDark">
            التالي
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
