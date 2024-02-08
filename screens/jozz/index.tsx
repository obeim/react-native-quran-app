import { View } from "react-native";
import { useQuery } from "react-query";
import { useLocalSearchParams } from "expo-router";
import { Header } from "./Header";
import { getAyatAsJozz } from "@/db/repos/AyatRepo";
import { useState } from "react";
import { storage } from "@/utils";
import { AyatView } from "./components/AyaView";
import { PageView } from "./components/PageView";

const Jozz = () => {
  const local = useLocalSearchParams();
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

  return (
    !isLoading &&
    isFetched && (
      <View className="h-full">
        <Header
          setLayout={setLayout}
          layout={layout}
          title={`الجزء ${(local.id as string).split("s")[0]}`}
        />
        <View className=" bg-white dark:bg-darkBg">
          {
            { ayat: <AyatView data={data} />, page: <PageView data={data} /> }[
              layout
            ]
          }
        </View>
      </View>
    )
  );
};

export default Jozz;
