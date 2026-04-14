import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection, ProgrammesSection, WhyUsSection } from './components/Sections';
import { PricingSection } from './components/Pricing';
import { ResourcesSection } from './components/Resources';
import { ContactSection } from './components/Contact';
import { Footer } from './components/Footer';
import { ParentDashboard } from './components/Dashboard';
import { QuranReader } from './components/QuranReader';
import { InteractiveLessons } from './components/InteractiveLessons';
import { SettingsModal } from './components/Settings';
import { AppSettings } from './types';
import { Settings } from 'lucide-react';

const LandingPage: React.FC<{
  navigate: ReturnType<typeof useNavigate>;
  setIsSettingsOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  settings: AppSettings;
}> = ({ navigate, setIsSettingsOpen, toggleDarkMode, settings }) => (
  <>
    <Navbar 
      onOpenDashboard={() => navigate('/dashboard')}
      onOpenQuran={() => navigate('/quran')}
      onOpenLessons={() => navigate('/lessons')}
      onOpenSettings={() => setIsSettingsOpen(true)}
      onToggleDark={toggleDarkMode}
      isDark={settings.theme === 'dark'}
    />
    <Hero />
    <AboutSection />
    <ProgrammesSection />
    <PricingSection />
    <WhyUsSection />
    <ResourcesSection />
    <ContactSection />
    <Footer />
  </>
);

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => {
    const savedSettings = localStorage.getItem('jtk_app_settings');
    if (savedSettings) return JSON.parse(savedSettings);
    return {
      theme: 'default',
      fontSize: 'normal'
    };
  });

  // Handle scrolling to sections on mount or path change
  useEffect(() => {
    const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        // Use a slightly longer delay and multiple attempts if needed for reliability
        const scroll = () => {
          const rect = element.getBoundingClientRect();
          const offset = 80; // Navbar height offset
          window.scrollTo({
            top: window.pageYOffset + rect.top - offset,
            behavior: 'smooth'
          });
        };
        
        // Initial attempt
        scroll();
        // Backup attempt in case of layout shifts
        setTimeout(scroll, 100);
        setTimeout(scroll, 300);
      }
    };

    if (location.pathname === '/about') {
      scrollToSection('about');
    } else if (location.pathname === '/pricing') {
      scrollToSection('pricing');
    } else if (location.pathname === '/contact') {
      scrollToSection('contact');
    } else if (location.hash) {
      const id = location.hash.substring(1);
      scrollToSection(id);
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    localStorage.setItem('jtk_app_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    switch(settings.fontSize) {
      case 'normal': root.style.fontSize = '16px'; break;
      case 'large': root.style.fontSize = '18px'; break;
      case 'xl': root.style.fontSize = '20px'; break;
    }
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.fontSize, settings.theme]);

  const toggleDarkMode = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'default' : 'dark'
    }));
  };

  const getThemeClasses = () => {
    switch(settings.theme) {
      case 'warm': return 'bg-amber-50 selection:bg-amber-200 selection:text-amber-900';
      case 'cool': return 'bg-sky-50 selection:bg-sky-200 selection:text-sky-900';
      case 'dark': return 'bg-slate-900 text-slate-100 selection:bg-brand-teal selection:text-white';
      case 'nature': return 'bg-emerald-50 selection:bg-emerald-200 selection:text-emerald-900';
      case 'lavender': return 'bg-purple-50 selection:bg-purple-200 selection:text-purple-900';
      case 'sunset': return 'bg-rose-50 selection:bg-rose-200 selection:text-rose-900';
      default: return 'bg-slate-50';
    }
  };

  const isLanding = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/pricing' || location.pathname === '/contact';

  const FloatingSettingsButton = () => (
    <button 
      onClick={() => setIsSettingsOpen(true)}
      className="fixed bottom-6 right-6 z-40 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
      title="Settings"
    >
      <Settings size={24} />
    </button>
  );

  const FloatingWhatsAppButton = () => (
    <a 
      href="https://wa.me/447933395159" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-premium hover:scale-110 transition-transform flex items-center justify-center animate-bounce-slow"
      title="Chat with us on WhatsApp"
    >
      <svg 
        viewBox="0 0 24 24" 
        className="w-8 h-8 fill-current" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.547 4.189 1.586 6.06L0 24l6.117-1.604a11.774 11.774 0 005.928 1.603h.005c6.634 0 12.032-5.397 12.035-12.032.003-3.218-1.248-6.242-3.523-8.517z"/>
      </svg>
    </a>
  );

  const Banner = () => (
    <div className="bg-brand-teal text-white py-1.5 px-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] relative z-[60] shadow-sm">
      Progress Tracker (Preview) — Coming Soon
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${getThemeClasses()}`}>
      {location.pathname === '/dashboard' && <Banner />}
      
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings(prev => ({ ...prev, ...newSettings }))}
        onNavigate={(view) => navigate(`/${view === 'landing' ? '' : view}`)}
        currentView={location.pathname === '/' ? 'landing' : location.pathname.substring(1)}
      />

      {!isLanding && <FloatingSettingsButton />}
      {isLanding && <FloatingWhatsAppButton />}

      <Routes>
        <Route path="/" element={<LandingPage navigate={navigate} setIsSettingsOpen={setIsSettingsOpen} toggleDarkMode={toggleDarkMode} settings={settings} />} />
        <Route path="/about" element={<LandingPage navigate={navigate} setIsSettingsOpen={setIsSettingsOpen} toggleDarkMode={toggleDarkMode} settings={settings} />} />
        <Route path="/pricing" element={<LandingPage navigate={navigate} setIsSettingsOpen={setIsSettingsOpen} toggleDarkMode={toggleDarkMode} settings={settings} />} />
        <Route path="/contact" element={<LandingPage navigate={navigate} setIsSettingsOpen={setIsSettingsOpen} toggleDarkMode={toggleDarkMode} settings={settings} />} />
        <Route path="/dashboard" element={<ParentDashboard onLogout={() => navigate('/')} />} />
        <Route path="/quran" element={<QuranReader onBack={() => navigate('/')} />} />
        <Route path="/lessons" element={<InteractiveLessons onBack={() => navigate('/')} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
