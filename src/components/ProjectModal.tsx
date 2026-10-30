import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  FileText, 
  Cpu, 
  CheckCircle2, 
  Copy, 
  Check, 
  Zap, 
  Layers
} from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const copyCode = () => {
    navigator.clipboard.writeText(project.demoSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#0e1321] border border-[#00e5ff]/40 rounded-2xl shadow-[0_0_40px_rgba(0,229,255,0.18)] flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#090e1c] px-6 py-4 border-b border-[#1e293b] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
            <div>
              <div className="text-[11px] font-mono text-[#00e5ff] uppercase tracking-wider">
                {project.category}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc]">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#111827] border border-[#1e293b] text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all cursor-pointer"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.paperUrl && (
              <a
                href={project.paperUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#111827] border border-[#1e293b] text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all cursor-pointer"
                title="Read Paper on arXiv"
              >
                <FileText className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#111827] border border-[#1e293b] text-[#bac9cc] hover:text-[#ef4444] hover:border-[#ef4444]/50 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Tagline & Description */}
          <div>
            <p className="text-base text-[#00e5ff] font-medium mb-2">
              {project.tagline}
            </p>
            <p className="text-sm text-[#bac9cc] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-3.5 rounded-xl bg-[#111827] border border-[#1e293b]"
              >
                <div className="text-[10px] font-mono text-[#849396] uppercase">{m.label}</div>
                <div className="text-xl font-bold text-[#f8fafc] mt-0.5">{m.value}</div>
                {m.delta && (
                  <div className="text-xs font-mono text-[#00e5ff] mt-0.5">{m.delta}</div>
                )}
              </div>
            ))}
          </div>

          {/* Benchmark Comparative Meter */}
          <div className="p-4 rounded-xl bg-[#090e1c] border border-[#1e293b] space-y-2 font-mono">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#849396]">BENCHMARK VERIFICATION ({project.benchmarkScore.unit})</span>
              <span className="text-[#10b981] font-bold">
                {Math.round((project.benchmarkScore.achieved / project.benchmarkScore.baseline) * 100)}% of baseline
              </span>
            </div>

            {/* Baseline Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-[#849396]">
                <span>Standard Baseline:</span>
                <span>{project.benchmarkScore.baseline} {project.benchmarkScore.unit}</span>
              </div>
              <div className="w-full bg-[#1e293b] h-2 rounded-full overflow-hidden">
                <div className="bg-[#475569] h-full rounded-full" style={{ width: '40%' }} />
              </div>
            </div>

            {/* Achieved Obsidian Engine Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-[#dee2f6]">
                <span className="text-[#00e5ff] font-bold">Kinetic Obsidian Engine:</span>
                <span className="text-[#00e5ff] font-bold">{project.benchmarkScore.achieved} {project.benchmarkScore.unit}</span>
              </div>
              <div className="w-full bg-[#1e293b] h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#00e5ff] to-[#3b82f6] h-full rounded-full shadow-[0_0_10px_#00e5ff]" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* Architectural Breakthroughs */}
          <div>
            <h3 className="text-sm font-mono font-bold text-[#dee2f6] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00e5ff]" />
              <span>Core Architectural Innovations</span>
            </h3>
            <div className="space-y-2">
              {project.architectureDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#111827] border border-[#1e293b] flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#bac9cc] leading-relaxed font-mono">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Kernel Snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-mono font-bold text-[#dee2f6] uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00e5ff]" />
                <span>Production Kernel Implementation</span>
              </h3>
              <button
                onClick={copyCode}
                className="px-2.5 py-1 rounded bg-[#111827] border border-[#1e293b] text-xs font-mono text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#070b14] border border-[#1e293b] font-mono text-xs text-[#bac9cc] overflow-x-auto leading-relaxed">
              <code>{project.demoSnippet}</code>
            </pre>
          </div>

          {/* Hardware & Tech Stack */}
          <div className="p-4 rounded-xl bg-[#090e1c] border border-[#1e293b] space-y-3 font-mono text-xs">
            <div>
              <span className="text-[#849396]">TARGET HARDWARE: </span>
              <span className="text-[#dee2f6] font-semibold">{project.hardware}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#849396]">TECHNOLOGIES: </span>
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded bg-[#161b2a] border border-[#1e293b] text-[#00e5ff] text-[11px]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#090e1c] px-6 py-3 border-t border-[#1e293b] flex items-center justify-between text-xs font-mono">
          <span className="text-[#849396]">System: Kinetic Obsidian Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-[#dee2f6] hover:bg-[#1e2638] transition-all cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
