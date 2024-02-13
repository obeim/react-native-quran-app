import { View } from "react-native";
import { useQuery } from "react-query";
import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { getAyatAsJozz } from "@/db/repos/AyatRepo";
import { useState } from "react";
import { storage } from "@/utils";
import { AyatView } from "./components/AyaView";
import { PageView } from "./components/PageView";
import { AyahActionsWrapper } from "../surah/components/AyahActionsWrapper";
import { Ayah } from "@/types";

const Jozz = () => {
  const local = useLocalSearchParams();
  const [openAyaAction, setOpenAyaAction] = useState(false);
  const [activeAya, setActiveAya] = useState<Ayah>();

  const [layout, setLayout] = useState<"page" | "ayat">(
    (storage.getString("view_pref") as "page") || "ayat" || "ayat"
  );

  const { isLoading, data, isFetched } = useQuery(
    "jozz",
    () => {
      return getAyatAsJozz(
        parseInt((local.id as string).split("s")[0] as string)
      );
    },
    { cacheTime: Infinity }
  );

  const onPressAyah = (aya: Ayah) => {
    setActiveAya(aya);
    setOpenAyaAction(true);
  };
  return (
    !isLoading &&
    isFetched && (
      <View className="h-full">
        <AyahActionsWrapper
          opened={openAyaAction}
          close={() => {
            setOpenAyaAction(false);
          }}
          ayah={activeAya}
        />
        <Header
          setLayout={setLayout}
          layout={layout}
          title={`الجزء ${(local.id as string).split("s")[0]}`}
        />
        <View className=" bg-white dark:bg-darkBg">
          {
            {
              ayat: <AyatView onPress={onPressAyah} data={data} />,
              page: <PageView onPress={onPressAyah} data={data} />,
            }[layout]
          }
        </View>
      </View>
    )
  );
};

export default Jozz;
