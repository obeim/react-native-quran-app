import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Dropdown } from "react-native-element-dropdown";

export const Select = ({
  value,
  onChange,
  label,
  data,
}: {
  value: string | { label: string; value: string } | null | undefined;
  onChange: (value: { label: string; value: string }) => void;
  label?: string;
  data: { label: string; value: string }[];
  itemFontSize?: number;
}) => {
  const { colorScheme } = useColorScheme();

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
      {label && (
        <Text className="mx-3 my-3 text-primary dark:text-primaryDark font-HelveticaBold">
          {label}
        </Text>
      )}
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
        value={value}
        valueField="value"
        onChange={(value) => {
          onChange(value);
        }}
        labelField="label"
        data={data}
      />
    </View>
  );
};
