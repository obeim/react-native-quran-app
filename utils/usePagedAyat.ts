import { Ayah } from "@/types";
import { useState } from "react";
import { groupBy } from ".";
import { useLocalSearchParams } from "expo-router";

interface PageProps {
  data?: Ayah[];
}
const usePagedAyat = ({ data }: PageProps) => {
  const local = useLocalSearchParams();
  const [activePage, setActive] = useState(
    parseInt((local.id as string).split("s")[1]) > 0
      ? parseInt((local.id as string).split("s")[1]) - 1
      : 0 || 0
  );

  const [isLast, setIsLast] = useState(false);

  const formatedData = data
    ? groupBy(data, (item: Ayah) => item.page)
    : undefined;

  const currentPageAyat = formatedData
    ? (formatedData as any)[Object.keys(formatedData as any)[activePage]]
    : undefined;

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
    currentPage: activePage + 1 || 1,
    totalPages: formatedData ? Object.keys(formatedData).length : 0,
    isLast,
  };
};

export default usePagedAyat;
