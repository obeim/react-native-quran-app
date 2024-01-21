import { Surah } from "@/types/Suar";
import { ColumnMapping, columnTypes, Repository } from "expo-sqlite-orm";
import { useEffect, useMemo, useState } from "react";
const useSuar = () => {
  const [suar, setSuar] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  const columMapping: ColumnMapping<Surah> = {
    id: { type: columnTypes.INTEGER },
    number: { type: columnTypes.INTEGER },
    name_ar: { type: columnTypes.TEXT },
    name_en: { type: columnTypes.TEXT },
    name_en_translation: { type: columnTypes.TEXT },
    created_at: { type: columnTypes.INTEGER, default: () => Date.now() },
    updated_at: { type: columnTypes.INTEGER, default: () => Date.now() },
    type: { type: columnTypes.TEXT },
  };

  const SurahsRepo = useMemo(() => {
    return new Repository("quran.db", "surahs", columMapping);
  }, []);

  useEffect(() => {
    SurahsRepo.query({ order: { number: "ASC" } }).then((value) => {
      setSuar(value);
      setLoading(false);
    });
  }, []);

  return { loading, data: suar };
};

export default useSuar;
