"use client";
// allows you to wrap this around layout.jsx, without making layout a client component

import { store } from "./store";
import { Provider } from "react-redux";

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
