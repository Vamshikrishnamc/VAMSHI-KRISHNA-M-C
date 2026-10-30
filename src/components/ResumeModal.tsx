import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Cpu 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyMarkdown = () => {
    const md = `# ${PORTFOLIO_DATA.profile.name}
${PORTFOLIO_DATA.profile.title} | ${PORTFOLIO_DATA.profile.email} | ${PORTFOLIO_DATA.profile.location}

## SUMMARY
${PORTFOLIO_DATA.profile.bio}

## EXPERIENCE
${PORTFOLIO_DATA.experiences.map(e => `### ${e.role} — ${e.company} (${e.period})
${e.summary}
${e.achievements.map(a => `- ${a}`).join('\n')}
Technologies: ${e.technologies.join(', ')}
`).join('\n')}

## PUBLICATIONS
${PORTFOLIO_DATA.papers.map(p => `- ${p.title}. ${p.venue} (${p.year}). ${p.arxivId}`).join('\n')}

## EDUCATION
- M.S. in Computer Science (Specialization in Distributed Systems & AI), High Honors
- B.S. in Computer Science & Engineering, Magna Cum Laude
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#0e1321] border border-[#00e5ff]/40 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-[#090e1c] px-6 py-4 border-b border-[#1e293b] flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-mono text-xs">
            <FileText className="w-4 h-4 text-[#00e5ff]" />
            <span className="text-[#f8fafc] font-bold">VAMSHI_KRISHNA_CV.pdf</span>
            <span className="text-[#849396]">• Updated 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyMarkdown}
              className="px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-xs font-mono text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy MD'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-xs font-mono text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-[#849396] hover:text-[#ef4444] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Document Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#0b101e] text-[#dee2f6]">
          {/* Header */}
          <div className="border-b border-[#1e293b] pb-6 space-y-2">
            <h1 className="text-3xl font-extrabold text-[#f8fafc] tracking-tight">
              {PORTFOLIO_DATA.profile.name}
            </h1>
            <div className="text-sm font-mono text-[#00e5ff] font-semibold">
              {PORTFOLIO_DATA.profile.title}
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-[#849396] pt-1">
              <span>Email: {PORTFOLIO_DATA.profile.email}</span>
              <span>•</span>
              <span>Location: {PORTFOLIO_DATA.profile.location}</span>
              <span>•</span>
              <span>Status: {PORTFOLIO_DATA.profile.status}</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>Executive Profile & Technical Focus</span>
            </h2>
            <p className="text-sm text-[#bac9cc] leading-relaxed">
              {PORTFOLIO_DATA.profile.bio} Proven track record scaling foundational model training to 1024+ GPUs with 58.6% Model FLOPs Utilization (MFU) and engineering low-latency speculative inference engines serving 120k+ concurrent streams.
            </p>
          </div>

          {/* Professional Experience */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span>Engineering Experience</span>
            </h2>
            <div className="space-y-6">
              {PORTFOLIO_DATA.experiences.map((exp) => (
                <div key={exp.id} className="space-y-2 border-l-2 border-[#1e293b] pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                    <span className="text-base font-bold text-[#f8fafc] font-sans">
                      {exp.role} — <span className="text-[#00e5ff]">{exp.company}</span>
                    </span>
                    <span className="text-[#849396]">{exp.period} | {exp.location}</span>
                  </div>
                  <p className="text-xs text-[#bac9cc]">{exp.summary}</p>
                  <ul className="space-y-1 text-xs text-[#bac9cc] list-disc list-inside">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-mono text-[#849396] pt-1">
                    <strong className="text-[#dee2f6]">Technologies:</strong> {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peer-Reviewed Publications */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Selected Publications</span>
            </h2>
            <div className="space-y-3">
              {PORTFOLIO_DATA.papers.map((p) => (
                <div key={p.id} className="text-xs font-mono text-[#bac9cc]">
                  <div className="font-semibold text-[#f8fafc]">
                    "{p.title}"
                  </div>
                  <div className="text-[#00e5ff] text-[11px]">
                    {p.authors.join(', ')} • {p.venue} ({p.year})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-[#00e5ff] uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h2>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#f8fafc] font-bold">M.S. in Computer Science (Distributed Systems & AI)</span>
                <span className="text-[#849396]">High Honors</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#f8fafc] font-bold">B.S. in Computer Science & Engineering</span>
                <span className="text-[#849396]">Magna Cum Laude</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
