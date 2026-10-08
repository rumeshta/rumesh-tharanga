import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  Github,
  CheckCircle2,
  ExternalLink,
  Copy,
  AlertCircle,
  Loader2,
  X,
  Sparkles,
  ShieldCheck,
  Terminal
} from 'lucide-react';

interface ApkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkModal: React.FC<ApkModalProps> = ({ isOpen, onClose }) => {
  const [githubToken, setGithubToken] = useState('');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        'Pentru a instala aplicația direct pe Android:\n1. Deschide meniul Chrome (cele 3 puncte ⋮ din dreapta sus)\n2. Apasă pe "Instalează aplicația" sau "Adaugă pe ecranul principal".'
      );
    }
  };

  const handleSyncGithub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubToken.trim()) return;

    setSyncStatus('loading');
    setSyncMessage('Pushing Android project files and build workflow to rumeshta/rumesh-tharanga...');

    try {
      const res = await fetch('/api/sync-github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: githubToken.trim() })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSyncStatus('success');
        setSyncMessage(
          'Android code and workflow successfully pushed to GitHub! GitHub Actions has automatically started building rumesh-tharanga.apk.'
        );
      } else {
        setSyncStatus('error');
        setSyncMessage(data.error || 'GitHub push failed. Please verify your Personal Access Token permissions.');
      }
    } catch (err: any) {
      setSyncStatus('error');
      setSyncMessage(err.message || 'Network error.');
    }
  };

  const copyGitCommand = () => {
    navigator.clipboard.writeText(
      `git push https://<GITHUB_TOKEN>@github.com/rumeshta/rumesh-tharanga.git main`
    );
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white rounded-t-3xl overflow-hidden">
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-inner">
              <Smartphone className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-blue-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Android App & APK Build
              </span>
              <h2 className="text-xl font-extrabold tracking-tight">rumesh-tharanga.apk</h2>
            </div>
          </div>
          <p className="text-xs text-blue-100 mt-2 leading-relaxed">
            Ready-to-build Android Capacitor app with offline PWA, Gradle wrapper, and automated GitHub Actions workflow for repository <strong>rumeshta/rumesh-tharanga</strong>.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Option 1: Direct Android Project ZIP Download */}
          <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Download Project
                </span>
                <span className="font-bold text-sm text-slate-800">Download Android Studio & Gradle Project (.ZIP)</span>
              </div>
              <p className="text-xs text-slate-600">
                Get the complete pre-configured Android project with Gradle wrapper, Capacitor assets, and source code ready to build <code>rumesh-tharanga.apk</code> in Android Studio or with <code>./gradlew assembleDebug</code>.
              </p>
            </div>
            <a
              href="/rumesh-tharanga-android.zip"
              download="rumesh-tharanga-android.zip"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer transition-transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download .ZIP
            </a>
          </div>

          {/* Option 2: Instant Native Install */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Direct Install • Instant
                </span>
                <span className="font-bold text-sm text-slate-800">Install Directly on Phone (PWA)</span>
              </div>
              <p className="text-xs text-slate-600">
                Runs full-screen with home screen icon, splash screen, and offline support on any Android phone without needing to transfer an APK.
              </p>
            </div>
            <button
              onClick={handleInstallPWA}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer transition-transform active:scale-95"
            >
              <Smartphone className="w-4 h-4" />
              {isInstalled ? 'Installed' : 'Install on Phone'}
            </button>
          </div>

          {/* Option 3: GitHub Actions Automated APK Builder */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">GitHub Actions Auto-Build APK</h4>
                  <p className="text-[11px] text-slate-500">Repository: <strong>rumeshta/rumesh-tharanga</strong></p>
                </div>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Automated Cloud APK
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              The workflow <code>.github/workflows/build-apk.yml</code> builds and attaches <strong>rumesh-tharanga.apk</strong> to GitHub Releases. Enter your GitHub Personal Access Token to push and trigger the APK build immediately:
            </p>

            <form onSubmit={handleSyncGithub} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Enter GitHub Token (ghp_... or github_pat_...)"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-mono"
                />
                <button
                  type="submit"
                  disabled={syncStatus === 'loading' || !githubToken.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 shadow-sm transition-colors cursor-pointer"
                >
                  {syncStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Pushing...
                    </>
                  ) : (
                    <>
                      <Github className="w-3.5 h-3.5" /> Push & Build APK
                    </>
                  )}
                </button>
              </div>

              {syncStatus === 'success' && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{syncMessage}</p>
                    <a
                      href="https://github.com/rumeshta/rumesh-tharanga/actions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-700 font-bold hover:underline"
                    >
                      View GitHub Actions build progress <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {syncStatus === 'error' && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <p>{syncMessage}</p>
                </div>
              )}
            </form>

            <div className="pt-2 border-t border-slate-200">
              <span className="text-[11px] text-slate-500 font-medium">Or push manually from your local machine:</span>
              <div className="mt-1 flex items-center justify-between bg-slate-900 text-slate-200 p-2.5 rounded-xl font-mono text-[11px]">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <Terminal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <code>git push https://&lt;TOKEN&gt;@github.com/rumeshta/rumesh-tharanga.git main</code>
                </div>
                <button
                  type="button"
                  onClick={copyGitCommand}
                  className="ml-2 px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer text-[10px] shrink-0 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {copiedCmd ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Option 4: PWABuilder */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  PWABuilder
                </span>
                <span className="font-bold text-sm text-slate-800">Generate APK via PWABuilder</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Generate an Android APK/AAB package in one click directly from Microsoft PWABuilder.
              </p>
            </div>
            <a
              href={`https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(
                window.location.origin
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-sm transition-colors cursor-pointer"
            >
              Open PWABuilder <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Repedero v1.0 • Android 8.0 - 15 Support</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
