import React, { useState } from 'react';
import ChatAI from "./components/pages/ChatAI";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: input.trim(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://932bb6578bcd.ngrok-free.app/webhook/0661a3e3-f245-48ab-b44e-4f7fc4b8b06a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        mode: 'cors',
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        content: data.response || 'No response received.',
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: 'Failed to get a response. Please try again.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 p-2 rounded-lg max-w-xs ${
              msg.isUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;