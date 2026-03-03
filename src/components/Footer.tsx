import React from 'react';
import { Logo } from './Logo';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-green border-t border-brand-green-dark/20 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">
          <div className="space-y-6">
            <Logo />
            <p className="text-slate-800 leading-relaxed max-w-xs font-medium">
              A recruitment consultancy focused on elite talent and visionary companies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900/10 flex items-center justify-center text-slate-900 hover:bg-brand-blue hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900/10 flex items-center justify-center text-slate-900 hover:bg-brand-blue hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900/10 flex items-center justify-center text-slate-900 hover:bg-brand-blue hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Navigation</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-800 hover:text-brand-blue transition-colors text-sm font-bold">Home</a></li>
                <li><a href="#services" className="text-slate-800 hover:text-brand-blue transition-colors text-sm font-bold">Services</a></li>
                <li><a href="#industries" className="text-slate-800 hover:text-brand-blue transition-colors text-sm font-bold">Industries</a></li>
                <li><a href="#submit-cv" className="text-slate-800 hover:text-brand-blue transition-colors text-sm font-bold">Submit CV</a></li>
                <li><a href="#contact" className="text-slate-800 hover:text-brand-blue transition-colors text-sm font-bold">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-800 hover:text-brand-blue transition-colors text-sm font-bold">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-800 hover:text-brand-blue transition-colors text-sm font-bold">Terms of Service</a></li>
                <li><a href="#" className="text-slate-800 hover:text-brand-blue transition-colors text-sm font-bold">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-900/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-700 text-xs font-bold">
            © {new Date().getFullYear()} Insightful Hires. All rights reserved.
          </p>
          <p className="text-slate-400 text-xs font-medium">
            Designed for the modern professional world.
          </p>
        </div>
      </div>
    </footer>
  );
};
