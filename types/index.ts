export interface Surah {
  id: number;
  number: number;
  name_ar: string;
  type: string;
}

export interface Ayah {
  id: number;
  jozz: number;
  sora: number;
  sora_name_ar: string;
  page: number;
  aya_no: number;
  maany_aya: string;
  aya_text: string;
  aya_text_emlaey: string;
}

export interface Recent {
  type: "surah" | "jozz";
  name: string;
  aya: number;
  page: number;
  index: number;
  id: number;
}

export interface category {
  cat_name: string;
}

export interface Azkar {
  category: string;
  zekr: string;
  description: string;
  count: number;
  reference: string;
  search: string;
}

export interface PrayerTime {
  timings: Timings;
  date: Date;
  meta: Meta;
}
export interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}
export interface Date {
  readable: string;
  timestamp: string;
  gregorian: Gregorian;
  hijri: Hijri;
}
export interface Gregorian {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: Month;
  year: string;
  designation: Designation;
}
export interface Weekday {
  en: string;
}
export interface Month {
  number: number;
  en: string;
}
export interface Designation {
  abbreviated: string;
  expanded: string;
}
export interface Hijri {
  date: string;
  format: string;
  day: string;
  weekday: Weekday1;
  month: Month1;
  year: string;
  designation: Designation;
  holidays?: string[] | null;
}
export interface Weekday1 {
  en: string;
  ar: string;
}
export interface Month1 {
  number: number;
  en: string;
  ar: string;
}
export interface Meta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: Method;
  latitudeAdjustmentMethod: string;
  midnightMode: string;
  school: string;
  offset: Offset;
}
export interface Method {
  id: number;
  name: string;
  params: Params;
}
export interface Params {
  Fajr: number;
  Isha: number;
}
export interface Offset {
  Imsak: number;
  Fajr: number;
  Sunrise: number;
  Dhuhr: number;
  Asr: number;
  Maghrib: number;
  Sunset: number;
  Isha: number;
  Midnight: number;
}

export type FavType = {
  id: number;
  number: number;
  index?: number;
  sora?: number;
  jozz?: number;
  sora_name: string;
  text: string;
  page?: number;
  aya_text_emlaey?: string;
};
