import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Sender } from "../backend.d";
import { useGetChatHistory, useSaveChatMessage } from "../hooks/useQueries";
import { getBotResponse, isCrisisMessage } from "../lib/botResponses";

interface LocalMessage {
  id: string;
  sender: "user" | "bot";
  message: string;
  timestamp: number;
}

export default function SupportChat() {
  const [input, setInput] = useState("");
  const [localMsgs, setLocalMsgs] = useState<LocalMessage[]>([]);
  const [crisis, setCrisis] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data: history } = useGetChatHistory();
  const { mutateAsync: saveMsg } = useSaveChatMessage();

  useEffect(() => {
    if (history && history.length > 0 && !seeded) {
      setSeeded(true);
      setLocalMsgs(
        history.map((m, i) => ({
          id: String(i),
          sender: m.sender === Sender.user ? "user" : "bot",
          message: m.message,
          timestamp: Number(m.timestamp),
        })),
      );
    }
  }, [history, seeded]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll-to-bottom on message/crisis change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMsgs, crisis]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");

    const userMsg: LocalMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: text,
      timestamp: Date.now(),
    };

    if (isCrisisMessage(text)) {
      setCrisis(true);
      setLocalMsgs((prev) => [...prev, userMsg]);
      await saveMsg({ sender: Sender.user, message: text });
      return;
    }

    setCrisis(false);
    setLocalMsgs((prev) => [...prev, userMsg]);
    await saveMsg({ sender: Sender.user, message: text });

    const botText = getBotResponse(text);
    const botMsg: LocalMessage = {
      id: `${Date.now()}-bot`,
      sender: "bot",
      message: botText,
      timestamp: Date.now(),
    };
    setLocalMsgs((prev) => [...prev, botMsg]);
    await saveMsg({ sender: Sender.bot, message: botText });
  };

  return (
    <div className="flex flex-col gap-3" data-ocid="chat.section">
      <ScrollArea className="h-60 pr-2">
        <div className="flex flex-col gap-2 py-1">
          {localMsgs.length === 0 && (
            <div
              data-ocid="chat.empty_state"
              className="text-center text-muted-foreground text-sm py-8"
            >
              Start a conversation. I'm here to listen. 💚
            </div>
          )}
          <AnimatePresence initial={false}>
            {localMsgs.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-sm leading-snug ${
                    msg.sender === "user"
                      ? "bg-teal text-white rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.message}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <AnimatePresence>
        {crisis && (
          <motion.div
            data-ocid="chat.crisis.panel"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="bg-red-50 border border-red-300 rounded-xl p-4 text-sm"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-red-700 mb-1">
                  You're not alone — help is available right now.
                </p>
                <ul className="text-red-600 space-y-0.5">
                  <li>
                    📞 <strong>National Suicide Prevention Lifeline:</strong>{" "}
                    Call or text <strong>988</strong>
                  </li>
                  <li>
                    💬 <strong>Crisis Text Line:</strong> Text{" "}
                    <strong>HOME</strong> to <strong>741741</strong>
                  </li>
                </ul>
                <p className="text-red-500 mt-2 text-xs">
                  Please reach out to a mental health professional or someone
                  you trust.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        <Input
          data-ocid="chat.message.input"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1"
        />
        <Button
          type="button"
          data-ocid="chat.send.primary_button"
          onClick={handleSend}
          className="bg-teal text-white hover:bg-teal/90 shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
