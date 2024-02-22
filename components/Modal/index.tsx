import { FC, PropsWithChildren, useMemo } from "react";
import { Modal, Pressable } from "react-native";

const MyModal: FC<
  PropsWithChildren<{
    isOpen: boolean;
    close: () => void;
  }>
> = ({ isOpen, close, children }) => {
  return (
    <Modal
      onRequestClose={() => close()}
      visible={isOpen}
      transparent
      animationType="fade"
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
