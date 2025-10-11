import { Ayah } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export const useGetAyatAsJozz = (id: number) => {
  const db = useSQLiteContext();
  const [ayat, setAyat] = useState<Ayah[]>();
  const query = `
    SELECT *
    FROM ayat
    WHERE jozz = ?
    ORDER BY id ASC;
  `;

  useEffect(() => {
    async function getAyat() {
      let result = (await db.getAllAsync(query, [id])) as Ayah[];
      result = result.map((aya, index) => {
        if (index > 0 && aya.sora === result[index - 1].sora)
          return { ...aya, sora_name_ar: `${aya.sora_name_ar},no` };
        else return aya;
      });
      setAyat(result);
    }
    getAyat();
  }, []);

  return ayat;
};
