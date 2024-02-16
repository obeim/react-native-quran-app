import { category } from "@/types";
import { ColumnMapping, columnTypes } from "expo-sqlite-orm";

const CategoryModal: ColumnMapping<category> = {
  cat_name: { type: columnTypes.TEXT },
};

export default CategoryModal;
