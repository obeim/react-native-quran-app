import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { getAyatAsJozz } from "@/services/AyatService";
import { useState } from "react";
import { storage } from "@/utils";
import { AyatView } from "./components/AyaView";
import { PageView } from "./components/PageView";
import { AyahActionsWrapper } from "../surah/components/AyahActionsWrapper";
import { Ayah } from "@/types";
import Fav from "@/utils/Favs";
import usePlayAyah from "@/utils/usePlayAyah";
import { useKeepAwake } from "expo-keep-awake";

const Jozz = () => {
  useKeepAwake();
  const local = useLocalSearchParams();
  const [openAyaAction, setOpenAyaAction] = useState(false);
  const [activeAya, setActiveAya] = useState<Ayah>();
  const [currentPage, setCurrentPage] = useState(1);

  const [layout, setLayout] = useState<"page" | "ayat">(
    (storage.getString("view_pref") as "page") || "ayat" || "ayat"
  );

  const data = getAyatAsJozz(
    parseInt((local.id as string).split("s")[0] as string)
  );

  const Favs = Fav.getFav();

  const { playAyah, stop, isPlaying, isLoading: soundLoading } = usePlayAyah();
  const onPressAyah = (aya: Ayah) => {
    setActiveAya({
      ...aya,
      sora_name_ar: aya?.sora_name_ar.replace("no", "").replace(",", "") || "",
    });
    setOpenAyaAction(true);
  };
  return (
    <View className="h-full">
      <AyahActionsWrapper
        Favs={Favs || []}
        playAyah={playAyah}
        opened={openAyaAction}
        close={() => {
          setOpenAyaAction(false);
        }}
        ayah={activeAya}
        currentPage={currentPage}
      />
      <Header
        stop={stop}
        isPlaying={isPlaying}
        isLoading={soundLoading || false}
        setLayout={setLayout}
        layout={layout}
        title={`الجزء ${(local.id as string).split("s")[0]}`}
      />
      <View className=" bg-white dark:bg-darkBg">
        {
          {
            ayat: <AyatView Favs={Favs} onPress={onPressAyah} data={data} />,
            page: (
              <PageView
                setCurrentPage={setCurrentPage}
                Favs={Favs}
                onPress={onPressAyah}
                data={data}
              />
            ),
          }[layout]
        }
      </View>
    </View>
  );
};

export default Jozz;
