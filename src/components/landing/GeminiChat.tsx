import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, User, Loader2, Trophy } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "model";
  text: string;
  isError?: boolean;
}

interface GeminiChatProps {
  onBookTrial: () => void;
}

export default function GeminiChat({ onBookTrial }: GeminiChatProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "model",
      text: "Hello! I'm your Chess Verse Assistant. How can I help you today? Whether you have questions about our curriculum, coaches, or booking a trial, I'm here to help!"
    }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: userMessage },
        { 
          role: "model", 
          text: "I'm sorry, I'm not properly configured to chat right now. Please check if the Gemini API key is set.",
          isError: true 
        }
      ]);
      return;
    }

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const client = new GoogleGenAI({ apiKey });
      
      // Prepare history for multi-turn chat
      const history = messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const chat = client.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are the Chess Verse Assistant, a helpful and professional expert for a premium offline chess academy for children aged 6-16. Your goal is to help parents understand the benefits of chess (focus, discipline, strategic thinking) and guide them to book a free trial class. Be warm, trustworthy, and confident. Keep responses concise and focused on student outcomes. If asked about booking, mention that trial slots are limited and encourage them to use the booking form on the page.",
        },
        history: history
      });

      const result = await chat.sendMessage({
        message: userMessage
      });

      if (!result.text) {
        throw new Error("No response from AI");
      }

      setMessages((prev) => [...prev, { role: "model", text: result.text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "model", 
          text: "I'm having a bit of trouble connecting to the brain right now. Please try sending your message again or refresh the page.",
          isError: true 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-24 right-6 z-50 p-4 rounded-full shadow-2xl flex items-center justify-center transition-colors",
          isOpen ? "bg-dark-grey text-white" : "bg-gold text-black-rich"
        )}
      >
        {isOpen ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-44 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-black-rich border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-dark-grey border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gold p-2 rounded-xl">
                  <Trophy className="h-5 w-5 text-black-rich" />
                </div>
                <div>
                  <h3 className="font-bold text-white-soft">Chess Verse Assistant</h3>
                  <p className="text-xs text-gold flex items-center gap-1">
                    <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex items-start gap-2 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg shrink-0",
                    msg.role === "user" ? "bg-gold/10" : "bg-white/5"
                  )}>
                    {msg.role === "user" ? <User className="h-4 w-4 text-gold" /> : <Bot className="h-4 w-4 text-gold" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-gold text-black-rich font-medium rounded-tr-none" 
                      : msg.isError
                        ? "bg-red-500/10 text-red-400 border border-red-500/20 rounded-tl-none"
                        : "bg-dark-grey text-white-soft rounded-tl-none border border-white/5"
                  )}>
                    {msg.text}
                    {msg.role === "model" && !msg.isError && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setIsOpen(false);
                            onBookTrial();
                          }}
                          className="w-full border-gold text-gold hover:bg-gold hover:text-black-rich text-xs h-8 rounded-lg"
                        >
                          Book a Free Trial
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2 mr-auto max-w-[85%]">
                  <div className="p-2 rounded-lg bg-white/5 shrink-0">
                    <Bot className="h-4 w-4 text-gold" />
                  </div>
                  <div className="p-3 bg-dark-grey text-white-soft rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-dark-grey border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our academy..."
                  className="bg-black-rich border-white/10 text-white-soft rounded-xl focus:ring-gold"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="bg-gold hover:bg-gold/90 text-black-rich rounded-xl shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
