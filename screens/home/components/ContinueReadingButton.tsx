import { Pressable, Text } from "react-native";
import ArrowRight from "@/assets/icons/arrow_right.svg";
import { useColorScheme } from "nativewind";

export function ContinueReadingButton({ onClick }: { onClick?: () => void }) {
  const { colorScheme } = useColorScheme();

  return (
    <Pressable
      className="flex-[0.2] h-20 flex-row items-center absolute right-3 top- text-primar dark:text-primaryDark "
      onPress={() => {
        if (onClick) onClick();
      }}
    >
      <Text className="font-HelveticaBold text-primary dark:text-primaryDark ">
        متابعة القراءة
      </Text>
      <ArrowRight
        style={{
          // @ts-ignore
          color: colorScheme === "dark" ? "#FAF0E6" : "#544981",
        }}
        width={22}
        height={12}
        className="mt-2"
      />
    </Pressable>
  );
}
