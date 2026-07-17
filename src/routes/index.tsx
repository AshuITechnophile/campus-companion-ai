import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  Send,
  MessageSquare,
  Zap,
  MapPin,
  ClipboardList,
  Brain,
  Rocket,
  ArrowRight,
  BookOpen,
  Home,
  Bus,
  ShieldCheck,
  CircleAlert,
  Check,
  MessageCircleQuestion,
  Database,
  ClipboardCheck,
  GraduationCap,
  CalendarDays,
  LifeBuoy,
  Search,
  Phone,
} from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const SUGGESTIONS = [
  { icon: BookOpen, label: "Library Timings" },
  { icon: Home, label: "Hostel Fees" },
  { icon: Bus, label: "Transport" },
  { icon: LifeBuoy, label: "ERP Help" },
  { icon: ClipboardList, label: "Raise Complaint" },
  { icon: Search, label: "Track Complaint" },
  { icon: Phone, label: "Contact Administration" },
  { icon: CalendarDays, label: "Examination Schedule" },
];

const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered Campus Assistant",
    desc: "Ask questions naturally and receive accurate university information instantly.",
  },
  {
    icon: Zap,
    title: "Instant Student Support",
    desc: "No searching across websites. Get answers in seconds.",
  },
  {
    icon: MapPin,
    title: "Campus Information",
    desc: "Fees, hostel, library, transport, academics, ERP and more.",
  },
  {
    icon: ClipboardList,
    title: "Complaint Management",
    desc: "Register complaints and track their status using your Complaint ID.",
  },
  {
    icon: MessageSquare,
    title: "Smart Conversations",
    desc: "Remembers conversation context for a smoother chat experience.",
  },
  {
    icon: Rocket,
    title: "Fast & Reliable",
    desc: "Powered by AI with quick responses and accurate information.",
  },
];

const SECTIONS = ["features", "how", "chat"] as const;

function LandingPage() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <ChatSection />
      <Footer />
    </div>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

function Nav() {
  const active = useActiveSection();
  const links = [
    { id: "features", label: "Features" },
    { id: "how", label: "How it works" },
    { id: "chat", label: "Chat" },
  ];
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-elegant">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">SageSync</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative transition-colors hover:text-foreground ${
                active === l.id ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                  active === l.id ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </nav>
        <Button asChild size="sm" className="rounded-full px-5 transition-transform hover:scale-105">
          <a href="#chat">Get Started</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:py-28 md:items-center">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-card">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Built for SAGE University students
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Your AI <span className="bg-gradient-hero bg-clip-text text-transparent">Campus Assistant</span> for SAGE University
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Get instant answers about university services, contacts, fees, hostel, transport, and register or track complaints — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-7 shadow-elegant transition-transform hover:scale-105">
              <a href="#chat">Start Chatting <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7 transition-transform hover:scale-105">
              <a href="#features">See Features</a>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> No signup</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Instant answers</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 24/7 available</div>
          </div>
        </div>
        <div className="relative animate-fade-in-up">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-hero opacity-20 blur-2xl animate-float" aria-hidden />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-elegant animate-float">
            <img
              src={heroImage}
              alt="AI campus assistant for SAGE University"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center reveal">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Everything you need on day one
        </h2>
        <p className="mt-4 text-muted-foreground">
          One assistant for questions, guidance, and complaints — designed to feel effortless.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="reveal group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elegant"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-gradient-hero group-hover:text-primary-foreground">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", icon: MessageCircleQuestion, title: "Ask", desc: "Ask any university question." },
    { n: "02", icon: Database, title: "Get answers", desc: "Get verified information instantly from the university knowledge base." },
    { n: "03", icon: ClipboardCheck, title: "Track", desc: "Register complaints and track them anytime using your Complaint ID." },
  ];
  return (
    <section id="how" className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center reveal">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How it works</h2>
          <p className="mt-4 text-muted-foreground">Three simple steps. That's it.</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="reveal rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elegant"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-elegant">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-sm font-semibold text-primary">{s.n}</div>
              <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatSection() {
  return (
    <section id="chat" className="mx-auto max-w-5xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center reveal">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Talk to SageSync</h2>
        <p className="mt-4 text-muted-foreground">
          Ask anything about SAGE University, or describe an issue to raise a complaint.
        </p>
      </div>
      <div className="mt-10 reveal">
        <ChatWindow />
      </div>
    </section>
  );
}

type ChatMessage = { id: string; role: "user" | "assistant"; text: string };

function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading]);

  async function submit(text: string) {
    const value = text.trim();
    if (!value || isLoading) return;
    setError(null);
    const history = [...messages, { id: crypto.randomUUID(), role: "user" as const, text: value }];
    setMessages(history);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: value,
          history: history.map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", text: data.reply ?? "(no response)" },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
      <div className="flex items-center gap-3 border-b border-border bg-gradient-to-b from-muted/60 to-card px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <div className="text-sm font-semibold">SageSync</div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex h-[520px] flex-col gap-4 overflow-y-auto px-4 py-6 md:px-8"
      >
        {messages.length === 0 && <EmptyState onPick={submit} />}
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} text={m.text} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>


      {messages.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-border bg-muted/30 px-4 py-3 md:px-6">
          {SUGGESTIONS.slice(0, 4).map((s) => (
            <button
              key={s.label}
              onClick={() => submit(s.label)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground disabled:opacity-50"
            >
              <s.icon className="h-3.5 w-3.5" />
              {s.label}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="flex items-end gap-2 border-t border-border bg-card px-4 py-4 md:px-6"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(input);
            }
          }}
          rows={1}
          placeholder="Ask about hostel fees, mess timings, or raise a complaint…"
          className="max-h-40 min-h-[44px] flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="h-11 w-11 shrink-0 rounded-xl transition-transform hover:scale-105"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero shadow-elegant animate-float">
        <GraduationCap className="h-7 w-7 text-primary-foreground" />
      </div>
      <h3 className="mt-5 text-xl font-semibold">How can I help you today?</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Ask about SAGE University life, timings, contacts, or describe an issue to raise a complaint.
      </p>
      <p className="mt-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Try asking one of these questions
      </p>
      <div className="mt-3 grid w-full max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onPick(s.label)}
            className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 text-xs font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground hover:shadow-card"
          >
            <s.icon className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ role, text }: { role: string; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-3 animate-fade-in-up ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-hero">
          <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? "order-1" : ""}`}>
        <div
          className={
            isUser
              ? "rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-card"
              : "rounded-2xl rounded-tl-md bg-muted px-4 py-2.5 text-sm text-foreground"
          }
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{text}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-strong:text-foreground">
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 animate-fade-in-up">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-hero">
        <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
      </div>
      <div className="rounded-2xl rounded-tl-md bg-muted px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: "0s" }} />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: "0.15s" }} />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">SageSync</span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">About</a>
            <a href="#chat" className="hover:text-foreground">Contact</a>
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </nav>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
          <div className="font-medium text-foreground/80">
            Powered by AI • Built for SAGE University Students
          </div>
          <div className="mt-1">
            © {new Date().getFullYear()} SageSync. Built for SAGE University students, with care.
          </div>
        </div>
      </div>
    </footer>
  );
}
