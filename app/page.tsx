"use client";

import { useState } from "react";
import {
  Bot,
  Bug,
  Code2,
  FileText,
  GitBranch,
  Loader2,
  Palette,
  Send,
  Smartphone,
  TerminalSquare,
  Workflow
} from "lucide-react";
import { motion } from "framer-motion";

const agents = [
  { id: "operator", name: "Master Operator", icon: Bot, role: "Coordinates all agents and execution plans." },
  { id: "android", name: "Android Engineer", icon: Smartphone, role: "Builds Kotlin, Compose, Gradle, APK systems." },
  { id: "debugger", name: "Debugger", icon: Bug, role: "Fixes logs, errors, crashes, and broken builds." },
  { id: "github", name: "GitHub Actions", icon: GitBranch, role: "Creates CI/CD, deploys, logs, and artifacts." },
  { id: "designer", name: "UI/UX Designer", icon: Palette, role: "Designs cyberpunk product interfaces." },
  { id: "docs", name: "Docs Agent", icon: FileText, role: "Writes README, prompts, docs, changelogs." }
];

export default function Page() {
  const [agentId, setAgentId] = useState("operator");
  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      content: "Mr. Robot AI Workspace is online. Select an agent and send a task."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, agentId, history: messages })
    });

    const data = await res.json();

    setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen">
      <aside className="hidden w-72 border-r border-white/10 bg-black/30 p-5 backdrop-blur-2xl lg:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-neonRed to-neonCyan font-black shadow-neon">
            &gt;_
          </div>
          <div>
            <h1 className="text-xl font-black">
              Mr. <span className="text-neonRed">Robot</span>
            </h1>
            <p className="text-xs uppercase tracking-[0.24em] text-muted">AI Agent OS</p>
          </div>
        </div>

        <div className="space-y-2">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setAgentId(agent.id)}
              className={`w-full rounded-2xl p-3 text-left transition ${
                agentId === agent.id
                  ? "bg-neonCyan/15 text-white shadow-neon"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <agent.icon size={17} className="text-neonCyan" />
                <strong>{agent.name}</strong>
              </div>
              <p className="mt-1 text-xs text-muted">{agent.role}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="flex-1">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-void/75 px-4 py-4 backdrop-blur-2xl md:px-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-neonCyan">
            Cyberpunk AI Operating Workspace
          </p>
          <h2 className="text-2xl font-black">Mr. Robot Command Center</h2>
        </header>

        <div className="space-y-6 p-4 md:p-8">
          <section className="glass rounded-[2rem] p-6 md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-neonCyan">
              Multi-Agent AI Web App
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
              Build, debug, automate, and deploy with an elite AI command system.
            </h1>
            <p className="mt-5 max-w-3xl text-slate-300">
              Mr. Robot is a production-ready AI workspace shell with selectable agents, real API routing,
              persistent UI structure, workflow panels, terminal simulation, and Android development focus.
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {agents.map((agent, i) => (
              <motion.button
                key={agent.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -5 }}
                onClick={() => setAgentId(agent.id)}
                className="glass rounded-3xl p-5 text-left"
              >
                <agent.icon className="mb-4 text-neonCyan" />
                <h3 className="text-xl font-black">{agent.name}</h3>
                <p className="mt-2 text-sm text-muted">{agent.role}</p>
              </motion.button>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_.75fr]">
            <div className="glass flex min-h-[620px] flex-col overflow-hidden rounded-[2rem]">
              <div className="border-b border-white/10 p-5">
                <h2 className="text-2xl font-black">AI Agent Chat</h2>
                <p className="text-sm text-muted">
                  Active Agent: <span className="text-neonCyan">{agents.find((a) => a.id === agentId)?.name}</span>
                </p>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[92%] rounded-3xl p-4 ${
                      msg.role === "user"
                        ? "ml-auto border border-neonRed/25 bg-neonRed/15"
                        : "border border-neonCyan/25 bg-neonCyan/10"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-7">{msg.content}</div>
                  </div>
                ))}

                {loading && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-neonCyan/20 bg-neonCyan/10 px-4 py-2 text-sm text-neonCyan">
                    <Loader2 size={16} className="animate-spin" />
                    Agent thinking...
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 p-4">
                <div className="flex gap-3 rounded-full border border-white/10 bg-black/25 p-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Ask Mr. Robot to build, fix, automate..."
                    className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-slate-500"
                  />
                  <button
                    onClick={send}
                    className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-r from-neonRed to-neonCyan"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass rounded-[2rem] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <TerminalSquare className="text-neonCyan" />
                  <h2 className="text-2xl font-black">Live Terminal</h2>
                </div>
                <pre className="min-h-[260px] whitespace-pre-wrap rounded-3xl bg-black/40 p-4 text-sm leading-7 text-[#7fffee]">
{`> mr.robot runtime initialized
> agents loaded
> api route ready
> workflow engine standing by
> android builder shell ready
> status: online`}
                </pre>
              </div>

              <div className="glass rounded-[2rem] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Workflow className="text-neonCyan" />
                  <h2 className="text-2xl font-black">Workflow Builder</h2>
                </div>
                {["Prompt Intake", "Agent Routing", "Execution Plan", "Code Output", "Quality Gate"].map((step, i) => (
                  <div key={step} className="mb-3 rounded-2xl border border-white/10 bg-black/25 p-3">
                    <p className="text-xs text-neonCyan">STEP {i + 1}</p>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}