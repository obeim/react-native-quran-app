import ayatData from "@/assets/data/ayat";

export const getAyatAsJozz = async (id: number) => {
  let ayat = ayatData.filter((aya) => aya.jozz === id);
  ayat = ayat.map((aya, index) => {
    if (index > 0 && aya.sora === ayat[index - 1].sora)
      return { ...aya, sora_name_ar: `${aya.sora_name_ar},no` };
    else return aya;
  });
  return ayat;
};

export default { getAyatAsJozz };
