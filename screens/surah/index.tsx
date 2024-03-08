import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { View } from "react-native";
import { useQuery } from "react-query";
import { getSuraWithAyat } from "@/services/SurahsService";
import { useState } from "react";
import { PageView } from "./components/PageView";
import { AyatView } from "./components/AyatView";
import { storage } from "@/utils";
import { Ayah } from "@/types";
import { AyahActionsWrapper } from "./components/AyahActionsWrapper";
import Fav from "@/utils/Favs";
import usePlayAyah from "@/utils/usePlayAyah";
import { useKeepAwake } from "expo-keep-awake";

const Surah = () => {
  useKeepAwake();
  const local = useLocalSearchParams();
  const [layout, setLayout] = useState<"page" | "ayat">(
    (storage.getString("view_pref") as "page") || "ayat"
  );

  const [openedModal, setOpenModal] = useState(false);
  const [selectedAyah, setSelectedAyah] = useState<Ayah>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: Favs } = useQuery("favs", () => {
    return Fav.getFav();
  });

  const { isLoading, data, isFetched, isPreviousData } = useQuery(
    `sura${parseInt((local.id as string).split("s")[0])}`,
    () => {
      return getSuraWithAyat(parseInt((local.id as string).split("s")[0]));
    },
    { staleTime: Infinity }
  );

  const { playAyah, stop, isPlaying, isLoading: soundLoading } = usePlayAyah();

  const onPressAyah = (aya: Ayah) => {
    setSelectedAyah(aya);
    setOpenModal(true);
  };

  return (
    !isLoading &&
    isFetched &&
    !isPreviousData && (
      <View className="h-full">
        <AyahActionsWrapper
          Favs={Favs || []}
          playAyah={playAyah}
          close={() => setOpenModal(false)}
          opened={openedModal}
          ayah={selectedAyah}
          currentPage={currentPage}
        />
        <Header
          stop={stop}
          isPlaying={isPlaying}
          isLoading={soundLoading || false}
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
              page: (
                <PageView
                  setCurrentPage={setCurrentPage}
                  Favs={Favs}
                  onPressAyah={onPressAyah}
                  data={data}
                />
              ),
              ayat: (
                <AyatView Favs={Favs} onPressAyah={onPressAyah} data={data} />
              ),
            }[layout]
          }
        </View>
      </View>
    )
  );
};

export default Surah;
