import { Modal, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { AyahActionModal } from "./AyahActionModal";
import { Ayah, FavType } from "@/types";
import * as Network from "expo-network";
import Toast from "react-native-root-toast";
import Fav from "@/utils/Favs";
import { usePathname } from "expo-router";

export function AyahActionsWrapper({
  close,
  opened,
  ayah,
  playAyah,
  Favs,
  currentPage,
}: {
  close: () => void;
  opened: boolean;
  ayah?: Ayah;
  playAyah: (id: number) => Promise<void>;
  Favs: FavType[];
  currentPage?: number;
}) {
  const [openMeaning, setOpenMeaning] = useState(false);
  const pathname = usePathname();

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
        <View className="bg-lotion dark:bg-darkBg bottom-0 max-w-[300px] shadow my-auto mx-auto rounded-xl p-4 border border-primary dark:border-primaryDark">
          <Text className="text-primary dark:text-primaryDark font-HelveticaBold text-xl mb-2">
            معاني الأية
          </Text>
          <Text className="text-primary dark:text-primaryDark font-HelveticaRoman">
            {ayah?.maany_aya
              .replaceAll("\\", "")
              .split("n")
              .map((text, i) => (
                <Text key={i}>{`${text} \n`}</Text>
              ))}
          </Text>
        </View>
      </Modal>
      <AyahActionModal
        close={close}
        opened={opened}
        saved={Favs.some((item) => item.id === ayah?.id)}
        showMeaning={!!ayah?.maany_aya}
        showSave={!!currentPage}
        onSave={() => {
          let type: { jozz?: number; sora?: number } = {};

          if (pathname.includes("jozz")) type.jozz = ayah?.jozz;
          else type.sora = ayah?.sora;

          if (ayah && currentPage) {
            if (!Favs.some((item) => item.id === ayah?.id))
              Fav.addFav({
                text: ayah.aya_text,
                id: ayah.id,
                page: currentPage,
                sora_name: ayah.sora_name_ar,
                number: ayah.aya_no,
                ...type,
              });
            else Fav.deleteFav(ayah.id);
            close();
          }
        }}
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
