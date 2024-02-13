import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { View } from "react-native";
import { useQuery } from "react-query";
import { getSuraWithAyat } from "@/db/repos/SurahsRepo";
import { useState } from "react";
import { PageView } from "./components/PageView";
import { AyatView } from "./components/AyatView";
import { storage } from "@/utils";
import { Ayah } from "@/types";
import { AyahActionsWrapper } from "./components/AyahActionsWrapper";

const Surah = () => {
  const local = useLocalSearchParams();
  const [layout, setLayout] = useState<"page" | "ayat">(
    (storage.getString("view_pref") as "page") || "ayat" || "ayat"
  );

  const [openedModal, setOpenModal] = useState(false);
  const [selectedAyah, setSelectedAyah] = useState<Ayah>();

  const { isLoading, data, isFetched } = useQuery(
    "sura",
    () => {
      return getSuraWithAyat(parseInt((local.id as string).split("s")[0]));
    },
    { cacheTime: Infinity }
  );

  const onPressAyah = (aya: Ayah) => {
    setSelectedAyah(aya);
    setOpenModal(true);
  };

  return (
    !isLoading &&
    isFetched && (
      <View className="h-full">
        <AyahActionsWrapper
          close={() => setOpenModal(false)}
          opened={openedModal}
          ayah={selectedAyah}
        />
        <Header
          layout={layout}
          setLayout={setLayout}
          title={data?.name_ar?.slice(5)}
          subtitle={` ${data?.ayat?.length} أيات - ${
            { Meccan: "مكية", Medinan: "مدنية" }[data?.type || "Meccan"]
          }`}
        />
        <View className=" bg-white dark:bg-darkBg">
          {
            {
              page: <PageView onPressAyah={onPressAyah} data={data} />,
              ayat: <AyatView onPressAyah={onPressAyah} data={data} />,
            }[layout]
          }
        </View>
      </View>
    )
  );
};

export default Surah;
