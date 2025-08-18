"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextType {
  hideHeaderFooter: boolean;
  setHideHeaderFooter: (hide: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);

  return (
    <LayoutContext.Provider value={{ hideHeaderFooter, setHideHeaderFooter }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}
