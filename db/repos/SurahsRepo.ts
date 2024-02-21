import ayatData from "@/assets/data/ayat";
import surahsData from "@/assets/data/surahs";

export const getSuraWithAyat = (id: number) => {
  let sora = surahsData.filter((sora) => sora.number === id)[0];
  let ayat = ayatData.filter((aya) => aya.sora === id);
  return { ...sora, ayat: ayat };
};

export const getSuar = () => {
  return surahsData;
};
export default { getSuraWithAyat, getSuar };
