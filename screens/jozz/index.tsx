import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { useState } from "react";
import { storage } from "@/utils";
import { AyatView } from "./components/AyaView";
import { PageView } from "./components/PageView";
import { AyahActionsWrapper } from "../surah/components/AyahActionsWrapper";
import { Ayah } from "@/types";
import Fav from "@/services/Favs";
import { useKeepAwake } from "expo-keep-awake";
import { useAudioPlayer } from "expo-audio";
import { useGetAyatAsJozz } from "@/utils/db/useGetAyatAsJozz";
const Jozz = () => {
  useKeepAwake();
  const local = useLocalSearchParams();
  const [openAyaAction, setOpenAyaAction] = useState(false);
  const [activeAya, setActiveAya] = useState<Ayah>();
  const [currentPage, setCurrentPage] = useState(1);

  const [layout, setLayout] = useState<"page" | "ayat">(
    (storage.getString("view_pref") as "page") || "ayat" || "ayat"
  );

  const data = useGetAyatAsJozz(
    parseInt((local.id as string).split("s")[0] as string)
  );

  const Favs = Fav.getFav();

  const player = useAudioPlayer({});

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
        player={player}
        opened={openAyaAction}
        close={() => {
          setOpenAyaAction(false);
        }}
        ayah={activeAya}
        currentPage={currentPage}
      />
      <Header
        stop={() => player.pause()}
        isPlaying={player.playing}
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
