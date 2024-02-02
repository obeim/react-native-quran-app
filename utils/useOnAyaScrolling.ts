import { useRef } from "react";
import useOnChange from "./useOnChange";
import { onAyaChanged } from ".";

const useOnAyaScrolling = ({ type }: { type?: "surah" | "jozz" }) => {
  const { onChange } = useOnChange({ delay: 1000 });

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    onAyaChanged({ viewableItems, onChange, type });
  };

  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  return {
    viewabilityConfigCallbackPairs,
  };
};

export default useOnAyaScrolling;
