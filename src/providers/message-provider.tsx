import React, { ReactNode } from 'react';
import { MessageProvider } from '@/context/message-context';

interface MessageProviderWrapperProps {
  children: ReactNode;
}

const MessageProviderWrapper: React.FC<MessageProviderWrapperProps> = ({ children }) => {
  return <MessageProvider>{children}</MessageProvider>;
};

export default MessageProviderWrapper;