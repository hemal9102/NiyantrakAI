import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Plus, Crown } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      content: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Track chat usage
    trackEvent('chat_message_sent', {
      message_length: userMessage.content.length,
      timestamp: new Date().toISOString()
    });

    try {
      // Use a proxy approach to handle CORS
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage.content,
          webhook_url: 'https://primary-production-24c8a.up.railway.app/webhook/0661a3e3-f245-48ab-b44e-4f7fc4b8b06a'
        }),
      });

      let aiResponse = '';
      
      if (!response.ok) {
        // Fallback: try direct request with different approach
        try {
          const directResponse = await fetch(
            'https://primary-production-24c8a.up.railway.app/webhook/0661a3e3-f245-48ab-b44e-4f7fc4b8b06a',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              mode: 'cors',
              body: JSON.stringify({ input: userMessage.content }),
            }
          );
          
          if (directResponse.ok) {
            const directData = await directResponse.json();
            aiResponse = directData.output || directData.response || "I received your message but couldn't generate a proper response.";
          } else {
            aiResponse = "I'm currently unable to connect to the AI service. Please try again later.";
          }
          
        } catch (directError) {
          console.error('Direct request also failed:', directError);
          aiResponse = "I'm currently unable to connect to the AI service. Please try again later.";
        }
      } else {
        const data = await response.json();
        aiResponse = data.output || data.response || "I received your message but couldn't generate a proper response.";
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      trackEvent('chat_response_received', {
        response_length: aiResponse.length,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error sending message to AI:', error);
      
      const errorMessage: Message = {
        id: Date.now() + 2,
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">ChatAI</h1>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
          <Crown className="w-4 h-4" />
          <span className="text-sm font-medium">Upgrade your plan</span>
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <h2 className="text-4xl font-light text-center mb-8 max-w-2xl">
              What's on your mind today?
            </h2>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-8">
            {messages.map((message) => (
              <div key={message.id} className={`mb-8 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-4 max-w-3xl ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser ? 'bg-blue-600' : 'bg-green-600'
                  }`}>
                    {message.isUser ? 'U' : 'AI'}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.isUser 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-100'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-8 flex justify-start">
                <div className="flex gap-4 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    AI
                  </div>
                  <div className="bg-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-800 rounded-2xl border border-gray-600 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 shadow-lg">
            <div className="flex items-end gap-3 p-4">
              <button className="text-gray-400 hover:text-white transition-colors mb-2 hover:scale-110 transform duration-200">
                <Plus className="w-5 h-5" />
              </button>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything"
                className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none min-h-[24px] max-h-32 py-1"
                rows={1}
                disabled={isLoading}
              />
              <div className="flex items-center gap-2 mb-2">
                <button className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 transform">
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-white text-gray-900 hover:bg-gray-100 disabled:bg-gray-600 disabled:text-gray-400 rounded-xl p-2.5 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg disabled:shadow-none disabled:scale-100"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {/* Typing indicator */}
            {input.trim() && !isLoading && (
              <div className="absolute bottom-2 left-16 text-xs text-gray-500 animate-fade-in">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Ready to send</span>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            ChatAI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;