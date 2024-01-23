import AyahModal from "@/models/Ayah";
import SurahModal from "@/models/Surah";
import { Ayah, Surah } from "@/types/Suar";
import { Repository } from "expo-sqlite-orm";
import { useEffect, useMemo, useState } from "react";

const useSura = (id: number) => {
  const [sura, setSura] = useState<Surah>();
  const [loading, setLoading] = useState(true);
  const [ayat, setAyat] = useState<Ayah[]>([]);

  const AyatRepo = useMemo(() => {
    return new Repository("quran.db", "ayat", AyahModal);
  }, []);

  const SurahsRepo = useMemo(() => {
    return new Repository("quran.db", "surahs", SurahModal);
  }, []);

  useEffect(() => {
    SurahsRepo.find(id).then((value) => {
      if (value) {
        setSura(value);
        AyatRepo.query({
          where: { sora: { equals: id } },
          order: { aya_no: "ASC" },
        }).then((value) => {
          setAyat(value);
          setLoading(false);
        });
      }

      setLoading(false);
    });
  }, [id]);

  return { loading, data: { ...sura, ayat: ayat } };
};

export default useSura;
