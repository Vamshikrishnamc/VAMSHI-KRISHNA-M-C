import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Terminal, 
  FileText, 
  Cpu, 
  BookOpen, 
  Zap, 
  Layers, 
  Mail, 
  ExternalLink,
  Activity,
  CornerDownLeft,
  Network
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onSelectProject: (p: Project) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
  onOpenResume,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const items = [
    // General Actions
    {
      id: 'term',
      title: 'Open Interactive CLI Terminal',
      category: 'Actions',
      icon: <Terminal className="w-4 h-4 text-[#00e5ff]" />,
      action: () => { onClose(); onOpenTerminal(); }
    },
    {
      id: 'resume',
      title: 'View Engineering Resume & Publications',
      category: 'Actions',
      icon: <FileText className="w-4 h-4 text-[#00e5ff]" />,
      action: () => { onClose(); onOpenResume(); }
    },
    {
      id: 'contact',
      title: `Send Transmission to ${PORTFOLIO_DATA.profile.email}`,
      category: 'Actions',
      icon: <Mail className="w-4 h-4 text-[#00e5ff]" />,
      action: () => {
        onClose();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'pipeline-flow',
      title: 'Inference Pipeline: 7-Stage End-to-End Execution Flow',
      category: 'Architecture',
      icon: <Network className="w-4 h-4 text-[#00e5ff]" />,
      action: () => {
        onClose();
        document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'lab-att',
      title: 'Systems Lab: Attention Weight Matrix & Logits',
      category: 'Simulator',
      icon: <Zap className="w-4 h-4 text-[#8b5cf6]" />,
      action: () => {
        onClose();
        document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'benchmarks',
      title: 'Hardware Profiler & Latency Roofline Calculator',
      category: 'Benchmarks',
      icon: <Activity className="w-4 h-4 text-[#10b981]" />,
      action: () => {
        onClose();
        document.getElementById('benchmarks')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    // Projects
    ...PORTFOLIO_DATA.projects.map((p) => ({
      id: p.id,
      title: `Project: ${p.title} (${p.category})`,
      category: 'Projects',
      icon: <Layers className="w-4 h-4 text-[#00e5ff]" />,
      action: () => { onClose(); onSelectProject(p); }
    })),
    // Papers
    ...PORTFOLIO_DATA.papers.map((paper) => ({
      id: paper.id,
      title: `Paper: ${paper.title}`,
      category: 'Publications',
      icon: <BookOpen className="w-4 h-4 text-[#8b5cf6]" />,
      action: () => {
        onClose();
        document.getElementById('papers')?.scrollIntoView({ behavior: 'smooth' });
      }
    }))
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#090e1c] border border-[#00e5ff]/40 rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#1e293b] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#00e5ff]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, project, kernel, or paper..."
            className="w-full bg-transparent border-none outline-none text-sm font-mono text-[#f8fafc] placeholder-[#64748b]"
          />
          <kbd className="px-2 py-0.5 rounded bg-[#111827] border border-[#1e293b] text-[10px] font-mono text-[#849396]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-mono text-xs">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-[#849396]">
              No results found matching "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                  selectedIndex === idx
                    ? 'bg-[#00e5ff]/15 border border-[#00e5ff]/40 text-[#f8fafc]'
                    : 'text-[#bac9cc] hover:bg-[#111827]'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="p-1.5 rounded-lg bg-[#0e1321] border border-[#1e293b]">
                    {item.icon}
                  </div>
                  <span className="truncate">{item.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-[#849396] uppercase px-2 py-0.5 rounded bg-[#111827]">
                    {item.category}
                  </span>
                  {selectedIndex === idx && (
                    <CornerDownLeft className="w-3.5 h-3.5 text-[#00e5ff]" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#0e1321] px-4 py-2 border-t border-[#1e293b] text-[10px] font-mono text-[#849396] flex items-center justify-between">
          <span>Navigate with ↑ / ↓ keys</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    </div>
  );
};
