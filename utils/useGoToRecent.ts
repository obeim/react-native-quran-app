import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { storage } from ".";
import { Recent } from "@/types";

const useGoToRecent = () => {
  const [recent, setRecent] = useState<Recent>();

  useFocusEffect(
    useCallback(() => {
      let recentJSON = storage.getString("recent");
      if (recentJSON) setRecent(JSON.parse(recentJSON));
    }, [])
  );
  const goToRecent = () => {
    if (recent?.aya && storage.getString("view_pref") !== "page")
      router.push(
        `/${recent.type === "surah" ? "surah" : "jozz"}/${recent.id}s${
          recent.index
        }`
      );
    else if (recent?.page && storage.getString("view_pref") === "page")
      router.push(
        `/${recent.type === "surah" ? "surah" : "jozz"}/${recent.id}s${
          recent.page
        }`
      );
  };
  const haveRecent = useMemo(() => recent, [recent]);

  return { goToRecent, haveRecent };
};

export default useGoToRecent;
