import { Surah } from "@/types";
import { memo } from "react";
import { Text, Pressable } from "react-native";

const JozzCard = ({
  jozz,
  onPress,
}: {
  jozz: { id: number; name: string };
  onPress?: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className=" bg-lotion dark:bg-blackCoral basis-2  my-2 p-3 w-full rounded-[17px] px-6 flex-1 flex-row  items-center"
    >
      <Text className="text-primary dark:text-primaryDark/70 font-HelveticaRoman text-xl text-center w-full">
        {jozz.name}
      </Text>
    </Pressable>
  );
};

export default memo(JozzCard);
