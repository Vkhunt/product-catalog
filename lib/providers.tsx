"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { StorefrontProvider } from "@/context/StorefrontContext";

interface ProvidersProps {
  children: ReactNode;
}


export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <StorefrontProvider>
        {children}
      </StorefrontProvider>
    </Provider>
  );
}
