import AyahModal from "@/models/Ayah";
import { Repository } from "expo-sqlite-orm";

const AyatRepo = new Repository("quran.db", "ayat", AyahModal);

export const getAyatAsJozz = async (id: number) => {
  let ayat = await AyatRepo.query({
    where: { jozz: { equals: id } },
    order: { sora: "ASC", aya_no: "ASC" },
  });
  ayat = ayat.map((aya, index) => {
    if (index > 0 && aya.sora === ayat[index - 1].sora)
      return { ...aya, sora_name_ar: "no" };
    else return aya;
  });
  return ayat;
};

export default AyatRepo;
