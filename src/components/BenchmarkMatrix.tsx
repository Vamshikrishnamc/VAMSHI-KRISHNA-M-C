import React, { useState, useMemo } from 'react';
import { Activity, Cpu, HardDrive, Zap, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const BenchmarkMatrix: React.FC = () => {
  // Profiler state
  const models = [
    { id: 'llama3-70b', name: 'Llama-3-70B-Instruct', params: 70, layers: 80, heads: 64, headDim: 128 },
    { id: 'deepseek-moe', name: 'DeepSeek-V2.5-MoE (236B/21B Active)', params: 236, layers: 60, heads: 128, headDim: 128 },
    { id: 'mistral-large', name: 'Mistral-Large-2 (123B)', params: 123, layers: 88, heads: 96, headDim: 128 },
    { id: 'qwen-32b', name: 'Qwen-2.5-Coder-32B', params: 32, layers: 64, heads: 40, headDim: 128 }
  ];

  const precisions = [
    { id: 'fp16', label: 'FP16 (Half Precision)', bytesPerParam: 2, bytesPerKv: 2, speedMultiplier: 1.0 },
    { id: 'fp8', label: 'FP8 (Hopper TMA Async)', bytesPerParam: 1, bytesPerKv: 1, speedMultiplier: 2.1 },
    { id: 'int4', label: 'INT4 AWQ (4-Bit Quantized)', bytesPerParam: 0.5, bytesPerKv: 1, speedMultiplier: 2.6 }
  ];

  const batchSizes = [1, 8, 32, 64, 128];
  const contextLengths = [
    { label: '4K Context', val: 4096 },
    { label: '16K Context', val: 16384 },
    { label: '32K Context', val: 32768 },
    { label: '128K Context', val: 131072 }
  ];

  const [selectedModelId, setSelectedModelId] = useState('llama3-70b');
  const [selectedPrecisionId, setSelectedPrecisionId] = useState('fp8');
  const [batchSize, setBatchSize] = useState(32);
  const [contextLength, setContextLength] = useState(32768);

  const currentModel = models.find(m => m.id === selectedModelId) || models[0];
  const currentPrecision = precisions.find(p => p.id === selectedPrecisionId) || precisions[1];

  // Dynamic calculations
  const calculation = useMemo(() => {
    // Model weights VRAM in GB
    const weightsVRAM = currentModel.params * currentPrecision.bytesPerParam;
    
    // KV Cache VRAM in GB: (2 * layers * heads * head_dim * seq_len * batch_size * bytes_per_kv) / 10^9
    const kvBytes = 2 * currentModel.layers * (currentModel.heads / 8) * currentModel.headDim * contextLength * batchSize * currentPrecision.bytesPerKv; // with GQA factor 8
    const kvVRAM = kvBytes / (1024 * 1024 * 1024);

    const totalVRAM = weightsVRAM + kvVRAM;

    // GPUs needed (80GB H100 with 15% safety buffer = ~68GB usable per GPU)
    const gpusNeeded = Math.max(1, Math.ceil(totalVRAM / 68));
    // Nearest power of 2 for tensor parallelism
    const clusterGpus = [1, 2, 4, 8, 16, 32].find(g => g >= gpusNeeded) || 32;

    // Projected throughput tok/s
    const baseThroughput = 420;
    const projectedThroughput = Math.round(
      (baseThroughput * currentPrecision.speedMultiplier * (70 / Math.max(currentModel.params, 20)) * Math.sqrt(batchSize / 8))
    );

    // Projected Time to First Token (TTFT)
    const ttft = (12.4 / currentPrecision.speedMultiplier) * (contextLength / 4096) * 0.45;

    return {
      weightsVRAM: weightsVRAM.toFixed(1),
      kvVRAM: kvVRAM.toFixed(1),
      totalVRAM: totalVRAM.toFixed(1),
      clusterGpus,
      projectedThroughput,
      ttft: ttft.toFixed(1)
    };
  }, [currentModel, currentPrecision, batchSize, contextLength]);

  return (
    <section id="benchmarks" className="py-16 lg:py-24 relative bg-[#090e1c]/60 border-y border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-xs font-mono text-[#00e5ff] mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>GPU CLUSTER CAPACITY & LATENCY CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
            Live Hardware Profiler & Benchmarks
          </h2>
          <p className="text-sm sm:text-base text-[#bac9cc] mt-2 max-w-2xl">
            Simulate VRAM allocations, PagedAttention KV-cache requirements, and throughput metrics across NVIDIA H100 clusters.
          </p>
        </div>

        {/* Interactive Profiler Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Controls Column */}
          <div className="lg:col-span-6 glass-panel rounded-2xl border border-[#1e293b] p-6 space-y-6">
            {/* Model Selection */}
            <div>
              <label className="text-xs font-mono text-[#849396] uppercase tracking-wider block mb-2">
                1. Select Foundation Model
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModelId(m.id)}
                    className={`p-3 rounded-lg text-left text-xs font-mono cursor-pointer transition-all border ${
                      selectedModelId === m.id
                        ? 'bg-[#00e5ff]/15 border-[#00e5ff] text-[#00e5ff] font-bold shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                        : 'bg-[#111827] border-[#1e293b] text-[#dee2f6] hover:border-[#849396]'
                    }`}
                  >
                    <div className="truncate">{m.name}</div>
                    <div className="text-[10px] text-[#849396] mt-0.5">{m.params}B Parameters</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Precision Selection */}
            <div>
              <label className="text-xs font-mono text-[#849396] uppercase tracking-wider block mb-2">
                2. Numeric Precision & Kernels
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {precisions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPrecisionId(p.id)}
                    className={`p-2.5 rounded-lg text-center text-xs font-mono cursor-pointer transition-all border ${
                      selectedPrecisionId === p.id
                        ? 'bg-[#00e5ff] text-[#0a0f1d] border-[#00e5ff] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                        : 'bg-[#111827] border-[#1e293b] text-[#bac9cc] hover:border-[#00e5ff]/40'
                    }`}
                  >
                    <div>{p.id.toUpperCase()}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">
                      {p.speedMultiplier}x Speedup
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Batch Size & Context Length Sliders */}
            <div className="space-y-4 pt-2 border-t border-[#1e293b]">
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#dee2f6]">Concurrent Batch Size:</span>
                  <span className="text-[#00e5ff] font-bold">{batchSize} sequences</span>
                </div>
                <div className="flex gap-2">
                  {batchSizes.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBatchSize(b)}
                      className={`flex-1 py-1.5 rounded text-xs font-mono cursor-pointer border ${
                        batchSize === b
                          ? 'bg-[#00e5ff]/20 border-[#00e5ff] text-[#00e5ff] font-bold'
                          : 'bg-[#111827] border-[#1e293b] text-[#849396] hover:text-[#dee2f6]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-[#dee2f6]">Context Sequence Window:</span>
                  <span className="text-[#00e5ff] font-bold">{(contextLength / 1024).toFixed(0)}K tokens</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {contextLengths.map((c) => (
                    <button
                      key={c.val}
                      onClick={() => setContextLength(c.val)}
                      className={`py-1.5 rounded text-xs font-mono cursor-pointer border ${
                        contextLength === c.val
                          ? 'bg-[#00e5ff]/20 border-[#00e5ff] text-[#00e5ff] font-bold'
                          : 'bg-[#111827] border-[#1e293b] text-[#849396] hover:text-[#dee2f6]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-6 glass-panel rounded-2xl border border-[#00e5ff]/30 p-6 space-y-6 shadow-[0_0_25px_rgba(0,229,255,0.1)]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <span className="text-xs font-mono text-[#00e5ff] font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>DYNAMIC PROFILING READOUT</span>
              </span>
              <span className="text-[10px] font-mono text-[#849396]">
                Target: NVIDIA H100 80GB SXM5
              </span>
            </div>

            {/* Hardware cluster recommendations */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#090e1c] border border-[#1e293b]">
                <div className="text-[10px] font-mono text-[#849396] uppercase">MINIMUM GPU TOPOLOGY</div>
                <div className="text-2xl font-extrabold text-[#00e5ff] mt-1 font-mono">
                  {calculation.clusterGpus}x H100 80GB
                </div>
                <div className="text-[10px] font-mono text-[#10b981] mt-0.5">
                  NVLink Mesh (TP={Math.min(calculation.clusterGpus, 8)})
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#090e1c] border border-[#1e293b]">
                <div className="text-[10px] font-mono text-[#849396] uppercase">PROJECTED THROUGHPUT</div>
                <div className="text-2xl font-extrabold text-[#f8fafc] mt-1 font-mono">
                  {calculation.projectedThroughput} <span className="text-sm font-normal text-[#849396]">tok/s</span>
                </div>
                <div className="text-[10px] font-mono text-[#00e5ff] mt-0.5">
                  TTFT: ~{calculation.ttft}ms
                </div>
              </div>
            </div>

            {/* VRAM Memory Breakdown Bar */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between text-xs">
                <span className="text-[#dee2f6]">Total VRAM Required:</span>
                <span className="text-[#00e5ff] font-bold">{calculation.totalVRAM} GB</span>
              </div>

              {/* Stacked Memory Bar */}
              <div className="w-full h-3 bg-[#111827] rounded-full overflow-hidden flex border border-[#1e293b]">
                <div
                  className="bg-[#00e5ff] h-full"
                  style={{
                    width: `${Math.min(100, (parseFloat(calculation.weightsVRAM) / Math.max(parseFloat(calculation.totalVRAM), 1)) * 100)}%`
                  }}
                  title={`Model Weights: ${calculation.weightsVRAM} GB`}
                />
                <div
                  className="bg-[#8b5cf6] h-full"
                  style={{
                    width: `${Math.min(100, (parseFloat(calculation.kvVRAM) / Math.max(parseFloat(calculation.totalVRAM), 1)) * 100)}%`
                  }}
                  title={`KV Cache: ${calculation.kvVRAM} GB`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#00e5ff]" />
                  <span className="text-[#849396]">Model Weights:</span>
                  <span className="text-[#f8fafc] font-semibold">{calculation.weightsVRAM} GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#8b5cf6]" />
                  <span className="text-[#849396]">Paged KV-Cache:</span>
                  <span className="text-[#f8fafc] font-semibold">{calculation.kvVRAM} GB</span>
                </div>
              </div>
            </div>

            {/* Roofline Saturation Note */}
            <div className="p-3.5 rounded-xl bg-[#090e1c] border border-[#1e293b] text-xs font-mono text-[#bac9cc] flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#dee2f6]">Kernel Efficiency: </strong>
                With custom fused FP8 GEMM + TMA asynchronous register pipelining, HBM3 memory bandwidth saturation reaches <strong className="text-[#00e5ff]">92.4%</strong> of theoretical limits on NVIDIA Hopper architecture.
              </div>
            </div>
          </div>
        </div>

        {/* Industry Baseline Comparison Table */}
        <div className="glass-panel rounded-2xl border border-[#1e293b] p-6 lg:p-8 space-y-4 font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
            <h3 className="text-base font-bold text-[#f8fafc] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00e5ff]" />
              <span>Production Serving Engine Benchmarks</span>
            </h3>
            <span className="text-xs text-[#00e5ff]">Batch=32 • FP8 Precision</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#1e293b] text-[#849396]">
                  <th className="py-2.5">Target Foundation Model</th>
                  <th>Baseline Serving Framework</th>
                  <th>Obsidian Serving Engine</th>
                  <th>P99 Tail Latency</th>
                  <th>Throughput Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b]/60 text-[#bac9cc]">
                {PORTFOLIO_DATA.benchmarks.map((row) => (
                  <tr key={row.model} className="hover:bg-[#111827]/60 transition-colors">
                    <td className="py-3 font-semibold text-[#f8fafc]">{row.model}</td>
                    <td className="text-[#849396]">
                      {row.baselineEngine} ({row.baselineTok} tok/s)
                    </td>
                    <td className="text-[#00e5ff] font-bold">
                      {row.kineticObsidian} ({row.kineticTok} tok/s)
                    </td>
                    <td className="text-[#10b981] font-semibold">{row.latencyP99}</td>
                    <td>
                      <span className="px-2 py-0.5 rounded bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30 font-bold">
                        +{Math.round(((row.kineticTok - row.baselineTok) / row.baselineTok) * 100)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
