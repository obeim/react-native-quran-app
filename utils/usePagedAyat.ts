import { Ayah, Surah } from "@/types";
import { useMemo, useState } from "react";
import { groupBy } from ".";
interface SurahwithAyat extends Surah {
  ayat: Ayah[];
}
interface PageProps {
  data?: SurahwithAyat;
}
const usePagedAyat = ({ data }: PageProps) => {
  const [activePage, setActive] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const formatedData = useMemo(() => {
    let newData = { ...data };
    const pagedAyat = groupBy(data?.ayat, (item: Ayah) => item.page);
    newData.ayat = pagedAyat;
    return newData as any;
  }, [data]);

  const currentPageAyat = useMemo(() => {
    return (formatedData?.ayat as any)[
      Object.keys(formatedData.ayat as any)[activePage]
    ];
  }, [activePage]);

  const nextPage = () => {
    if (activePage < Object.keys(formatedData?.ayat).length - 1) {
      setActive(activePage + 1);
    } else {
      if (!isLast) setIsLast(true);
    }
  };
  const PrevPage = () => {
    if (activePage > 0) setActive(activePage - 1);
  };

  return {
    ayat: currentPageAyat,
    nextPage,
    PrevPage,
    currentPage: activePage + 1,
    totalPages: Object.keys(formatedData?.ayat).length,
    isLast,
  };
};

export default usePagedAyat;
