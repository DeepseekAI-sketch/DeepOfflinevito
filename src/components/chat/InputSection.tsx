import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Send, Paperclip, Search, Code, Image, FileText } from "lucide-react";

interface InputSectionProps {
  onSendMessage?: (message: string) => void;
  onFileUpload?: (file: File) => void;
  onWebSearch?: (query: string) => void;
  isLoading?: boolean;
}

const InputSection = ({
  onSendMessage = () => {},
  onFileUpload = () => {},
  onWebSearch = () => {},
  isLoading = false,
}: InputSectionProps) => {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      setIsExpanded(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="w-full bg-background border-t p-4 space-y-4">
      <div className="flex gap-2 items-start">
        <ScrollArea className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Type your message here..."
            className={`min-h-[60px] ${isExpanded ? "h-32" : "h-[60px]"} resize-none`}
          />
        </ScrollArea>
        <div className="flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !message.trim()}
                  size="icon"
                  variant="default"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileChange}
                    multiple
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>Attach file</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Web search</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Code className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Code snippet</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <span>Supported files:</span>
          <div className="flex gap-2 ml-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FileText className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Documents (PDF, DOC, TXT)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Image className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Images (PNG, JPG, GIF)</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
