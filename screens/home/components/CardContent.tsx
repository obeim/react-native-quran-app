import { Text, View } from "react-native";
import { ContinueReadingButton } from "./ContinueReadingButton";
import { memo } from "react";

const CardContent = ({
  primary_text,
  secondary_text,
  onClick,
}: {
  primary_text: string;
  secondary_text: string;
  onClick: () => void;
}) => {
  return (
    <>
      <View className="h-8 flex flex-col justify-center ">
        <Text className="font-HelveticaRoman text-xl text-primary dark:text-primaryDark  ">
          {primary_text}
        </Text>
        <Text className=" text-secondary/30 dark:text-primaryDark text-xs font-HelveticaLight">
          {secondary_text}
        </Text>
      </View>
      <ContinueReadingButton onClick={onClick} />
    </>
  );
};
export default memo(CardContent);
