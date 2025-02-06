import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SettingsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onThemeToggle?: () => void;
  onModelChange?: (model: string) => void;
  onOllamaModelChange?: (model: string) => void;
  isDarkMode?: boolean;
  selectedModel?: string;
  selectedOllamaModel?: string;
  availableModels?: string[];
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open = true,
  onOpenChange = () => {},
  onThemeToggle = () => {},
  onModelChange = () => {},
  onOllamaModelChange = () => {},
  isDarkMode = false,
  selectedModel = "ollama",
  selectedOllamaModel = "",
  availableModels = [],
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>AI Model</Label>
            <Select value={selectedModel} onValueChange={onModelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select AI Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ollama">Ollama (Local)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedModel === "ollama" && (
            <div className="space-y-2">
              <Label>Ollama Model</Label>
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
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <Label>Dark Mode</Label>
            <Switch checked={isDarkMode} onCheckedChange={onThemeToggle} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
