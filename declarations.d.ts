/// <reference types="nativewind/types" />

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.db" {
  const content: any;
  export default content;
}
