import { MMKV } from "react-native-mmkv";

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
      storage.set(
        "recent",
        JSON.stringify({
          type: type,
          name: viewableItems[viewableItems.length - 1].item.sora_name_ar.split(
            ","
          )[0],
          aya: viewableItems[viewableItems.length - 1].item.aya_no,
          index: viewableItems[viewableItems.length - 1].index,
          id:
            type === "jozz"
              ? viewableItems[0].item.jozz
              : viewableItems[viewableItems.length - 1].item.sora,
        })
      );
    });
};
