import { View } from "react-native";
import { useState } from "react";
import Tabs from "@/components/Tabs";
import SurahTab from "./SurahTab";
import JozzTab from "./JozzTab";
import { Surah } from "@/types/Suar";

export const TypeTabs = (props: { data: Surah[]; search: string }) => {
  const [tab, setTab] = useState<string>("surah");

  return (
    <View className="px-3 mt-5">
      <Tabs
        setTab={(name) => {
          setTab(name);
        }}
        activeTab={tab}
        tabs={tabs(props)}
      />
      {tabs(props).filter((ta) => ta.name === tab)[0]?.component}
    </View>
  );
};
export const tabs = (props: { data: Surah[]; search: string }) => [
  { name: "surah", title: "سورة", component: <SurahTab {...props} /> },
  { name: "chapter", title: "جزء", component: <JozzTab /> },
  { name: "hizb", title: "أية" },
];
