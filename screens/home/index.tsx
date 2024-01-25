import { Text, TextInput, View } from "react-native";
import Search from "@/assets/icons/Search.svg";
import Moon from "@/assets/icons/Moon.svg";

import { MainCard } from "./components/MainCard";
import { TypeTabs } from "./components/TypeTabs";
import { useState } from "react";
import { onChangeDelayed } from "@/utils";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [timeout, setTimeOutValue] = useState<string>("");

  return (
    <View className="px-3 w-full h-screen">
      <View className="h-[34%] ">
        <View className="flex-1 flex-row justify-between mt-5">
          <View></View>
          <Moon width={25} height={23} />
        </View>
        <View className="mt-0 w-full ">
          <Text className="text-lg font-HelveticaBold text-primary/40">
            بسم الله الرحمن الرحيم
          </Text>
          <MainCard />

          <View className="relative h-12 mt-6">
            <Search
              className="absolute top-[15px] left-[13px]"
              height={17}
              width={20}
            />
            <TextInput
              selectionColor="#544981"
              placeholder="بحث"
              blurOnSubmit
              className="w-full h-full text-right pl-10 font-HelveticaRoman border border-lotion  rounded-lg"
              onChangeText={(text) => {
                onChangeDelayed({
                  event: text,
                  onChange: (value) => {
                    setSearch(value);
                  },
                  setTimeOutValue: setTimeOutValue,
                  timeout: timeout,
                });
              }}
            />
          </View>
        </View>
      </View>
      <TypeTabs search={search} />
    </View>
  );
};

export default Home;
