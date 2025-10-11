import { memo, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useAudioPlayer } from "expo-audio";

import { storage } from "@/utils";
import Fav from "@/services/Favs";
import { Ayah, FavType } from "@/types";

import { Header } from "../Header";
import { PageView } from "./PageView";
import { AyatView } from "./AyaView";
import { AyahActionsWrapper } from "@/screens/surah/components/AyahActionsWrapper";

const JozzBody = ({ jozzId, data }: { jozzId: number; data: Ayah[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAyah, setSelectedAyah] = useState<Ayah>();
  const [Favs, setFavs] = useState<FavType[]>([]);
  const [openedModal, setOpenModal] = useState(false);
  const [layout, setLayout] = useState<"page" | "ayat">(
    (storage.getString("view_pref") as "page" | "ayat") || "ayat"
  );

  const player = useAudioPlayer();

  useEffect(() => {
    setFavs(Fav.getFav() || []);
  }, []);

  const onPressAyah = useCallback((aya: Ayah) => {
    setSelectedAyah({
      ...aya,
      sora_name_ar: aya?.sora_name_ar?.replace("no", "").replace(",", "") || "",
    });
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
        title={`الجزء ${jozzId}`}
      />

      <View className="bg-white dark:bg-darkBg flex-1">
        {
          {
            page: (
              <PageView
                setCurrentPage={setCurrentPage}
                Favs={Favs}
                onPress={onPressAyah}
                data={data}
              />
            ),
            ayat: <AyatView Favs={Favs} onPress={onPressAyah} data={data} />,
          }[layout]
        }
      </View>
    </>
  );
};

export default JozzBody;
