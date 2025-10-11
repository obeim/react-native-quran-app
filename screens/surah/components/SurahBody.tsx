import { useAudioPlayer } from "expo-audio";
import { memo } from "react";
import { View } from "react-native";
import { useState, useCallback, useEffect } from "react";

import { storage } from "@/utils";
import Fav from "@/services/Favs";
import { Ayah, FavType, SurahwithAyat } from "@/types";

import { PageView } from "../components/PageView";
import { AyatView } from "../components/AyatView";

import { AyahActionsWrapper } from "../components/AyahActionsWrapper";

import { Header } from "../Header";

const SurahBody = ({ data }: { data: SurahwithAyat }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAyah, setSelectedAyah] = useState<Ayah>();
  const [Favs, setFavs] = useState<FavType[]>([]);
  const [openedModal, setOpenModal] = useState(false);
  const [layout, setLayout] = useState<"page" | "ayat">(
    (storage.getString("view_pref") as "page") || "ayat"
  );

  const player = useAudioPlayer();

  useEffect(() => {
    setFavs(Fav.getFav() || []);
  }, []);

  const onPressAyah = useCallback((aya: Ayah) => {
    setSelectedAyah(aya);
    setOpenModal(true);
  }, []);

  return (
    <>
      <AyahActionsWrapper
        Favs={Favs}
        player={player}
        close={() => setOpenModal(false)}
        opened={openedModal}
        ayah={selectedAyah}
        currentPage={currentPage}
      />
      <Header
        player={player}
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
        {
          {
            page: (
              <View style={{ display: "flex" }}>
                <PageView
                  setCurrentPage={setCurrentPage}
                  Favs={Favs}
                  onPressAyah={onPressAyah}
                  data={data}
                />
              </View>
            ),
            ayat: (
              <View style={{ display: "flex" }}>
                <AyatView Favs={Favs} onPressAyah={onPressAyah} data={data} />
              </View>
            ),
          }[layout]
        }
      </View>
    </>
  );
};

export default SurahBody;
