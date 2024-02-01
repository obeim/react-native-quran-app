import { Pressable, Text, View } from "react-native";

interface Props {
  tabs: { name: string; title: string }[];
  activeTab?: string;
  setTab: (name: string) => void;
  className?: string;
  vertical?: boolean;
}
const Tabs = ({ tabs, activeTab, setTab, vertical = false }: Props) => {
  return (
    <View className={`w-full h-10 `}>
      <View className={`w-full flex-1 flex-row  justify-between `}>
        {tabs.map((item, index) => (
          <Pressable
            className={`${vertical && ` w-24 `} cursor-pointer w-20 `}
            onPress={() => setTab(item.name)}
            key={index}
          >
            <Text
              className={`text-base text-center transition-all w-full  p-2 ${
                item.name === activeTab
                  ? "font-HelveticaBold rounded-xl transition-all bg-lotion text-primary"
                  : " font-HelveticaRoman text-primary/20"
              } `}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Tabs;
