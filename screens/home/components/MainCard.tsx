import { View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { storage } from "@/utils";
import { useCallback, useMemo, useState } from "react";
import { Recent } from "@/types";
import CardContent from "./CardContent";
import { NoRecentView } from "./NoRecentView";

export function MainCard() {
  const [recent, setRecent] = useState<Recent>();

  useFocusEffect(
    useCallback(() => {
      let recentJSON = storage.getString("recent");
      if (recentJSON) setRecent(JSON.parse(recentJSON));
    }, [])
  );

  const noPageAyaText = useMemo(
    () =>
      recent?.type === "surah"
        ? `الأية : ${recent?.aya}`
        : `${recent?.name} الأية : ${recent?.aya}`,
    [recent]
  );

  const pageTextAya = useMemo(
    () =>
      recent?.type === "surah"
        ? `الصفحة  ${recent.page} `
        : ` سورة ${recent?.name} `,
    [recent]
  );

  return (
    <View className="mt-3 bg-lotion dark:bg-blackCoral w-full  rounded-[17px] px-6 relative py-6">
      {recent && (recent?.aya || recent?.page) && (
        <CardContent
          primary_text={
            recent.type === "surah" ? recent?.name : `الجزء ${recent.id}`
          }
          secondary_text={recent.page ? pageTextAya : noPageAyaText}
          onClick={() => {
            router.push(
              `/${recent.type === "surah" ? "surah" : "jozz"}/${recent.id}s${
                recent.page ? recent.page : recent.index
              }`
            );
          }}
        />
      )}

      {!recent && <NoRecentView />}
    </View>
  );
}
