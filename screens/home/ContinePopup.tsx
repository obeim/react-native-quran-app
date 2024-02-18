import { Text, View } from "react-native";
import { Motion } from "@legendapp/motion";
import useGoToRecent from "@/utils/useGoToRecent";
import { ContinueReadingButton } from "./components/ContinueReadingButton";

export function ContinePopup({ isOpen }: { isOpen?: boolean }) {
  const { goToRecent, haveRecent } = useGoToRecent();

  return (
    haveRecent && (
      <Motion.View
        initial={{ y: 100 }}
        animate={{ y: isOpen ? 0 : 100 }}
        transition={{ type: "spring" }}
        className={` w-full mx-auto h-16 absolute bottom-3 min-[600px]:bottom-10  items-center `}
      >
        <View className="bg-lotion dark:bg-darkBg w-[90%] h-full rounded-2xl border border-primary dark:border-primaryDark flex-row justify-around items-center pl-4">
          <Text className="text-primary dark:text-primaryDark font-HelveticaRoman flex-1 ">
            هل تريد المتابعة من حيث توقفت؟
          </Text>
          <ContinueReadingButton
            onClick={() => {
              goToRecent();
            }}
          />
        </View>
      </Motion.View>
    )
  );
}
