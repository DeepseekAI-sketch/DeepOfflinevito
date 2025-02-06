import React from "react";
import MessageThread from "./MessageThread";
import InputSection from "./InputSection";

interface ChatAreaProps {
  onSendMessage?: (message: string) => void;
  onFileUpload?: (file: File) => void;
  onWebSearch?: (query: string) => void;
  isLoading?: boolean;
  messages?: Array<{
    id: string;
    content: string;
    sender: "user" | "ai";
    timestamp: string;
  }>;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  onSendMessage = () => {},
  onFileUpload = () => {},
  onWebSearch = () => {},
  isLoading = false,
  messages = [
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  ],
}) => {
  return (
    <div className="flex flex-col h-full w-full bg-background">
      <div className="flex-1 overflow-hidden">
        <MessageThread messages={messages} />
      </div>
      <InputSection
        onSendMessage={onSendMessage}
        onFileUpload={onFileUpload}
        onWebSearch={onWebSearch}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatArea;
