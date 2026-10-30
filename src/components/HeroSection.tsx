import React, { useState } from 'react';
import { 
  Zap, 
  Terminal as TerminalIcon, 
  Cpu, 
  Layers, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Binary
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenTerminal: () => void;
  onExploreProjects: () => void;
  onLaunchLab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTerminal,
  onExploreProjects,
  onLaunchLab,
}) => {
  const [activeTab, setActiveTab] = useState<'cluster' | 'kernel' | 'roofline'>('cluster');

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#00e5ff]/10 via-[#8b5cf6]/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-[#3b82f6]/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Eyebrow Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111827] border border-[#00e5ff]/30 text-xs font-mono text-[#00e5ff] mb-6 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
          <span>[SYSTEM_INITIALIZED] :: 64-NODE H100 CLUSTER ACTIVE</span>
          <span className="text-[#3b494c]">•</span>
          <span className="text-[#dee2f6]">CUDA 12.8 / TRITON 3.0</span>
        </div>

        {/* Master Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-[#f8fafc] leading-[1.1] mb-6">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c3f5ff] via-[#00e5ff] to-[#3b82f6]">High-Throughput</span> Neural Systems & Distributed ML Engines.
            </h1>

            <p className="text-base sm:text-lg text-[#bac9cc] leading-relaxed mb-8 max-w-2xl font-normal">
              Specialized in sub-millisecond LLM serving kernels, 3D hybrid mesh parallelism (TP/PP/ZeRO-3), and extreme memory-bandwidth saturation for multi-billion parameter foundation models.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <button
                onClick={onExploreProjects}
                className="px-6 py-3 rounded-lg bg-[#00e5ff] text-[#0a0f1d] font-semibold text-sm hover:bg-[#c3f5ff] hover:shadow-[0_0_24px_rgba(0,229,255,0.45)] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Inspect Architecture Matrix</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLaunchLab}
                className="px-5 py-3 rounded-lg bg-[#111827]/90 text-[#dee2f6] border border-[#1e293b] font-medium text-sm hover:border-[#00e5ff] hover:text-[#00e5ff] hover:bg-[#1a1f2e] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#00e5ff]" />
                <span>Launch Systems Lab</span>
              </button>

              <button
                onClick={onOpenTerminal}
                className="px-4 py-3 rounded-lg bg-[#090e1c] text-[#94a3b8] border border-[#1e293b] font-mono text-xs hover:text-[#00e5ff] hover:border-[#00e5ff]/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <TerminalIcon className="w-4 h-4 text-[#00e5ff]" />
                <span>$ ./cli --exec</span>
              </button>
            </div>

            {/* Quick Tech Highlights */}
            <div className="flex items-center gap-3 text-xs font-mono text-[#849396] pt-2 border-t border-[#1e293b]/80">
              <span className="text-[#dee2f6] font-semibold">CORE SPECIALTIES:</span>
              <div className="flex flex-wrap gap-2">
                {['CUDA C++', 'Triton 3.0', 'PagedAttention', '1F1B Interleaved PP', 'FP8 Quantization', 'NCCL Fabric'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[#161b2a] border border-[#1e293b] text-[#bac9cc] text-[11px]"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Interactive Live Engine Monitor Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-xl overflow-hidden shadow-2xl border border-[#1e293b] relative group hover:border-[#00e5ff]/50 transition-all">
              {/* Card Window Bar */}
              <div className="bg-[#090e1c] px-4 py-2.5 border-b border-[#1e293b] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/70" />
                  <span className="ml-2 font-mono text-xs text-[#bac9cc]">
                    engine_telemetry.sys
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-[#111827] p-1 rounded-md border border-[#1e293b] text-[11px] font-mono">
                  <button
                    onClick={() => setActiveTab('cluster')}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                      activeTab === 'cluster'
                        ? 'bg-[#00e5ff]/20 text-[#00e5ff] font-semibold'
                        : 'text-[#849396] hover:text-[#dee2f6]'
                    }`}
                  >
                    Cluster
                  </button>
                  <button
                    onClick={() => setActiveTab('kernel')}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                      activeTab === 'kernel'
                        ? 'bg-[#00e5ff]/20 text-[#00e5ff] font-semibold'
                        : 'text-[#849396] hover:text-[#dee2f6]'
                    }`}
                  >
                    Kernel
                  </button>
                  <button
                    onClick={() => setActiveTab('roofline')}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                      activeTab === 'roofline'
                        ? 'bg-[#00e5ff]/20 text-[#00e5ff] font-semibold'
                        : 'text-[#849396] hover:text-[#dee2f6]'
                    }`}
                  >
                    Roofline
                  </button>
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-5 font-mono text-xs bg-[#0b101e]/90">
                {activeTab === 'cluster' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#00e5ff]" />
                        <span className="text-[#dee2f6] font-semibold">64x H100 SXM5 TOPOLOGY</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#10b981]/15 text-[#10b981] text-[10px] border border-[#10b981]/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> NVLINK FABRIC 900 GB/s
                      </span>
                    </div>

                    {/* 8-GPU Node Grid Visualizer */}
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((gpu) => (
                        <div
                          key={gpu}
                          className="p-2.5 rounded-lg bg-[#111827] border border-[#1e293b] hover:border-[#00e5ff]/60 transition-all flex flex-col gap-1"
                        >
                          <div className="flex items-center justify-between text-[10px] text-[#849396]">
                            <span>GPU_{gpu}</span>
                            <span className="text-[#00e5ff]">98%</span>
                          </div>
                          <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#00e5ff] to-[#3b82f6] h-full rounded-full"
                              style={{ width: `${88 + (gpu % 3) * 4}%` }}
                            />
                          </div>
                          <div className="text-[9px] text-[#bac9cc] flex justify-between">
                            <span>71.2 GB</span>
                            <span className="text-[#10b981]">58°C</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Interconnect Bandwidth Ticker */}
                    <div className="p-3 rounded-lg bg-[#111827] border border-[#1e293b] flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-[#849396]">AGGREGATE ALL-REDUCE BANDWIDTH</div>
                        <div className="text-sm font-bold text-[#00e5ff]">884.2 GB/sec (98.2% peak)</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-[#849396]">COLLECTIVE OVERLAP</div>
                        <div className="text-sm font-bold text-[#10b981]">94.6% non-blocking</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'kernel' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#bac9cc] pb-2 border-b border-[#1e293b]">
                      <span className="text-[#00e5ff]">fused_fp8_gemm_triton.py</span>
                      <span className="text-[#849396]">SM89 / SM90 Target</span>
                    </div>
                    <pre className="text-[11px] text-[#bac9cc] overflow-x-auto leading-relaxed bg-[#070b14] p-3 rounded-lg border border-[#1e293b]">
                      <code>{`# Triton FP8 Fused Kernel Execution
@triton.autotune(
    configs=[Config({'BLOCK_M': 128, 'BLOCK_N': 256, 'BLOCK_K': 64}, num_stages=4, num_warps=8)],
    key=['M', 'N', 'K']
)
def triton_gemm(A, B, C, M, N, K):
    # Vectorized register load with TMA
    a = tl.load_tma(A + offs_m, desc_a)
    b = tl.load_tma(B + offs_n, desc_b)
    # Tensor Core FP8 Dot-Product Accumulation
    c = tl.dot(a, b, out_dtype=tl.float32)
    tl.store(C + offs_c, c)`}</code>
                    </pre>
                    <div className="flex items-center justify-between text-[10px] text-[#849396]">
                      <span>Achieved FLOPs: <strong className="text-[#00e5ff]">982 TFLOPS</strong></span>
                      <span>Speedup vs cuBLAS: <strong className="text-[#10b981]">+18.4%</strong></span>
                    </div>
                  </div>
                )}

                {activeTab === 'roofline' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#bac9cc] pb-2 border-b border-[#1e293b]">
                      <span className="text-[#dee2f6] font-semibold">ROOFLINE EFFICIENCY (H100 SXM5)</span>
                      <span className="text-[#00e5ff]">Arithmetic Intensity: 142 FLOP/B</span>
                    </div>
                    
                    {/* Simulated Roofline Chart */}
                    <div className="p-3 bg-[#070b14] rounded-lg border border-[#1e293b] space-y-2.5">
                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-[#dee2f6]">HBM3 Memory Bandwidth</span>
                          <span className="text-[#00e5ff]">3.15 TB/s (94% saturation)</span>
                        </div>
                        <div className="w-full bg-[#1e293b] h-2 rounded-full overflow-hidden">
                          <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: '94%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-[#dee2f6]">FP8 Tensor Core Utilization</span>
                          <span className="text-[#3b82f6]">91.8% of 1979 TFLOPS peak</span>
                        </div>
                        <div className="w-full bg-[#1e293b] h-2 rounded-full overflow-hidden">
                          <div className="bg-[#3b82f6] h-full rounded-full" style={{ width: '91.8%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-[#dee2f6]">Warp Stall Due to Memory Throttle</span>
                          <span className="text-[#10b981]">1.8% (Near optimal)</span>
                        </div>
                        <div className="w-full bg-[#1e293b] h-2 rounded-full overflow-hidden">
                          <div className="bg-[#10b981] h-full rounded-full" style={{ width: '6%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Footer Indicator */}
              <div className="bg-[#090e1c] px-4 py-2 border-t border-[#1e293b] text-[10px] font-mono text-[#849396] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                  <span>SLURM JOB_ID: 948219</span>
                </span>
                <span className="text-[#00e5ff]">CLUSTER_SYNC_OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {PORTFOLIO_DATA.liveMetrics.map((metric) => (
            <div
              key={metric.label}
              className="glass-panel p-4 rounded-xl border border-[#1e293b] hover:border-[#00e5ff]/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all group"
            >
              <div className="text-[11px] font-mono text-[#849396] uppercase mb-1 tracking-wider">
                {metric.label}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] tracking-tight group-hover:text-[#00e5ff] transition-colors">
                {metric.value}
              </div>
              <div className="text-xs font-mono text-[#00e5ff] mt-1 flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#00e5ff]" />
                <span>{metric.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
