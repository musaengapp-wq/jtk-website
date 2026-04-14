import React from 'react';
import { X, Layout, Palette, Home, BookOpen, User, BookOpenText } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onNavigate: (view: 'landing' | 'dashboard' | 'quran' | 'lessons') => void;
  currentView: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdateSettings,
  onNavigate,
  currentView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
          <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2">
            <Palette size={20} className="text-brand-teal" />
            App Settings
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layout size={14} /> Switch Page
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'landing', label: 'Home', icon: Home },
                { id: 'dashboard', label: 'Progress Tracker (Preview)', icon: User },
                { id: 'quran', label: 'Quran Reader', icon: BookOpen },
                { id: 'lessons', label: 'Lessons', icon: BookOpenText },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id as any);
                    onClose();
                  }}
                  className={`p-3 rounded-xl flex items-center gap-3 font-bold text-sm transition-all ${
                    currentView === item.id 
                      ? 'bg-brand-teal text-white shadow-md' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              Theme Color
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'default', color: 'bg-slate-50', label: 'Default' },
                { id: 'warm', color: 'bg-amber-50', label: 'Warm' },
                { id: 'cool', color: 'bg-sky-50', label: 'Cool' },
                { id: 'nature', color: 'bg-emerald-50', label: 'Nature' },
                { id: 'lavender', color: 'bg-purple-50', label: 'Lavender' },
                { id: 'sunset', color: 'bg-rose-50', label: 'Sunset' },
                { id: 'dark', color: 'bg-slate-800', label: 'Dark' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onUpdateSettings({ theme: theme.id as any })}
                  className={`h-12 rounded-xl border-2 transition-all flex items-center justify-center ${
                    settings.theme === theme.id 
                      ? 'border-brand-teal ring-2 ring-brand-teal/20 scale-105' 
                      : 'border-slate-100 hover:border-slate-300'
                  } ${theme.color}`}
                  title={theme.label}
                >
                  {settings.theme === theme.id && (
                    <div className="w-2 h-2 rounded-full bg-brand-teal"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              Text Size
            </h4>
            <div className="bg-slate-100 p-1 rounded-xl flex">
              {[
                { id: 'normal', label: 'Normal' },
                { id: 'large', label: 'Large' },
                { id: 'xl', label: 'Extra Large' },
              ].map((size) => (
                <button
                  key={size.id}
                  onClick={() => onUpdateSettings({ fontSize: size.id as any })}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                    settings.fontSize === size.id 
                      ? 'bg-white text-slate-800 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};