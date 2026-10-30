import React, { useState, useMemo } from 'react';
import { 
  Play, 
  RotateCcw, 
  Sliders, 
  Network, 
  Search, 
  Sparkles, 
  Cpu, 
  Database,
  ArrowRight,
  Info,
  Check
} from 'lucide-react';

export const SystemsPlayground: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'attention' | 'sharding' | 'vector'>('attention');

  // --- LAB 1: ATTENTION & LOGITS STATE ---
  const presetPrompts = [
    "The distributed GPU cluster optimizes KV-cache via",
    "FlashAttention-3 minimizes HBM transactions by tiling",
    "Mixture of Experts routes tokens using auxiliary"
  ];
  const [promptIndex, setPromptIndex] = useState(0);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [topK, setTopK] = useState(20);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number; val: number } | null>(null);

  // Compute mock logits based on temperature and preset
  const predictedTokens = useMemo(() => {
    const sets = [
      [
        { token: "PagedAttention", rawLogit: 6.2 },
        { token: "speculative", rawLogit: 5.1 },
        { token: "prefix", rawLogit: 4.4 },
        { token: "virtual", rawLogit: 3.9 },
        { token: "dynamic", rawLogit: 3.2 }
      ],
      [
        { token: "SRAM", rawLogit: 6.5 },
        { token: "online-softmax", rawLogit: 5.4 },
        { token: "register-files", rawLogit: 4.8 },
        { token: "shared-memory", rawLogit: 4.1 },
        { token: "TMA-async", rawLogit: 3.6 }
      ],
      [
        { token: "top-2 gating", rawLogit: 6.4 },
        { token: "expert-capacity", rawLogit: 5.3 },
        { token: "load-balancing", rawLogit: 4.9 },
        { token: "entropy-loss", rawLogit: 4.2 },
        { token: "dispatch-tokens", rawLogit: 3.5 }
      ]
    ];
    const current = sets[promptIndex];
    // Scale by temperature
    const scaled = current.map(item => ({
      ...item,
      exp: Math.exp(item.rawLogit / Math.max(temperature, 0.05))
    }));
    const sumExp = scaled.reduce((sum, item) => sum + item.exp, 0);
    return scaled.map(item => ({
      token: item.token,
      prob: Math.min(Math.round((item.exp / sumExp) * 100), 100)
    }));
  }, [promptIndex, temperature]);

  // Synthetic 8x8 Attention Matrix
  const attentionMatrix = useMemo(() => {
    const size = 8;
    const matrix: number[][] = [];
    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      let sum = 0;
      for (let j = 0; j < size; j++) {
        if (j > i) {
          row.push(0); // Causal mask
        } else {
          const val = Math.exp(Math.sin((i + 1) * (j + 2) + promptIndex) * 1.5);
          sum += val;
          row.push(val);
        }
      }
      matrix.push(row.map(v => (sum > 0 ? Number((v / sum).toFixed(3)) : 0)));
    }
    return matrix;
  }, [promptIndex]);

  // --- LAB 2: SHARDING STATE ---
  type ParallelismMode = 'TP' | 'PP' | 'FSDP' | '3D_HYBRID';
  const [parallelismMode, setParallelismMode] = useState<ParallelismMode>('3D_HYBRID');

  const shardingMetrics = {
    TP: {
      tp: 8,
      pp: 1,
      dp: 1,
      name: "Tensor Parallelism (TP=8)",
      desc: "Weights sharded column/row-wise across all 8 GPUs. High all-reduce traffic over NVLink 900 GB/s.",
      commBandwidth: "880 GB/s (NVLink)",
      bubbleOverhead: "0.0%",
      mfu: "54.2%",
      commVolume: "2.8 GB / step"
    },
    PP: {
      tp: 1,
      pp: 8,
      dp: 1,
      name: "Pipeline Parallelism (PP=8)",
      desc: "Model layers sliced sequentially into 8 stages. Uses 1F1B micro-batching to minimize bubble latency.",
      commBandwidth: "400 Gbps (InfiniBand)",
      bubbleOverhead: "11.2%",
      mfu: "46.8%",
      commVolume: "0.6 GB / step"
    },
    FSDP: {
      tp: 1,
      pp: 1,
      dp: 8,
      name: "ZeRO-3 / FSDP (DP=8)",
      desc: "Optimizer states, gradients, and model parameters sharded equally across all GPUs.",
      commBandwidth: "520 GB/s (AllGather/ReduceScatter)",
      bubbleOverhead: "1.4%",
      mfu: "52.1%",
      commVolume: "3.4 GB / step"
    },
    '3D_HYBRID': {
      tp: 2,
      pp: 2,
      dp: 2,
      name: "3D Hybrid Mesh (TP=2, PP=2, DP=2)",
      desc: "State-of-the-art co-design: TP across intra-node NVLink, PP across adjacent sockets, DP globally.",
      commBandwidth: "790 GB/s Peak Overlapped",
      bubbleOverhead: "3.8%",
      mfu: "58.6%",
      commVolume: "1.1 GB / step"
    }
  };

  // --- LAB 3: VECTOR & RAG STATE ---
  const ragQueries = [
    {
      query: "How does FlashAttention tile KV memory in SRAM?",
      topResult: "Chunked Tiling Kernel (dim=128): SRAM size 160KB loaded asynchronously with double-buffered shared memory.",
      distance: 0.948,
      latency: "3.8 ms",
      source: "flash_attention_kernel.cu:L142",
      tokens: ["SRAM", "tiling", "asynchronous", "double_buffer"]
    },
    {
      query: "Asynchronous NCCL collective ring all-reduce execution",
      topResult: "CUDA streams dispatch ncclAllReduce overlapping with subsequent layer backward gradient accumulation.",
      distance: 0.915,
      latency: "4.1 ms",
      source: "distributed_mesh.cpp:L88",
      tokens: ["NCCL", "ring_reduce", "cudaStream", "overlap"]
    },
    {
      query: "Speculative decoding with draft token verification",
      topResult: "Draft model generates K candidate tokens; target foundation model verifies logits in a single forward pass.",
      distance: 0.884,
      latency: "3.2 ms",
      source: "aether_speculative.py:L210",
      tokens: ["speculative", "candidate_verification", "draft_model", "KV_reuse"]
    }
  ];
  const [selectedRagIdx, setSelectedRagIdx] = useState(0);

  return (
    <section id="simulator" className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-xs font-mono text-[#00e5ff] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE INTERACTIVE TESTBED</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
              Systems & Neural Architecture Lab
            </h2>
            <p className="text-sm sm:text-base text-[#bac9cc] mt-2 max-w-2xl">
              Interact directly with the mathematical mechanics, distributed topologies, and memory hierarchy principles powering our high-performance models.
            </p>
          </div>

          {/* Lab Navigation Switcher */}
          <div className="flex items-center p-1.5 rounded-lg bg-[#111827] border border-[#1e293b] self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveLab('attention')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                activeLab === 'attention'
                  ? 'bg-[#00e5ff] text-[#0a0f1d] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                  : 'text-[#849396] hover:text-[#dee2f6]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Attention & Logits</span>
            </button>

            <button
              onClick={() => setActiveLab('sharding')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                activeLab === 'sharding'
                  ? 'bg-[#00e5ff] text-[#0a0f1d] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                  : 'text-[#849396] hover:text-[#dee2f6]'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Distributed 3D Mesh</span>
            </button>

            <button
              onClick={() => setActiveLab('vector')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                activeLab === 'vector'
                  ? 'bg-[#00e5ff] text-[#0a0f1d] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                  : 'text-[#849396] hover:text-[#dee2f6]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Vector Latent Search</span>
            </button>
          </div>
        </div>

        {/* ================= LAB 1: ATTENTION & LOGITS ================= */}
        {activeLab === 'attention' && (
          <div className="glass-panel rounded-2xl border border-[#1e293b] p-6 lg:p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Prompts & Controls */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <label className="text-xs font-mono text-[#849396] uppercase tracking-wider block mb-2">
                    Sequence Input Context
                  </label>
                  <div className="space-y-2">
                    {presetPrompts.map((p, idx) => (
                      <button
                        key={p}
                        onClick={() => setPromptIndex(idx)}
                        className={`w-full text-left p-3 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                          promptIndex === idx
                            ? 'bg-[#00e5ff]/10 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.15)]'
                            : 'bg-[#111827] border-[#1e293b] text-[#dee2f6] hover:border-[#849396]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>"{p}"</span>
                          {promptIndex === idx && <Check className="w-3.5 h-3.5 text-[#00e5ff]" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sampling Parameters */}
                <div className="p-4 rounded-xl bg-[#090e1c] border border-[#1e293b] space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#dee2f6] flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#00e5ff]" />
                      <span>Temperature (T):</span>
                    </span>
                    <span className="text-[#00e5ff] font-bold">{temperature.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.05"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-[#00e5ff] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#849396]">
                    <span>0.1 (Greedy / Deterministic)</span>
                    <span>1.0 (Standard)</span>
                    <span>2.0 (High Entropy)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#1e293b] text-xs font-mono">
                    <div>
                      <div className="text-[11px] text-[#849396]">Top-p Nucleus:</div>
                      <div className="text-[#dee2f6] font-semibold">{topP}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#849396]">Top-k Filtering:</div>
                      <div className="text-[#dee2f6] font-semibold">{topK} tokens</div>
                    </div>
                  </div>
                </div>

                {/* Next Token Probability Distribution */}
                <div>
                  <div className="text-xs font-mono text-[#849396] uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Softmax Logits Distribution</span>
                    <span className="text-[10px] text-[#00e5ff]">P = exp(z/T) / ∑exp(z/T)</span>
                  </div>
                  <div className="space-y-2">
                    {predictedTokens.map((item, i) => (
                      <div key={item.token} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#f8fafc] font-semibold">
                            {i === 0 ? '▶ ' : '  '}"{item.token}"
                          </span>
                          <span className="text-[#00e5ff]">{item.prob}%</span>
                        </div>
                        <div className="w-full bg-[#111827] h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              i === 0
                                ? 'bg-[#00e5ff] shadow-[0_0_8px_rgba(0,229,255,0.4)]'
                                : 'bg-[#3b82f6]'
                            }`}
                            style={{ width: `${item.prob}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: 8x8 Scaled Dot-Product Attention Heatmap */}
              <div className="lg:col-span-7 bg-[#090e1c] p-6 rounded-xl border border-[#1e293b] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                  <div>
                    <h3 className="text-sm font-mono font-bold text-[#f8fafc] flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#00e5ff]" />
                      <span>Causal Multi-Head Attention Weight Matrix</span>
                    </h3>
                    <p className="text-[11px] font-mono text-[#849396]">
                      Softmax((Q · Kᵀ) / √d_k) • Upper triangle masked
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#111827] border border-[#1e293b] text-[#00e5ff]">
                    Head 4 / 32
                  </span>
                </div>

                {/* Heatmap Grid */}
                <div className="p-3 bg-[#070b14] rounded-lg border border-[#1e293b] overflow-x-auto">
                  <div className="min-w-[340px]">
                    <div className="grid grid-cols-9 gap-1 text-[10px] font-mono text-[#849396] text-center mb-1">
                      <div>Pos</div>
                      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div key={i}>k_{i}</div>
                      ))}
                    </div>

                    {attentionMatrix.map((row, rIdx) => (
                      <div key={rIdx} className="grid grid-cols-9 gap-1 items-center mb-1">
                        <div className="text-[10px] font-mono text-[#849396] text-center">
                          q_{rIdx}
                        </div>
                        {row.map((val, cIdx) => {
                          const isMasked = cIdx > rIdx;
                          const intensity = isMasked ? 0 : val;
                          return (
                            <div
                              key={cIdx}
                              onMouseEnter={() => setHoveredCell({ row: rIdx, col: cIdx, val })}
                              onMouseLeave={() => setHoveredCell(null)}
                              className={`h-7 rounded text-[9px] font-mono flex items-center justify-center transition-all cursor-crosshair border ${
                                isMasked
                                  ? 'bg-[#0e1321]/40 border-[#1e293b]/30 text-[#3b494c]'
                                  : 'border-[#00e5ff]/20 text-[#dee2f6] hover:scale-110 hover:border-[#00e5ff] hover:z-10'
                              }`}
                              style={{
                                backgroundColor: isMasked
                                  ? 'transparent'
                                  : `rgba(0, 229, 255, ${Math.max(intensity * 0.9, 0.08)})`
                              }}
                            >
                              {!isMasked && (val > 0.05 ? val.toFixed(2) : '·')}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Cell Readout */}
                <div className="p-3 rounded-lg bg-[#111827] border border-[#1e293b] flex items-center justify-between text-xs font-mono">
                  {hoveredCell ? (
                    <>
                      <div>
                        <span className="text-[#849396]">Inspecting Coordinate: </span>
                        <span className="text-[#00e5ff] font-bold">
                          Query[{hoveredCell.row}] ➔ Key[{hoveredCell.col}]
                        </span>
                      </div>
                      <div>
                        <span className="text-[#849396]">Attention Weight: </span>
                        <span className="text-[#10b981] font-bold">
                          {(hoveredCell.val * 100).toFixed(1)}%
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-[#849396] italic">
                      Hover over any matrix coordinate to inspect exact attention scalar and dot product score.
                    </div>
                  )}
                </div>

                {/* Theoretical Memory Efficiency Insight */}
                <div className="p-3 rounded-lg bg-[#00e5ff]/5 border border-[#00e5ff]/20 text-xs font-mono text-[#bac9cc] flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#dee2f6] font-semibold">PagedAttention v3 Advantage: </span>
                    With block size 16, memory fragmentation is reduced by <strong className="text-[#00e5ff]">98.8%</strong> compared to traditional static continuous buffer allocation, allowing 4.2x more concurrent batch capacity.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= LAB 2: DISTRIBUTED 3D MESH ================= */}
        {activeLab === 'sharding' && (
          <div className="glass-panel rounded-2xl border border-[#1e293b] p-6 lg:p-8 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1e293b]">
              <div>
                <h3 className="text-lg font-mono font-bold text-[#f8fafc]">
                  8-GPU Node Parallelism & Interconnect Mesh
                </h3>
                <p className="text-xs font-mono text-[#849396]">
                  Dual-Socket HGX H100 with 900 GB/s NVLink & 400 Gbps Quantum-2 InfiniBand
                </p>
              </div>

              {/* Parallelism Mode Selector */}
              <div className="flex flex-wrap gap-2">
                {(['3D_HYBRID', 'TP', 'PP', 'FSDP'] as ParallelismMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setParallelismMode(mode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all border ${
                      parallelismMode === mode
                        ? 'bg-[#00e5ff] text-[#0a0f1d] border-[#00e5ff] font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                        : 'bg-[#111827] text-[#bac9cc] border-[#1e293b] hover:border-[#00e5ff]/40'
                    }`}
                  >
                    {mode.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual 8-GPU Cluster Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Node 0 */}
              <div className="p-4 rounded-xl bg-[#090e1c] border border-[#1e293b] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#849396]">
                  <span className="text-[#dee2f6] font-semibold">HGX NODE 0 (Socket 0)</span>
                  <span className="text-[#00e5ff]">NVLink Switch Mesh</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((gpuId) => (
                    <div
                      key={gpuId}
                      className="p-3 rounded-lg bg-[#111827] border border-[#1e293b] space-y-2 hover:border-[#00e5ff]/50 transition-all"
                    >
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-[#dee2f6] font-bold">H100_{gpuId}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00e5ff]/15 text-[#00e5ff]">
                          {parallelismMode === 'TP'
                            ? `TP_Rank ${gpuId}`
                            : parallelismMode === 'PP'
                            ? `Stage ${gpuId}`
                            : parallelismMode === '3D_HYBRID'
                            ? `TP${gpuId % 2}_PP${Math.floor(gpuId / 2)}`
                            : `FSDP_Shard ${gpuId}`}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-[#849396] flex justify-between">
                        <span>Weights: 14.2 GB</span>
                        <span className="text-[#10b981]">Active</span>
                      </div>
                      <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6]"
                          style={{ width: `${85 + gpuId * 3}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Node 1 */}
              <div className="p-4 rounded-xl bg-[#090e1c] border border-[#1e293b] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#849396]">
                  <span className="text-[#dee2f6] font-semibold">HGX NODE 1 (Socket 1)</span>
                  <span className="text-[#8b5cf6]">Inter-Node InfiniBand</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[4, 5, 6, 7].map((gpuId) => (
                    <div
                      key={gpuId}
                      className="p-3 rounded-lg bg-[#111827] border border-[#1e293b] space-y-2 hover:border-[#8b5cf6]/50 transition-all"
                    >
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-[#dee2f6] font-bold">H100_{gpuId}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#8b5cf6]/15 text-[#8b5cf6]">
                          {parallelismMode === 'TP'
                            ? `TP_Rank ${gpuId}`
                            : parallelismMode === 'PP'
                            ? `Stage ${gpuId}`
                            : parallelismMode === '3D_HYBRID'
                            ? `TP${gpuId % 2}_PP${Math.floor((gpuId - 4) / 2)}`
                            : `FSDP_Shard ${gpuId}`}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-[#849396] flex justify-between">
                        <span>Weights: 14.2 GB</span>
                        <span className="text-[#10b981]">Active</span>
                      </div>
                      <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff]"
                          style={{ width: `${88 + (gpuId - 4) * 2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics Readout */}
            <div className="p-4 rounded-xl bg-[#090e1c] border border-[#1e293b] grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
              <div>
                <div className="text-[10px] text-[#849396]">INTERCONNECT BANDWIDTH</div>
                <div className="text-base font-bold text-[#00e5ff] mt-0.5">
                  {shardingMetrics[parallelismMode].commBandwidth}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#849396]">PIPELINE BUBBLE OVERHEAD</div>
                <div className="text-base font-bold text-[#10b981] mt-0.5">
                  {shardingMetrics[parallelismMode].bubbleOverhead}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#849396]">MODEL FLOPs (MFU)</div>
                <div className="text-base font-bold text-[#f8fafc] mt-0.5">
                  {shardingMetrics[parallelismMode].mfu}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#849396]">COMMUNICATION PER STEP</div>
                <div className="text-base font-bold text-[#8b5cf6] mt-0.5">
                  {shardingMetrics[parallelismMode].commVolume}
                </div>
              </div>
            </div>

            <p className="text-xs font-mono text-[#bac9cc] leading-relaxed">
              <strong className="text-[#00e5ff]">Configuration Summary: </strong>
              {shardingMetrics[parallelismMode].desc}
            </p>
          </div>
        )}

        {/* ================= LAB 3: VECTOR & RAG RETRIEVAL ================= */}
        {activeLab === 'vector' && (
          <div className="glass-panel rounded-2xl border border-[#1e293b] p-6 lg:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Query Selector */}
              <div className="lg:col-span-5 space-y-4">
                <label className="text-xs font-mono text-[#849396] uppercase tracking-wider block">
                  Select Dense Semantic Query
                </label>
                <div className="space-y-2.5">
                  {ragQueries.map((item, idx) => (
                    <button
                      key={item.query}
                      onClick={() => setSelectedRagIdx(idx)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                        selectedRagIdx === idx
                          ? 'bg-[#00e5ff]/10 border-[#00e5ff] text-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                          : 'bg-[#111827] border-[#1e293b] text-[#dee2f6] hover:border-[#849396]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[11px] text-[#849396]">
                        <Search className="w-3.5 h-3.5 text-[#00e5ff]" />
                        <span>Query #{idx + 1}</span>
                      </div>
                      <div className="font-semibold text-sm leading-snug">{item.query}</div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1e293b]/60 text-[10px]">
                        <span className="text-[#10b981]">Cosine: {item.distance}</span>
                        <span className="text-[#849396]">Latency: {item.latency}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: High-Dimensional Projection & Nearest Chunk */}
              <div className="lg:col-span-7 bg-[#090e1c] p-6 rounded-xl border border-[#1e293b] space-y-5 font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#00e5ff]" />
                    <span className="text-xs font-bold text-[#dee2f6]">
                      HNSW VECTOR RETRIEVAL GRAPH (1,536-dim)
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#111827] border border-[#1e293b] text-[#00e5ff]">
                    PQ64 Quantized
                  </span>
                </div>

                {/* Simulated 2D Vector Projection Space */}
                <div className="h-44 w-full bg-[#070b14] rounded-lg border border-[#1e293b] relative p-4 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
                  
                  {/* Central Query Vector */}
                  <div className="absolute z-10 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-[#00e5ff] shadow-[0_0_16px_#00e5ff] animate-pulse" />
                    <span className="text-[10px] text-[#00e5ff] font-bold mt-1">QUERY_VEC</span>
                  </div>

                  {/* Neighbor Nodes */}
                  {[
                    { x: 30, y: 35, dist: "0.948", match: true },
                    { x: 65, y: 25, dist: "0.892", match: false },
                    { x: 75, y: 70, dist: "0.811", match: false },
                    { x: 25, y: 75, dist: "0.784", match: false }
                  ].map((node, i) => (
                    <div
                      key={i}
                      className="absolute flex flex-col items-center"
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                      <div
                        className={`w-3 h-3 rounded-full border ${
                          node.match
                            ? 'bg-[#10b981] border-[#10b981] shadow-[0_0_12px_#10b981]'
                            : 'bg-[#1e293b] border-[#3b494c]'
                        }`}
                      />
                      <span className="text-[9px] text-[#849396] mt-0.5">{node.dist}</span>
                    </div>
                  ))}
                </div>

                {/* Retrieved Document Chunk Inspector */}
                <div className="p-4 rounded-lg bg-[#111827] border border-[#1e293b] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#849396]">
                    <span className="text-[#00e5ff] font-semibold">
                      TOP MATCH: {ragQueries[selectedRagIdx].source}
                    </span>
                    <span className="text-[#10b981] font-bold">
                      {(ragQueries[selectedRagIdx].distance * 100).toFixed(1)}% Match
                    </span>
                  </div>
                  <p className="text-xs text-[#f8fafc] leading-relaxed">
                    "{ragQueries[selectedRagIdx].topResult}"
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {ragQueries[selectedRagIdx].tokens.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#1a1f2e] border border-[#1e293b] text-[10px] text-[#bac9cc]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
