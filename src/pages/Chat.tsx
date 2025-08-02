import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  MessageCircle, 
  User, 
  Settings,
  Wifi,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  sender: "admin" | "user";
  senderName: string;
  content: string;
  timestamp: Date;
  type: "text" | "system";
}

interface ChatRoom {
  id: number;
  name: string;
  type: "general" | "support" | "marketplace";
  isActive: boolean;
  unreadCount: number;
  lastMessage?: string;
  lastActivity: Date;
}

const Chat = () => {
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentUser] = useState("farmer"); // Could be "admin" or "farmer"
  const [selectedRoom, setSelectedRoom] = useState<number>(1);
  const [newMessage, setNewMessage] = useState("");
  
  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: 1,
      name: "General Discussion",
      type: "general",
      isActive: true,
      unreadCount: 2,
      lastMessage: "Welcome to the marketplace chat!",
      lastActivity: new Date("2024-08-02T14:30:00")
    },
    {
      id: 2,
      name: "Support & Help",
      type: "support",
      isActive: true,
      unreadCount: 0,
      lastMessage: "How can we help you today?",
      lastActivity: new Date("2024-08-02T13:15:00")
    },
    {
      id: 3,
      name: "Marketplace Updates",
      type: "marketplace",
      isActive: true,
      unreadCount: 1,
      lastMessage: "New discount on organic tomatoes!",
      lastActivity: new Date("2024-08-02T15:45:00")
    }
  ]);

  const [messages, setMessages] = useState<Record<number, Message[]>>({
    1: [
      {
        id: 1,
        sender: "admin",
        senderName: "Admin",
        content: "Welcome to the FarmTrade general discussion! Feel free to ask questions and connect with other farmers.",
        timestamp: new Date("2024-08-02T09:00:00"),
        type: "text"
      },
      {
        id: 2,
        sender: "user",
        senderName: "John Smith",
        content: "Good morning everyone! Just wanted to share that my tomato harvest is looking great this season.",
        timestamp: new Date("2024-08-02T10:30:00"),
        type: "text"
      },
      {
        id: 3,
        sender: "admin",
        senderName: "Admin",
        content: "That's wonderful news, John! Have you considered listing them on our marketplace?",
        timestamp: new Date("2024-08-02T10:35:00"),
        type: "text"
      },
      {
        id: 4,
        sender: "user",
        senderName: "Maria Garcia",
        content: "I'm interested in bulk orders for restaurants. Anyone have experience with that?",
        timestamp: new Date("2024-08-02T14:30:00"),
        type: "text"
      }
    ],
    2: [
      {
        id: 1,
        sender: "admin",
        senderName: "Support Team",
        content: "Hello! This is the support channel. How can we help you today?",
        timestamp: new Date("2024-08-02T08:00:00"),
        type: "text"
      }
    ],
    3: [
      {
        id: 1,
        sender: "admin",
        senderName: "Admin",
        content: "📢 New discount alert: 15% off on all organic vegetables this week!",
        timestamp: new Date("2024-08-02T15:45:00"),
        type: "system"
      }
    ]
  });

  const currentRoomMessages = messages[selectedRoom] || [];
  const currentRoom = chatRooms.find(room => room.id === selectedRoom);

  useEffect(() => {
    scrollToBottom();
  }, [currentRoomMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      sender: currentUser === "admin" ? "admin" : "user",
      senderName: currentUser === "admin" ? "Admin" : "You",
      content: newMessage,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => ({
      ...prev,
      [selectedRoom]: [...(prev[selectedRoom] || []), message]
    }));

    setNewMessage("");

    // Simulate admin response in support channel
    if (selectedRoom === 2 && currentUser !== "admin") {
      setTimeout(() => {
        const adminResponse: Message = {
          id: Date.now() + 1,
          sender: "admin",
          senderName: "Support Team",
          content: "Thank you for your message. Our team will get back to you shortly with assistance.",
          timestamp: new Date(),
          type: "text"
        };

        setMessages(prev => ({
          ...prev,
          [selectedRoom]: [...(prev[selectedRoom] || []), adminResponse]
        }));
      }, 2000);
    }

    toast({
      title: "Message sent",
      description: "Your message has been posted to the chat.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getRoomIcon = (type: string) => {
    switch (type) {
      case "general": return <MessageCircle className="w-4 h-4" />;
      case "support": return <Settings className="w-4 h-4" />;
      case "marketplace": return <Wifi className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] pb-20 md:pb-6">
      {/* Chat Rooms Sidebar */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Chat Rooms</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {chatRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`w-full p-4 text-left hover:bg-muted transition-colors ${
                  selectedRoom === room.id ? "bg-farm-secondary/20 border-r-2 border-farm-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    {getRoomIcon(room.type)}
                    <span className="font-medium text-sm">{room.name}</span>
                  </div>
                  {room.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {room.unreadCount}
                    </Badge>
                  )}
                </div>
                {room.lastMessage && (
                  <p className="text-xs text-muted-foreground truncate">
                    {room.lastMessage}
                  </p>
                )}
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {formatTime(room.lastActivity)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {currentRoom && getRoomIcon(currentRoom.type)}
              <div>
                <CardTitle className="text-lg">{currentRoom?.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {currentRoom?.type === "general" && "Connect with farmers and discuss farming topics"}
                  {currentRoom?.type === "support" && "Get help from our support team"}
                  {currentRoom?.type === "marketplace" && "Latest updates and announcements"}
                </p>
              </div>
            </div>
            <Badge variant="success" className="flex items-center space-x-1">
              <Wifi className="w-3 h-3" />
              <span>Online</span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
            {currentRoomMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" && message.senderName === "You" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex space-x-3 max-w-xs md:max-w-md ${
                  message.sender === "user" && message.senderName === "You" ? "flex-row-reverse space-x-reverse" : ""
                }`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={
                      message.sender === "admin" ? "bg-farm-primary text-white" : "bg-farm-secondary"
                    }>
                      {message.sender === "admin" ? "A" : message.senderName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`space-y-1 ${
                    message.sender === "user" && message.senderName === "You" ? "text-right" : ""
                  }`}>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{message.senderName}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === "system" 
                        ? "bg-farm-accent/20 text-farm-accent-foreground border border-farm-accent/30"
                        : message.sender === "user" && message.senderName === "You"
                        ? "bg-farm-primary text-white"
                        : "bg-muted"
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={sendMessage} variant="farm" disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;