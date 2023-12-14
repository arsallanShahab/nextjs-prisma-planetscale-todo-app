"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { Toaster } from "react-hot-toast";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            borderRadius: "99px",
            fontFamily: "Rubik",
            fontWeight: "500",
            fontSize: "1rem",
            maxWidth: "100%",
          },
        }}
        containerStyle={{
          right: "2rem",
          top: "6rem",
        }}
      />
    </NextThemesProvider>
  );
}
