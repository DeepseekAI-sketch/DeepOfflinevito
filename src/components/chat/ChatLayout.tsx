import React from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";

interface ChatLayoutProps {
  onModelChange?: (model: string) => void;
  onOllamaModelChange?: (model: string) => void;
  onThemeToggle?: () => void;
  onSendMessage?: (message: string) => void;
  onFileUpload?: (file: File) => void;
  onWebSearch?: (query: string) => void;
  isDarkMode?: boolean;
  selectedModel?: string;
  selectedOllamaModel?: string;
  availableModels?: string[];
  isLoading?: boolean;
  messages?: Array<{
    id: string;
    content: string;
    sender: "user" | "ai";
    timestamp: string;
  }>;
  chatHistory?: Array<{
    id: string;
    title: string;
    date: string;
  }>;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  onModelChange = () => {},
  onOllamaModelChange = () => {},
  onThemeToggle = () => {},
  onSendMessage = () => {},
  onFileUpload = () => {},
  onWebSearch = () => {},
  isDarkMode = false,
  selectedModel = "ollama",
  selectedOllamaModel = "",
  availableModels = [],
  isLoading = false,
  messages = [],
  chatHistory = [],
}) => {
  return (
    <div className="flex h-screen w-screen bg-background">
      <Sidebar
        onModelChange={onModelChange}
        onOllamaModelChange={onOllamaModelChange}
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
        selectedModel={selectedModel}
        selectedOllamaModel={selectedOllamaModel}
        availableModels={availableModels}
        chatHistory={chatHistory}
      />
      <ChatArea
        onSendMessage={onSendMessage}
        onFileUpload={onFileUpload}
        onWebSearch={onWebSearch}
        isLoading={isLoading}
        messages={messages}
      />
    </div>
  );
};

export default ChatLayout;
