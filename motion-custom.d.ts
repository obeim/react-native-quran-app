declare module "@legendapp/motion" {
  export * from "@legendapp/motion/react-native";
  import type { ComponentType } from "react";

  // Fix JSX inference for Motion components
  export const Motion: Record<string, ComponentType<any>>;
}
