import { StyleSheet, Text, View } from "react-native";
import Setting from "../../assets/icons/Setting.svg";
import Menu from "../../assets/icons/Menu.svg";
import { useState } from "react";

const Home = () => {
  const [press, setPressed] = useState(0);
  return (
    <View className="px-3">
      <View className="flex-1 flex-row justify-between mt-8">
        <Setting
          width={32}
          height={32}
          onPress={() => {
            setPressed(press + 1);
          }}
        />
        <Menu width={25} height={23} />
      </View>
      <View className="mt-14">
        <Text
          style={{ fontFamily: "HelveticaNeueLTArabic-Bold" }}
          className="text-lg font-HelveticaBold text-primary/40"
        >
          أهلا بك
        </Text>
      </View>
    </View>
  );
};

export default Home;
