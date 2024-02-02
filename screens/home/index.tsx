import { Pressable, Text, TextInput, View } from "react-native";
import Search from "@/assets/icons/Search.svg";
import Moon from "@/assets/icons/Moon.svg";
import Sun from "@/assets/icons/Sun.svg";

import { MainCard } from "./components/MainCard";
import { TypeTabs } from "./components/TypeTabs";
import { useState } from "react";
import { useQuery } from "react-query";
import SurahsRepo from "@/db/repos/SurahsRepo";
import { useColorScheme } from "nativewind";

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

  return (
    data &&
    isFetched && (
      <View className="px-3 w-full h-screen bg-white dark:bg-darkBg ">
        <View className="h-[30%]">
          <View className="flex-1 flex-row justify-between mt-5">
            <View></View>
            <Pressable onPress={toggleColorScheme}>
              {colorScheme === "dark" ? (
                <Sun className="transition-all" width={25} height={23} />
              ) : (
                <Moon className="transition-all" width={25} height={23} />
              )}
            </Pressable>
          </View>
          <View className="mt-0 w-full ">
            <Text className="text-lg font-HelveticaBold text-primary/40 dark:text-primaryDark/80">
              بسم الله الرحمن الرحيم
            </Text>
            <MainCard />

            <View className="relative h-12 mt-6">
              <Search
                className={`absolute top-[15px] left-[13px] ${
                  colorScheme === "dark"
                    ? "text-primaryDark/40"
                    : "text-primary"
                } `}
                height={17}
                width={20}
              />
              <TextInput
                selectionColor={colorScheme === "dark" ? "#FAF0E6" : "#544981"}
                placeholder="بحث"
                blurOnSubmit
                placeholderTextColor={
                  colorScheme === "dark" ? "#faf0e666" : "#54498166"
                }
                className="w-full h-full text-right pl-10 font-HelveticaRoman  text-primary dark:text-primaryDark border  border-lotion dark:border-blackCoral rounded-lg"
                onChangeText={(text) => {
                  setSearch(text);
                }}
              />
            </View>
          </View>
        </View>
        {data && <TypeTabs search={search} data={data} />}
      </View>
    )
  );
};

export default Home;
