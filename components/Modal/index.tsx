import { FC, PropsWithChildren } from "react";
import { Modal, Pressable } from "react-native";

const MyModal: FC<
  PropsWithChildren<{
    isOpen: boolean;
    close: () => void;
    animationType?: "fade" | "none" | "slide";
  }>
> = ({ isOpen, close, children, animationType }) => {
  return (
    <Modal
      onRequestClose={() => close()}
      visible={isOpen}
      transparent
      animationType={animationType || "fade"}
    >
      <Pressable
        onPress={() => {
          close();
        }}
        className=" w-full h-full absolute"
      ></Pressable>

      {children}
    </Modal>
  );
};

export default MyModal;
