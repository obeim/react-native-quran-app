import AyahModal from "@/models/Ayah";
import { Repository } from "expo-sqlite-orm";

const AyatRepo = new Repository("quran.db", "ayat", AyahModal);

export default AyatRepo;
