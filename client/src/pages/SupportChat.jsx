import { useState, useRef, useEffect } from 'react';
import { Send, Search, MoreVertical, Phone, Video, Info, Paperclip, Smile, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CONVERSATIONS = [
  {
    id: 1,
    name: 'BrandHive Support',
    avatar: '🛡️',
    lastMsg: 'Hello! How can we help you tod…',
    time: '2 min ago',
    unread: 2,
    online: true,
    isSupport: true,
    messages: [
      { id: 1, from: 'them', text: 'مرحباً بك في مركز دعم BrandHive! كيف يمكننا مساعدتك اليوم؟', time: '10:23 AM', isArabic: true },
      { id: 2, from: 'them', text: 'Hello! Welcome to BrandHive support center. How can we help you today?', time: '10:23 AM' },
      { id: 3, from: 'me', text: 'Hello! I placed order #BH-8821 three days ago and haven\'t received tracking info yet.', time: '10:25 AM' },
      { id: 4, from: 'them', text: 'No problem — let me check that for you! Your order #BH-8821 (Pharaonic Vase from Luxor Crafts) is being prepared for shipment.', time: '10:26 AM' },
      { id: 5, from: 'them', isCard: true, cardData: { id: '#BH-8821', status: 'Preparing for Shipment', courier: 'Bosta Express', eta: 'Mar 13–14' }, time: '10:26 AM' },
      { id: 6, from: 'me', text: 'Perfect, thank you so much!', time: '10:28 AM' },
      { id: 7, from: 'them', text: 'You\'re welcome! Is there anything else I can help you with?', time: '10:29 AM' },
    ]
  },
  {
    id: 2,
    name: 'Luxor Crafts',
    avatar: '🏺',
    lastMsg: 'Your order has shipped!',
    time: '1 hr ago',
    unread: 0,
    online: false,
    messages: [
      { id: 1, from: 'them', text: 'Great news! Your order has shipped! 📦', time: '9:00 AM' },
      { id: 2, from: 'them', text: 'Tracking number: BOSTA123456789. Expected delivery: March 13-14.', time: '9:01 AM' },
      { id: 3, from: 'me', text: 'Amazing, thank you!', time: '9:05 AM' },
    ]
  },
  {
    id: 3,
    name: 'Nile Threads',
    avatar: '👗',
    lastMsg: 'We have your size in stock!',
    time: '3 hr ago',
    unread: 1,
    online: true,
    messages: [
      { id: 1, from: 'them', text: 'Hi there! We wanted to let you know that the Silk Kaftan in your wishlist is now back in stock in size M!', time: '7:30 AM' },
    ]
  },
  {
    id: 4,
    name: 'Cairo Gems',
    avatar: '💍',
    lastMsg: 'Engraving takes 3–5 days',
    time: 'Yesterday',
    unread: 0,
    online: false,
    messages: [
      { id: 1, from: 'me', text: 'How long does the custom engraving take?', time: 'Yesterday' },
      { id: 2, from: 'them', text: 'Custom engraving typically takes 3–5 business days. Would you like to proceed?', time: 'Yesterday' },
    ]
  },
];

const QUICK_ACTIONS = ['Track my order', 'Return request', 'Cancel order', 'Payment issue'];

export default function SupportChat() {
  const { user } = useAuth();
  const [activeConv, setActiveConv] = useState(CONVERSATIONS[0]);
  const [messages, setMessages] = useState(CONVERSATIONS[0].messages);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [showConvList, setShowConvList] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const selectConv = (conv) => {
    setActiveConv(conv);
    setMessages(conv.messages);
    setShowConvList(false);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: messages.length + 1, from: 'me', text: input, time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Auto-reply if BrandHive support
    if (activeConv.isSupport) {
      setTimeout(() => {
        const reply = { id: messages.length + 2, from: 'them', text: 'Thank you for your message! A support agent will be with you shortly. Avg. reply time: 5 minutes.', time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, reply]);
      }, 1500);
    }
  };

  const filteredConvs = CONVERSATIONS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="page-container py-6">
        <div className="bg-white rounded-3xl shadow-card-hover overflow-hidden" style={{ height: 'calc(100vh - 180px)', minHeight: '600px' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className={`${showConvList ? 'flex' : 'hidden md:flex'} md:w-80 w-full flex-col border-r border-gray-100`}>
              {/* Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display font-bold text-gray-900">Messages</h2>
                  <span className="text-xs bg-brand-navy text-white px-2 py-1 rounded-full font-semibold">
                    {CONVERSATIONS.reduce((sum, c) => sum + c.unread, 0)} Unread
                  </span>
                </div>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search messages..."
                    className="w-full pl-8 pr-3 py-2 bg-gray-50 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-navy/20"
                  />
                </div>
              </div>

              {/* Conversation list */}
              <div className="flex-1 overflow-y-auto">
                {filteredConvs.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => selectConv(conv)}
                    className={`w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 ${
                      activeConv.id === conv.id ? 'bg-brand-cream border-l-2 border-l-brand-navy' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-11 h-11 rounded-2xl bg-brand-cream flex items-center justify-center text-2xl">
                        {conv.avatar}
                      </div>
                      {conv.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-semibold text-gray-900 truncate">{conv.name}</p>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{conv.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{conv.lastMsg}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="w-5 h-5 bg-brand-navy rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-bold">{conv.unread}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className={`${!showConvList ? 'flex' : 'hidden md:flex'} flex-1 flex-col`}>
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <button onClick={() => setShowConvList(true)} className="md:hidden p-1.5 rounded-lg hover:bg-gray-100">
                  <ArrowLeft size={18} />
                </button>
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-brand-cream flex items-center justify-center text-xl">
                    {activeConv.avatar}
                  </div>
                  {activeConv.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{activeConv.name}</p>
                  <p className="text-xs text-gray-500">
                    {activeConv.online ? '● Online' : '○ Offline'}
                    {activeConv.isSupport && ' · avg. reply 5 min'}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <Phone size={16} />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <Info size={16} />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Date separator */}
              <div className="flex items-center gap-3 px-5 py-3">
                <div className="flex-1 h-px bg-gray-100"></div>
                <span className="text-xs text-gray-400 flex-shrink-0">Today · March 10, 2025</span>
                <div className="flex-1 h-px bg-gray-100"></div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-2 space-y-3">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${msg.from === 'me' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {msg.from !== 'me' && (
                      <div className="w-8 h-8 rounded-xl bg-brand-cream flex items-center justify-center text-lg flex-shrink-0 mb-0.5">
                        {activeConv.avatar}
                      </div>
                    )}
                    <div className={`max-w-[75%] ${msg.from === 'me' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      {msg.isCard ? (
                        <div className="bg-brand-cream border border-brand-gold/30 rounded-2xl p-4 text-sm">
                          <p className="font-bold text-brand-navy mb-2">{msg.cardData.id} · Status</p>
                          <p className="font-semibold text-gray-900">{msg.cardData.status}</p>
                          <p className="text-gray-600 text-xs mt-1">{msg.cardData.courier} · ETA {msg.cardData.eta}</p>
                        </div>
                      ) : (
                        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          msg.from === 'me'
                            ? 'bg-brand-navy text-white rounded-br-sm'
                            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                        } ${msg.isArabic ? 'text-right font-medium' : ''}`}>
                          {msg.text}
                        </div>
                      )}
                      <span className="text-xs text-gray-400 px-1">{msg.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {activeConv.isSupport && (
                <div className="px-5 py-2 flex gap-2 overflow-x-auto">
                  {QUICK_ACTIONS.map(action => (
                    <button
                      key={action}
                      onClick={() => setInput(action)}
                      className="flex-shrink-0 px-3 py-1.5 bg-brand-cream text-brand-navy text-xs font-medium rounded-xl hover:bg-brand-navy/10 transition-colors border border-brand-navy/20"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-4 pb-4 pt-2">
                <div className="flex items-center gap-2 bg-gray-50 rounded-2xl p-1 border border-gray-200 focus-within:border-brand-navy focus-within:bg-white transition-all">
                  <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                    <Paperclip size={16} />
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-sm focus:outline-none py-2 text-gray-900 placeholder-gray-400"
                  />
                  <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                    <Smile size={16} />
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim()}
                    className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                      input.trim() ? 'bg-brand-navy text-white hover:bg-opacity-90 shadow-sm' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
