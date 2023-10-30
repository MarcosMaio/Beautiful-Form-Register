"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MessageContextData {
  message: string;
  messageType: "success" | "error" | string;
  setMessage: (message: string) => void;
  setMessageType: (type: "success" | "error" | string) => void;
}

const MessageContext = createContext<MessageContextData | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  return (
    <MessageContext.Provider
      value={{ message, messageType, setMessage, setMessageType }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
}
