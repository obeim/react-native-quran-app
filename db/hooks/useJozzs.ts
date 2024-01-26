import { useEffect, useState } from "react";

export const useJozzs = () => {
  const [jozzItems, setJozzItems] = useState<{ id: number; name: string }[]>(
    []
  );
  useEffect(() => {
    let JozzArray: { id: number; name: string }[] = [];
    Array.apply(0, Array(30)).forEach((item, index) => {
      JozzArray.push({
        id: index + 1,
        name: `الجزء ${index + 1}`,
      });
    });
    setJozzItems(JozzArray);
  }, []);

  return { jozzItems };
};

export default useJozzs;
