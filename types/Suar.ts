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
  jozz: number;
  sora: number;
  sora_name_ar: number;
  page: number;
  aya_no: number;
  aya_text_emlaey: string;
  maany_aya: string;
  aya_text_tashkil: string;
}
