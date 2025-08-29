// src/App.tsx
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/pages/Dashboard';
import Clients from './components/pages/Clients';
import Services from './components/pages/Services';
import Equipment from './components/pages/Equipment';
import Employees from './components/pages/Employees';
import Reports from './components/pages/Reports';
import Settings from './components/pages/Settings';
import ChatAI from './components/pages/ChatAI'; // Assuming this is a placeholder or separate page component
import SimpleChatInterface from './components/pages/SimpleChatInterface'; // Assuming this is the chat UI component

// Define the message type
interface Message {
  id: number;
  content: string;
  isUser: boolean;
  // Optional fields for future enhancements (if your backend supports them)
  // understanding_feedback?: number; 
}

function App() {
  // State for main app layout
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // State for the integrated chat feature
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Optional state for future enhancements
  // const [selectedLanguage, setSelectedLanguage] = useState('english'); 
  // const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to render the main content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <Clients />;
      case 'services':
        return <Services />;
      case 'equipment':
        return <Equipment />;
      case 'employees':
        return <Employees />;
      case 'chat':
        // When 'chat' tab is active, show the integrated chat interface
        return (
          <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-100 mt-16"> {/* Adjust margin-top to account for fixed header */}
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 pb-20"> {/* Add pb-20 to avoid content hidden behind fixed footer */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 p-2 rounded-lg max-w-xs ${
                    msg.isUser ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-300 text-black self-start'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={messagesEndRef} />
              {isLoading && (
                <div className="mb-4 p-2 rounded-lg max-w-xs bg-gray-300 text-black self-start">
                  <span>AI is typing...</span>
                </div>
              )}
            </div>

            {/* Chat Input Area */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex space-x-3 max-w-4xl mx-auto"
              >
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="w-full px-6 py-4 pr-16 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-sm transition-all duration-200 group-hover:border-gray-300 shadow-sm focus:shadow-md"
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  {input.trim() && (
                    <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-2xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:shadow-none"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg 
                      className="w-5 h-5 transform transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </form>
              <div className="text-center mt-2">
                <p className="text-xs text-gray-500">
                  {isLoading ? 'AI is thinking...' : 'Press Enter to send or Shift+Enter for new line'}
                </p>
              </div>
            </footer>
          </div>
        );
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Function to handle sending a message to the AI
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // 1. Add user message to UI
    const userMessage: Message = {
      id: Date.now(),
      content: input.trim(),
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Send request to your n8n webhook
      // IMPORTANT: Ensure the URL is correct and the ngrok header is included
      const response = await fetch(
        'https://primary-production-24c8a.up.railway.app/webhook/0661a3e3-f245-48ab-b44e-4f7fc4b8b06a',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: userMessage.content }), // Use 'input' as your n8n workflow expects
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        data = { output: "Sorry, I received an unexpected response format." };
      }

      // 3. Add AI response to UI
      // Adjust based on the actual structure of your n8n response
      // If n8n uses 'output', use that. If it's a direct string, handle accordingly.
      let aiText = '';
      if (data.output) {
         // If n8n workflow sends { "output": "..." }
         aiText = data.output; 
      } else if (typeof data === 'string') {
         // If n8n workflow sends raw text (less common with Respond to Webhook)
         aiText = data; 
      } else {
         // Fallback if structure is different or missing
         console.warn("Unexpected response structure:", data);
         aiText = data.response || "AI response not available.";
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        content: aiText,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error sending message to AI:", error);
      // 4. Handle errors (e.g., network issues, ngrok problems)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          content: "Failed to get a response. Please check your connection and backend.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Application Layout */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      {/* Adjust margin based on sidebar state */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}> 
        <Header
          activeTab={activeTab}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="p-6">
          {/* Render the content for the active tab */}
          {renderContent()} 
        </main>
      </div>
    </div>
  );
}

export default App;
