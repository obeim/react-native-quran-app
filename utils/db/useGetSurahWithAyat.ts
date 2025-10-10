import { SurahwithAyat } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export const useGetSurahWithAyat = (id: number) => {
  const db = useSQLiteContext();
  const [surah, setSurah] = useState<SurahwithAyat>();
  const query = `
    SELECT 
      suar.id AS sura_id,
      suar.name_ar AS sura_name,
      suar.type AS sura_type,
      ayat.id AS aya_id,
      ayat.aya_no,
      ayat.aya_text,
      ayat.page,
      ayat.jozz,
      ayat.aya_text_emlaey,
      ayat.maany_aya
    FROM suar
    JOIN ayat ON suar.id = ayat.sora
    WHERE suar.id = ?
    ORDER BY ayat.aya_no ASC;
  `;

  useEffect(() => {
    (async () => {
      const result: any = await db.getAllAsync(query, [id]);
      if (result.length > 0)
        setSurah({
          id: result[0].sura_id,
          name_ar: result[0].sura_name,
          type: result[0].sura_type,
          number: result[0].sura_id,

          ayat: result.map((r: any) => ({
            aya_no: r.aya_no,
            id: r.aya_id,
            aya_text: r.aya_text,
            aya_text_emlaey: r.aya_text_emlaey,
            maany_aya: r.maany_aya,
            page: r.page,
            jozz: r.jozz,
            sora: result[0].sura_id,
            sora_name_ar: result[0].sura_name,
          })),
        });
    })();
  }, []);

  return surah;
};
