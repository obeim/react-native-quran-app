import { Text, View } from "react-native";
import { MainCard } from "./components/MainCard";
import { TypeTabs } from "./components/TypeTabs";
import { useCallback, useState } from "react";
import { SearchInput } from "./components/SearchInput";
import InnerSplash from "@/components/InnerSplash";
import { Header } from "./components/Header";
import { useFocusEffect } from "expo-router";

import { ContinePopup } from "./components/ContinePopup";
import MainDrawer from "./components/MainDrawer";
import useGetSuar from "@/utils/db/useGetSuar";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [openCont, setOpenCont] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const data = useGetSuar();

  useFocusEffect(
    useCallback(() => {
      setOpenCont(true);
    }, [])
  );

  return data ? (
    <View
      className=" w-full h-screen bg-white dark:bg-darkBg "
      onTouchStart={() => {
        if (openCont) setOpenCont(false);
      }}
    >
      <View className="h-[35%]">
        <Header onClickMenu={() => setOpenMenu(true)} />
        <View className="mt-3 w-full px-4">
          <Text className="text-lg font-HelveticaBold mb-2 text-primary/40 dark:text-primaryDark">
            بسم الله الرحمن الرحيم
          </Text>
          <MainCard />
          <SearchInput value={search} onChange={(value) => setSearch(value)} />
        </View>
      </View>
      <TypeTabs search={search} data={data} />
      <ContinePopup isOpen={openCont} />
      <MainDrawer
        isOpen={openMenu}
        close={() => {
          setOpenMenu(false);
        }}
      />
    </View>
  ) : (
    <InnerSplash />
  );
};

export default Home;
