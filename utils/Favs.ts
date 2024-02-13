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
};

export type FavType = {
  id: number;
  number: number;
  sora: number;
  sora_name: string;
  text: string;
  page?: number;
};

export default Fav;
