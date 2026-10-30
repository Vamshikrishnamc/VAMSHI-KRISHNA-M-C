import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-xs font-mono text-[#00e5ff] mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>INDUSTRY TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
            Production Engineering Experience
          </h2>
          <p className="text-sm sm:text-base text-[#bac9cc] mt-2 max-w-2xl">
            A track record of engineering distributed systems and driving measurable speedups in enterprise AI cluster performance.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-[#1e293b] ml-4 md:ml-6 space-y-10 pl-6 md:pl-8">
          {PORTFOLIO_DATA.experiences.map((exp, idx) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Node Bullet */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#0e1321] border-2 border-[#00e5ff] shadow-[0_0_10px_#00e5ff] group-hover:scale-125 transition-transform" />

              {/* Experience Card */}
              <div className="glass-panel rounded-2xl border border-[#1e293b] p-6 lg:p-7 space-y-4 hover:border-[#00e5ff]/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.12)] transition-all">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#f8fafc]">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-[#00e5ff]">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#849396]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#00e5ff]" />
                      <span>{exp.period}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#849396]" />
                      <span>{exp.location}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 font-bold">
                      {exp.impactMetric}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-[#bac9cc] leading-relaxed">
                  {exp.summary}
                </p>

                {/* Key Achievements */}
                <div className="space-y-2 pt-2 border-t border-[#1e293b]">
                  {exp.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-mono text-[#bac9cc]">
                      <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded bg-[#090e1c] border border-[#1e293b] text-[11px] font-mono text-[#dee2f6]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
