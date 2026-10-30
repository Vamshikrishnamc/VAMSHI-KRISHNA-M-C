/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Terminal, Command, ArrowUpRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SystemsPlayground } from './components/SystemsPlayground';
import { ArchitecturePipeline } from './components/ArchitecturePipeline';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { BenchmarkMatrix } from './components/BenchmarkMatrix';
import { PapersSection } from './components/PapersSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K for Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // Ctrl+` or Cmd+` for Terminal
      if ((e.metaKey || e.ctrlKey) && e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
      // Escape closes modals
      if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        if (isResumeOpen) setIsResumeOpen(false);
        if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
        if (isTerminalOpen) setIsTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, isResumeOpen, isCommandPaletteOpen, isTerminalOpen]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0e1321] text-[#dee2f6] selection:bg-[#00e5ff]/30 selection:text-[#c3f5ff] flex flex-col font-sans relative">
      {/* Top Navbar */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onExploreProjects={() => scrollToSection('projects')}
          onLaunchLab={() => scrollToSection('simulator')}
        />

        {/* Live Systems & Neural Architecture Lab */}
        <SystemsPlayground />

        {/* End-to-End Distributed Serving Architecture Flow */}
        <ArchitecturePipeline />

        {/* Production Architectures & Kernel Projects */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* Hardware Capacity & Latency Profiler */}
        <BenchmarkMatrix />

        {/* Research Papers & Publications */}
        <PapersSection />

        {/* Technical Arsenal & Core Skills */}
        <SkillsSection />

        {/* Production Engineering Experience */}
        <ExperienceTimeline />

        {/* Contact & Transmission Console */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Quick Action Trigger for Terminal */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          title="Open Command Palette (⌘K)"
          className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111827]/90 backdrop-blur-md border border-[#1e293b] text-xs font-mono text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/40 shadow-xl transition-all cursor-pointer"
        >
          <Command className="w-3.5 h-3.5 text-[#00e5ff]" />
          <span>⌘K</span>
        </button>

        <button
          onClick={() => setIsTerminalOpen(true)}
          title="Toggle Interactive Shell (Ctrl+`)"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#090e1c]/95 backdrop-blur-md border border-[#00e5ff]/50 text-xs font-mono text-[#00e5ff] hover:bg-[#111827] hover:shadow-[0_0_20px_rgba(0,229,255,0.35)] shadow-2xl transition-all cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-[#10b981] status-pulsing" />
          <Terminal className="w-4 h-4 text-[#00e5ff] group-hover:rotate-6 transition-transform" />
          <span className="font-bold">CLI Shell</span>
        </button>
      </div>

      {/* Modals & Overlays */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSelectProject={(projectId) => {
          const p = PORTFOLIO_DATA.projects.find((item: Project) => item.id === projectId);
          if (p) setSelectedProject(p);
        }}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onSelectProject={(project) => setSelectedProject(project)}
      />
    </div>
  );
}
