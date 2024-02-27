import MyModal from "@/components/Modal";
import { Motion } from "@legendapp/motion";
import { FC, useMemo } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { MenuItem } from "./MenuItem";
import { ReaderDropDown } from "./ReaderDropDown";
import { router } from "expo-router";

const MainDrawer: FC<{
  isOpen: boolean;
  close: () => void;
}> = (props) => {
  const { colorScheme } = useColorScheme();

  const items = useMemo(() => {
    return [
      {
        title: "المحفوظات",
        icon: (
          <MaterialIcons
            name="bookmark"
            size={22}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        ),
      },
      {
        title: "مواقيت الصلاة",
        icon: (
          <MaterialIcons
            name="timer"
            size={22}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        ),
        onPress: () => {
          props.close();
          router.push("/prayers/");
        },
      },
      {
        title: "أتجاه القبلة",
        onPress: () => {
          props.close();
          router.push("/qibla/");
        },
        icon: (
          <MaterialIcons
            name="location-searching"
            size={22}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        ),
      },
    ];
  }, [colorScheme]);

  return (
    <MyModal {...props}>
      {props.isOpen && (
        <View className=" w-full h-full absolute bg-black/30 -z-10"></View>
      )}
      <View className="w-full h-full flex-1 justify-end ">
        <Motion.View
          initial={{ x: 3000 }}
          animate={{ x: props.isOpen ? 0 : 3000 }}
          transition={{ type: "tween", duration: 50, delay: 50 }}
          className="bg-lotion shadow-xl dark:bg-darkBg bottom-0 right-0 w-3/5 pt-4 items-start justify-start h-full "
        >
          <Text className="mx-3 text-lg my-1 text-primary dark:text-primaryDark font-HelveticaBold">
            القائمة
          </Text>
          <View className="w-full border-t-[1px] border-primary/40 pt-4 dark:border-primaryDark/30">
            {items.map((item, i) => {
              return <MenuItem key={i} {...item} />;
            })}
          </View>
          <ReaderDropDown />
        </Motion.View>
      </View>
    </MyModal>
  );
};

export default MainDrawer;
