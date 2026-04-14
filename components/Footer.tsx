import React from 'react';
import { BookOpen, Instagram, Twitter, Facebook } from 'lucide-react';
import { NAV_LINKS } from '../constants';

export const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#quran') {
        e.preventDefault();
        const navLink = document.querySelector(`nav a[href="${href}"]`) as HTMLElement;
        if (navLink) {
            e.preventDefault();
            navLink.click();
            return;
        }
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-white">
               <BookOpen className="text-brand-teal" size={28} />
               <span className="font-display font-bold text-xl">Journey to Knowledge</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Where young hearts grow in knowledge, confidence, and faith. We are dedicated to providing high-quality Islamic education for the next generation.
            </p>
            <div className="flex gap-4">
              <a href="#" onClick={(e) => e.preventDefault()} className="bg-slate-800 p-2 rounded-full hover:bg-brand-teal hover:text-white transition-colors"><Instagram size={18}/></a>
              <a href="#" onClick={(e) => e.preventDefault()} className="bg-slate-800 p-2 rounded-full hover:bg-brand-blue hover:text-white transition-colors"><Twitter size={18}/></a>
              <a href="#" onClick={(e) => e.preventDefault()} className="bg-slate-800 p-2 rounded-full hover:bg-brand-orange hover:text-white transition-colors"><Facebook size={18}/></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-brand-yellow transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
             <h4 className="text-white font-bold mb-6">Programmes</h4>
             <ul className="space-y-3 text-sm">
               <li><a href="#programmes" onClick={(e) => handleLinkClick(e, '#programmes')} className="hover:text-brand-yellow transition-colors cursor-pointer">Qur'an Reading</a></li>
               <li><a href="#programmes" onClick={(e) => handleLinkClick(e, '#programmes')} className="hover:text-brand-yellow transition-colors cursor-pointer">Tajwid for Kids</a></li>
               <li><a href="#programmes" onClick={(e) => handleLinkClick(e, '#programmes')} className="hover:text-brand-yellow transition-colors cursor-pointer">Hifz Programme</a></li>
               <li><a href="#programmes" onClick={(e) => handleLinkClick(e, '#programmes')} className="hover:text-brand-yellow transition-colors cursor-pointer">Arabic Language</a></li>
             </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Journey to Knowledge Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};