import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, Phone, Info, Loader2 } from 'lucide-react';

const SupportChat: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Welcome to Muntazir Travels support. I'm your Kashmir travel assistant. How can I help you today?", sender: "support", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const supportMessage = {
        id: Date.now() + 1,
        text: "Thank you for reaching out. An agent will be with you shortly. If this is urgent, please call us at +91 7889570933 or email muntazirtravels.09@gmail.com.",
        sender: "support",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, supportMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting. Please try again later or contact our support line at +91 7889570933.",
        sender: "support",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 h-screen flex flex-col overflow-hidden">
      <header className="sticky top-0 z-10 flex items-center bg-white p-4 justify-between border-b border-slate-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 flex items-center gap-3 ml-2">
          <div className="relative">
            <img
              alt="Support"
              className="w-10 h-10 rounded-full object-cover"
              src="/images/240_F_1305283767_27cPMdIZ12Lxv6ZydDhDSe8DakR5DxAo.jpg"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="text-sm font-bold leading-tight">Muntazir Support</h2>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a href="tel:7889570933" className="p-2 text-slate-400 hover:text-primary transition-colors">
            <Phone size={20} />
          </a>
          <button className="p-2 text-slate-400 hover:text-primary transition-colors">
            <Info size={20} />
          </button>
        </div>
      </header>

      <main
        ref={scrollRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
              ? 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/10'
              : 'bg-white text-slate-900 rounded-tl-none shadow-sm border border-slate-100'
              }`}>
              <p>{msg.text}</p>
              <p className={`text-[9px] mt-2 font-bold uppercase tracking-widest opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-slate-400 p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs font-medium">Assistant is typing...</span>
            </div>
          </div>
        )}
      </main>

      <footer className="p-4 bg-white border-t border-slate-100 safe-area-bottom">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-primary transition-colors"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Kashmir trips..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 py-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-xl shadow-lg transition-all ${!input.trim() || isLoading
              ? 'bg-slate-200 text-slate-400 shadow-none'
              : 'bg-primary text-white shadow-primary/20 active:scale-95'
              }`}
          >
            <Send size={18} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default SupportChat;
