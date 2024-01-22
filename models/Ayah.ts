import { Ayah, Surah } from "@/types/Suar";
import { ColumnMapping, columnTypes } from "expo-sqlite-orm";

const AyahModal: ColumnMapping<Ayah> = {
  id: { type: columnTypes.INTEGER },
  number: { type: columnTypes.INTEGER },
  text: { type: columnTypes.TEXT },
  number_in_surah: { type: columnTypes.INTEGER },
  page: { type: columnTypes.INTEGER },
  surah_id: { type: columnTypes.INTEGER },
  hizb_id: { type: columnTypes.INTEGER },
  juz_id: { type: columnTypes.INTEGER },
  sajda: { type: columnTypes.INTEGER },
  created_at: { type: columnTypes.INTEGER, default: () => Date.now() },
  updated_at: { type: columnTypes.INTEGER, default: () => Date.now() },
};

export default AyahModal;
