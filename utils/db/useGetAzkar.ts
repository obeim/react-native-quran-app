import { Azkar } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

const useGetAzkar = (category: string) => {
  const db = useSQLiteContext();
  const [categories, setCategory] = useState<Azkar[]>();
  const query = `
    SELECT *
    FROM Azkar
    WHERE category = ?;
  `;
  useEffect(() => {
    async function getAzkar() {
      const result = await db.getAllAsync(query, [category]);
      setCategory(result as Azkar[]);
    }
    getAzkar();
  }, []);
  return categories;
};
export default useGetAzkar;
