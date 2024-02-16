import CategoryModal from "@/models/Category";
import { Repository } from "expo-sqlite-orm";

const CategoryRepo = new Repository("quran.db", "category", CategoryModal);

export const getCategories = async () => {
  let categories = await CategoryRepo.query({ order: { cat_name: "ASC" } });
  return categories;
};

export default CategoryRepo;
