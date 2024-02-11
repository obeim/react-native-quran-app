import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
const usePlayAyah = () => {
  const [sound, setSound] = useState<Sound>();

  async function playAyah(id: number) {
    const { sound } = await Audio.Sound.createAsync({
      uri: `https://cdn.islamic.network/quran/audio/64/ar.alafasy/${id}.mp3`,
    });
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return { playAyah };
};

export default usePlayAyah;
