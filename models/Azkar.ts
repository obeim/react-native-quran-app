import { Azkar } from "@/types";
import { ColumnMapping, columnTypes } from "expo-sqlite-orm";

const AzkarModal: ColumnMapping<Azkar> = {
  zekr: { type: columnTypes.TEXT },
  description: { type: columnTypes.TEXT },
  search: { type: columnTypes.TEXT },
  count: { type: columnTypes.TEXT },
  category: { type: columnTypes.TEXT },
  reference: { type: columnTypes.TEXT },
};

export default AzkarModal;
