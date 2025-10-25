import { PrayerTime } from "@/types";

export type PrayerResponse = PrayerTime[];
export async function getPrayerTimes({
  lat,
  long,
}: {
  lat: number;
  long: number;
}) {
  const response = await fetch(
    `http://api.aladhan.com/v1/calendar/${new Date().getFullYear()}/${
      new Date().getMonth() + 1
    }?latitude=${lat}&longitude=${long}`
  );
  const dataResponse = await response.json();
  return dataResponse.data as PrayerResponse;
}
