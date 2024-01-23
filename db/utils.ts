import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

async function openDatabase(
  pathToDatabaseFile: string
): Promise<SQLite.SQLiteDatabase> {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }

  await FileSystem.downloadAsync(
    Asset.fromModule(pathToDatabaseFile).uri,
    FileSystem.documentDirectory + "SQLite/quran.db"
  );

  return SQLite.openDatabase("quran.db");
}

export { openDatabase };
