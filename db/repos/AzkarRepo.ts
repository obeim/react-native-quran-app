import AzkarModal from "@/models/Azkar";
import { Repository } from "expo-sqlite-orm";

const AzkarRepo = new Repository("quran.db", "azkar", AzkarModal);

export const getAzkarByCate = async (category: string) => {
  let azkar = await AzkarRepo.query({
    where: { category: { equals: category } },
    order: { category: "ASC" },
  });
  return azkar;
};

export default AzkarRepo;
