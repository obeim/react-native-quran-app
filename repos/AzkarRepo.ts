import azkarData from "@/assets/data/azkar";

export const getAzkarByCate = async (category: string) => {
  let azkar = azkarData.filter((zeker) => zeker.category == category);
  return azkar;
};

export default { getAzkarByCate };
