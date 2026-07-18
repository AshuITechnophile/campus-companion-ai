import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  Send,
  Zap,
  ClipboardList,
  Brain,
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
  CalendarDays,
  LifeBuoy,
  Search,
  Phone,
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const SUGGESTIONS = [
  { icon: BookOpen, label: "Library timings" },
  { icon: Home, label: "Hostel fees" },
  { icon: Bus, label: "Transport routes" },
  { icon: LifeBuoy, label: "ERP help" },
  { icon: ClipboardList, label: "Raise a complaint" },
  { icon: Search, label: "Track a complaint" },
  { icon: Phone, label: "Contact admin" },
  { icon: CalendarDays, label: "Exam schedule" },
];

const SECTIONS = ["features", "how", "chat"] as const;

function LandingPage() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <AnnouncementBar />
      <Nav />
      <Hero />
      <LogoStrip />
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

function AnnouncementBar() {
  return (
    <div className="w-full border-b border-border bg-muted/40">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-6 py-2 text-xs">
        <span className="inline-flex h-4 items-center rounded-full border border-border bg-background px-1.5 text-[10px] font-medium tracking-wide text-muted-foreground">
          NEW
        </span>
        <span className="text-muted-foreground">
          SageSync is live for SAGE University Indore students —
        </span>
        <a
          href="#chat"
          className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary"
        >
          try the assistant <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

function BrandMark({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  return (
    <div
      className={`${dim} flex items-center justify-center rounded-md bg-foreground text-background`}
    >
      <Sparkles className="h-3.5 w-3.5" />
    </div>
  );
}

function Nav() {
  const active = useActiveSection();
  const links = [
    { id: "features", label: "Features" },
    { id: "how", label: "How it works" },
    { id: "chat", label: "Chat" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-2">
          <BrandMark />
          <span className="text-[15px] font-semibold tracking-tight">SageSync</span>
        </a>
        <nav className="hidden items-center gap-7 text-[13px] md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`transition-colors hover:text-foreground ${
                active === l.id ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#chat"
            className="hidden text-[13px] text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            Sign in
          </a>
          <Button asChild size="sm" className="h-8 rounded-md px-3 text-[13px]">
            <a href="#chat">
              Get started <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(600px 320px at 50% 0%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#chat"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="inline-flex h-4 items-center rounded-full bg-primary/10 px-1.5 text-[10px] font-medium text-primary">
              v1.0
            </span>
            Now supporting complaint tracking
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            The AI campus assistant
            <br />
            <span className="text-muted-foreground">for SAGE University Indore.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Ask anything about fees, hostels, transport, ERP or exams. Raise a
            complaint and track it — all from one clean interface.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Button asChild className="h-10 rounded-md px-4 text-sm">
              <a href="#chat">
                Start chatting <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-10 rounded-md border-border px-4 text-sm"
            >
              <a href="#features">See features</a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-foreground" /> No signup required
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-foreground" /> Instant answers
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-foreground" /> Free for students
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="rounded-xl border border-border bg-card shadow-elegant">
            <ChatPreviewMock />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 -bottom-6 h-12 rounded-full bg-foreground/10 blur-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function ChatPreviewMock() {
  return (
    <div>
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-3 py-1 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3 w-3" /> sagesync.app/chat
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r border-border p-3 md:block">
          <div className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Recent
          </div>
          {[
            "Hostel fee structure",
            "Library on Sundays",
            "Complaint #SG-4210",
            "Bus route to Vijay Nagar",
          ].map((t, i) => (
            <div
              key={t}
              className={`truncate rounded-md px-2 py-1.5 text-[12px] ${
                i === 0
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/60"
              }`}
            >
              {t}
            </div>
          ))}
        </aside>
        <div className="flex flex-col">
          <div className="flex-1 space-y-4 px-5 py-6">
            <MockBubble
              role="user"
              text="What are the hostel fees for first-year B.Tech students?"
            />
            <MockBubble
              role="assistant"
              text={`For **B.Tech first-year** students at SAGE University Indore, hostel fees are approximately:\n\n- **AC (Triple sharing):** ₹1,05,000 / year\n- **Non-AC (Triple sharing):** ₹85,000 / year\n\nThis includes mess and laundry. Want me to open the fee brochure?`}
            />
            <MockBubble role="user" text="Also, my Wi-Fi in Block C isn't working." />
            <MockBubble
              role="assistant"
              text={`Got it — I've filed a complaint for you.\n\n**Complaint ID:** SG-4210 · **Category:** Network / Wi-Fi · **Block:** C\n\nYou'll get a status update within 24 hours.`}
            />
          </div>
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
              <span className="flex-1 text-[13px] text-muted-foreground">
                Ask about fees, hostel, transport…
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Send className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-3.5 py-2 text-[13px] leading-relaxed ${
          isUser
            ? "border border-border bg-muted/60 text-foreground"
            : "bg-background text-foreground"
        }`}
      >
        <div className="prose prose-sm max-w-none prose-p:my-1 prose-strong:font-semibold prose-strong:text-foreground">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function LogoStrip() {
  return (
    <section className="border-b border-border py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-wider text-muted-foreground">
          Trusted by students across SAGE University Indore
        </p>
        <div className="mt-6 grid grid-cols-2 gap-6 opacity-60 sm:grid-cols-3 md:grid-cols-6">
          {["Engineering", "Management", "Law", "Sciences", "Design", "Pharmacy"].map(
            (n) => (
              <div
                key={n}
                className="text-center text-sm font-medium tracking-tight text-muted-foreground"
              >
                {n}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl reveal">
          <div className="text-xs font-medium uppercase tracking-wider text-primary">
            Features
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Built for how students actually ask.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            One assistant that understands your campus — from mess timings to
            complaint tracking.
          </p>
        </div>

        {/* Asymmetric bento grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
          {/* Large feature */}
          <FeatureCard
            className="md:col-span-4 md:row-span-1"
            icon={Brain}
            title="AI-powered answers"
            desc="Ask in plain English or Hindi. SageSync understands context, follow-ups, and campus-specific abbreviations."
            visual={
              <div className="mt-6 grid gap-2">
                <div className="rounded-md border border-border bg-muted/40 px-3 py-2 text-[12px] text-muted-foreground">
                  "kal library kitne baje khulti hai?"
                </div>
                <div className="rounded-md border border-border bg-background px-3 py-2 text-[12px]">
                  The Central Library opens at <b>9:00 AM</b> on weekdays.
                </div>
              </div>
            }
          />
          <FeatureCard
            className="md:col-span-2"
            icon={Zap}
            title="Instant responses"
            desc="Sub-second answers powered by streaming inference."
          />
          <FeatureCard
            className="md:col-span-2"
            icon={ClipboardList}
            title="Complaint logging"
            desc="File and track hostel, mess, or infrastructure issues."
          />
          <FeatureCard
            className="md:col-span-2"
            icon={Database}
            title="Verified data"
            desc="Sourced from official university records — never guessed."
          />
          <FeatureCard
            className="md:col-span-2"
            icon={ShieldCheck}
            title="Private by default"
            desc="No sign-up. Conversations aren't tied to your identity."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  visual,
  className = "",
}: {
  icon: typeof Brain;
  title: string;
  desc: string;
  visual?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`reveal group relative flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-elegant ${className}`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
        {desc}
      </p>
      {visual}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: MessageCircleQuestion,
      title: "Ask",
      desc: "Type any campus question in plain language.",
    },
    {
      n: "02",
      icon: Database,
      title: "Get answers",
      desc: "SageSync pulls from the verified university knowledge base.",
    },
    {
      n: "03",
      icon: ClipboardCheck,
      title: "Track",
      desc: "File complaints and follow their status using your ID.",
    },
  ];
  return (
    <section id="how" className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl reveal">
          <div className="text-xs font-medium uppercase tracking-wider text-primary">
            How it works
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Three steps. No learning curve.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="reveal group bg-card p-8 transition-colors hover:bg-background"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background">
                  <s.icon className="h-4 w-4" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">{s.n}</div>
              </div>
              <h3 className="mt-6 text-[15px] font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatSection() {
  return (
    <section id="chat" className="border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="max-w-2xl reveal">
          <div className="text-xs font-medium uppercase tracking-wider text-primary">
            Live demo
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Talk to SageSync.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Ask anything about SAGE University, or describe an issue to raise a
            complaint.
          </p>
        </div>
        <div className="mt-10 reveal">
          <ChatWindow />
        </div>
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
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading]);

  async function submit(text: string) {
    const value = text.trim();
    if (!value || isLoading) return;
    setError(null);
    const history = [
      ...messages,
      { id: crypto.randomUUID(), role: "user" as const, text: value },
    ];
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
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.reply ?? "(no response)",
        },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-elegant">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2.5">
          <BrandMark size="sm" />
          <div>
            <div className="text-[13px] font-semibold">SageSync</div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
            </div>
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground">Powered by AI</div>
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
          <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-border bg-muted/30 px-4 py-3 md:px-6">
          {SUGGESTIONS.slice(0, 4).map((s) => (
            <button
              key={s.label}
              onClick={() => submit(s.label)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-[12px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground disabled:opacity-50"
            >
              <s.icon className="h-3 w-3" />
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
        className="flex items-end gap-2 border-t border-border bg-card px-4 py-3 md:px-6"
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
          className="max-h-40 min-h-[40px] flex-1 resize-none rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="h-10 w-10 shrink-0 rounded-md"
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
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background">
        <Sparkles className="h-4 w-4 text-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">
        How can I help you today?
      </h3>
      <p className="mt-1.5 max-w-md text-[13px] text-muted-foreground">
        Ask about SAGE University life, timings, contacts, or describe an issue
        to raise a complaint.
      </p>
      <p className="mt-6 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        Try one of these
      </p>
      <div className="mt-3 grid w-full max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onPick(s.label)}
            className="group flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-left text-[12px] text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground hover:shadow-card"
          >
            <s.icon className="h-3.5 w-3.5 text-foreground/70 transition-transform group-hover:scale-110" />
            <span className="truncate">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ role, text }: { role: string; text: string }) {
  const isUser = role === "user";
  return (
    <div
      className={`flex gap-3 animate-fade-in-up ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background">
          <Sparkles className="h-3 w-3 text-foreground" />
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? "order-1" : ""}`}>
        <div
          className={
            isUser
              ? "rounded-lg bg-primary px-3.5 py-2 text-[13.5px] text-primary-foreground"
              : "rounded-lg border border-border bg-background px-3.5 py-2 text-[13.5px] text-foreground"
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
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background">
        <Sparkles className="h-3 w-3 text-foreground" />
      </div>
      <div className="rounded-lg border border-border bg-background px-3.5 py-2.5">
        <div className="flex items-center gap-1">
          <span
            className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const cols = [
    {
      title: "Product",
      links: ["Features", "Chat", "How it works", "Changelog"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Guides", "FAQ", "Status"],
    },
    {
      title: "Company",
      links: ["About", "Privacy", "Terms", "Contact"],
    },
  ];
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <BrandMark />
              <span className="text-[15px] font-semibold tracking-tight">
                SageSync
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] text-muted-foreground">
              The AI campus assistant for SAGE University Indore. Made by
              students, for students.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[12px] font-semibold text-foreground">
                {c.title}
              </div>
              <ul className="mt-3 space-y-2 text-[13px]">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} SageSync. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            All systems normal
          </div>
        </div>
      </div>
    </footer>
  );
}
