import { useEffect, useState } from "react";

export default function useJozzList() {
  const [jozzs, setJozzs] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const list = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `الجزء ${i + 1}`,
    }));
    setJozzs(list);
  }, []);

  return jozzs;
}
