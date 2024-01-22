import SurahModal from "@/models/Surah";
import { Surah } from "@/types/Suar";
import { IQueryOptions, Repository } from "expo-sqlite-orm";
import { useEffect, useMemo, useState } from "react";

const useSuar = (props?: IQueryOptions<Surah>) => {
  const [suar, setSuar] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  const SurahsRepo = useMemo(() => {
    return new Repository("quran.db", "surahs", SurahModal);
  }, []);

  useEffect(() => {
    SurahsRepo.query(props).then((value) => {
      setSuar(value);
      setLoading(false);
    });
  }, [props]);

  return { loading, data: suar };
};

export default useSuar;
