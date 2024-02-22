import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { storage } from ".";
const usePlayAyah = () => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function playAyah(id: number) {
    setLoading(true);

    const { sound } = await Audio.Sound.createAsync({
      uri: `https://cdn.islamic.network/quran/audio/64/${
        storage.getString("reader") || "ar.alafasy"
      }/${id}.mp3`,
    });
    setSound(sound);
    await sound.playAsync();
    setLoading(false);
    sound._callOnPlaybackStatusUpdateForNewStatus = (status: any) => {
      setIsPlaying(status.isPlaying);
    };
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return {
    playAyah,
    isPlaying,
    sound: sound,
    stop: () => {
      sound?.stopAsync();
    },
    pause: () => {
      sound?.pauseAsync();
    },
    resume: () => {
      sound?.setStatusAsync({ shouldPlay: true });
    },
    isLoading: isLoading,
  };
};

export default usePlayAyah;
