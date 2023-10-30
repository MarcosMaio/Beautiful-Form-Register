import { useMessage } from "@/context/message-context";

export function GetMessageType(
  message: string,
  type: "success" | "error"
): void {
  const { setMessage, setMessageType } = useMessage();
  setMessage(message);
  setMessageType(type);
}
