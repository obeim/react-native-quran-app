import { Modal, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { AyahActionModal } from "./AyahActionModal";
import { Ayah } from "@/types";
import * as Network from "expo-network";
import Toast from "react-native-root-toast";
import usePlayAyah from "@/utils/usePlayAyah";

export function AyahActionsWrapper({
  close,
  opened,
  ayah,
  playAyah,
}: {
  close: () => void;
  opened: boolean;
  ayah?: Ayah;
  playAyah: (id: number) => Promise<void>;
}) {
  const [openMeaning, setOpenMeaning] = useState(false);

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
        <View className=" bg-darkBg bottom-0 max-w-[300px] shadow my-auto mx-auto rounded-xl p-4 border border-primary dark:border-primaryDark">
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
