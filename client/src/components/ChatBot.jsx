import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ShoppingBag, Sparkles, Bot, User, Loader2, Package, HelpCircle, ChevronRight, Shirt, IndianRupee, ArrowLeftRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config/api';

// Simple markdown renderer for chat messages
// Converts **bold**, *italic*, and newlines to HTML
const renderMarkdown = (text) => {
  if (!text) return null;

  // Split by markdown patterns and build React elements
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Match **bold** first (before *italic*)
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Match *italic* (single star, but not double)
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);

    // Find the earliest match
    let earliestMatch = null;
    let matchType = null;

    if (boldMatch && (!earliestMatch || boldMatch.index < earliestMatch.index)) {
      earliestMatch = boldMatch;
      matchType = 'bold';
    }
    if (italicMatch && (!earliestMatch || italicMatch.index < earliestMatch.index)) {
      earliestMatch = italicMatch;
      matchType = 'italic';
    }

    if (!earliestMatch) {
      // No more markdown, push the rest as text with line breaks
      remaining.split('\n').forEach((line, i, arr) => {
        parts.push(<span key={key++}>{line}</span>);
        if (i < arr.length - 1) parts.push(<br key={key++} />);
      });
      break;
    }

    // Push text before the match
    if (earliestMatch.index > 0) {
      const before = remaining.substring(0, earliestMatch.index);
      before.split('\n').forEach((line, i, arr) => {
        parts.push(<span key={key++}>{line}</span>);
        if (i < arr.length - 1) parts.push(<br key={key++} />);
      });
    }

    // Push the formatted text
    if (matchType === 'bold') {
      parts.push(<strong key={key++} className="font-semibold">{earliestMatch[1]}</strong>);
    } else {
      parts.push(<em key={key++}>{earliestMatch[1]}</em>);
    }

    // Move past this match
    remaining = remaining.substring(earliestMatch.index + earliestMatch[0].length);
  }

  return parts;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { cartItems, addToCart } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Auto-scroll to bottom when new messages arrive
  // Potential problem: If the message list is very long, this constant scrolling
  // could cause performance issues on low-end devices. Fine for normal use.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Add welcome message when chat first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hey there! 👋 I'm Aura AI, your personal shopping assistant. I can help you find the perfect outfit, compare products, shop on a budget, or answer any questions. What can I do for you today?",
        products: [],
        outfit: null,
        comparison: null,
      }]);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isLoading) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: messageText, products: [], outfit: null, comparison: null };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setShowQuickActions(false);
    setIsLoading(true);

    try {
      // Build conversation history for context
      // We only send the last 10 messages to avoid huge payloads
      // Potential problem: Cutting history means Gemini "forgets" earlier context.
      // 10 messages is a good balance between context and payload size.
      const history = updatedMessages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: history.slice(0, -1), // Don't include current message in history
          cartItems: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            qty: item.qty,
          })),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data?.reply || data?.message || "Oops! I'm having a little trouble right now. Please try again in a moment. 😅",
          products: [],
          outfit: null,
          comparison: null,
        }]);
        return;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply,
        products: data.products || [],
        outfit: data.outfit || null,
        comparison: data.comparison || null,
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Oops! I'm having a little trouble right now. Please try again in a moment. 😅",
        products: [],
        outfit: null,
        comparison: null,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleQuickAction = (text) => {
    sendMessage(text);
  };

  const handleAddToCart = (product) => {
    // addToCart from CartContext takes just the product object
    // It automatically sets qty to 1 for new items or increments for existing ones
    addToCart(product);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsOpen(false);
  };

  // Quick action buttons data — showcases all AI capabilities
  const quickActions = [
    { icon: <Shirt size={14} />, label: 'Style me', message: 'Build me a stylish outfit for a casual day out' },
    { icon: <IndianRupee size={14} />, label: 'Under ₹5,000', message: 'Show me the best products under ₹5,000' },
    { icon: <ArrowLeftRight size={14} />, label: 'Compare products', message: 'Compare the Void Hoodie vs Orbit Crewneck' },
    { icon: <ShoppingBag size={14} />, label: "What's in my cart?", message: "What's in my cart right now?" },
    { icon: <HelpCircle size={14} />, label: 'Return policy', message: 'What is your return and refund policy?' },
    { icon: <Sparkles size={14} />, label: 'Trending picks', message: 'Show me your most popular and trending products' },
  ];

  // --- Outfit Banner Component ---
  const OutfitBanner = ({ outfit }) => {
    if (!outfit) return null;
    return (
      <div className={`mt-2.5 rounded-xl overflow-hidden ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-700/50'
          : 'bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200'
      }`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-purple-600/30' : 'bg-purple-100'
            }`}>
              <Shirt size={16} className="text-purple-500" />
            </div>
            <div>
              <p className={`text-xs font-bold ${
                theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
              }`}>
                🎨 {outfit.theme}
              </p>
              <p className={`text-[10px] ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-500'
              }`}>
                Complete outfit suggestion
              </p>
            </div>
          </div>
          <div className={`text-right`}>
            <p className={`text-[10px] ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>Total</p>
            <p className={`text-sm font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              ₹{outfit.totalPrice?.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // --- Comparison Table Component ---
  const ComparisonTable = ({ comparison }) => {
    if (!comparison || !comparison.products || !comparison.rows) return null;
    return (
      <div className={`mt-2.5 rounded-xl overflow-hidden border ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200 shadow-sm'
      }`}>
        {/* Comparison Header */}
        <div className={`px-3 py-2 flex items-center gap-2 border-b ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-gray-700'
            : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-gray-200'
        }`}>
          <ArrowLeftRight size={14} className="text-indigo-500" />
          <span className={`text-xs font-bold ${
            theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'
          }`}>
            Product Comparison
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className={`border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <th className={`px-3 py-2 text-left font-medium ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}></th>
                {comparison.products.map((name, i) => (
                  <th key={i} className={`px-3 py-2 text-left font-bold ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, rIdx) => (
                <tr key={rIdx} className={`border-b last:border-b-0 ${
                  theme === 'dark'
                    ? `border-gray-700/50 ${rIdx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'}`
                    : `border-gray-50 ${rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`
                }`}>
                  <td className={`px-3 py-2 font-semibold whitespace-nowrap ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {row.label}
                  </td>
                  {row.values.map((val, vIdx) => (
                    <td key={vIdx} className={`px-3 py-2 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    } ${row.label === 'Price' ? 'font-bold' : ''}`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen
            ? 'bg-gray-800 dark:bg-gray-200 rotate-0'
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
        }`}
        title={isOpen ? 'Close chat' : 'Chat with Aura AI'}
      >
        {isOpen ? (
          <X size={24} className="text-white dark:text-gray-800" />
        ) : (
          <>
            <MessageCircle size={24} className="text-white" />
            {/* Ping animation on the FAB */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
          </>
        )}
      </button>

      {/* Chat Panel */}
      <div
        id="chatbot-panel"
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className={`flex flex-col h-[550px] max-h-[calc(100vh-8rem)] rounded-2xl shadow-2xl border overflow-hidden ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex-shrink-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm">
              <Bot size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Aura AI Assistant</h3>
              <p className="text-xs text-purple-200 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full" />
                Online • Ready to help
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              title="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className={`flex-1 overflow-y-auto px-4 py-4 space-y-4 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {/* Assistant avatar */}
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mt-0.5">
                    <Sparkles size={14} className="text-white" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                  {/* Message bubble */}
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md'
                      : theme === 'dark'
                        ? 'bg-gray-800 text-gray-200 rounded-bl-md border border-gray-700'
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-200 shadow-sm'
                  }`}>
                    {renderMarkdown(msg.content)}
                  </div>

                  {/* Outfit Banner - shown when AI suggests a complete outfit */}
                  {msg.outfit && <OutfitBanner outfit={msg.outfit} />}

                  {/* Product Cards - shown below AI messages that recommend products */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-2.5 space-y-2">
                      {msg.products.map((product, pIdx) => (
                        <div
                          key={pIdx}
                          className={`rounded-xl overflow-hidden border transition-all duration-200 hover:shadow-md ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 hover:border-purple-500'
                              : 'bg-white border-gray-200 hover:border-purple-400'
                          }`}
                        >
                          <div className="flex items-center gap-3 p-3">
                            {/* Product image */}
                            <div
                              onClick={() => handleProductClick(product._id)}
                              className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-700"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=Product'; }}
                              />
                            </div>
                            {/* Product info */}
                            <div className="flex-1 min-w-0">
                              <p
                                onClick={() => handleProductClick(product._id)}
                                className={`text-xs font-medium truncate cursor-pointer hover:underline ${
                                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                                }`}
                              >
                                {product.name}
                              </p>
                              {product.brand && (
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{product.brand}</p>
                              )}
                              <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-0.5">
                                ₹{product.price?.toLocaleString('en-IN')}
                              </p>
                            </div>
                            {/* Add to cart button */}
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                              title="Add to Cart"
                            >
                              <ShoppingBag size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comparison Table - shown when AI compares products */}
                  {msg.comparison && <ComparisonTable comparison={msg.comparison} />}
                </div>

                {/* User avatar */}
                {msg.role === 'user' && (
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 order-2 ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <User size={14} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${
                  theme === 'dark'
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions - shown after every AI reply when not loading */}
            {!isLoading && messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && (
              <div className="space-y-2 pt-2">
                <p className={`text-xs font-medium px-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Try asking:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action.message)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 text-left ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-purple-500 hover:text-purple-400'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-400 hover:text-purple-600 shadow-sm'
                      }`}
                    >
                      <span className="text-purple-500">{action.icon}</span>
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className={`flex items-center gap-2 px-4 py-3 border-t flex-shrink-0 ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:border-purple-500'
                  : 'bg-gray-100 text-gray-800 placeholder-gray-400 border border-transparent focus:border-purple-400 focus:bg-white'
              } disabled:opacity-50`}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-40 hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
              title="Send message"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
