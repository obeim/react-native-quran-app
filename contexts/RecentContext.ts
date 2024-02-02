import { Recent } from "@/types";
import { createContext } from "react";

export default createContext<RecentContextType>({ setRecent: () => {} });

export interface RecentContextType {
  recent?: Recent;
  setRecent: (recent: Recent) => void;
}
