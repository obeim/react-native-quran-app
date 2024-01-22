import { Surah } from "@/types/Suar";
import { ColumnMapping, columnTypes } from "expo-sqlite-orm";

const SurahModal: ColumnMapping<Surah> = {
  id: { type: columnTypes.INTEGER },
  number: { type: columnTypes.INTEGER },
  name_ar: { type: columnTypes.TEXT },
  name_en: { type: columnTypes.TEXT },
  name_en_translation: { type: columnTypes.TEXT },
  created_at: { type: columnTypes.INTEGER, default: () => Date.now() },
  updated_at: { type: columnTypes.INTEGER, default: () => Date.now() },
  type: { type: columnTypes.TEXT },
};

export default SurahModal;
