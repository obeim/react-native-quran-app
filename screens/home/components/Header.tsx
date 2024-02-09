import { Pressable, Text, View } from "react-native";
import Moon from "@/assets/icons/Moon.svg";
import Sun from "@/assets/icons/Sun.svg";
import Menu from "@/assets/icons/Menu.svg";
import { useColorScheme } from "nativewind";
import { storage } from "@/utils";

export function Header() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1 flex-row justify-between ">
      <Pressable className=" h-18 w-32 pl-4  items-start justify-start ">
        <Menu
          className="my-auto"
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          width={25}
          height={20}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          storage.set("theme", colorScheme === "dark" ? "light" : "dark");
          toggleColorScheme();
        }}
        className=" h-18 w-32 pr-4 flex-row items-center justify-end "
      >
        <View className="flex-row items-center justify-end p-2 rounded-full bg-lotion dark:bg-blackCoral">
          <Text
            className={` text-primary dark:text-primaryDark/60 mx-2 mt-1 font-HelveticaRoman text-xs transition-transform transform duration-200 ${
              colorScheme === "light" ? "" : "-translate-x-6"
            }`}
          >
            {colorScheme === "dark" ? "فاتح" : "غامق"}
          </Text>
          {colorScheme === "dark" ? (
            <Sun className={`my-auto translate-x-9 `} width={25} height={20} />
          ) : (
            <Moon className={`my-auto`} width={22} height={16} />
          )}
        </View>
      </Pressable>
    </View>
  );
}
