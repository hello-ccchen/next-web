"use client";
import { Provider } from "react-redux";
import { CommonProps } from "@/common/common-props";
import { store } from "./store";

function StoreProvider({ children }: CommonProps) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
