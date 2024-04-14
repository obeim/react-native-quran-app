import { router } from "expo-router";
import { storage } from ".";
import { FavType } from "@/types";

const Fav = {
  getFav: (): FavType[] => {
    const favJson = storage.getString("fav");
    const favArray = favJson ? JSON.parse(favJson) : [];
    return favArray;
  },
  addFav: (fav: FavType) => {
    const favs = Fav.getFav();
    const newFavs = [fav, ...favs];
    storage.set("fav", JSON.stringify(newFavs));
  },
  deleteFav: (id: number) => {
    const favs = Fav.getFav();
    const newFavs = favs.filter((value) => value.id !== id);
    storage.set("fav", JSON.stringify(newFavs));
  },
  goToFav: ({ sora, index, page }: FavType) => {
    if (index) {
      if (storage.getString("view_pref") === "page")
        storage.set("view_pref", "ayat");

      router.push(`/surah/${sora}s${index}`);
    } else if (page) {
      if (storage.getString("view_pref") === "ayat")
        storage.set("view_pref", "page");
      router.push(`/surah/${sora}s${page}`);
    }
  },
};

export default Fav;
