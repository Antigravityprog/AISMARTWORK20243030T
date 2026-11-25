import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Briefcase, 
  Archive, 
  Award, 
  BookOpen, 
  Layers, 
  Image as ImageIcon, 
  Mail, 
  Activity as ActivityIcon, 
  User
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about', icon: User },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Portfolio', path: '/portfolio', icon: Layers },
    { name: 'Archive', path: '/archive', icon: Archive },
    { name: 'Activities', path: '/activities', icon: ActivityIcon },
    { name: 'Skills', path: '/skills', icon: Layers },
    { name: 'Achievements', path: '/achievements', icon: Award },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'Journal', path: '/journal', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-800 text-white transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Branding */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-navy-900 border border-slate-700 flex items-center justify-center text-cyan-400 font-extrabold text-base shadow-sm group-hover:border-cyan-400 transition-colors">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xs tracking-widest text-white group-hover:text-cyan-400 transition-colors uppercase">
                PORTFOLIO <span className="font-normal text-slate-400">/ ARCHIVE</span>
              </span>
              <span className="text-[10px] text-cyan-400/90 font-medium tracking-wide">
                학생 개인 포트폴리오
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Contact / CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/contact"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-sm shadow-cyan-500/30 transition-all transform active:scale-95 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Me</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-navy-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`
                }
              >
                {Icon && <Icon className="w-4 h-4 text-cyan-400" />}
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};
