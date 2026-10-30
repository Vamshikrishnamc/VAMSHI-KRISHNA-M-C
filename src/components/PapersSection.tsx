import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Quote, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  BookOpen,
  Award
} from 'lucide-react';
import { PORTFOLIO_DATA, Paper } from '../data/portfolioData';

export const PapersSection: React.FC = () => {
  const [expandedAbstractId, setExpandedAbstractId] = useState<string | null>(null);
  const [selectedBibtexPaper, setSelectedBibtexPaper] = useState<Paper | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleAbstract = (id: string) => {
    setExpandedAbstractId(expandedAbstractId === id ? null : id);
  };

  const copyBibtex = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="papers" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-xs font-mono text-[#d0bcff] mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>ACADEMIC RIGOR & SCHOLARSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
              Research Publications & Preprints
            </h2>
            <p className="text-sm sm:text-base text-[#bac9cc] mt-2 max-w-2xl">
              Fundamental research in sparse attention mathematics, distributed MoE dispatch schedulers, and edge model compression.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#849396]">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1e293b]">
              <Award className="w-4 h-4 text-[#00e5ff]" />
              <strong className="text-[#dee2f6]">161+</strong> Citations
            </span>
          </div>
        </div>

        {/* Papers List */}
        <div className="space-y-6">
          {PORTFOLIO_DATA.papers.map((paper) => {
            const isExpanded = expandedAbstractId === paper.id;
            return (
              <div
                key={paper.id}
                className="glass-panel rounded-2xl border border-[#1e293b] p-6 lg:p-7 hover:border-[#8b5cf6]/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] transition-all duration-300 space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 max-w-4xl">
                    {/* Venue & Year Badge */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded bg-[#8b5cf6]/15 text-[#d0bcff] border border-[#8b5cf6]/30 font-semibold">
                        {paper.venue}
                      </span>
                      <span className="text-[#849396]">•</span>
                      <span className="text-[#00e5ff] font-bold">{paper.arxivId}</span>
                      <span className="text-[#849396]">•</span>
                      <span className="text-[#10b981]">{paper.citations} Citations</span>
                    </div>

                    {/* Paper Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc] leading-snug">
                      {paper.title}
                    </h3>

                    {/* Authors */}
                    <div className="text-xs font-mono text-[#bac9cc]">
                      {paper.authors.map((author, i) => (
                        <span key={author}>
                          <span className={author === 'Vamshi Krishna' ? 'text-[#00e5ff] font-bold underline decoration-[#00e5ff]/40' : ''}>
                            {author}
                          </span>
                          {i < paper.authors.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedBibtexPaper(paper)}
                      className="px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-xs font-mono text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Quote className="w-3.5 h-3.5 text-[#00e5ff]" />
                      <span>BibTeX</span>
                    </button>

                    <button
                      onClick={() => toggleAbstract(paper.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-xs font-mono text-[#bac9cc] hover:text-[#f8fafc] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Abstract</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Abstract Text Expandable */}
                {isExpanded && (
                  <div className="pt-3 border-t border-[#1e293b] text-xs sm:text-sm text-[#bac9cc] leading-relaxed font-sans bg-[#090e1c] p-4 rounded-xl border animate-in fade-in duration-200">
                    <strong className="text-[#dee2f6] font-mono block mb-1 uppercase text-xs">
                      ABSTRACT
                    </strong>
                    {paper.abstract}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1e293b]/70">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#161b2a] border border-[#1e293b] text-[11px] font-mono text-[#bac9cc]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BibTeX Modal */}
      {selectedBibtexPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#0e1321] border border-[#8b5cf6]/40 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div className="text-sm font-mono font-bold text-[#f8fafc] flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#8b5cf6]" />
                <span>BibTeX Citation</span>
              </div>
              <button
                onClick={() => setSelectedBibtexPaper(null)}
                className="text-[#849396] hover:text-[#f8fafc] text-xs font-mono cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#070b14] border border-[#1e293b] text-xs font-mono text-[#bac9cc] overflow-x-auto leading-relaxed">
              <code>{selectedBibtexPaper.bibtex}</code>
            </pre>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => copyBibtex(selectedBibtexPaper.bibtex)}
                className="px-4 py-2 rounded-lg bg-[#8b5cf6] text-white text-xs font-mono font-bold hover:bg-[#a78bfa] transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy BibTeX'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
