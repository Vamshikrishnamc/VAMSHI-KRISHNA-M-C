import React, { useState, useEffect } from 'react';
import { Terminal, Command, Cpu, ArrowUpRight, FileText, Activity, Volume2, VolumeX } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTerminal,
  onOpenCommandPalette,
  onOpenResume,
}) => {
  const [utcTime, setUtcTime] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    soundManager.enabled = next;
    if (next) soundManager.playSuccess();
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Telemetry Bar */}
      <div className="w-full bg-[#090e1c] border-b border-[#1e293b]/70 px-4 py-1.5 text-[11px] font-mono text-[#94a3b8] flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981] status-pulsing" />
            <span className="text-[#dee2f6] font-semibold tracking-wide">STATUS:</span>
            <span className="text-[#00e5ff] uppercase">{PORTFOLIO_DATA.profile.status}</span>
          </div>
          <span className="text-[#3b494c]">|</span>
          <span className="hidden sm:inline text-[#bac9cc]">{PORTFOLIO_DATA.profile.systemStatus}</span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-[#bac9cc]">
            <Activity className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>P99: 3.2ms</span>
          </div>
          <span className="text-[#3b494c]">|</span>
          <span className="text-[#00e5ff]">{PORTFOLIO_DATA.profile.activeCommit}</span>
          <span className="text-[#3b494c]">|</span>
          <span className="text-[#dee2f6] tabular-nums">{utcTime}</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full px-4 lg:px-8 py-3 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#0e1321]/90 backdrop-blur-md border-[#1e293b]'
            : 'bg-[#0e1321]/60 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Callout */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-decoration-none group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#111827] border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.25)] group-hover:border-[#00e5ff] transition-all">
              <Cpu className="w-5 h-5 text-[#00e5ff]" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold tracking-tight text-[#f8fafc] flex items-center gap-1.5">
                <span>VAMSHI.KRISHNA</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30">
                  AI/ML
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#849396] leading-none">
                DISTRIBUTED NEURAL SYSTEMS
              </p>
            </div>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1 text-[13px] font-medium text-[#bac9cc]">
            <a
              href="#projects"
              className="px-3 py-1.5 rounded-md hover:text-[#00e5ff] hover:bg-[#111827] transition-all"
            >
              Projects
            </a>
            <a
              href="#simulator"
              className="px-3 py-1.5 rounded-md hover:text-[#00e5ff] hover:bg-[#111827] transition-all flex items-center gap-1"
            >
              <span>Systems Lab</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
            </a>
            <a
              href="#benchmarks"
              className="px-3 py-1.5 rounded-md hover:text-[#00e5ff] hover:bg-[#111827] transition-all"
            >
              Benchmarks
            </a>
            <a
              href="#papers"
              className="px-3 py-1.5 rounded-md hover:text-[#00e5ff] hover:bg-[#111827] transition-all"
            >
              Papers
            </a>
            <a
              href="#experience"
              className="px-3 py-1.5 rounded-md hover:text-[#00e5ff] hover:bg-[#111827] transition-all"
            >
              Experience
            </a>
            <a
              href="#skills"
              className="px-3 py-1.5 rounded-md hover:text-[#00e5ff] hover:bg-[#111827] transition-all"
            >
              Arsenal
            </a>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Audio Feedback Toggle */}
            <button
              onClick={toggleAudio}
              title={audioEnabled ? "Tactile Audio: Enabled" : "Tactile Audio: Disabled"}
              className={`p-1.5 rounded-md border text-xs font-mono transition-all cursor-pointer ${
                audioEnabled
                  ? 'bg-[#00e5ff]/15 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                  : 'bg-[#111827] border-[#1e293b] text-[#849396] hover:text-[#dee2f6]'
              }`}
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#00e5ff]" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              title="Open Command Palette (Cmd+K)"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-md bg-[#111827] border border-[#1e293b] text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/40 transition-all cursor-pointer"
            >
              <Command className="w-3.5 h-3.5 text-[#00e5ff]" />
              <span>⌘K</span>
            </button>

            {/* Terminal Trigger */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md bg-[#111827] border border-[#1e293b] text-[#00e5ff] hover:border-[#00e5ff] hover:shadow-[0_0_12px_rgba(0,229,255,0.2)] transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CLI</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#1a1f2e] border border-[#1e293b] text-[#f8fafc] hover:bg-[#252a39] hover:border-[#00e5ff]/50 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#00e5ff]" />
              <span>Resume</span>
            </button>

            {/* Transmission Link */}
            <a
              href="#contact"
              className="hidden lg:flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#00e5ff] text-[#0a0f1d] hover:bg-[#c3f5ff] hover:shadow-[0_0_16px_rgba(0,229,255,0.4)] transition-all cursor-pointer"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};
