import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { Modal, Pressable, Text, View } from "react-native";
import { useQuery } from "react-query";
import { getSuraWithAyat } from "@/db/repos/SurahsRepo";
import { useCallback, useState } from "react";
import { PageView } from "./components/PageView";
import { AyatView } from "./components/AyatView";
import { storage } from "@/utils";
import { AyahActionModal } from "./components/AyahActionModal";
import { Ayah } from "@/types";
import * as Network from "expo-network";
import Toast from "react-native-root-toast";
import usePlayAyah from "@/utils/usePlayAyah";

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
function AyahActionsWrapper({
  close,
  opened,
  ayah,
}: {
  close: () => void;
  opened: boolean;
  ayah?: Ayah;
}) {
  const [openMeaning, setOpenMeaning] = useState(false);
  const { playAyah } = usePlayAyah();

  return (
    <View>
      <Modal
        onRequestClose={() => setOpenMeaning(false)}
        visible={openMeaning}
        transparent
        animationType="fade"
      >
        <Pressable
          onPress={() => {
            setOpenMeaning(false);
          }}
          className="bg-black/40 w-full h-full absolute"
        ></Pressable>
        <View className=" bg-darkBg bottom-0 w-3/4 shadow my-auto mx-auto rounded-xl p-6 border border-primary dark:border-primaryDark">
          <Text className="text-primary dark:text-primaryDark font-HelveticaBold text-xl">
            معاني الأية
          </Text>
          <Text className="text-primary dark:text-primaryDark font-HelveticaRoman">
            {ayah?.maany_aya
              .replaceAll("\\", "")
              .split("n")
              .map((text) => (
                <Text>{`${text} \n`}</Text>
              ))}
          </Text>
        </View>
      </Modal>
      <AyahActionModal
        close={close}
        opened={opened}
        showMeaning={!!ayah?.maany_aya}
        onPlay={async () => {
          const network = await Network.getNetworkStateAsync();
          if (network.isConnected) {
            if (ayah) playAyah(ayah?.id);
          } else {
            Toast.show("تأكد من أتصال الانترنت", {
              textStyle: { fontFamily: "HelveticaNeueLTArabic-Roman" },
            });
          }
          close();
        }}
        onPressMeaning={() => {
          setOpenMeaning(true);
          close();
        }}
      />
    </View>
  );
}
