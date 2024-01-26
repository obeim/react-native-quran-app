import { View } from "react-native";
import { useState } from "react";
import Tabs from "@/components/Tabs";
import SurahTab from "./SurahTab";
import { Surah } from "@/types/Suar";
import JozzTab from "./JozzTab";

export const TypeTabs = (props: {
  search: string;
  data: Surah[];
  loading: boolean;
}) => {
  const [tab, setTab] = useState("surah");
  return (
    <View className="px-3 mt-9">
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
export const tabs = (props: {
  search: string;
  data: Surah[];
  loading: boolean;
}) => [
  { name: "surah", title: "سورة", component: <SurahTab {...props} /> },
  { name: "chapter", title: "جزء", component: <JozzTab /> },
  { name: "hizb", title: "أية" },
];
