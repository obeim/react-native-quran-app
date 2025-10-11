import { View } from "react-native";
import { useState, useMemo } from "react";
import Tabs from "@/components/Tabs";
import SurahTab from "./SurahTab";
import JozzTab from "./JozzTab";
import { AzkarTab } from "./AzkarTab";
import { Surah } from "@/types";

export const TypeTabs = ({
  data,
  search,
}: {
  data: Surah[];
  search: string;
}) => {
  const [activeTab, setActiveTab] = useState<"surah" | "chapter" | "azkar">(
    "surah"
  );

  // Use useMemo so we only create the tab definitions once
  const allTabs = useMemo(
    () => [
      {
        name: "surah",
        title: "سورة",
        component: <SurahTab data={data} search={search} />,
      },
      { name: "chapter", title: "جزء", component: <JozzTab search={search} /> },
      {
        name: "azkar",
        title: "أذكار",
        component: <AzkarTab search={search} />,
      },
    ],
    [data, search]
  );

  return (
    <View className="px-4 mt-5 h-[62.4%]">
      <Tabs
        setTab={setActiveTab as (name: string) => void}
        activeTab={activeTab}
        tabs={allTabs}
      />

      {/* Keep all tabs mounted → prefetches all data */}
      {allTabs.map((tab) => (
        <View
          key={tab.name}
          style={{
            display: tab.name === activeTab ? "flex" : "none",
            flex: 1,
          }}
        >
          {tab.component}
        </View>
      ))}
    </View>
  );
};
