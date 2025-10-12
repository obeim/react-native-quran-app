import { category } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

const useGetAzkarCategories = () => {
  const db = useSQLiteContext();
  const [categories, setCategory] = useState<category[]>();
  const query = `
    SELECT *
    FROM azkar_categories;
  `;
  useEffect(() => {
    async function getCategories() {
      const result = await db.getAllAsync(query);
      setCategory(result as category[]);
    }
    getCategories();
  }, []);
  return categories;
};
export default useGetAzkarCategories;
