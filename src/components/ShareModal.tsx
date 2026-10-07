import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, Check, Share2 } from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { shareModalOpen, closeShareModal, shareListing, t, language } = useApp();
  const [copied, setCopied] = useState(false);

  if (!shareModalOpen || !shareListing) return null;

  const currentUrl = `https://repedero.ro/anunt/${shareListing.id}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: shareListing.title,
        text: language === 'ro'
          ? `Vezi acest anunț pe Repedero: ${shareListing.title} (${shareListing.price} lei)`
          : `Check out this listing on Repedero: ${shareListing.title} (${shareListing.price} lei)`,
        url: currentUrl
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-base text-slate-900">{t('shareModalTitle')}</h3>
          </div>
          <button
            onClick={closeShareModal}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
          <img
            src={shareListing.images[0]}
            alt={shareListing.title}
            className="w-12 h-12 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-bold text-xs text-slate-900 truncate">{shareListing.title}</h4>
            <span className="font-black text-xs text-blue-700">{shareListing.price} lei</span>
          </div>
        </div>

        {/* Channels */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              language === 'ro'
                ? `Uite un anunț interesant pe Repedero: ${shareListing.title} - ${currentUrl}`
                : `Check out this listing on Repedero: ${shareListing.title} - ${currentUrl}`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <span>💬 WhatsApp</span>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <span>Facebook</span>
          </a>
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 p-2.5 bg-slate-100 rounded-xl text-xs font-medium text-slate-600 outline-hidden select-all"
          />
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
