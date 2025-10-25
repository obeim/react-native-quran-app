import { Surah, SurahwithAyat } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

const useGetSuar = () => {
  const db = useSQLiteContext();
  const [suar, setSuar] = useState<Surah[]>();
  const query = `
    SELECT *
    FROM suar;
  `;
  useEffect(() => {
    async function getSuar() {
      const result = await db.getAllAsync(query);
      setSuar(result as Surah[]);
    }
    getSuar();
  }, []);
  return suar;
};
export default useGetSuar;
