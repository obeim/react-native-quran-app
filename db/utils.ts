import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

async function openDatabase() {
  const localFolder = FileSystem.documentDirectory + "SQLite";
  const dbName = "quran.db";
  const localURI = localFolder + "/" + dbName;

  if (!(await FileSystem.getInfoAsync(localFolder)).exists) {
    await FileSystem.makeDirectoryAsync(localFolder);

    let asset = Asset.fromModule(require("../assets/quran.db"));

    if (!asset.downloaded) {
      await asset.downloadAsync().then((value) => {
        asset = value;
        console.log("asset downloadAsync - finished");
      });

      let remoteURI = asset.localUri;

      await FileSystem.copyAsync({
        from: remoteURI as string,
        to: localURI,
      }).catch((error) => {
        console.log("asset copyDatabase - finished with error: " + error);
      });
    }
  }

  return SQLite.openDatabase(dbName);
}

export { openDatabase };
