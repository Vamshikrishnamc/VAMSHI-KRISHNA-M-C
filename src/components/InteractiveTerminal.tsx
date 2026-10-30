import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Copy, Check, CornerDownLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  time: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'init-1',
      command: 'welcome',
      output: (
        <div className="space-y-1.5 text-xs font-mono">
          <div className="text-[#00e5ff] font-bold">
            KINETIC OBSIDIAN v3.4.0 (x86_64-pc-linux-gnu / CUDA 12.8)
          </div>
          <div className="text-[#bac9cc]">
            Welcome to Vamshi Krishna's interactive engineering shell. Type <span className="text-[#00e5ff] font-bold">help</span> to view available system diagnostics.
          </div>
          <div className="text-[#849396] text-[11px]">
            HINT: Try running <span className="text-[#00e5ff]">eval --model llama-3</span> or <span className="text-[#00e5ff]">gpu-status</span>.
          </div>
        </div>
      ),
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    setCommandList((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    const time = new Date().toLocaleTimeString();
    const parts = cmd.toLowerCase().split(' ');
    const base = parts[0];

    let output: React.ReactNode = null;

    switch (base) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="text-[#00e5ff] font-bold mb-1">AVAILABLE SHELL COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[#bac9cc]">
              <div><strong className="text-[#dee2f6]">projects</strong> - List core neural engines & kernels</div>
              <div><strong className="text-[#dee2f6]">eval --model &lt;name&gt;</strong> - Run live inference benchmark</div>
              <div><strong className="text-[#dee2f6]">skills</strong> - Matrix of systems & ML competencies</div>
              <div><strong className="text-[#dee2f6]">benchmarks</strong> - Compare throughput tok/s & TTFT</div>
              <div><strong className="text-[#dee2f6]">papers</strong> - List research publications & arXiv</div>
              <div><strong className="text-[#dee2f6]">gpu-status</strong> - Query 64x H100 cluster diagnostics</div>
              <div><strong className="text-[#dee2f6]">cat resume.md</strong> - Output engineering CV summary</div>
              <div><strong className="text-[#dee2f6]">contact</strong> - Display transmission dispatch lines</div>
              <div><strong className="text-[#dee2f6]">clear</strong> - Clear current terminal buffer</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[#00e5ff] font-bold">SYSTEM ARCHITECTURE REPOSITORIES:</div>
            {PORTFOLIO_DATA.projects.map((p) => (
              <div key={p.id} className="p-2 rounded bg-[#090e1c] border border-[#1e293b]">
                <div className="flex justify-between items-center">
                  <span className="text-[#00e5ff] font-bold">{p.title}</span>
                  <span className="text-[10px] text-[#849396]">{p.category}</span>
                </div>
                <div className="text-[#bac9cc] text-[11px] mt-0.5">{p.tagline}</div>
                <div className="text-[#10b981] text-[10px] mt-1">
                  Hardware: {p.hardware}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'eval':
        const modelName = parts[2] || 'llama-3-70b';
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="text-[#00e5ff] font-bold">
              [BENCHMARK_EXEC] Running speculative eval on {modelName.toUpperCase()} (FP8 KV-Cache)...
            </div>
            <div className="text-[#bac9cc] space-y-0.5 text-[11px]">
              <div>✓ Allocating 8x H100 SXM5 with NVLink 900 GB/s topology... [OK]</div>
              <div>✓ Initializing PagedAttention v3 virtual memory block tables... [OK]</div>
              <div>✓ Launching custom Triton FP8 fused GEMM kernels... [OK]</div>
              <div className="text-[#10b981] font-bold pt-1">
                ➔ RESULT: 1,420 tokens/sec (P99: 3.2ms, TTFT: 14.2ms)
              </div>
              <div className="text-[#849396]">
                Relative Speedup: +280% vs baseline vLLM 0.6.2
              </div>
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[#00e5ff] font-bold">ENGINEERING TECHNICAL ARSENAL:</div>
            {PORTFOLIO_DATA.skillArsenal.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="text-[#dee2f6] font-semibold text-[11px]">{cat.category}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {cat.skills.map((s) => (
                    <div key={s.name} className="flex justify-between text-[10px] text-[#bac9cc] bg-[#090e1c] px-2 py-1 rounded border border-[#1e293b]">
                      <span>{s.name}</span>
                      <span className="text-[#00e5ff]">{s.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'benchmarks':
        output = (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-[#00e5ff] font-bold mb-1">INFERENCE BENCHMARKS (Throughput tok/s):</div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1e293b] text-[#849396]">
                    <th className="py-1">Model</th>
                    <th>Baseline</th>
                    <th>Obsidian Engine</th>
                    <th>P99 Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e293b]/50 text-[#bac9cc]">
                  {PORTFOLIO_DATA.benchmarks.map((b) => (
                    <tr key={b.model}>
                      <td className="py-1 text-[#f8fafc]">{b.model}</td>
                      <td className="text-[#849396]">{b.baselineTok} t/s</td>
                      <td className="text-[#00e5ff] font-bold">{b.kineticTok} t/s</td>
                      <td className="text-[#10b981]">{b.latencyP99}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        break;

      case 'gpu-status':
      case 'nvidia-smi':
        output = (
          <div className="space-y-1 text-xs font-mono text-[#bac9cc]">
            <div className="text-[#00e5ff] font-bold">NVIDIA-SMI 550.54.14 | Driver: 550.54.14 | CUDA: 12.8</div>
            <div className="p-2 bg-[#090e1c] rounded border border-[#1e293b] text-[10px] overflow-x-auto space-y-1">
              <div className="text-[#849396]">GPU  Name             Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC</div>
              <div className="text-[#849396]">Fan  Temp   Perf          Pwr:Usage/Cap | Memory-Usage        | GPU-Util  Compute M.</div>
              <div className="text-[#10b981]">0    NVIDIA H100 80GB SXM5    On   | 00000000:06:00.0 Off |                    0</div>
              <div>N/A   54C    P0             480W / 700W |  74210MiB / 81559MiB |      98%      Default</div>
              <div className="text-[#10b981]">1    NVIDIA H100 80GB SXM5    On   | 00000000:07:00.0 Off |                    0</div>
              <div>N/A   56C    P0             495W / 700W |  73840MiB / 81559MiB |      99%      Default</div>
              <div className="text-[#00e5ff] pt-1">
                Processes: python3 (aether_inference_server) - 64 ranks allocated
              </div>
            </div>
          </div>
        );
        break;

      case 'papers':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[#00e5ff] font-bold">PEER-REVIEWED PUBLICATIONS:</div>
            {PORTFOLIO_DATA.papers.map((p) => (
              <div key={p.id} className="p-2 rounded bg-[#090e1c] border border-[#1e293b]">
                <div className="text-[#f8fafc] font-semibold">{p.title}</div>
                <div className="text-[10px] text-[#00e5ff]">{p.venue} ({p.year})</div>
                <div className="text-[10px] text-[#849396]">{p.arxivId} • {p.citations} citations</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'cat':
        if (parts[1] === 'resume.md' || parts[1] === 'resume') {
          output = (
            <div className="space-y-2 text-xs font-mono text-[#bac9cc]">
              <div className="text-[#00e5ff] font-bold"># VAMSHI KRISHNA — RESUME SUMMARY</div>
              <p className="text-[11px] text-[#dee2f6]">
                AI & Distributed Systems Engineer specialized in CUDA/Triton kernel optimization, high-throughput LLM serving, and 3D parallelism training infrastructure.
              </p>
              <div className="text-[11px] text-[#849396]">
                Email: {PORTFOLIO_DATA.profile.email} | Location: {PORTFOLIO_DATA.profile.location}
              </div>
              <div className="pt-1 text-[11px] space-y-1">
                <div className="text-[#00e5ff] font-bold">RECENT EXPERIENCE:</div>
                {PORTFOLIO_DATA.experiences.map((e) => (
                  <div key={e.id}>
                    <span className="text-[#f8fafc] font-semibold">{e.role}</span> @ {e.company} ({e.period})
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          output = <div className="text-xs font-mono text-[#ef4444]">cat: {parts[1] || 'file'}: No such file. Try 'cat resume.md'.</div>;
        }
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs font-mono text-[#bac9cc]">
            <div className="text-[#00e5ff] font-bold">TRANSMISSION CHANNELS:</div>
            <div>Direct Email: <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="text-[#00e5ff] underline">{PORTFOLIO_DATA.profile.email}</a></div>
            <div>GitHub: <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noreferrer" className="text-[#dee2f6] underline">github.com</a></div>
            <div>LinkedIn: <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noreferrer" className="text-[#dee2f6] underline">linkedin.com</a></div>
            <div>PGP Key Fingerprint: <span className="text-[#10b981]">A794 812B 920E 412F C389</span></div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="text-xs font-mono text-[#bac9cc]">
            {PORTFOLIO_DATA.profile.name} - {PORTFOLIO_DATA.profile.title} ({PORTFOLIO_DATA.profile.status})
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <div className="text-xs font-mono text-[#ef4444]">
            Command not recognized: "{cmd}". Type <span className="text-[#00e5ff] underline">help</span> for valid options.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmd,
        output,
        time
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIdx = historyIdx === -1 ? commandList.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(commandList[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= commandList.length) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(commandList[nextIdx]);
      }
    }
  };

  const copyLog = () => {
    const text = history.map(h => `$ ${h.command}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md">
      <div
        className={`w-full max-w-4xl bg-[#080c17] border border-[#00e5ff]/30 rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isMaximized ? 'h-[92vh] max-w-[96vw]' : 'h-[620px]'
        }`}
      >
        {/* Terminal Titlebar */}
        <div className="bg-[#0e1321] px-4 py-2.5 border-b border-[#1e293b] flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ef4444] hover:opacity-80 transition-opacity cursor-pointer"
              title="Close terminal"
            />
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-[#eab308] hover:opacity-80 transition-opacity cursor-pointer"
              title="Toggle size"
            />
            <button
              onClick={() => handleCommand('clear')}
              className="w-3 h-3 rounded-full bg-[#10b981] hover:opacity-80 transition-opacity cursor-pointer"
              title="Clear screen"
            />
            <span className="ml-3 font-mono text-xs text-[#bac9cc] flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#00e5ff]" />
              <span>vamshi@kinetic-obsidian: ~/systems-core (bash)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyLog}
              title="Copy session output"
              className="p-1.5 rounded text-[#849396] hover:text-[#00e5ff] hover:bg-[#111827] transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 rounded text-[#849396] hover:text-[#dee2f6] hover:bg-[#111827] transition-all cursor-pointer"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-[#849396] hover:text-[#ef4444] hover:bg-[#111827] transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Command Area */}
        <div ref={scrollRef} className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 font-mono text-xs">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-[#849396]">
                <span className="text-[#00e5ff] font-bold">vamshi@obsidian:~$</span>
                <span className="text-[#f8fafc] font-semibold">{item.command}</span>
                <span className="text-[10px] text-[#3b494c] ml-auto">{item.time}</span>
              </div>
              <div className="pl-4 border-l border-[#1e293b]">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[#00e5ff] font-bold">vamshi@obsidian:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#f8fafc] font-mono text-xs selection:bg-[#00e5ff]/30"
              placeholder="type 'help' or click suggestions below..."
              autoFocus
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="text-[#849396] hover:text-[#00e5ff] transition-colors p-1"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Clickable Quick Suggestions Footer */}
        <div className="bg-[#090e1c] p-2.5 border-t border-[#1e293b] flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
          <span className="text-[#849396] shrink-0">HINTS:</span>
          {['help', 'projects', 'eval --model llama-3', 'gpu-status', 'benchmarks', 'cat resume.md', 'skills', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-1 rounded bg-[#111827] border border-[#1e293b] text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 shrink-0 cursor-pointer transition-all"
            >
              ${cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
