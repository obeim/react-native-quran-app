import { useMutation, useQuery } from "react-query";
import { getUserLocation } from ".";
import { PrayerResponse, getPrayerTimes } from "@/services";
import { useEffect, useState } from "react";

const useGetPrayersTime = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const { data, refetch, isError } = useQuery(
    "prayers",
    (mycoords) => {
      return getPrayerTimes({
        lat: coords?.latitude || 0,
        long: coords?.longitude || 0,
      });
    },
    { staleTime: 604800000, enabled: false }
  );

  useEffect(() => {
    async function getCoords() {
      const mycoords = await getUserLocation();
      setCoords(mycoords);
    }
    getCoords();
  }, []);

  useEffect(() => {
    async function getCoords() {
      if (coords) {
        await refetch();
        setIsLoading(false);

        setError("");
      } else if (isError) {
        setIsLoading(false);

        setError("يرجي أعادة المحاولة");
      }
    }
    getCoords();
  }, [coords]);

  return {
    isLoading,
    error,
    data: data,
    timings: data ? data[new Date().getDate() - 1].timings : undefined,
  };
};

export default useGetPrayersTime;
