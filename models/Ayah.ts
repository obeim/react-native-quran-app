import { Ayah } from "@/types";
import { ColumnMapping, columnTypes } from "expo-sqlite-orm";

const AyahModal: ColumnMapping<Ayah> = {
  id: { type: columnTypes.INTEGER },
  jozz: { type: columnTypes.INTEGER },
  sora: { type: columnTypes.INTEGER },
  sora_name_ar: { type: columnTypes.TEXT },
  page: { type: columnTypes.INTEGER },
  aya_no: { type: columnTypes.INTEGER },
  aya_text_emlaey: { type: columnTypes.TEXT },
  maany_aya: { type: columnTypes.TEXT },
  aya_text: { type: columnTypes.TEXT },
};

export default AyahModal;
