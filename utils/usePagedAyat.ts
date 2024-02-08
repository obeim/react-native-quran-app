import { Ayah, Surah } from "@/types";
import { useMemo, useState } from "react";
import { groupBy } from ".";

interface PageProps {
  data?: Ayah[];
}
const usePagedAyat = ({ data }: PageProps) => {
  const [activePage, setActive] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const formatedData = useMemo(() => {
    let newData = { ...data };
    const pagedAyat = groupBy(data, (item: Ayah) => item.page);
    newData = pagedAyat;
    return newData as any;
  }, [data]);

  const currentPageAyat = useMemo(() => {
    return (formatedData as any)[Object.keys(formatedData as any)[activePage]];
  }, [activePage, formatedData]);

  const nextPage = () => {
    if (activePage < Object.keys(formatedData).length - 1) {
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
    totalPages: Object.keys(formatedData).length,
    isLast,
  };
};

export default usePagedAyat;
