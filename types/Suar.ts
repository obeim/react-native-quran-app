export interface Surah {
  id: number;
  number: number;
  name_ar: string;
  name_en: string;
  name_en_translation: string;
  created_at: number;
  updated_at: number;
  type: string;
  ayat: Ayah[];
}

export interface Ayah {
  id: number;
  number: number;
  text: string;
  number_in_surah: number;
  page: number;
  surah_id: number;
  hizb_id: number;
  juz_id: number;
  sajda: number;
  created_at: number;
  updated_at: number;
}
