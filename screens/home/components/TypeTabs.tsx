import { View } from "react-native";
import { useState } from "react";
import Tabs from "@/components/Tabs";
import SurahTab from "./SurahTab";

export const TypeTabs = () => {
  const [tab, setTab] = useState("surah");
  return (
    <View className="px-3 mt-9">
      <Tabs
        setTab={(name) => {
          setTab(name);
        }}
        activeTab={tab}
        tabs={tabs}
      />
      {tabs.filter((ta) => ta.name === tab)[0]?.component}
    </View>
  );
};
export const tabs = [
  { name: "surah", title: "سورة", component: <SurahTab /> },
  { name: "chapter", title: "جزء" },
  { name: "hizb", title: "حزب" },
];
