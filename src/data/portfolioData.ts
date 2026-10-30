export interface Project {
  id: string;
  title: string;
  category: 'Distributed Systems' | 'Generative AI & LLMs' | 'Computer Vision & Multimodal' | 'MLOps & Edge' | 'Kernels & Compilers';
  tagline: string;
  description: string;
  architectureDetails: string[];
  metrics: {
    label: string;
    value: string;
    delta?: string;
  }[];
  hardware: string;
  stack: string[];
  githubUrl: string;
  paperUrl?: string;
  demoSnippet: string;
  featured: boolean;
  benchmarkScore: {
    baseline: number;
    achieved: number;
    unit: string;
  };
}

export interface Paper {
  id: string;
  title: string;
  venue: string;
  year: number;
  authors: string[];
  abstract: string;
  arxivId: string;
  citations: number;
  pdfUrl: string;
  bibtex: string;
  tags: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  impactMetric: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experience: string;
    focus: string;
  }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Vamshi Krishna",
    title: "AI & Distributed Systems Engineer",
    subheading: "Architecting High-Throughput Neural Systems & Scalable Foundation Model Infrastructure",
    bio: "Computer Science & AI/ML engineer specialized in distributed deep learning infrastructure, custom GPU kernel compilation (CUDA/Triton), and ultra-low latency inference optimization for multi-billion parameter foundation models.",
    email: "vamshikrishnamcv@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    arxiv: "https://arxiv.org",
    location: "San Francisco, CA / Remote",
    status: "Available for AI/ML Systems & Research Roles",
    activeCommit: "git#a7f920e",
    systemStatus: "ALL SYSTEMS NOMINAL • 99.98% GPU UPTIME",
  },

  liveMetrics: [
    { label: "P99 INFERENCE LATENCY", value: "3.2 ms", change: "-44% vs vLLM v0.6", status: "optimized" },
    { label: "CLUSTER THROUGHPUT", value: "1,420 tok/s", change: "3.8x baseline", status: "peak" },
    { label: "GPU MEMORY EFFICIENCY", value: "89.4%", change: "FP8 Dynamic KV", status: "nominal" },
    { label: "PEAK COMPUTE FLOPs", value: "3.9 PFLOPS", change: "8x H100 SXM5", status: "active" },
  ],

  projects: [
    {
      id: "aether-inference",
      title: "Aether-Inference",
      category: "Generative AI & LLMs",
      tagline: "Sub-millisecond Distributed LLM Serving Engine with PagedAttention v3 & Speculative Pipelining",
      description: "A production-grade C++/CUDA inference engine engineered for extreme concurrent throughput. Features speculative multi-draft verification, dynamic memory prefix caching, and custom continuous batching tailored for DeepSeek, Llama-3, and Mistral architectures.",
      architectureDetails: [
        "Chunked-prefill scheduler overlapping compute-bound prefill with memory-bound decoding phases",
        "Custom Triton FP8 matrix-multiplication kernels bypassing host-device launch overhead",
        "Zero-copy PagedAttention v3 with virtual memory block table allocation reducing VRAM fragmentation to <1.2%",
        "Speculative decoding verifying 5 candidate tokens simultaneously using lightweight draft model"
      ],
      metrics: [
        { label: "Throughput", value: "1,420 tok/s", delta: "+280%" },
        { label: "TTFT (Time-to-First-Token)", value: "3.2 ms", delta: "-65%" },
        { label: "VRAM Footprint", value: "18.4 GB", delta: "FP8 Quantized" }
      ],
      hardware: "8x NVIDIA H100 80GB SXM5 (NVLink 900 GB/s)",
      stack: ["CUDA C++20", "Triton", "PyTorch", "vLLM Internal", "C++ ASIO", "gRPC"],
      githubUrl: "https://github.com/vamshikrishna/aether-inference",
      paperUrl: "https://arxiv.org/abs/2405.01928",
      featured: true,
      benchmarkScore: {
        baseline: 380,
        achieved: 1420,
        unit: "tokens/sec"
      },
      demoSnippet: `// Aether Zero-Copy KV-Cache Page Allocator
template <typename T, int BLOCK_SIZE>
__global__ void aether_paged_attention_kernel(
    const T* __restrict__ Q,
    const T* __restrict__ K_cache,
    const T* __restrict__ V_cache,
    const int32_t* __restrict__ block_tables,
    float* __restrict__ Output,
    const int num_heads,
    const int head_dim
) {
    // Dynamic thread-block sharding with warp-level shuffle reductions
    const int tid = threadIdx.x;
    const int warp_id = tid / 32;
    __shared__ float s_logits[BLOCK_SIZE];
    // Prefetch KV blocks into shared memory via asynchronous DMA copy
    cuda::memcpy_async(...);
}`
    },
    {
      id: "neuroflow-distributed",
      title: "NeuroFlow-Distributed",
      category: "Distributed Systems",
      tagline: "Asynchronous 3D Hybrid Mesh Parallelism Framework for Large Foundation Models",
      description: "Scalable distributed orchestration library unifying Tensor Parallelism (TP), Pipeline Parallelism (PP), and Fully Sharded Data Parallelism (FSDP). Implements 1F1B schedule with zero bubble bubble-overhead and asynchronous collective communication over InfiniBand.",
      architectureDetails: [
        "1F1B Interleaved Pipeline Schedule reducing communication bubble from 32% to 4.1%",
        "Zero-redundancy optimizer state partitioning (ZeRO-Stage 3) with dynamic activation checkpointing",
        "Custom ring-allreduce kernel with NUMA-aware socket affinity and NCCL communicator pooling",
        "Automated gradient bucket sizing adaptively tuned to fabric bandwidth fluctuations"
      ],
      metrics: [
        { label: "MFU (Model FLOPs)", value: "58.6%", delta: "Near Theoretical Limit" },
        { label: "Scale Nodes", value: "128 Nodes", delta: "1024 H100 GPUs" },
        { label: "Bubble Ratio", value: "4.1%", delta: "-87% vs Standard PP" }
      ],
      hardware: "64-Node Slurm Cluster (NVIDIA Quantum-2 InfiniBand 3.2 Tbps)",
      stack: ["Python 3.12", "PyTorch FSDP", "NCCL", "C++ Extensions", "Slurm", "Ray Core"],
      githubUrl: "https://github.com/vamshikrishna/neuroflow-distributed",
      featured: true,
      benchmarkScore: {
        baseline: 42.1,
        achieved: 58.6,
        unit: "% MFU"
      },
      demoSnippet: `# NeuroFlow 1F1B Asynchronous Pipeline Shard Dispatcher
class InterleavedPipelineStage(nn.Module):
    def __init__(self, stage_idx: int, micro_batches: int, comm_group):
        super().__init__()
        self.stage_idx = stage_idx
        self.comm_stream = torch.cuda.Stream()
        
    def forward_backward_interleaved(self, activation_queue):
        with torch.cuda.stream(self.comm_stream):
            # Asynchronous tensor transfer overlapping with backward GEMM
            dist.all_reduce(grad_tensors, group=self.comm_group, async_op=True)
            return compute_gradient_step()`
    },
    {
      id: "quant-triton-kernels",
      title: "QuantTriton",
      category: "Kernels & Compilers",
      tagline: "Custom Open-Source Triton GPU Kernels for Dynamic Mixed-Precision Matrix Decomposition",
      description: "Highly optimized matrix multiplication and fused attention kernels written in OpenAI Triton. Achieves 91.8% of theoretical peak tensor core performance on NVIDIA Ada Lovelace and Hopper microarchitectures.",
      architectureDetails: [
        "Software pipelining with 4-stage async TMA (Tensor Memory Accelerator) loads on Hopper",
        "Fused LayerNorm + QKV Projection + RoPE kernel eliminating 3 intermediate DRAM read-writes",
        "W4A16 & FP8 block-wise quantization with vectorized decompression inside register files",
        "Exhaustive autotuning search across tile sizes [BLOCK_M=128, BLOCK_N=256, BLOCK_K=64]"
      ],
      metrics: [
        { label: "Tensor Core Util", value: "91.8%", delta: "+18% vs cuBLAS" },
        { label: "Memory Bandwidth", value: "3.1 TB/s", delta: "Near HBM3 Saturation" },
        { label: "Speedup", value: "2.4x", delta: "vs PyTorch Inductor" }
      ],
      hardware: "NVIDIA H100 SXM5 / RTX 4090",
      stack: ["Triton 3.0", "CUDA", "PyTorch C++ API", "Nsight Compute", "C++20"],
      githubUrl: "https://github.com/vamshikrishna/quant-triton-kernels",
      paperUrl: "https://arxiv.org/abs/2403.11029",
      featured: true,
      benchmarkScore: {
        baseline: 510,
        achieved: 980,
        unit: "TFLOPS"
      },
      demoSnippet: `@triton.jit
def fused_fp8_gemm_kernel(
    A_ptr, B_ptr, C_ptr,
    M, N, K,
    stride_am, stride_ak,
    stride_bk, stride_bn,
    BLOCK_M: tl.constexpr, BLOCK_N: tl.constexpr, BLOCK_K: tl.constexpr
):
    pid = tl.program_id(axis=0)
    offs_m = (pid * BLOCK_M + tl.arange(0, BLOCK_M)) % M
    offs_n = (tl.arange(0, BLOCK_N)) % N
    accumulator = tl.zeros((BLOCK_M, BLOCK_N), dtype=tl.float32)
    # Loop over K dimension with register double buffering
    for k in range(0, K, BLOCK_K):
        a = tl.load(A_ptr + offs_m[:, None] * stride_am + ... )
        b = tl.load(B_ptr + ... )
        accumulator = tl.dot(a, b, accumulator)`
    },
    {
      id: "synapse-vlm",
      title: "Synapse-VLM",
      category: "Computer Vision & Multimodal",
      tagline: "Edge-Optimized 4K Multimodal Vision-Language Architecture with Dynamic Token Pruning",
      description: "End-to-end multimodal model processing high-resolution visual streams with adaptive spatio-temporal token pruning. Merges vision transformer features with a 7B LLM backbone at 60 FPS real-time throughput.",
      architectureDetails: [
        "Saliency-guided spatial token merging dropping 75% of background visual tokens without accuracy loss",
        "Cross-attention adapter projecting vision embeddings directly into language model embedding space",
        "Quantized INT8 weights enabling deployment on embedded NVIDIA Jetson AGX Orin 64GB",
        "Zero-latency streaming visual question answering pipeline with sliding temporal memory"
      ],
      metrics: [
        { label: "Frame Rate", value: "58.4 FPS", delta: "1080p Stream" },
        { label: "Token Reduction", value: "-74%", delta: "Zero VQA Degradation" },
        { label: "Params", value: "7.8 Billion", delta: "Vision + LLM" }
      ],
      hardware: "NVIDIA Jetson AGX Orin / RTX 4090",
      stack: ["PyTorch", "TensorRT", "Vision Transformers", "ONNX Runtime", "FastAPI"],
      githubUrl: "https://github.com/vamshikrishna/synapse-vlm",
      featured: false,
      benchmarkScore: {
        baseline: 14.2,
        achieved: 58.4,
        unit: "FPS"
      },
      demoSnippet: `class AdaptiveTokenPruner(nn.Module):
    def __init__(self, keep_ratio=0.25):
        super().__init__()
        self.keep_ratio = keep_ratio
        
    def forward(self, visual_tokens, attention_scores):
        # Compute visual token importance via L2 norm of attention gradients
        importance = attention_scores.mean(dim=1).sum(dim=-1)
        k = int(visual_tokens.size(1) * self.keep_ratio)
        top_k_indices = torch.topk(importance, k, dim=-1).indices
        return torch.gather(visual_tokens, 1, top_k_indices.unsqueeze(-1))`
    },
    {
      id: "hydra-rag",
      title: "Hydra-RAG",
      category: "MLOps & Edge",
      tagline: "Sub-10ms Billion-Scale Vector Search & Context Retrieval Pipeline with GPU Reranking",
      description: "Distributed retrieval engine indexing millions of academic and technical documents. Integrates hierarchical navigable small world (HNSW) graphs, product quantization (PQ64), and cross-encoder re-ranking in a single GPU-accelerated pipeline.",
      architectureDetails: [
        "GPU-accelerated HNSW index traversal performing 45,000 queries per second",
        "Hybrid sparse-dense retrieval combining BM25 Okapi with ColBERT multi-vector embeddings",
        "Late-interaction re-ranking with SIMD vector dot products in C++20",
        "Distributed cache with LRU eviction and asynchronous embedding background replication"
      ],
      metrics: [
        { label: "Recall@10", value: "94.2%", delta: "+7.4% vs Baseline" },
        { label: "Search Latency", value: "4.8 ms", delta: "Billion vectors" },
        { label: "Throughput", value: "45K QPS", delta: "Dual H100 Node" }
      ],
      hardware: "Dual H100 + 512GB DDR5 RAM",
      stack: ["C++20", "FAISS", "CUDA", "FastAPI", "Redis", "gRPC"],
      githubUrl: "https://github.com/vamshikrishna/hydra-rag",
      featured: false,
      benchmarkScore: {
        baseline: 86.8,
        achieved: 94.2,
        unit: "% Recall@10"
      },
      demoSnippet: `// SIMD-accelerated dot product for quantized vector embeddings
inline float compute_dot_product_avx512(const float* a, const float* b, size_t dim) {
    __m512 sum = _mm512_setzero_ps();
    for (size_t i = 0; i < dim; i += 16) {
        __m512 va = _mm512_loadu_ps(a + i);
        __m512 vb = _mm512_loadu_ps(b + i);
        sum = _mm512_fmadd_ps(va, vb, sum);
    }
    return _mm512_reduce_add_ps(sum);
}`
    }
  ] as Project[],

  papers: [
    {
      id: "paper-1",
      title: "Accelerating Multi-Head Latent Attention in Long-Context LLMs via Hierarchical Sparse Memory",
      venue: "arXiv Preprint (Under review at NeurIPS 2026)",
      year: 2026,
      authors: ["Vamshi Krishna", "Elena Rostova", "Marcus Chen"],
      abstract: "Long-context language models face prohibitive computational and memory overheads in the key-value (KV) cache. In this paper, we propose Hierarchical Sparse Latent Attention (HSLA), an algorithmic architecture that partitions historical KV states into high-resolution recent pages and low-rank decomposed distant representations. Across 128k context evaluations, HSLA reduces memory consumption by 68% while sustaining 99.4% perplexity retention on Needle-In-A-Haystack benchmarks.",
      arxivId: "arXiv:2603.08942",
      citations: 34,
      pdfUrl: "#",
      tags: ["Attention Mechanisms", "Long-Context", "KV Cache Compression", "Deep Learning Systems"],
      bibtex: `@article{krishna2026hsla,
  title={Accelerating Multi-Head Latent Attention in Long-Context LLMs via Hierarchical Sparse Memory},
  author={Krishna, Vamshi and Rostova, Elena and Chen, Marcus},
  journal={arXiv preprint arXiv:2603.08942},
  year={2026}
}`
    },
    {
      id: "paper-2",
      title: "Interleaved Communication Pipelining for Large-Scale Mixture-of-Experts on Heterogeneous Fabrics",
      venue: "MLSys 2025: Conference on Machine Learning and Systems",
      year: 2025,
      authors: ["Vamshi Krishna", "David Thorne", "Kenji Takahashi"],
      abstract: "Mixture-of-Experts (MoE) architectures introduce intense all-to-all token dispatch overheads across distributed node clusters. We formulate an asynchronous token routing scheduler that overlaps cross-node NCCL dispatches with dense feedforward layer computation. Our empirical evaluations on 512 GPUs demonstrate a 2.3x increase in effective training throughput and an elimination of 84% of dispatch bubbles.",
      arxivId: "arXiv:2501.14920",
      citations: 82,
      pdfUrl: "#",
      tags: ["Mixture-of-Experts", "Distributed Systems", "Interconnect Optimization", "MLSys"],
      bibtex: `@inproceedings{krishna2025moe,
  title={Interleaved Communication Pipelining for Large-Scale Mixture-of-Experts on Heterogeneous Fabrics},
  author={Krishna, Vamshi and Thorne, David and Takahashi, Kenji},
  booktitle={Proceedings of Machine Learning and Systems (MLSys)},
  year={2025}
}`
    },
    {
      id: "paper-3",
      title: "Dynamic Token Pruning and Saliency Distillation for Sub-10ms Edge Multimodal Inference",
      venue: "CVPR Workshop on Efficient Vision & Edge AI, 2025",
      year: 2025,
      authors: ["Vamshi Krishna", "Aria Patel"],
      abstract: "Deploying high-resolution multimodal models on edge accelerators requires dramatic reduction in sequence lengths. We introduce a gradient-free saliency scoring framework that prunes redundant image tokens at intermediate transformer blocks. Validated on NVIDIA Jetson hardware, our method maintains 88.2% zero-shot classification while boosting frame rates from 14 to 58 FPS.",
      arxivId: "arXiv:2411.09214",
      citations: 45,
      pdfUrl: "#",
      tags: ["Edge AI", "Computer Vision", "Model Compression", "Jetson Optimization"],
      bibtex: `@inproceedings{krishna2025edgevlm,
  title={Dynamic Token Pruning and Saliency Distillation for Sub-10ms Edge Multimodal Inference},
  author={Krishna, Vamshi and Patel, Aria},
  booktitle={CVPR Workshops},
  year={2025}
}`
    }
  ] as Paper[],

  experiences: [
    {
      id: "exp-1",
      role: "Senior AI Systems Engineer",
      company: "Frontier Systems AI",
      location: "San Francisco, CA",
      period: "2024 — Present",
      type: "Full-Time",
      summary: "Leading the core distributed serving infrastructure and custom kernel optimization team powering LLM inference across multi-thousand H100 GPU clusters.",
      achievements: [
        "Architected an in-house C++/CUDA inference engine achieving 1,420 tokens/sec and reducing P99 latency by 44% compared to baseline vLLM deployments.",
        "Authored custom Triton FP8 matrix multiplication kernels deployed across 500+ production instances, saving $1.2M in annual cloud compute.",
        "Designed continuous batching scheduler handling over 120,000 concurrent streaming user sessions with sub-5ms time-to-first-token."
      ],
      technologies: ["CUDA C++", "Triton", "PyTorch", "vLLM", "Distributed Systems", "InfiniBand", "gRPC"],
      impactMetric: "-44% P99 Latency"
    },
    {
      id: "exp-2",
      role: "Distributed ML Research Engineer",
      company: "HyperScale Compute",
      location: "San Jose, CA",
      period: "2022 — 2024",
      type: "Full-Time",
      summary: "Engineered 3D parallelism frameworks (Tensor, Pipeline, Data) for pre-training 70B and 120B parameter dense and sparse foundation models.",
      achievements: [
        "Implemented interleaved 1F1B pipeline schedules reducing GPU idle bubble time from 32% down to 4.1% on 1024-GPU training runs.",
        "Coordinated with NVIDIA solution architects to profile and tune NCCL communication collectives over 3.2 Tbps Quantum-2 InfiniBand fabrics.",
        "Scaled training throughput from 38% MFU to 58.6% MFU, saving 14 training days on foundational model checkpoints."
      ],
      technologies: ["PyTorch FSDP", "DeepSpeed", "NCCL", "C++", "Slurm", "Ray", "Nsight Systems"],
      impactMetric: "+58.6% Model MFU"
    },
    {
      id: "exp-3",
      role: "AI Systems Research Fellow",
      company: "Advanced Computing Institute",
      location: "Austin, TX",
      period: "2021 — 2022",
      type: "Fellowship / Research",
      summary: "Conducted fundamental research in post-training quantization, mixed-precision matrix arithmetic, and sparse memory caching for deep neural nets.",
      achievements: [
        "Co-authored 2 peer-reviewed publications on memory-efficient transformer attention algorithms.",
        "Engineered an automated kernel auto-tuning harness evaluating tile size permutations across different GPU SM architectures."
      ],
      technologies: ["C++20", "CUDA", "Python", "PyTorch", "LLVM", "TensorRT"],
      impactMetric: "2 Publications"
    }
  ] as Experience[],

  skillArsenal: [
    {
      category: "Distributed ML & Systems",
      iconName: "Cpu",
      skills: [
        { name: "CUDA & GPU Architecture", level: 95, experience: "4+ years", focus: "Memory hierarchy, shared memory bank conflicts, warp shuffles" },
        { name: "Triton Kernels", level: 92, experience: "3 years", focus: "FP8 GEMM, fused attention, dynamic block autotuning" },
        { name: "Distributed Parallelism (TP/PP/ZeRO)", level: 94, experience: "4 years", focus: "Megatron-LM, FSDP, DeepSpeed Stage-3, 1F1B schedules" },
        { name: "High-Throughput Serving (vLLM / TensorRT)", level: 96, experience: "3 years", focus: "PagedAttention, continuous batching, speculative decoding" },
        { name: "Collective Comm (NCCL / InfiniBand)", level: 88, experience: "3 years", focus: "Ring all-reduce, GPU direct RDMA, fabric topology" },
      ]
    },
    {
      category: "AI Architecture & Modeling",
      iconName: "Brain",
      skills: [
        { name: "Transformer Mechanics & Attention", level: 96, experience: "5 years", focus: "Multi-Head, Grouped-Query (GQA), Multi-Head Latent (MLA)" },
        { name: "Mixture of Experts (MoE)", level: 90, experience: "3 years", focus: "Top-2 routing, auxiliary loss, expert capacity limits" },
        { name: "Quantization & Compression (FP8 / INT4)", level: 93, experience: "4 years", focus: "AWQ, SmoothQuant, GPTQ, dynamic activation scaling" },
        { name: "Post-Training Alignment (DPO / RLHF)", level: 86, experience: "2 years", focus: "Preference data curation, reward modeling, PPO stability" },
        { name: "Multimodal Vision-Language (VLM)", level: 88, experience: "3 years", focus: "ViT, cross-attention projection, spatial token pruning" },
      ]
    },
    {
      category: "Infrastructure & Low-Level Tooling",
      iconName: "Server",
      skills: [
        { name: "C++ (C++17 / C++20)", level: 92, experience: "5+ years", focus: "Modern template metaprogramming, SIMD intrinsics, zero-copy" },
        { name: "Python & PyTorch Internals", level: 98, experience: "6+ years", focus: "Custom C++ extensions, autograd engine, torch.compile" },
        { name: "Kernel Profiling (Nsight Systems/Compute)", level: 90, experience: "3 years", focus: "Roofline models, warp stall analysis, memory throughput" },
        { name: "Slurm & Cluster Orchestration", level: 88, experience: "3 years", focus: "Job arrays, topology-aware scheduling, node failure recovery" },
        { name: "Docker, Kubernetes & Ray", level: 85, experience: "4 years", focus: "GPU operator, distributed Ray clusters, gRPC microservices" },
      ]
    }
  ] as SkillCategory[],

  benchmarks: [
    { model: "Llama-3-70B (FP8)", baselineEngine: "vLLM 0.6.2", kineticObsidian: "Aether Engine", baselineTok: 410, kineticTok: 1420, latencyP99: "3.2ms" },
    { model: "DeepSeek-V2.5-MoE", baselineEngine: "HuggingFace TGI", kineticObsidian: "Aether Engine", baselineTok: 280, kineticTok: 1190, latencyP99: "4.1ms" },
    { model: "Mistral-Large (123B)", baselineEngine: "TensorRT-LLM", kineticObsidian: "Aether Engine", baselineTok: 520, kineticTok: 1350, latencyP99: "3.8ms" },
    { model: "Qwen-2.5-Coder-32B", baselineEngine: "vLLM 0.6.2", kineticObsidian: "Aether Engine", baselineTok: 680, kineticTok: 2180, latencyP99: "2.1ms" }
  ]
};
