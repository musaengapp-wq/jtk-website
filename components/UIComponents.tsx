import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// --- Tooltip ---
interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-slate-800",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-800",
    left: "left-full top-1/2 -translate-y-1/2 border-l-slate-800",
    right: "right-full top-1/2 -translate-y-1/2 border-r-slate-800",
  };

  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div className={`absolute ${positionClasses[position]} hidden group-hover:flex flex-col items-center z-50 animate-fade-in pointer-events-none`}>
        <div className="bg-slate-800 text-white text-[10px] font-bold px-2 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
          {text}
        </div>
        <div className={`w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}></div>
      </div>
    </div>
  );
};

// --- Button ---
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
} & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>);

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  href,
  onClick,
  ...props 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseStyles = "inline-flex items-center justify-center font-extrabold rounded-full transition-all active:scale-95 duration-300 cursor-pointer no-underline tracking-tight";
  
  const variants = {
    primary: "bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-brand-teal/20 shadow-lg border-none",
    secondary: "bg-brand-teal text-white hover:bg-teal-500 shadow-brand-teal/20 shadow-lg border-none",
    outline: "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5 dark:border-brand-blue/60 dark:text-brand-blue shadow-none",
    ghost: "bg-slate-100/50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800 shadow-none border-none",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-3.5 text-base",
    lg: "px-10 py-4.5 text-lg",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href) {
      const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel');
      const isAnchor = href.startsWith('#');

      if (!isExternal) {
        e.preventDefault();
        if (isAnchor) {
          const id = href.substring(1);
          if (id === 'about') {
            navigate('/about');
          } else if (id === 'pricing') {
            navigate('/pricing');
          } else if (id === 'contact') {
            navigate('/contact');
          } else {
            // If on /about, /pricing, /contact or /dashboard, go to /#id
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
        } else {
          navigate(href);
        }
      }
    }
    if (onClick) {
      onClick(e);
    }
  };

  if (href) {
    return (
      <a 
        href={href} 
        className={combinedClasses}
        onClick={handleAnchorClick}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      className={combinedClasses} 
      onClick={onClick}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

// --- Section Heading ---
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  color?: string;
  theme?: 'teal' | 'orange' | 'purple' | 'slate';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  align = 'center',
  color = 'text-slate-900',
  theme = 'teal'
}) => {
  const accentColor = {
    teal: 'bg-brand-teal',
    orange: 'bg-brand-orange',
    purple: 'bg-brand-purple',
    slate: 'bg-slate-300 dark:bg-slate-600'
  };

  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'} animate-slide-up`}>
      <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${color} dark:text-white tracking-tight`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`h-2.5 w-20 rounded-full mt-8 ${align === 'center' ? 'mx-auto' : ''} ${accentColor[theme]}`}></div>
    </div>
  );
};

// --- Card ---
interface CardProps {
  children: ReactNode;
  className?: string;
  color?: 'white' | 'blue' | 'yellow' | 'green' | 'glass';
}

export const Card: React.FC<CardProps> = ({ children, className = '', color = 'white' }) => {
  const colors = {
    white: "bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-700",
    blue: "bg-sky-50 border-sky-100 dark:bg-sky-900/20 dark:border-sky-800/50",
    yellow: "bg-yellow-50 border-yellow-100 dark:bg-yellow-900/10 dark:border-yellow-800/30",
    green: "bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-800/30",
    glass: "bg-white/70 backdrop-blur-md border-white/50 dark:bg-slate-800/70 dark:border-slate-700/50",
  };

  return (
    <div className={`group rounded-[2.5rem] p-8 border-2 shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-2 ${colors[color]} ${className}`}>
      {children}
    </div>
  );
};

// --- Icon Wrapper ---
export const IconWrapper: React.FC<{ icon: LucideIcon; color?: string; bgColor?: string }> = ({ icon: Icon, color = "text-brand-blue", bgColor = "bg-white" }) => (
  <div className={`p-5 rounded-[1.5rem] inline-flex items-center justify-center ${bgColor} dark:bg-slate-700/50 ${color} shadow-sm mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-1.5 group-hover:shadow-lg hover:shadow-md`}>
    <Icon size={36} strokeWidth={2.5} className="transition-transform duration-300" />
  </div>
);

// --- Progress Bar ---
export const ProgressBar: React.FC<{ value: number; color: string; label?: string }> = ({ value, color, label }) => (
  <div className="mb-6">
    {label && (
      <div className="flex justify-between mb-2">
        <span className="text-sm font-extrabold text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-sm font-extrabold text-slate-500 dark:text-slate-400">{value}%</span>
      </div>
    )}
    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 p-1 shadow-inner">
      <div 
        className={`h-2 rounded-full transition-all duration-1000 ease-out ${color} shadow-sm`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

// --- Badge ---
export const BadgeComponent: React.FC<{ icon: LucideIcon; title: string; date: string; color: string }> = ({ icon: Icon, title, date, color }) => (
  <div className="flex flex-col items-center text-center p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-50 dark:border-slate-700 shadow-soft hover:shadow-md transition-all hover:scale-105">
    <div className={`p-4 rounded-full bg-slate-50 dark:bg-slate-900/50 mb-4 ${color} transition-transform group-hover:rotate-12`}>
      <Icon size={28} />
    </div>
    <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm mb-1 leading-tight">{title}</h4>
    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{date}</span>
  </div>
);