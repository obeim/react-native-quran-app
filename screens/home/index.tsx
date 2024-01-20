import { ScrollView, Text, View } from "react-native";
import Setting from "@/assets/icons/Setting.svg";
import Menu from "@/assets/icons/Menu.svg";

import { MainCard } from "./components/MainCard";
import { TypeTabs } from "./components/TypeTabs";

const Home = () => {
  return (
    <View className="px-3 w-full h-screen">
      <View className="h-[40%] ">
        <View className="flex-1 flex-row justify-between mt-8">
          <Menu width={25} height={23} />

          <Setting width={32} height={32} />
        </View>
        <View className="mt-0 w-full ">
          <Text className="text-lg font-HelveticaBold text-primary/40">
            بسم الله الرحمن الرحيم
          </Text>
          <MainCard />
        </View>
      </View>
      <TypeTabs />
    </View>
  );
};

export default Home;
