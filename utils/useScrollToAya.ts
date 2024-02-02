import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { FlatList } from "react-native";

const useScrollToAya = () => {
  const flatListRef = useRef<FlatList>();
  const local = useLocalSearchParams();

  const onScrollToIndexFailed = (error: {
    averageItemLength: number;
    index: number;
  }) => {
    if (flatListRef.current)
      flatListRef.current.scrollToOffset({
        offset: error.averageItemLength * error.index,
        animated: true,
      });
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: error.index,
          animated: true,
        });
      }
    }, 100);
  };

  useEffect(() => {
    if ((local.id as string).split("s")[1] && flatListRef.current)
      flatListRef.current.scrollToIndex({
        index: parseInt((local.id as string).split("s")[1]),
        animated: true,
      });
  }, [flatListRef]);
  return { onScrollToIndexFailed, flatListRef };
};

export default useScrollToAya;
