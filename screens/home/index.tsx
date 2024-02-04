import { Pressable, Text, View } from "react-native";
import Moon from "@/assets/icons/Moon.svg";
import Sun from "@/assets/icons/Sun.svg";
import Menu from "@/assets/icons/Menu.svg";

import { MainCard } from "./components/MainCard";
import { TypeTabs } from "./components/TypeTabs";
import { useState } from "react";
import { useQuery } from "react-query";
import SurahsRepo from "@/db/repos/SurahsRepo";
import { useColorScheme } from "nativewind";
import { SearchInput } from "./components/SearchInput";
import InnerSplash from "@/components/InnerSplash";
import { storage } from "@/utils";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const { data, isFetched } = useQuery(
    "suar",
    async () => {
      return await SurahsRepo.query({ order: { number: "ASC" } });
    },
    { cacheTime: Infinity }
  );

  return data && isFetched ? (
    <View className=" w-full h-screen bg-white dark:bg-darkBg ">
      <View className="h-[34%]">
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
        <View className="mt-3 w-full px-4">
          <Text className="text-lg font-HelveticaBold mb-2 text-primary/40 dark:text-primaryDark">
            بسم الله الرحمن الرحيم
          </Text>
          <MainCard />
          <SearchInput value={search} onChange={(value) => setSearch(value)} />
        </View>
      </View>
      {data && <TypeTabs search={search} data={data} />}
    </View>
  ) : (
    <InnerSplash />
  );
};

export default Home;
