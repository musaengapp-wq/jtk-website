import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, UserCircle, Settings, Sun, Moon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Button } from './UIComponents';

interface NavbarProps {
  onOpenDashboard?: () => void;
  onOpenQuran?: () => void;
  onOpenLessons?: () => void;
  onOpenSettings?: () => void;
  isDark?: boolean;
  onToggleDark?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenDashboard, 
  onOpenQuran, 
  onOpenLessons,
  onOpenSettings,
  isDark,
  onToggleDark
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    
    if (href === '#quran' && onOpenQuran) {
      setIsOpen(false);
      onOpenQuran();
      return;
    }

    if (href === '#lessons' && onOpenLessons) {
      setIsOpen(false);
      onOpenLessons();
      return;
    }

    const isLanding = location.pathname === '/' || location.pathname === '/about' || location.pathname === '/pricing' || location.pathname === '/contact';

    if (href === '#') {
      if (!isLanding) {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (location.pathname !== '/') navigate('/', { replace: true });
      }
    } else if (href.startsWith('#')) {
      const id = href.substring(1);
      if (id === 'about') {
        navigate('/about');
      } else if (id === 'pricing') {
        navigate('/pricing');
      } else if (id === 'contact') {
        navigate('/contact');
      } else {
        // For other sections, if we are on /about, /pricing, /contact or /dashboard, go to /#id
        if (location.pathname !== '/') {
          navigate('/' + href);
        } else {
          // Already on landing, just scroll
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const offset = 80;
            window.scrollTo({
              top: window.pageYOffset + rect.top - offset,
              behavior: 'smooth'
            });
          }
        }
      }
    }
    setIsOpen(false);
  };

  return (
    <nav 
      className={`sticky top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg py-2 dark:bg-slate-900/90' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-2 group"
          >
            <div className="bg-brand-teal p-2 rounded-xl text-white transform transition-transform shadow-brand-teal/20 shadow-md">
              <BookOpen size={24} strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl md:text-2xl text-slate-800 leading-tight dark:text-white">
                Journey to Knowledge
              </span>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Academy</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-5">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)} 
                  className={`font-bold transition-colors text-sm relative flex items-center gap-1.5 cursor-pointer text-slate-600 hover:text-brand-teal dark:text-slate-300 dark:hover:text-brand-teal
                    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-1 after:bottom-[-4px] after:left-0 
                    after:rounded-full after:transition-transform hover:after:scale-x-100 after:bg-brand-yellow
                  `}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-4">
               {onOpenDashboard && (
                  <button 
                    onClick={onOpenDashboard}
                    className="font-bold text-slate-600 dark:text-slate-300 hover:text-brand-teal px-4 py-2.5 rounded-full border-2 border-slate-200 dark:border-slate-700 hover:border-brand-teal transition-all flex items-center gap-2 text-sm"
                  >
                    <UserCircle size={18} />
                    Progress Tracker (Preview)
                  </button>
               )}
               
               {onToggleDark && (
                 <button 
                   onClick={onToggleDark}
                   className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                   title={isDark ? "Light Mode" : "Dark Mode"}
                 >
                   {isDark ? <Sun size={20} className="text-brand-yellow" /> : <Moon size={20} />}
                 </button>
               )}

               <Button href="https://wa.me/447933395159" target="_blank" rel="noopener noreferrer" size="sm" variant="primary" className="py-2.5 text-white">Enquire via WhatsApp</Button>
               
               {onOpenSettings && (
                 <button 
                   onClick={onOpenSettings}
                   className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                   title="Settings"
                 >
                   <Settings size={20} />
                 </button>
               )}
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            {onToggleDark && (
              <button 
                onClick={onToggleDark}
                className="text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl"
              >
                {isDark ? <Sun size={24} className="text-brand-yellow" /> : <Moon size={24} />}
              </button>
            )}
            <button 
              className="text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-height-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
          style={{ 
            maxHeight: isOpen ? '1000px' : '0px',
          }}
        >
          <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-6 flex flex-col gap-6 border border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-2 gap-3">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)} 
                  className={`text-sm font-bold p-4 rounded-2xl text-center transition-all border flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:bg-teal-50 hover:text-brand-teal hover:border-brand-teal/20`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 dark:border-slate-800 pt-6">
                {onOpenDashboard && (
                  <button 
                    onClick={() => {
                        setIsOpen(false);
                        onOpenDashboard();
                    }}
                    className="w-full text-base font-bold text-slate-700 dark:text-slate-300 hover:text-brand-teal p-4 rounded-2xl text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700 flex items-center justify-center gap-2"
                  >
                    <UserCircle size={20} />
                    Progress Tracker (Preview)
                  </button>
                )}
                <Button 
                  href="https://wa.me/447933395159" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full justify-center py-4 text-base text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Enquire via WhatsApp
                </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};