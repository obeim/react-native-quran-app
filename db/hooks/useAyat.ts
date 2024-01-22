import AyahModal from "@/models/Ayah";
import { Ayah } from "@/types/Suar";
import { IQueryOptions, Repository } from "expo-sqlite-orm";
import { useEffect, useMemo, useState } from "react";

const useAyat = (props?: IQueryOptions<Ayah>) => {
  const [ayat, setAyat] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);

  const AyatRepo = useMemo(() => {
    return new Repository("quran.db", "ayahs", AyahModal);
  }, []);

  useEffect(() => {
    AyatRepo.query(props).then((value) => {
      setAyat(value);
      setLoading(false);
    });
  }, [props]);

  return { loading, data: ayat };
};

export default useAyat;
