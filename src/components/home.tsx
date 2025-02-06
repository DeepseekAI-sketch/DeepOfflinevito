import React, { useState, useEffect } from "react";
import ChatLayout from "./chat/ChatLayout";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
}

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState("ollama");
  const [selectedOllamaModel, setSelectedOllamaModel] = useState("");
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Welcome! I'm your local Ollama AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  ]);

  // Fetch available models when component mounts
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://127.0.0.1:11434/api/tags");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const models = data.models.map((model: OllamaModel) => model.name);
        setAvailableModels(models);
        if (models.length > 0) {
          setSelectedOllamaModel(models[0]);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!selectedOllamaModel) {
      const errorMessage: Message = {
        id: String(messages.length + 1),
        content: "Please select an Ollama model first.",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: String(messages.length + 1),
      content: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Send to Ollama
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedOllamaModel,
          prompt: message,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: String(messages.length + 2),
        content: data.response,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling Ollama:", error);
      const errorMessage: Message = {
        id: String(messages.length + 2),
        content: `Error: Could not connect to Ollama. Make sure the model ${selectedOllamaModel} is installed. Try running: ollama pull ${selectedOllamaModel}`,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file.name);
  };

  const handleWebSearch = (query: string) => {
    console.log("Web search:", query);
  };

  return (
    <div className="min-h-screen bg-background">
      <ChatLayout
        onModelChange={setSelectedModel}
        onOllamaModelChange={setSelectedOllamaModel}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        onWebSearch={handleWebSearch}
        isDarkMode={isDarkMode}
        selectedModel={selectedModel}
        selectedOllamaModel={selectedOllamaModel}
        availableModels={availableModels}
        isLoading={isLoading}
        messages={messages}
        chatHistory={[
          { id: "1", title: "Getting Started", date: "2024-03-20" },
          { id: "2", title: "AI Models Overview", date: "2024-03-19" },
          { id: "3", title: "File Processing Demo", date: "2024-03-18" },
        ]}
      />
    </div>
  );
};

export default Home;
