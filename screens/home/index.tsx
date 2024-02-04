import { Text, View } from "react-native";

import { MainCard } from "./components/MainCard";
import { TypeTabs } from "./components/TypeTabs";
import { useState } from "react";
import { useQuery } from "react-query";
import SurahsRepo from "@/db/repos/SurahsRepo";
import { SearchInput } from "./components/SearchInput";
import InnerSplash from "@/components/InnerSplash";
import { Header } from "./components/Header";

const Home = () => {
  const [search, setSearch] = useState<string>("");

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
        <Header />
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
