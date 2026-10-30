import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Database, 
  ArrowRight,
  Code2,
  HardDrive,
  Network,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface PipelineStage {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  latencyMs: number;
  hardware: string;
  techStack: string;
  codeSnippet: string;
  metrics: { label: string; value: string }[];
  details: string;
}

export const ArchitecturePipeline: React.FC = () => {
  const stages: PipelineStage[] = [
    {
      id: 'ingest',
      number: '01',
      title: 'gRPC Request Ingestion',
      shortDesc: 'Asynchronous event-loop with zero-copy ring buffers',
      latencyMs: 0.4,
      hardware: 'Host CPU / Dual 100GbE NICs',
      techStack: 'C++20 ASIO / Protobuf',
      details: 'High-concurrency network gateway listening for incoming token streaming requests. Decouples client network sockets from GPU execution queues via lock-free ring buffers.',
      metrics: [
        { label: 'Max Concurrency', value: '120k streams' },
        { label: 'Ingest Overhead', value: '0.4 ms' }
      ],
      codeSnippet: `// Asynchronous Request Packet Ingestion
void IngestGateway::on_stream_request(const InferenceRequest& req) {
    auto token_buffer = memory_pool_->allocate_pinned(req.prompt_length());
    tokenizer_->encode_to_buffer(req.prompt(), token_buffer.data());
    scheduler_queue_->push_lockfree(std::move(token_buffer));
}`
    },
    {
      id: 'radix-cache',
      number: '02',
      title: 'Radix-Trie Prefix Cache',
      shortDesc: 'Instant prompt token KV reuse with zero GPU recomputation',
      latencyMs: 0.2,
      hardware: 'Host DDR5 RAM + GPU HBM3',
      techStack: 'Radix-Trie Hash Indexer',
      details: 'Evaluates common prefix tokens (e.g., system prompts, tools, agent chat history) in a shared Radix Trie. Recycles existing KV-cache physical pages without issuing prefill compute.',
      metrics: [
        { label: 'Prefix Hit Rate', value: '94.2%' },
        { label: 'Prefill Saved', value: '2,048 tokens' }
      ],
      codeSnippet: `// Radix Trie Prefix Matcher
std::pair<int, PageHandle> RadixPrefixCache::match_longest_prefix(const std::vector<int>& tokens) {
    RadixNode* curr = root_.get();
    size_t matched_len = 0;
    while (curr && matched_len < tokens.size()) {
        auto next = curr->find_child(tokens[matched_len]);
        if (!next) break;
        curr = next;
        matched_len += curr->chunk_len;
    }
    return {matched_len, curr->page_handle};
}`
    },
    {
      id: 'scheduler',
      number: '03',
      title: 'Continuous Chunked Scheduler',
      shortDesc: 'Interleaving compute-bound prefill with memory-bound decode',
      latencyMs: 0.6,
      hardware: 'Host CPU Scheduler Thread',
      techStack: 'Continuous Batching Scheduler',
      details: 'Dynamically chunks long prompt prefill tokens (e.g. 512-token chunks) and packs them alongside single-token decoding sequences to saturate compute cores while maintaining ultra-low decoding jitter.',
      metrics: [
        { label: 'Batch Fill Rate', value: '98.6%' },
        { label: 'Decode Jitter', value: '<0.8 ms' }
      ],
      codeSnippet: `// Chunked Prefill & Decode Interleaver
BatchSchedule ContinuousScheduler::assemble_iteration_batch() {
    BatchSchedule batch;
    // Prioritize decoding tokens to respect P99 inter-token latency SLAs
    for (auto& seq : active_decode_seqs_) {
        batch.add_decode_step(seq);
    }
    // Fill remaining compute budget with chunked prefill slices
    fill_prefill_budget(batch, max_batch_tokens_ - batch.total_tokens());
    return batch;
}`
    },
    {
      id: 'draft-engine',
      number: '04',
      title: 'Speculative Draft Generation',
      shortDesc: 'Fast candidate tree synthesis via 1.5B auxiliary model',
      latencyMs: 1.1,
      hardware: 'Dedicated Draft GPU SMs',
      techStack: 'Eagle-2 Speculative Decoding',
      details: 'A lightweight 1.5B distilled draft model generates a 5-token speculative candidate tree in parallel. Running on decoupled SMs, it produces predictions in ~1.1ms.',
      metrics: [
        { label: 'Draft Tree Size', value: '5 tokens' },
        { label: 'Draft Latency', value: '1.1 ms' }
      ],
      codeSnippet: `// Speculative Tree Expansion
CandidateTree SpeculativeDraftEngine::generate_draft_candidates(int num_tokens) {
    CandidateTree tree;
    for (int step = 0; step < num_tokens; ++step) {
        auto [top_token, logits] = draft_model_->step_forward();
        tree.append_branch(top_token, logits);
    }
    return tree;
}`
    },
    {
      id: 'sharded-gemm',
      number: '05',
      title: 'Distributed 8x H100 Forward Pass',
      shortDesc: 'PagedAttention v3 & fused FP8 Tensor Core GEMMs over NVLink',
      latencyMs: 1.8,
      hardware: '8x NVIDIA H100 80GB SXM5',
      techStack: 'CUDA C++ / Triton FP8 / NVLink',
      details: 'Executes the primary 70B parameter model forward pass. Fused LayerNorm + QKV kernels, asynchronous TMA memory loads, and all-reduce over 900 GB/s NVLink interconnects ensure peak MFU.',
      metrics: [
        { label: 'Compute FLOPs', value: '982 TFLOPS' },
        { label: 'Bandwidth', value: '3.1 TB/s HBM3' }
      ],
      codeSnippet: `// Fused Triton FP8 Forward Pass
template <int TP_SIZE = 8>
__device__ void forward_distributed_block(
    fp8_e4m3* activations, 
    const fp8_e4m3* weights,
    PagedKVTable kv_table
) {
    paged_attention_hopper_kernel<<<grid, block, smem, stream>>>(activations, kv_table);
    nvlink_allreduce_ring_async(activations, TP_SIZE);
}`
    },
    {
      id: 'verifier',
      number: '06',
      title: 'Speculative Verification & Accept',
      shortDesc: 'Parallel verification of candidate tokens in one forward pass',
      latencyMs: 0.3,
      hardware: 'GPU Warp Reductions',
      techStack: 'Modified Rejection Sampling',
      details: 'Compares target model logits against candidate tokens using modified rejection sampling. Accepts on average 4.2 out of 5 proposed tokens, yielding a 3.4x overall speedup.',
      metrics: [
        { label: 'Acceptance Rate', value: '84.6%' },
        { label: 'Effective Speedup', value: '3.4x' }
      ],
      codeSnippet: `// Parallel Rejection Sampling Verification
int verify_draft_tree(const Tensor& target_logits, const CandidateTree& draft_tree) {
    int accepted_count = 0;
    for (int i = 0; i < draft_tree.size(); ++i) {
        float r = random_uniform();
        if (r < (target_logits[i] / draft_tree.logits[i])) {
            accepted_count++;
        } else break;
    }
    return accepted_count;
}`
    },
    {
      id: 'streamer',
      number: '07',
      title: 'Streaming Output Tokenizer',
      shortDesc: 'Sub-4ms Inter-Token Latency (ITL) dispatch to client',
      latencyMs: 0.4,
      hardware: 'Host Network Stack',
      techStack: 'Server-Sent Events (SSE) / WS',
      details: 'Accepted tokens are instantly detokenized into UTF-8 byte streams and pushed directly over open HTTP/2 SSE connections with minimal buffering.',
      metrics: [
        { label: 'Inter-Token Latency', value: '3.2 ms' },
        { label: 'Total TTFT', value: '4.8 ms' }
      ],
      codeSnippet: `// Streaming Socket Token Dispatch
void StreamingSink::emit_accepted_tokens(const std::vector<int>& tokens) {
    for (int tid : tokens) {
        std::string text_chunk = vocab_->decode_single(tid);
        socket_->async_write("data: " + text_chunk + "\\n\\n");
    }
}`
    }
  ];

  const [selectedStageId, setSelectedStageId] = useState<string>('sharded-gemm');
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [activeSimIndex, setActiveSimIndex] = useState<number>(-1);
  const [simulatedTime, setSimulatedTime] = useState<number>(0);

  const selectedStage = stages.find(s => s.id === selectedStageId) || stages[4];

  const runSimulation = () => {
    if (isRunningSim) return;
    soundManager.playClick();
    setIsRunningSim(true);
    setActiveSimIndex(0);
    setSimulatedTime(0);

    let cumulative = 0;
    stages.forEach((stage, idx) => {
      cumulative += stage.latencyMs * 250; // visual scaled delay
      setTimeout(() => {
        setActiveSimIndex(idx);
        setSelectedStageId(stage.id);
        setSimulatedTime(Number((stage.latencyMs + (idx > 0 ? stages.slice(0, idx).reduce((a, b) => a + b.latencyMs, 0) : 0)).toFixed(1)));
        soundManager.playKeypress();

        if (idx === stages.length - 1) {
          setTimeout(() => {
            setIsRunningSim(false);
            soundManager.playSuccess();
          }, 300);
        }
      }, cumulative);
    });
  };

  return (
    <section className="py-16 lg:py-24 relative bg-[#090e1c]/70 border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-xs font-mono text-[#00e5ff] mb-3">
              <Network className="w-3.5 h-3.5" />
              <span>END-TO-END INFERENCE PIPELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
              Aether Distributed Serving Architecture
            </h2>
            <p className="text-sm sm:text-base text-[#bac9cc] mt-2 max-w-2xl">
              Track how tokens traverse each software layer and GPU silicon execution unit—from raw gRPC stream arrival to verified token dispatch.
            </p>
          </div>

          {/* Simulation Trigger Button */}
          <button
            onClick={runSimulation}
            disabled={isRunningSim}
            className={`px-5 py-3 rounded-xl text-xs font-mono font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              isRunningSim
                ? 'bg-[#1e293b] text-[#849396] border border-[#3b494c]'
                : 'bg-[#00e5ff] text-[#0a0f1d] hover:bg-[#c3f5ff] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-95'
            }`}
          >
            {isRunningSim ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-ping" />
                <span>Simulating Token Flow ({simulatedTime}ms)...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Fire Synthetic Request</span>
              </>
            )}
          </button>
        </div>

        {/* Horizontal Pipeline Steps Overview */}
        <div className="overflow-x-auto pb-4">
          <div className="flex items-center gap-2 min-w-[980px]">
            {stages.map((stage, idx) => {
              const isSelected = selectedStageId === stage.id;
              const isSimActive = activeSimIndex === idx;

              return (
                <React.Fragment key={stage.id}>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedStageId(stage.id);
                    }}
                    className={`flex-1 p-3.5 rounded-xl text-left font-mono transition-all cursor-pointer border relative ${
                      isSimActive
                        ? 'bg-[#00e5ff]/25 border-[#00e5ff] shadow-[0_0_20px_#00e5ff] text-[#f8fafc] scale-105 z-10'
                        : isSelected
                        ? 'bg-[#111827] border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)] text-[#f8fafc]'
                        : 'bg-[#090e1c] border-[#1e293b] text-[#bac9cc] hover:border-[#849396] hover:bg-[#111827]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className={isSelected ? 'text-[#00e5ff] font-bold' : 'text-[#849396]'}>
                        STAGE {stage.number}
                      </span>
                      <span className="text-[#10b981] font-bold">
                        +{stage.latencyMs}ms
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#f8fafc] truncate mb-1">
                      {stage.title}
                    </div>

                    <div className="text-[10px] text-[#849396] truncate">
                      {stage.hardware}
                    </div>

                    {isSimActive && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-ping" />
                    )}
                  </button>

                  {idx < stages.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-[#3b494c] shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep Inspector Panel */}
        <div className="glass-panel rounded-2xl border border-[#00e5ff]/30 p-6 lg:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Stage Summary & Specs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00e5ff]">
                <Sparkles className="w-4 h-4" />
                <span>INSPECTING STAGE {selectedStage.number} / 07</span>
              </div>

              <h3 className="text-2xl font-bold text-[#f8fafc] tracking-tight">
                {selectedStage.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#bac9cc] leading-relaxed">
                {selectedStage.details}
              </p>

              {/* Hardware & Tech Chips */}
              <div className="p-4 rounded-xl bg-[#090e1c] border border-[#1e293b] space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#849396]">Hardware Target:</span>
                  <span className="text-[#dee2f6] font-semibold">{selectedStage.hardware}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#849396]">Stack / Framework:</span>
                  <span className="text-[#00e5ff] font-semibold">{selectedStage.techStack}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#1e293b]">
                  <span className="text-[#849396]">Latency Budget:</span>
                  <span className="text-[#10b981] font-bold">~{selectedStage.latencyMs} ms</span>
                </div>
              </div>

              {/* Stage Metrics */}
              <div className="grid grid-cols-2 gap-3">
                {selectedStage.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-lg bg-[#111827] border border-[#1e293b]"
                  >
                    <div className="text-[10px] font-mono text-[#849396] uppercase">{m.label}</div>
                    <div className="text-base font-bold text-[#f8fafc] font-mono mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Kernel / Implementation Excerpt */}
            <div className="lg:col-span-7 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-[#bac9cc] pb-2 border-b border-[#1e293b]">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#00e5ff]" />
                  <span className="font-semibold text-[#f8fafc]">Engine Implementation</span>
                </div>
                <span className="text-[10px] text-[#849396]">Production C++20 / Triton</span>
              </div>

              <pre className="p-4 rounded-xl bg-[#070b14] border border-[#1e293b] text-xs text-[#bac9cc] overflow-x-auto leading-relaxed shadow-inner">
                <code>{selectedStage.codeSnippet}</code>
              </pre>

              {/* End-to-End Latency Waterfall Readout */}
              <div className="p-3 rounded-lg bg-[#090e1c] border border-[#1e293b] flex items-center justify-between text-xs text-[#849396]">
                <span>Pipeline Stage Contribution:</span>
                <span className="text-[#00e5ff] font-bold">
                  {Math.round((selectedStage.latencyMs / stages.reduce((acc, s) => acc + s.latencyMs, 0)) * 100)}% of total TTFT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
