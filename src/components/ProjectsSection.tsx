import React, { useState } from 'react';
import { 
  Cpu, 
  ExternalLink, 
  Github, 
  FileText, 
  Layers, 
  Zap, 
  Flame,
  ArrowUpRight,
  Code2
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Generative AI & LLMs',
    'Distributed Systems',
    'Kernels & Compilers',
    'Computer Vision & Multimodal',
    'MLOps & Edge'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-xs font-mono text-[#00e5ff] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>PRODUCTION ARCHITECTURES & KERNELS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
              Featured Systems & Models
            </h2>
            <p className="text-sm sm:text-base text-[#bac9cc] mt-2 max-w-2xl">
              High-throughput inference frameworks, custom Triton GPU kernels, and distributed 3D hybrid mesh parallelism engines.
            </p>
          </div>

          <div className="text-xs font-mono text-[#849396] self-start md:self-auto flex items-center gap-2">
            <span>SHOWING:</span>
            <span className="text-[#00e5ff] font-bold">{filteredProjects.length} REPOSITORIES</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#00e5ff] text-[#0a0f1d] border-[#00e5ff] font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                  : 'bg-[#111827] text-[#bac9cc] border-[#1e293b] hover:border-[#00e5ff]/50 hover:text-[#f8fafc]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl border border-[#1e293b] hover:border-[#00e5ff]/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Card Header Top */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block text-[11px] font-mono text-[#00e5ff] px-2 py-0.5 rounded bg-[#00e5ff]/10 border border-[#00e5ff]/20 uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#f8fafc] group-hover:text-[#00e5ff] transition-colors mt-2">
                      {project.title}
                    </h3>
                  </div>

                  {project.featured && (
                    <span className="shrink-0 text-[10px] font-mono text-[#eab308] px-2 py-0.5 rounded bg-[#eab308]/10 border border-[#eab308]/30 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#eab308]" /> FEATURED
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#bac9cc] line-clamp-3 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Metrics Badges */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {project.metrics.slice(0, 2).map((m) => (
                    <div
                      key={m.label}
                      className="p-2.5 rounded-lg bg-[#090e1c] border border-[#1e293b]"
                    >
                      <div className="text-[10px] font-mono text-[#849396] uppercase">{m.label}</div>
                      <div className="text-sm font-bold text-[#dee2f6] mt-0.5">{m.value}</div>
                      {m.delta && (
                        <div className="text-[10px] font-mono text-[#00e5ff]">{m.delta}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Target Hardware */}
                <div className="text-[11px] font-mono text-[#849396] flex items-center gap-1.5 pt-2 border-t border-[#1e293b]">
                  <Cpu className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span className="truncate">{project.hardware}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-[#090e1c]/80 p-4 border-t border-[#1e293b] flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectProject(project)}
                  className="px-3.5 py-2 rounded-lg bg-[#111827] border border-[#1e293b] text-xs font-mono text-[#dee2f6] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>Inspect Kernels</span>
                </button>

                <div className="flex items-center gap-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg text-[#849396] hover:text-[#f8fafc] hover:bg-[#111827] transition-all cursor-pointer"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.paperUrl && (
                    <a
                      href={project.paperUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg text-[#849396] hover:text-[#00e5ff] hover:bg-[#111827] transition-all cursor-pointer"
                      title="Read Paper"
                    >
                      <FileText className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
