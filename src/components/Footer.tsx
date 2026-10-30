import React from 'react';
import { Cpu, ArrowUp, Github, Linkedin, ShieldCheck, Heart } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#080c17] border-t border-[#1e293b] py-12 text-xs font-mono text-[#849396]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#111827] border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#f8fafc] font-sans">
                KINETIC OBSIDIAN ENGINE
              </div>
              <div className="text-[11px] text-[#849396]">
                Neural Systems & Distributed Infrastructure Portfolio
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#bac9cc] hover:text-[#00e5ff] transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={PORTFOLIO_DATA.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[#bac9cc] hover:text-[#00e5ff] transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href="#contact"
              className="text-[#bac9cc] hover:text-[#00e5ff] transition-colors"
            >
              Transmission
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#111827] border border-[#1e293b] text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all cursor-pointer flex items-center gap-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3 text-[#bac9cc]">
            <span className="flex items-center gap-1 text-[#00e5ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span>DEPLOYED VIA CLOUD RUN</span>
            </span>
            <span>|</span>
            <span>COMMIT: {PORTFOLIO_DATA.profile.activeCommit}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
