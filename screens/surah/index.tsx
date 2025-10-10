import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { View } from "react-native";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { PageView } from "./components/PageView";
import { AyatView } from "./components/AyatView";
import { storage } from "@/utils";
import { Ayah, FavType, SurahwithAyat } from "@/types";
import { AyahActionsWrapper } from "./components/AyahActionsWrapper";
import Fav from "@/utils/Favs";
import usePlayAyah from "@/utils/usePlayAyah";
import { useKeepAwake } from "expo-keep-awake";
import { useGetSurahWithAyat } from "@/utils/db/useGetSurahWithAyat";

const HeaderMemo = React.memo(Header);
const PageViewMemo = React.memo(PageView);
const AyatViewMemo = React.memo(AyatView);
const AyahActionsWrapperMemo = React.memo(AyahActionsWrapper);

const Surah = () => {
  useKeepAwake();
  const local = useLocalSearchParams();

  const surahId = useMemo(
    () => parseInt((local.id as string).split("s")[0]),
    [local.id]
  );
  const data = useGetSurahWithAyat(surahId);

  if (!data) return null;
  console.log("MyComponent rendered"); // <-- logs on every render
  return (
    <View className="h-full">
      <SurahBody data={data} />
    </View>
  );
};

export default Surah;

const SurahBody = ({ data }: { data: SurahwithAyat }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAyah, setSelectedAyah] = useState<Ayah>();
  const [Favs, setFavs] = useState<FavType[]>([]);
  const [openedModal, setOpenModal] = useState(false);
  const [layout, setLayout] = useState<"page" | "ayat">(
    (storage.getString("view_pref") as "page") || "ayat"
  );

  const { playAyah, stop, isPlaying, isLoading: soundLoading } = usePlayAyah();

  useEffect(() => {
    setFavs(Fav.getFav() || []);
  }, []);

  const onPressAyah = useCallback((aya: Ayah) => {
    setSelectedAyah(aya);
    setOpenModal(true);
  }, []);

  return (
    <>
      <AyahActionsWrapperMemo
        Favs={Favs}
        playAyah={playAyah}
        close={() => setOpenModal(false)}
        opened={openedModal}
        ayah={selectedAyah}
        currentPage={currentPage}
      />
      <HeaderMemo
        stop={stop}
        isPlaying={isPlaying}
        isLoading={soundLoading}
        layout={layout}
        setLayout={setLayout}
        title={data.name_ar?.slice(5)}
        subtitle={` ${data.ayat?.length} أيات - ${
          { Meccan: "مكية", Medinan: "مدنية" }[
            (data.type as "Meccan") || "Meccan"
          ]
        }`}
      />

      <View className="bg-white dark:bg-darkBg">
        <View style={{ display: layout === "page" ? "flex" : "none" }}>
          <PageViewMemo
            setCurrentPage={setCurrentPage}
            Favs={Favs}
            onPressAyah={onPressAyah}
            data={data}
          />
        </View>

        <View style={{ display: layout === "ayat" ? "flex" : "none" }}>
          <AyatViewMemo Favs={Favs} onPressAyah={onPressAyah} data={data} />
        </View>
      </View>
    </>
  );
};
