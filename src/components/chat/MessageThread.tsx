import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface MessageThreadProps {
  messages?: Message[];
}

const defaultMessages: Message[] = [
  {
    id: "1",
    content: "Hello! How can I help you today?",
    sender: "ai",
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    content: "I have a question about React development.",
    sender: "user",
    timestamp: new Date().toISOString(),
  },
  {
    id: "3",
    content: "Sure! I'd be happy to help with any React-related questions.",
    sender: "ai",
    timestamp: new Date().toISOString(),
  },
];

const MessageThread: React.FC<MessageThreadProps> = ({
  messages = defaultMessages,
}) => {
  return (
    <div className="h-full w-full bg-background">
      <ScrollArea className="h-full w-full p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <Avatar className="h-8 w-8">
                  <img
                    src={
                      message.sender === "user"
                        ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                        : "https://api.dicebear.com/7.x/avataaars/svg?seed=ai"
                    }
                    alt={message.sender}
                  />
                </Avatar>
                <Card
                  className={`p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <p className="text-sm">{message.content}</p>
                  <time className="text-xs opacity-50 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </time>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageThread;
