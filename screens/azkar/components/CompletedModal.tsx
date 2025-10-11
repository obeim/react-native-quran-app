import { AntDesign } from "@expo/vector-icons";
import { Motion } from "@legendapp/motion";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Modal, Pressable, Text } from "react-native";

const CompletedModal = ({
  opened,
  close,
}: {
  opened: boolean;
  close?: () => void;
}) => {
  const local = useLocalSearchParams();

  return (
    <Modal
      onRequestClose={() => close?.()}
      visible={opened}
      transparent
      animationType="fade"
    >
      <Pressable
        onPress={() => {
          close?.();
        }}
        className="bg-black/40 w-full h-full absolute"
      ></Pressable>
      <Motion.View
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 100 }}
        className="bg-lotion dark:bg-darkBg bottom-0 py-6 w-auto px-5 shadow my-auto mx-auto rounded-xl items-center "
        style={{
          shadowRadius: 5,
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowColor: "#000000",
          elevation: 4,
        }}
      >
        <AntDesign
          name="check-circle"
          size={44}
          color="green"
          style={{ marginBottom: 30 }}
        />
        <Text className="text-primary dark:text-primaryDark font-HelveticaRoman text-xl">
          لقد أكملت {local.category}
        </Text>
        <Pressable
          onPress={() => {
            router.back();
          }}
          className=" mt-3 px-8 py-1"
        >
          <Text className="text-primary dark:text-primaryDark font-HelveticaBold underline">
            مغادرة
          </Text>
        </Pressable>
      </Motion.View>
    </Modal>
  );
};

export default CompletedModal;
