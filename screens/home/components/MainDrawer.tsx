import MyModal from "@/components/Modal";
import { Motion } from "@legendapp/motion";
import { FC, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { MenuItem } from "./MenuItem";
import { ReaderDropDown } from "./ReaderDropDown";
import { router } from "expo-router";
import { Select } from "@/components/Select";
import { storage } from "@/utils";

const MainDrawer: FC<{
  isOpen: boolean;
  close: () => void;
}> = (props) => {
  const { colorScheme } = useColorScheme();

  const items = useMemo(() => {
    return [
      {
        title: "العلامات المرجعية",
        icon: (
          <MaterialIcons
            name="bookmark"
            size={22}
            color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          />
        ),
        onPress: () => {
          props.close();
          router.push("/favs");
        },
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
          router.push("/prayers");
        },
      },
      {
        title: "أتجاه القبلة",
        onPress: () => {
          props.close();
          router.push("/qibla");
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
      <View className=" w-full h-full absolute bg-black/30 -z-10"></View>
      <View className="w-full h-full flex-1 justify-end ">
        <Motion.View className="bg-lotion shadow-xl dark:bg-darkBg bottom-0 right-0 w-3/5 pt-4 items-start justify-start h-full ">
          <Text className="mx-3 text-lg my-1 text-primary dark:text-primaryDark font-HelveticaBold">
            القائمة
          </Text>
          <View className="w-full border-t-[1px] border-primary/40 pt-4 dark:border-primaryDark/30">
            {items.map((item, i) => {
              return <MenuItem key={i} {...item} />;
            })}
          </View>
          <ReaderDropDown />
          <FontSizeOptions />
        </Motion.View>
      </View>
    </MyModal>
  );
};

export default MainDrawer;

const FontSizeOptions = () => {
  const [font, setFont] = useState(storage.getString("fontSize") || "20");

  return (
    <Select
      label="حجم الخط"
      data={[
        { label: "صغير", value: "16" },
        { label: "متوسط", value: "20" },
        { label: "كبير", value: "24" },
        { label: "كبير 1", value: "28" },
        { label: "كبير 2", value: "32" },
        { label: "كبير 3", value: "36" },
      ]}
      onChange={(value) => {
        setFont(value.value);
        storage.set("fontSize", value.value);
      }}
      value={font}
      itemFontSize={parseInt(font)}
    />
  );
};
