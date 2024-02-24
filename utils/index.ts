import { MMKV } from "react-native-mmkv";
import { Clipboard } from "react-native";
import Toast from "react-native-root-toast";
import * as Location from "expo-location";

export function onChangeDelayed({
  event,
  onChange,
  timeout,
  setTimeOutValue,
}: {
  event: string;
  onChange: (value: string) => void;
  timeout: string | number | null;
  setTimeOutValue: Function;
}) {
  if (timeout) clearTimeout(timeout);
  setTimeOutValue(
    setTimeout(function () {
      onChange(event);
    }, 1000)
  );
}

export const storage = new MMKV({
  id: `mystorage`,
  encryptionKey: "abyss",
});

export const onAyaChanged = ({
  viewableItems,
  onChange,
  type = "surah",
}: any) => {
  if (viewableItems)
    onChange(() => {
      if (viewableItems[0])
        storage.set(
          "recent",
          JSON.stringify({
            type: type,
            name: viewableItems[0].item.sora_name_ar.split(",")[0],
            aya: viewableItems[0].item.aya_no,
            page: 1,
            index: viewableItems[0].index,
            id:
              type === "jozz"
                ? viewableItems[0].item.jozz
                : viewableItems[0].item.sora,
          })
        );
    });
};

export function groupBy(xs: any, f: any) {
  return xs.reduce(
    (r: any, v: any, i: any, a: any, k = f(v)) => (
      (r[k] || (r[k] = [])).push(v), r
    ),
    {}
  );
}

export function copyToCliporad(text: string) {
  Clipboard.setString(text);
  Toast.show("تم نسخ النص بنجاح");
}

export async function getUserLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Toast.show("لم يتم منح صلاحية الموقع");
    return;
  } else {
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    return { latitude, longitude };
  }
}
