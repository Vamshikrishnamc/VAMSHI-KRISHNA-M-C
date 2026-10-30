import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Sparkles 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [priority, setPriority] = useState('Research Collaboration / Roles');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct mailto
    const subject = encodeURIComponent(`[Transmission: ${priority}] from ${senderName || 'Anonymous'}`);
    const body = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\nPriority: ${priority}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 relative bg-[#090e1c]/80 border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-xs font-mono text-[#00e5ff] mb-3">
                <Terminal className="w-3.5 h-3.5" />
                <span>SECURE TRANSMISSION CONSOLE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
                Connect & Collaborate
              </h2>
              <p className="text-sm sm:text-base text-[#bac9cc] mt-2 leading-relaxed">
                Open to discussions regarding high-throughput distributed systems, custom GPU kernel engineering, AI/ML research fellowships, and foundational model architecture.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] space-y-3 font-mono">
              <div className="text-xs text-[#849396] uppercase tracking-wider flex items-center justify-between">
                <span>Direct Signal</span>
                <span className="text-[#10b981] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  Active Inquiries
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 p-3 bg-[#090e1c] rounded-xl border border-[#1e293b]">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#00e5ff] font-bold truncate">
                  <Mail className="w-4 h-4 text-[#00e5ff] shrink-0" />
                  <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-[#161b2a] border border-[#1e293b] text-xs text-[#bac9cc] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-[11px] text-[#849396] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                <span>PGP Fingerprint: A794 812B 920E 412F C389</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#111827] border border-[#1e293b] text-[#dee2f6] hover:text-[#00e5ff] hover:border-[#00e5ff]/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Github className="w-4 h-4 text-[#00e5ff]" />
                <span>GitHub Profile</span>
              </a>

              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#111827] border border-[#1e293b] text-[#dee2f6] hover:text-[#00e5ff] hover:border-[#00e5ff]/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-[#00e5ff]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7 glass-panel rounded-2xl border border-[#1e293b] p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b] font-mono text-xs">
              <span className="text-[#00e5ff] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TRANSMISSION PACKET DISPATCHER</span>
              </span>
              <span className="text-[#849396]">ENCRYPTION: TLS 1.3 / PGP</span>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff] text-center space-y-3 font-mono">
                <ShieldCheck className="w-10 h-10 text-[#00e5ff] mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-[#f8fafc]">Transmission Prepared</h3>
                <p className="text-xs text-[#bac9cc] max-w-md mx-auto">
                  Your mail client has been opened with pre-formatted encryption headers directed to <span className="text-[#00e5ff]">{PORTFOLIO_DATA.profile.email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#849396] uppercase mb-1.5">
                      Your Identity / Name
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Dr. Ada Lovelace"
                      className="w-full px-3 py-2.5 rounded-lg bg-[#090e1c] border border-[#1e293b] text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#00e5ff] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[#849396] uppercase mb-1.5">
                      Return Address / Email
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="ada@computing.org"
                      className="w-full px-3 py-2.5 rounded-lg bg-[#090e1c] border border-[#1e293b] text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#00e5ff] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#849396] uppercase mb-1.5">
                    Transmission Subject / Category
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#090e1c] border border-[#1e293b] text-[#f8fafc] focus:outline-none focus:border-[#00e5ff] transition-all cursor-pointer"
                  >
                    <option value="AI Systems Engineer Role">Staff / Senior AI Systems Engineer Role</option>
                    <option value="Research Fellowship / Lab Sync">Academic / Research Collaboration</option>
                    <option value="Kernel & Model Consultation">GPU Kernel & Serving Consultation</option>
                    <option value="Keynote / Architecture Talk">Keynote / Technical Guest Lecture</option>
                    <option value="General Technical Inquiry">General Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#849396] uppercase mb-1.5">
                    Transmission Payload (Message)
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your technical cluster requirements, model architecture questions, or collaboration opportunity..."
                    className="w-full px-3 py-2.5 rounded-lg bg-[#090e1c] border border-[#1e293b] text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#00e5ff] transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#00e5ff] text-[#0a0f1d] font-bold text-sm hover:bg-[#c3f5ff] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Transmission to {PORTFOLIO_DATA.profile.email}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
