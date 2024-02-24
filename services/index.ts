import { PrayerTime } from "@/types";

export async function getPrayerTimes({
  year,
  lat,
  long,
}: {
  year: number;
  lat: number;
  long: number;
}) {
  const response = await fetch(
    `http://api.aladhan.com/v1/calendar/${year}?latitude=${lat}&longitude=${long}&method=2`
  );

  return (await response.json()) as PrayerTime[];
}
