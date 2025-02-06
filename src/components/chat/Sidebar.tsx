import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon, Sun, History, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SettingsDialog from "./SettingsDialog";

interface SidebarProps {
  onModelChange?: (model: string) => void;
  onOllamaModelChange?: (model: string) => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  selectedModel?: string;
  selectedOllamaModel?: string;
  availableModels?: string[];
  chatHistory?: Array<{ id: string; title: string; date: string }>;
}

const defaultChatHistory = [
  { id: "1", title: "React Development Discussion", date: "2024-03-20" },
  { id: "2", title: "UI Design Patterns", date: "2024-03-19" },
  { id: "3", title: "Code Review Session", date: "2024-03-18" },
];

const Sidebar: React.FC<SidebarProps> = ({
  onModelChange = () => {},
  onOllamaModelChange = () => {},
  onThemeToggle = () => {},
  isDarkMode = false,
  selectedModel = "ollama",
  selectedOllamaModel = "",
  availableModels = [],
  chatHistory = defaultChatHistory,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="w-[280px] h-full border-r bg-background p-4 flex flex-col">
      <div className="space-y-4">
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select AI Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ollama">Ollama (Local)</SelectItem>
          </SelectContent>
        </Select>

        {selectedModel === "ollama" && (
          <Select
            value={selectedOllamaModel}
            onValueChange={onOllamaModelChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Ollama Model" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={onThemeToggle}
            className="w-full justify-start gap-2"
          >
            {isDarkMode ? (
              <>
                <Moon className="h-4 w-4" /> Dark Mode
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" /> Light Mode
              </>
            )}
          </Button>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span className="text-sm font-medium">Chat History</span>
          </div>
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-2 pr-4">
              {chatHistory.map((chat) => (
                <Button
                  key={chat.id}
                  variant="ghost"
                  className="w-full justify-start text-left"
                >
                  <div className="truncate">
                    <div className="text-sm font-medium">{chat.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(chat.date).toLocaleDateString()}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="mt-auto">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>

      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        onThemeToggle={onThemeToggle}
        onModelChange={onModelChange}
        onOllamaModelChange={onOllamaModelChange}
        isDarkMode={isDarkMode}
        selectedModel={selectedModel}
        selectedOllamaModel={selectedOllamaModel}
        availableModels={availableModels}
      />
    </div>
  );
};

export default Sidebar;
