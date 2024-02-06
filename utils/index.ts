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
      if (viewableItems[0])
        storage.set(
          "recent",
          JSON.stringify({
            type: type,
            name: viewableItems[0].item.sora_name_ar.split(",")[0],
            aya: viewableItems[0].item.aya_no,
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
