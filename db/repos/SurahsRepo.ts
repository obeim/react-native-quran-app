import SurahModal from "@/models/Surah";
import { Repository } from "expo-sqlite-orm";
import AyatRepo from "./AyatRepo";

const SurahsRepo = new Repository("quran.db", "surahs", SurahModal);

export default SurahsRepo;

export const getSuraWithAyat = async (id: number) => {
  return await SurahsRepo.find(id).then(async (value) => {
    if (value) {
      let ayat = await AyatRepo.query({
        where: { sora: { equals: id } },
        order: { aya_no: "ASC" },
      });
      return { ...value, ayat: ayat };
    }
  });
};
