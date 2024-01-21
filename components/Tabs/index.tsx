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
      <View
        className={`w-full flex-1 flex-row border-b-2 border-lotion/50 gap-10 `}
      >
        {tabs.map((item, index) => (
          <Pressable
            className={`${
              vertical && `md:w-full w-24 `
            }   cursor-pointer  w-12  `}
            onPress={() => setTab(item.name)}
            key={index}
          >
            <Text
              className={`text-base text-center  ${
                item.name === activeTab
                  ? "font-HelveticaBold border-b-[3px] border-primary pb-4 text-primary"
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
