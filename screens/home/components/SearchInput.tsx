import { Pressable, TextInput, View } from "react-native";
import Search from "@/assets/icons/Search.svg";
import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="relative h-12 mt-4">
      <Search
        className={`absolute top-[15px] left-[13px]  ${
          colorScheme === "dark" ? "text-primaryDark/60 " : "text-primary"
        } `}
        height={17}
        width={20}
      />
      {value.trim() && value.length > 0 && (
        <Pressable
          onPress={() => onChange("")}
          className={`absolute top-0 inline-flex justify-center items-center right-0 z-20 w-10 h-12 ${
            colorScheme === "dark" ? "text-primaryDark/70" : "text-primary/20"
          } `}
        >
          <AntDesign
            style={{ marginHorizontal: "auto", marginVertical: "auto" }}
            name="close"
            size={20}
            color={colorScheme === "dark" ? "#FAF0E666" : "#544981"}
          />
        </Pressable>
      )}
      <TextInput
        selectionColor={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
        placeholder="بحث"
        blurOnSubmit
        placeholderTextColor={
          colorScheme === "dark" ? "#faf0e666" : "#54498166"
        }
        value={value}
        className="w-full h-full text-right pl-10 font-HelveticaRoman  text-primary dark:text-primaryDark border  border-lotion dark:border-blackCoral rounded-lg"
        onChangeText={(text) => {
          onChange(text);
        }}
      />
    </View>
  );
}
