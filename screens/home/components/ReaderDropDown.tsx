import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Dropdown } from "react-native-element-dropdown";
import { storage } from "@/utils";

const data = [
  { label: " مشاري العفاسي", value: "ar.alafasy" },
  { label: "ماهر المعيقلي", value: "ar.mahermuaiqly" },
  { label: "الحصري", value: "ar.husary" },
  { label: "محمد صديق المنشاوي", value: "ar.minshawimujawwad" },
  { label: "عبد الباسط عبد الصمد", value: "ar.abdulsamad" },
  { label: "عبد الرحمن السديس", value: "ar.abdurrahmaansudais" },
  { label: "أيمن سويد", value: "ar.aymanswoaid" },
];
export const ReaderDropDown = () => {
  const { colorScheme } = useColorScheme();
  const [reader, setReader] = useState(
    storage.getString("reader") || "ar.alafasy"
  );

  const styles = StyleSheet.create({
    container: { borderWidth: 0, borderRadius: 4, overflow: "hidden" },
    dropdown: {
      marginHorizontal: 16,
      borderRadius: 4,
      borderColor: colorScheme === "dark" ? "#787588" : "#544981",
      paddingHorizontal: 10,
      borderWidth: 1,
      width: "80%",
      direction: "ltr",
    },
    item: {
      fontFamily: "HelveticaNeueLTArabic-Roman",
      fontSize: 12,
      color: colorScheme === "dark" ? "#FAF0E6" : "#544981",
    },
    itemContainerStyle: {
      backgroundColor: colorScheme === "dark" ? "#292630" : "#F5F4F4",
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 12,
    },
    selectedStyle: {
      backgroundColor: colorScheme === "dark" ? "#292630" : "#F5F4F4",
    },
    selectedTextStyle: {
      fontSize: 12,
      fontFamily: "HelveticaNeueLTArabic-Roman",
      color: colorScheme === "dark" ? "#FAF0E6" : "#544981",
    },
    iconStyle: {
      display: "none",
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 12,
    },
  });

  return (
    <View className="w-full">
      <Text className="mx-3 my-3 text-primary dark:text-primaryDark font-HelveticaBold">
        صوت القارئ
      </Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        renderLeftIcon={() => (
          <View style={{ transform: "rotate(90deg)" }}>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
            />
          </View>
        )}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.item}
        itemContainerStyle={styles.itemContainerStyle}
        containerStyle={styles.container}
        activeColor={colorScheme === "dark" ? "#433F4E" : "#E8E8E8"}
        iconStyle={styles.iconStyle}
        value={reader}
        valueField="value"
        onChange={(value) => {
          storage.set("reader", value.value);
          setReader(value.value);
        }}
        labelField="label"
        data={data}
      />
    </View>
  );
};
