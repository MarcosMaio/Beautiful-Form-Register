"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

interface StoredUsernameContextProps {
  storedUsername: string;
  setStoredUsername: React.Dispatch<React.SetStateAction<string>>;
}

const StoredUsernameContext = createContext<
  StoredUsernameContextProps | undefined
>(undefined);

export const StoredUsernameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [storedUsername, setStoredUsername] = useState<string>("");

  return (
    <StoredUsernameContext.Provider
      value={{ storedUsername, setStoredUsername }}
    >
      {children}
    </StoredUsernameContext.Provider>
  );
};

export const useStoredUsername = () => {
  const context = useContext(StoredUsernameContext);
  if (!context) {
    throw new Error("useStoreUsername must be used within a UserProvider");
  }
  return context;
};
