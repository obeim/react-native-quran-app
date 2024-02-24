import { getPrayerTimes } from "@/services";
import { getUserLocation } from "@/utils";
import React from "react";
import { Text } from "react-native";
import { useQuery } from "react-query";

const PrayerTimes = () => {
  const { data } = useQuery("prayers", async () => {
    const coords = await getUserLocation();
    if (coords)
      return getPrayerTimes({
        year: new Date().getFullYear(),
        lat: coords?.latitude,
        long: coords?.longitude,
      });
    return;
  });

  return <Text>{JSON.stringify(data)}</Text>;
};

export default PrayerTimes;
