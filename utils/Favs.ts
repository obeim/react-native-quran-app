import { router } from "expo-router";
import { storage } from ".";

const Fav = {
  getFav: (): FavType[] => {
    const favJson = storage.getString("fav");
    const favArray = favJson ? JSON.parse(favJson) : [];
    return favArray;
  },
  addFav: (fav: FavType) => {
    const favs = Fav.getFav();
    const newFavs = [...favs, fav];
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
      if (sora === 1) router.replace(`/surah/${sora}`);
      else router.push(`/surah/${sora}s${index}`);
    } else if (page) {
      if (storage.getString("view_pref") === "ayat")
        storage.set("view_pref", "page");
      if (sora === 1) router.replace(`/surah/${sora}`);
      else router.push(`/surah/${sora}s${page}`);
    }
  },
};

export type FavType = {
  id: number;
  number: number;
  index?: number;
  sora: number;
  sora_name: string;
  text: string;
  page?: number;
};

export default Fav;
