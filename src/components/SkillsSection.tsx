import React, { useState } from 'react';
import { Cpu, Brain, Server, Search, CheckCircle2, Wrench, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#00e5ff]" />;
      case 'Brain': return <Brain className="w-5 h-5 text-[#8b5cf6]" />;
      default: return <Server className="w-5 h-5 text-[#3b82f6]" />;
    }
  };

  const filteredCategories = PORTFOLIO_DATA.skillArsenal.map((cat) => ({
    ...cat,
    skills: cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.focus.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="py-16 lg:py-24 relative bg-[#090e1c]/40 border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-xs font-mono text-[#00e5ff] mb-3">
              <Wrench className="w-3.5 h-3.5" />
              <span>TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
              Systems & Engineering Competencies
            </h2>
            <p className="text-sm sm:text-base text-[#bac9cc] mt-2 max-w-2xl">
              Deep vertical specialization across hardware microarchitecture, compiler passes, distributed collectives, and mathematical model mechanics.
            </p>
          </div>

          {/* Search Filter */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#849396] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search stack (e.g. CUDA, Triton)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#111827] border border-[#1e293b] text-xs font-mono text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]/50 transition-all"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat) => (
            <div
              key={cat.category}
              className="glass-panel rounded-2xl border border-[#1e293b] p-6 space-y-6 hover:border-[#00e5ff]/30 transition-all"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-[#1e293b]">
                <div className="p-2 rounded-lg bg-[#090e1c] border border-[#1e293b]">
                  {getIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#f8fafc]">{cat.category}</h3>
                  <span className="text-[11px] font-mono text-[#849396]">
                    {cat.skills.length} core proficiencies
                  </span>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5 font-mono">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#dee2f6] font-semibold">{skill.name}</span>
                      <span className="text-[#00e5ff] font-bold">{skill.experience}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#090e1c] h-1.5 rounded-full overflow-hidden border border-[#1e293b]">
                      <div
                        className="h-full bg-gradient-to-r from-[#00e5ff] via-[#3b82f6] to-[#8b5cf6] rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>

                    <div className="text-[10px] text-[#849396] leading-tight">
                      Focus: <span className="text-[#bac9cc]">{skill.focus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
