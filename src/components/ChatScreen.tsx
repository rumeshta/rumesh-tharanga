import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Send,
  Image as ImageIcon,
  Phone,
  ShieldAlert,
  CheckCheck,
  ChevronLeft,
  MoreVertical,
  CheckCircle2,
  Sparkles,
  UserX,
  Flag
} from 'lucide-react';

export const ChatScreen: React.FC = () => {
  const {
    chats,
    activeChatId,
    setActiveChatId,
    sendMessage,
    currentUser,
    t,
    language,
    openListing,
    listings
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSend = () => {
    if (!inputMessage.trim() || !activeChatId) return;
    sendMessage(activeChatId, inputMessage.trim());
    setInputMessage('');
  };

  const handleQuickReply = (text: string) => {
    if (!activeChatId) return;
    sendMessage(activeChatId, text);
  };

  const quickReplies = [
    t('quickReply1'),
    t('quickReply2'),
    t('quickReply3'),
    t('quickReply4')
  ];

  // If no chat is active, show conversation list
  if (!activeChat) {
    return (
      <div className="pb-24 pt-2 max-w-2xl mx-auto px-3 sm:px-4 space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t('messagesTitle')}
          </h1>
          <p className="text-xs text-slate-500">
            {t('messagesSubtitle')}
          </p>
        </div>

        {chats.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3">
            <h3 className="font-bold text-sm text-slate-800">{t('noMessagesYet')}</h3>
            <p className="text-xs text-slate-500">{t('startChatHint')}</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden shadow-xs">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-3.5 ${
                  chat.unreadCount > 0 ? 'bg-blue-50/40' : ''
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={chat.otherUser.avatar}
                    alt={chat.otherUser.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
                  />
                  {chat.otherUser.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate flex items-center gap-1">
                      <span>{chat.otherUser.name}</span>
                      {chat.otherUser.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      )}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {chat.lastMessageDate}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-1 font-medium">
                    {chat.lastMessage}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-[10px] text-blue-700 font-bold bg-blue-50/70 px-2 py-0.5 rounded-md w-fit">
                    <span className="truncate max-w-[180px]">{chat.listing.title}</span>
                    <span>• {new Intl.NumberFormat('ro-RO').format(chat.listing.price)} lei</span>
                  </div>
                </div>

                {chat.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Active Chat Screen
  return (
    <div className="fixed inset-0 top-15 pb-16 z-30 bg-slate-50 flex flex-col max-w-3xl mx-auto shadow-xl">
      {/* Active Chat Header */}
      <div className="bg-white border-b border-slate-200 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={() => setActiveChatId(null)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <img
            src={activeChat.otherUser.avatar}
            alt={activeChat.otherUser.name}
            className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
          />

          <div className="min-w-0">
            <h2 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate flex items-center gap-1">
              <span>{activeChat.otherUser.name}</span>
              {activeChat.otherUser.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              )}
            </h2>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>{t('activeNowOnRepedero')}</span>
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1 shrink-0 relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 py-1 z-50 text-xs">
              <button
                onClick={() => {
                  setToastMessage(language === 'ro' ? 'Utilizatorul a fost blocat.' : 'User has been blocked.');
                  setMenuOpen(false);
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
              >
                <UserX className="w-3.5 h-3.5 text-slate-400" />
                <span>{t('blockUser')}</span>
              </button>
              <button
                onClick={() => {
                  setToastMessage(language === 'ro' ? 'Raport trimis către moderatori Repedero.' : 'Report submitted to Repedero moderators.');
                  setMenuOpen(false);
                  setTimeout(() => setToastMessage(null), 3000);
                }}
                className="w-full text-left px-3 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-600 cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5 text-rose-500" />
                <span>{t('reportConversation')}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {toastMessage && (
        <div className="bg-slate-900 text-white text-xs px-4 py-2 text-center font-bold animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* Listing Snippet Card */}
      <div
        onClick={() => {
          const found = listings.find((l) => l.id === activeChat.listingId);
          if (found) openListing(found);
        }}
        className="bg-white border-b border-slate-200/80 px-4 py-2 flex items-center justify-between gap-3 hover:bg-blue-50/40 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={activeChat.listing.image}
            alt={activeChat.listing.title}
            className="w-10 h-10 rounded-lg object-cover shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-bold text-xs text-slate-800 truncate">
              {activeChat.listing.title}
            </h4>
            <span className="font-black text-xs text-blue-700">
              {new Intl.NumberFormat('ro-RO').format(activeChat.listing.price)} lei
            </span>
          </div>
        </div>
        <span className="text-[11px] font-bold text-blue-600 shrink-0">
          {t('viewAdLink')}
        </span>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Safety Tip Pill */}
        <div className="max-w-md mx-auto p-2.5 rounded-2xl bg-amber-50 border border-amber-200/60 text-[11px] text-amber-900 text-center leading-normal">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 inline mr-1 -mt-0.5" />
          <span>{t('chatSafetyWarning')}</span>
        </div>

        {activeChat.messages.map((msg) => {
          const isMine = msg.senderId === (currentUser?.id || 'user-current');
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm font-medium leading-relaxed shadow-2xs ${
                  isMine
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                }`}
              >
                <p>{msg.text}</p>
                <div
                  className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${
                    isMine ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.createdAt}</span>
                  {isMine && <CheckCheck className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies Chips */}
      <div className="px-3 py-1.5 bg-slate-100/90 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickReplies.map((qr, i) => (
          <button
            key={i}
            onClick={() => handleQuickReply(qr)}
            className="px-2.5 py-1 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 rounded-full text-[11px] font-semibold text-slate-700 border border-slate-200 shrink-0 transition-colors cursor-pointer"
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-2 sm:p-3 bg-white border-t border-slate-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={t('typeMessage')}
            className="flex-1 px-4 py-2.5 bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-2xl text-xs sm:text-sm outline-hidden font-medium"
          />

          <button
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            className="p-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-40 text-white shadow-md transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
