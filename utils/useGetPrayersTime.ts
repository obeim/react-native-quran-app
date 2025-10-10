import { getPrayerTimes } from "@/services";
import { useEffect, useState, useCallback } from "react";
import { getUserLocation } from ".";

export const useGetPrayersTime = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [data, setData] = useState<any>();

  const fetchPrayers = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        setIsLoading(true);
        setError(undefined);

        const result = await getPrayerTimes({ lat: latitude, long: longitude });
        setData(result);
      } catch (err) {
        console.error("Error fetching prayer times:", err);
        setError("يرجي أعادة المحاولة");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const refetch = useCallback(async () => {
    if (coords) {
      await fetchPrayers(coords.latitude, coords.longitude);
    }
  }, [coords, fetchPrayers]);

  // Get user location once
  useEffect(() => {
    (async () => {
      try {
        const mycoords = await getUserLocation();
        setCoords(mycoords);
      } catch (err) {
        console.error("Error getting location:", err);
        setError("فشل في الحصول على الموقع");
        setIsLoading(false);
      }
    })();
  }, []);

  // Fetch prayer times after location is available
  useEffect(() => {
    if (coords) {
      fetchPrayers(coords.latitude, coords.longitude);
    }
  }, [coords, fetchPrayers]);

  return {
    isLoading,
    error,
    data,
    timings: data ? data[new Date().getDate() - 1]?.timings : undefined,
    refetch,
  };
};
