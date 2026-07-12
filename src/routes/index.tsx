import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
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
  UtensilsCrossed,
  Wifi,
  Bus,
  Map,
  ShieldCheck,
  CircleAlert,
  Check,
} from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const SUGGESTIONS = [
  { icon: BookOpen, label: "Library Timings" },
  { icon: Home, label: "Hostel Fees" },
  { icon: UtensilsCrossed, label: "Mess Timings" },
  { icon: ClipboardList, label: "Raise Complaint" },
  { icon: Wifi, label: "WiFi Issues" },
  { icon: Map, label: "Campus Map" },
  { icon: ShieldCheck, label: "Hostel Rules" },
  { icon: Bus, label: "Bus Timings" },
];

const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered Campus Assistant",
    desc: "Understands your questions naturally — no menus, no keywords, just ask.",
  },
  {
    icon: Zap,
    title: "Instant Student Support",
    desc: "Get answers in seconds instead of walking between offices at Sage University Indore.",
  },
  {
    icon: MapPin,
    title: "Campus Information",
    desc: "Timings, locations, contacts, and rules — all in one place.",
  },
  {
    icon: ClipboardList,
    title: "Complaint Submission",
    desc: "Raise maintenance and admin issues right from the chat.",
  },
  {
    icon: MessageSquare,
    title: "Smart Conversations",
    desc: "Follow-up questions, context, and clarity — like talking to a helpful senior.",
  },
  {
    icon: Rocket,
    title: "Fast & Reliable",
    desc: "Streaming responses tuned for a snappy student-first experience.",
  },
];

function LandingPage() {
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

function Nav() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-elegant">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">SageSync</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
          <a href="#chat" className="transition-colors hover:text-foreground">Chat</a>
        </nav>
        <Button asChild size="sm" className="rounded-full px-5">
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
            Built for Sage University Indore students
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Your AI <span className="bg-gradient-hero bg-clip-text text-transparent">SageSync</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Ask Sage University Indore questions, get instant answers, and raise complaints — all from one intelligent AI assistant.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-7 shadow-elegant">
              <a href="#chat">Start Chatting <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7">
              <a href="#features">Learn More</a>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> No signup</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Instant answers</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 24/7 available</div>
          </div>
        </div>
        <div className="relative animate-fade-in-up">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-hero opacity-20 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-elegant">
            <img
              src={heroImage}
              alt="SageSync AI illustration"
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
      <div className="mx-auto max-w-2xl text-center">
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
            className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
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
    { n: "01", title: "Ask your question", desc: "Type naturally — no forms, no filters." },
    { n: "02", title: "Get an instant AI response", desc: "Clear, conversational, and to the point." },
    { n: "03", title: "Raise a complaint if needed", desc: "We log it to the backend with a tracking ID." },
  ];
  return (
    <section id="how" className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How it works</h2>
          <p className="mt-4 text-muted-foreground">Three simple steps. That's it.</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <div className="text-sm font-semibold text-primary">{s.n}</div>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
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
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Talk to SageSync</h2>
        <p className="mt-4 text-muted-foreground">
          Ask anything about Sage University Indore, or describe an issue to raise a complaint.
        </p>
      </div>
      <div className="mt-10">
        <ChatWindow />
      </div>
    </section>
  );
}

type MessagePart = { type: string; text?: string; toolName?: string; output?: unknown };

function ChatWindow() {
  const transport = useRef(new DefaultChatTransport({ api: "/api/chat" })).current;
  const { messages, sendMessage, status, error } = useChat({ transport });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  const isLoading = status === "submitted" || status === "streaming";

  function submit(text: string) {
    const value = text.trim();
    if (!value || isLoading) return;
    void sendMessage({ text: value });
    setInput("");
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
          <MessageBubble key={m.id} role={m.role} parts={m.parts as MessagePart[]} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Something went wrong. Please try again in a moment.</span>
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
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground disabled:opacity-50"
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
          className="h-11 w-11 shrink-0 rounded-xl"
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
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero shadow-elegant">
        <Sparkles className="h-6 w-6 text-primary-foreground" />
      </div>
      <h3 className="mt-5 text-xl font-semibold">How can I help you today?</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Ask about Sage University Indore life, timings, contacts, or describe an issue to raise a complaint.
      </p>
      <div className="mt-6 grid w-full max-w-lg grid-cols-2 gap-2 sm:grid-cols-4">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onPick(s.label)}
            className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 text-xs font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground hover:shadow-card"
          >
            <s.icon className="h-4 w-4 text-primary" />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ role, parts }: { role: string; parts: MessagePart[] }) {
  const isUser = role === "user";
  const text = parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
  const toolCalls = parts.filter((p) => p.type?.startsWith("tool-"));

  return (
    <div className={`flex gap-3 animate-fade-in-up ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-hero">
          <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? "order-1" : ""}`}>
        {text && (
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
        )}
        {toolCalls.map((t, i) => {
          const output = t.output as { success?: boolean; complaint_id?: string; error?: string } | undefined;
          if (!output) return null;
          if (output.success && output.complaint_id) {
            return (
              <div
                key={i}
                className="mt-2 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold">Complaint submitted</div>
                  <div className="mt-0.5 text-emerald-800">
                    Tracking ID: <span className="font-mono font-semibold">{output.complaint_id}</span>
                  </div>
                </div>
              </div>
            );
          }
          if (output.error) {
            return (
              <div key={i} className="mt-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
                Failed to submit: {output.error}
              </div>
            );
          }
          return null;
        })}
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
          © {new Date().getFullYear()} SageSync. Built for Sage University Indore students, with care.
        </div>
      </div>
    </footer>
  );
}
