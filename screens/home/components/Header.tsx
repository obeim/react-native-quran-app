import { Pressable, View } from "react-native";
import Moon from "@/assets/icons/Moon.svg";
import Sun from "@/assets/icons/Sun.svg";
import Menu from "@/assets/icons/Menu.svg";
import { useColorScheme } from "nativewind";
import { storage } from "@/utils";

export function Header() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1 flex-row justify-between ">
      <Pressable
        onPress={toggleColorScheme}
        className=" h-18 w-32 pl-4  items-start justify-start "
      >
        <Menu
          className="my-auto"
          color={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
          width={25}
          height={23}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          storage.set("theme", colorScheme === "dark" ? "light" : "dark");
          toggleColorScheme();
        }}
        className=" h-18 w-32 pr-4  items-end justify-start "
      >
        {colorScheme === "dark" ? (
          <Sun className="my-auto" width={25} height={23} />
        ) : (
          <Moon className="my-auto" width={25} height={23} />
        )}
      </Pressable>
    </View>
  );
}
