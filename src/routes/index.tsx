import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  Send,
  Zap,
  ClipboardList,
  Brain,
  ArrowRight,
  BookOpen,
  Home as HomeIcon,
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
  Building2,
  Users,
  BellRing,
  Mail,
  MapPin,
  ChevronDown,
  Bot,
  FileSearch,
  BadgeCheck,
  Activity,
  Menu,
  X,
  Copy,
  User,
  Wifi,
  Wallet,
  GraduationCap,
  ClipboardX,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const SUGGESTION_GROUPS: {
  title: string;
  items: { icon: typeof BookOpen; label: string }[];
}[] = [
  {
    title: "Academics",
    items: [
      { icon: BookOpen, label: "Library timing" },
      { icon: LifeBuoy, label: "ERP login" },
      { icon: CalendarDays, label: "Timetable" },
      { icon: GraduationCap, label: "Examination" },
    ],
  },
  {
    title: "Student Services",
    items: [
      { icon: HomeIcon, label: "Hostel fees" },
      { icon: BadgeCheck, label: "Scholarship" },
      { icon: Bus, label: "Transport" },
      { icon: Wallet, label: "Finance office" },
    ],
  },
  {
    title: "Complaints",
    items: [
      { icon: ClipboardList, label: "Register complaint" },
      { icon: Search, label: "Track complaint" },
      { icon: HomeIcon, label: "Hostel issue" },
      { icon: Wifi, label: "WiFi issue" },
    ],
  },
];

const QUICK_CHIPS = [
  { icon: BookOpen, label: "Library timing" },
  { icon: HomeIcon, label: "Hostel fees" },
  { icon: Bus, label: "Transport" },
  { icon: ClipboardList, label: "Register complaint" },
];

const WELCOME_TOPICS = [
  { icon: BookOpen, label: "Library" },
  { icon: HomeIcon, label: "Hostel" },
  { icon: Wallet, label: "Fees" },
  { icon: Bus, label: "Transport" },
  { icon: Phone, label: "Contacts" },
  { icon: ClipboardList, label: "Complaints" },
];

const SECTIONS = ["top", "features", "how", "faq", "contact", "chat"] as const;

function LandingPage() {
  useScrollReveal();
  return (
    <div className="min-h-dvh bg-background text-foreground antialiased">
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <TrustSection />
        <Features />
        <HowItWorks />
        <FAQ />
        <Contact />
        <ChatSection />
      </main>
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
  const [active, setActive] = useState<string>("top");
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
    <div className="w-full border-b border-border bg-[#F8FAFC]">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-xs md:px-6">
        <span className="inline-flex h-[18px] items-center rounded-full border border-border bg-background px-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#111827]">
          New
        </span>
        <span className="hidden text-[#6B7280] sm:inline">
          Official AI Campus Companion — now with complaint tracking
        </span>
        <span className="text-[#6B7280] sm:hidden">Complaint tracking is live</span>
        <a
          href="#chat"
          className="inline-flex items-center gap-1 font-medium text-[#111827] hover:text-primary"
        >
          try it <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

function BrandMark({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  return (
    <div
      className={`${dim} flex items-center justify-center rounded-[8px] bg-[#111827] text-white`}
    >
      <Sparkles className="h-4 w-4" aria-hidden="true" />
    </div>
  );
}

function Nav() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { id: "top", label: "Home" },
    { id: "features", label: "Features" },
    { id: "how", label: "How It Works" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
    { id: "chat", label: "Chat" },
  ];
  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 md:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <BrandMark />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[15px] font-semibold tracking-tight text-[#111827]">
              SageSync
            </div>
            <div className="truncate text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">
              Campus Companion
            </div>
          </div>
        </a>
        <nav className="hidden items-center gap-6 text-[13px] font-medium lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`transition-colors ${
                active === l.id
                  ? "text-[#111827]"
                  : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden h-9 rounded-[10px] bg-primary px-3.5 text-[13px] font-medium text-primary-foreground hover:bg-primary/90 sm:inline-flex"
          >
            <a href="#chat">
              Launch SageSync <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-border text-[#111827] transition-colors hover:bg-[#F8FAFC] lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2 text-[14px] font-medium">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-[10px] px-3 py-3 transition-colors ${
                  active === l.id
                    ? "bg-[#F8FAFC] text-[#111827]"
                    : "text-[#374151] hover:bg-[#F8FAFC]"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#chat"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-[10px] bg-primary px-4 text-[14px] font-medium text-primary-foreground sm:hidden"
            >
              Launch SageSync <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#374151]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Official AI Campus Companion
            </div>
            <h1 className="mt-6 text-[36px] font-bold leading-[1.05] tracking-tight text-[#111827] sm:text-[44px] md:text-[56px]">
              The Fastest Way to
              <br className="hidden sm:block" /> Get Campus Help.
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#374151] md:mt-6 md:text-[18px]">
              One AI assistant for university FAQs, official contacts, hostel
              information, student services, complaint registration and
              complaint tracking.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-11 rounded-[10px] bg-primary px-5 text-[14px] font-medium text-primary-foreground hover:bg-primary/90"
              >
                <a href="#chat">
                  Launch SageSync <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-[10px] border-border bg-background px-5 text-[14px] font-medium text-[#111827] hover:bg-[#F8FAFC]"
              >
                <a href="#chat">See Live Demo</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#374151]">
              {[
                "Official University Information",
                "AI Powered",
                "Complaint Tracking",
                "Available 24×7",
              ].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#22C55E]" aria-hidden="true" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — browser preview */}
          <div className="relative">
            <div className="overflow-hidden rounded-[12px] border border-border bg-card shadow-[0_1px_2px_rgba(17,24,39,0.04),0_12px_32px_-16px_rgba(17,24,39,0.12)] animate-float">
              <BrowserPreview />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 -bottom-6 h-10 rounded-full bg-[#111827]/10 blur-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BrowserPreview() {
  return (
    <div>
      <div className="flex items-center gap-2 border-b border-border bg-[#F8FAFC] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1 text-[11px] text-[#6B7280]">
          <ShieldCheck className="h-3 w-3 text-[#22C55E]" /> sagesync.app/chat
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-background px-5 py-6">
        <PreviewBubble role="user" text="What are the library timings?" />
        <PreviewBubble
          role="assistant"
          text="The **Central Library** is open **Monday–Saturday** from **8 AM to 8 PM**."
        />
        <PreviewBubble role="user" text="I want to register a hostel complaint." />
        <PreviewBubble
          role="assistant"
          text="Sure. Please provide your **Student Name** and **Student ID** to get started."
        />
        <div className="mt-2 flex items-center gap-2 rounded-[10px] border border-border bg-background px-3 py-2">
          <span className="flex-1 truncate text-[13px] text-[#6B7280]">
            Ask about fees, hostel, transport…
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Send className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mr-2 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#111827] text-white">
          <Sparkles className="h-3 w-3" />
        </div>
      )}
      <div
        className={`max-w-[82%] rounded-[10px] px-3.5 py-2 text-[13px] leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-[#F8FAFC] text-[#111827]"
        }`}
      >
        <div className="prose prose-sm max-w-none prose-p:my-0 prose-strong:font-semibold prose-strong:text-inherit">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function TrustSection() {
  const items = [
    { icon: BadgeCheck, label: "Official University Information" },
    { icon: Bot, label: "AI Powered Assistance" },
    { icon: ClipboardList, label: "Complaint Registration" },
    { icon: Activity, label: "Complaint Tracking" },
    { icon: LifeBuoy, label: "24×7 Student Support" },
  ];
  return (
    <section className="border-b border-border bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-10 md:gap-y-4">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-[13px] font-medium text-[#374151]"
            >
              <Icon className="h-4 w-4 text-[#6B7280]" aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="max-w-2xl reveal">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Features
          </div>
          <h2 className="mt-3 text-[28px] font-bold tracking-tight text-[#111827] sm:text-[32px] md:text-[36px]">
            Everything a SAGE student needs, in one place.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#374151] md:text-[16px]">
            From official contacts to complaint tracking — SageSync gives you
            direct, verified answers without the runaround.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-6">
          <FeatureCard
            className="md:col-span-4"
            icon={Brain}
            title="AI Campus Assistant"
            desc="Conversational answers about fees, timings, ERP, transport and more — trained on SAGE University's official information."
            visual={
              <div className="mt-6 grid gap-2">
                <div className="rounded-[10px] border border-border bg-[#F8FAFC] px-3 py-2 text-[12.5px] text-[#374151]">
                  "When does the library close on Saturdays?"
                </div>
                <div className="rounded-[10px] border border-border bg-background px-3 py-2 text-[12.5px] text-[#111827]">
                  The Central Library closes at <b>8:00 PM</b> on Saturdays.
                </div>
              </div>
            }
          />
          <FeatureCard
            className="md:col-span-2"
            icon={MessageCircleQuestion}
            title="University FAQs"
            desc="Instant answers to the most common student questions."
          />
          <FeatureCard
            className="md:col-span-2"
            icon={Phone}
            title="Official Contacts"
            desc="Verified phone numbers and emails for every desk."
          />
          <FeatureCard
            className="md:col-span-2"
            icon={Building2}
            title="Department Contacts"
            desc="Reach the right department without asking around."
          />
          <FeatureCard
            className="md:col-span-2"
            icon={ClipboardList}
            title="Complaint Registration"
            desc="File hostel, mess or infra issues in seconds."
          />
          <FeatureCard
            className="md:col-span-2"
            icon={ClipboardCheck}
            title="Complaint Tracking"
            desc="Track status with your unique complaint ID."
          />
          <FeatureCard
            className="md:col-span-2"
            icon={Users}
            title="Student Services"
            desc="Scholarships, ERP help, transport and more."
          />
          <FeatureCard
            className="md:col-span-2"
            icon={Zap}
            title="Instant Support"
            desc="Available 24×7 with sub-second responses."
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
      className={`reveal group relative flex flex-col rounded-[12px] border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#111827]/15 hover:shadow-[0_2px_4px_rgba(17,24,39,0.04),0_8px_20px_-12px_rgba(17,24,39,0.12)] ${className}`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-border bg-[#F8FAFC] text-[#111827]">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-[#111827]">
        {title}
      </h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-[#374151]">{desc}</p>
      {visual}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: MessageCircleQuestion,
      title: "Ask your question",
      desc: "Type anything about campus life in plain language.",
    },
    {
      icon: FileSearch,
      title: "AI searches the official database",
      desc: "SageSync scans verified SAGE University information.",
    },
    {
      icon: BadgeCheck,
      title: "Receive verified information",
      desc: "Get accurate answers with the sources you can trust.",
    },
    {
      icon: LifeBuoy,
      title: "Need support?",
      desc: "Escalate directly from the chat when you need more help.",
    },
    {
      icon: ClipboardList,
      title: "Register your complaint",
      desc: "File hostel, mess or infrastructure issues in one flow.",
    },
    {
      icon: Activity,
      title: "Track complaint status",
      desc: "Follow real-time updates using your complaint ID.",
    },
  ];
  return (
    <section id="how" className="border-b border-border bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="max-w-2xl reveal">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            How It Works
          </div>
          <h2 className="mt-3 text-[28px] font-bold tracking-tight text-[#111827] sm:text-[32px] md:text-[36px]">
            A clear path, from question to resolution.
          </h2>
        </div>

        <div className="relative mt-12 md:mt-16">
          <div
            aria-hidden
            className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-border md:left-1/2 md:-translate-x-1/2"
          />
          <ol className="space-y-6 md:space-y-8">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={`reveal relative grid grid-cols-[48px_minmax(0,1fr)] items-start gap-4 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className={i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}>
                  <div
                    className={`inline-flex flex-col rounded-[12px] border border-border bg-background p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(17,24,39,0.04),0_8px_20px_-12px_rgba(17,24,39,0.12)] ${
                      i % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6B7280]">
                      Step {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-1.5 text-[18px] font-semibold tracking-tight text-[#111827] md:text-[20px]">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-[#374151]">
                      {s.desc}
                    </p>
                  </div>
                </div>
                <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-[#111827] md:left-1/2 md:-translate-x-1/2">
                  <s.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Is SageSync official?",
      a: "SageSync is a student-built AI companion that references official SAGE University Indore information. Always verify time-sensitive items with the administration.",
    },
    {
      q: "Do I need to sign up?",
      a: "No. You can start asking questions or file a complaint right away, without creating an account.",
    },
    {
      q: "How do I track a complaint?",
      a: "Every complaint gets a unique ID (e.g. SG-4210). Ask SageSync 'track complaint SG-4210' to see the latest status.",
    },
    {
      q: "Can I ask in Hindi?",
      a: "Yes. SageSync understands English, Hindi and common Hinglish phrasings used on campus.",
    },
    {
      q: "Is my conversation private?",
      a: "Conversations are used only to answer your query. We do not tie them to your student identity.",
    },
  ];
  return (
    <section id="faq" className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className="reveal">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              FAQ
            </div>
            <h2 className="mt-3 text-[28px] font-bold tracking-tight text-[#111827] sm:text-[32px] md:text-[36px]">
              Frequently asked questions.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#374151] md:text-[16px]">
              Everything you need to know before you start chatting.
            </p>
          </div>
          <div className="reveal divide-y divide-border rounded-[12px] border border-border bg-card">
            {items.map((it, i) => (
              <FAQItem key={it.q} q={it.q} a={it.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F8FAFC]"
      >
        <span className="text-[15px] font-semibold text-[#111827]">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#6B7280] transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-[14px] leading-relaxed text-[#374151]">
          {a}
        </div>
      )}
    </div>
  );
}

function Contact() {
  const items = [
    {
      icon: Mail,
      title: "Email",
      value: "sagesync@sageuniversity.in",
      href: "mailto:sagesync@sageuniversity.in",
    },
    {
      icon: Phone,
      title: "Student helpline",
      value: "+91 731 000 0000",
      href: "tel:+917310000000",
    },
    {
      icon: MapPin,
      title: "Campus",
      value: "SAGE University, Kailod Kartal, Indore",
      href: "#",
    },
    {
      icon: BellRing,
      title: "Status updates",
      value: "All systems operational",
      href: "#",
    },
  ];
  return (
    <section id="contact" className="border-b border-border bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <div className="max-w-2xl reveal">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Contact
          </div>
          <h2 className="mt-3 text-[28px] font-bold tracking-tight text-[#111827] sm:text-[32px] md:text-[36px]">
            Talk to a real person, when you need one.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#374151] md:text-[16px]">
            SageSync handles most questions instantly. For everything else, the
            SAGE University student desk is a click away.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <a
              key={it.title}
              href={it.href}
              className="reveal group flex flex-col rounded-[12px] border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-[#111827]/15 hover:shadow-[0_2px_4px_rgba(17,24,39,0.04),0_8px_20px_-12px_rgba(17,24,39,0.12)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-border bg-[#F8FAFC] text-[#111827]">
                <it.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <div className="mt-4 text-[12px] font-semibold uppercase tracking-wider text-[#6B7280]">
                {it.title}
              </div>
              <div className="mt-1 text-[14px] font-medium text-[#111827]">
                {it.value}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatSection() {
  return (
    <section id="chat" className="border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-20 md:px-6 md:py-24">
        <div className="max-w-2xl reveal">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Live demo
          </div>
          <h2 className="mt-3 text-[28px] font-bold tracking-tight text-[#111827] sm:text-[32px] md:text-[36px]">
            Talk to SageSync.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#374151] md:text-[16px]">
            Ask anything about SAGE University Indore, or describe an issue to
            raise a complaint.
          </p>
        </div>
        <div className="mt-8 reveal md:mt-10">
          <ChatWindow />
        </div>
      </div>
    </section>
  );
}

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: number;
};

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
      {
        id: crypto.randomUUID(),
        role: "user" as const,
        text: value,
        ts: Date.now(),
      },
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
          ts: Date.now(),
        },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-[16px] border border-border bg-card shadow-[0_1px_2px_rgba(17,24,39,0.04),0_12px_32px_-16px_rgba(17,24,39,0.12)]">
      <div className="flex items-center justify-between border-b border-border bg-[#F8FAFC] px-4 py-3 md:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <BrandMark size="sm" />
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold text-[#111827]">
              SageSync
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" /> Online
            </div>
          </div>
        </div>
        <div className="text-[11px] font-medium text-[#6B7280]">Powered by AI</div>
      </div>

      <div
        ref={scrollRef}
        className="flex h-[60dvh] max-h-[640px] min-h-[420px] flex-col gap-4 overflow-y-auto bg-background px-3 py-6 sm:px-4 md:px-8"
        aria-live="polite"
      >
        {messages.length === 0 && <EmptyState onPick={submit} />}
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} onQuick={submit} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-[10px] border border-[#EF4444]/30 bg-[#EF4444]/5 p-3 text-sm text-[#EF4444]"
          >
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-border bg-[#F8FAFC] px-3 py-3 md:px-6">
          {QUICK_CHIPS.map((s) => (
            <button
              key={s.label}
              onClick={() => submit(s.label)}
              disabled={isLoading}
              className="inline-flex min-h-[32px] items-center gap-1.5 rounded-[10px] border border-border bg-background px-2.5 py-1 text-[12px] font-medium text-[#374151] transition-colors hover:border-[#111827]/20 hover:text-[#111827] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50"
            >
              <s.icon className="h-3 w-3" aria-hidden="true" />
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
        className="flex items-end gap-2 border-t border-border bg-card px-3 py-3 md:px-6"
      >
        <label htmlFor="sagesync-input" className="sr-only">
          Message SageSync
        </label>
        <textarea
          id="sagesync-input"
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
          placeholder="Ask about library, hostel, fees or register a complaint..."
          className="max-h-40 min-h-[44px] flex-1 resize-none rounded-[10px] border border-input bg-background px-3.5 py-3 text-[14px] text-[#111827] outline-none transition-shadow placeholder:text-[#6B7280] focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="h-11 w-11 shrink-0 rounded-[10px] bg-primary transition-transform hover:bg-primary/90 active:scale-95 disabled:opacity-40"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </Button>
      </form>
      <div className="border-t border-border bg-[#F8FAFC] px-4 py-2 text-center text-[11px] text-[#6B7280]">
        Press <kbd className="rounded border border-border bg-background px-1 font-mono text-[10px]">Enter</kbd> to send · <kbd className="rounded border border-border bg-background px-1 font-mono text-[10px]">Shift</kbd> + <kbd className="rounded border border-border bg-background px-1 font-mono text-[10px]">Enter</kbd> for new line
      </div>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-1 flex-col items-center py-6 text-center animate-fade-in-up">
      <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#111827] text-white">
        <Sparkles className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-[22px] font-bold tracking-tight text-[#111827]">
        👋 Welcome to SageSync
      </h3>
      <p className="mt-1.5 max-w-md text-[14px] text-[#374151]">
        Ask me anything about SAGE University Indore.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        {WELCOME_TOPICS.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-[#F8FAFC] px-2.5 py-1 text-[12px] font-medium text-[#374151]"
          >
            <Icon className="h-3 w-3 text-[#6B7280]" aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>

      <div className="mt-8 grid w-full max-w-3xl gap-5 text-left sm:grid-cols-3">
        {SUGGESTION_GROUPS.map((group) => (
          <div key={group.title}>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
              {group.title}
            </div>
            <div className="flex flex-col gap-1.5">
              {group.items.map((s) => (
                <button
                  key={s.label}
                  onClick={() => onPick(s.label)}
                  className="group flex min-h-[40px] items-center gap-2 rounded-[10px] border border-border bg-background px-3 py-2 text-left text-[13px] font-medium text-[#374151] transition-all hover:-translate-y-0.5 hover:border-[#111827]/20 hover:text-[#111827] hover:shadow-[0_2px_4px_rgba(17,24,39,0.04),0_6px_16px_-10px_rgba(17,24,39,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <s.icon
                    className="h-3.5 w-3.5 shrink-0 text-[#6B7280] transition-transform group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="truncate">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Detect complaint success / status payloads in the AI's markdown/text reply. */
function useComplaintCard(text: string) {
  return useMemo(() => {
    const idMatch = text.match(/\b(SG-\d{3,6})\b/i);
    if (!idMatch) return null;
    const complaintId = idMatch[1].toUpperCase();
    const lower = text.toLowerCase();
    const isStatus =
      /status|pending|resolved|rejected|in\s*progress|last updated|remark/i.test(text);
    const isSuccess =
      /registered|filed|created|logged|submitted|received/i.test(lower) &&
      !isStatus;

    const category =
      text.match(/category[:*\s]+\**([A-Za-z0-9 \/&-]+?)(?:\*\*|·|\n|$)/i)?.[1]?.trim() ??
      undefined;
    const block =
      text.match(/block[:*\s]+\**([A-Za-z0-9 -]+?)(?:\*\*|·|\n|$)/i)?.[1]?.trim() ??
      undefined;
    const statusRaw =
      text.match(/status[:*\s]+\**(pending|resolved|rejected|in\s*progress)/i)?.[1] ??
      (isSuccess ? "Pending" : undefined);
    const remark =
      text.match(/remark[:*\s]+\**([^\n*]+)/i)?.[1]?.trim() ?? undefined;
    const eta =
      text.match(/(?:eta|estimated[^:]*)[:*\s]+\**([^\n*]+)/i)?.[1]?.trim() ??
      (isSuccess ? "Within 24 hours" : undefined);

    return {
      variant: isStatus ? ("status" as const) : ("success" as const),
      complaintId,
      category,
      block,
      status: (statusRaw ?? "Pending").replace(/\s+/g, " "),
      remark,
      eta,
    };
  }, [text]);
}

function statusStyles(status: string) {
  const s = status.toLowerCase();
  if (s.includes("resolved"))
    return { bg: "bg-[#22C55E]/10", text: "text-[#15803D]", dot: "bg-[#22C55E]" };
  if (s.includes("rejected"))
    return { bg: "bg-[#EF4444]/10", text: "text-[#B91C1C]", dot: "bg-[#EF4444]" };
  return { bg: "bg-[#F59E0B]/10", text: "text-[#B45309]", dot: "bg-[#F59E0B]" };
}

function ComplaintCard({
  data,
  onTrack,
}: {
  data: NonNullable<ReturnType<typeof useComplaintCard>>;
  onTrack: (text: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const s = statusStyles(data.status);
  const isSuccess = data.variant === "success";

  async function copyId() {
    try {
      await navigator.clipboard.writeText(data.complaintId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  }

  return (
    <div className="mt-2 overflow-hidden rounded-[12px] border border-border bg-background">
      <div
        className={`flex items-center gap-2 border-b border-border px-4 py-2.5 ${
          isSuccess ? "bg-[#22C55E]/5" : "bg-[#F8FAFC]"
        }`}
      >
        {isSuccess ? (
          <BadgeCheck className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
        ) : (
          <ClipboardCheck className="h-4 w-4 text-[#111827]" aria-hidden="true" />
        )}
        <div className="text-[13px] font-semibold text-[#111827]">
          {isSuccess ? "Complaint Registered Successfully" : "Complaint Status"}
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-4 text-[13px]">
        <div className="col-span-2 sm:col-span-1">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Complaint ID
          </dt>
          <dd className="mt-0.5 font-mono text-[14px] font-semibold text-[#111827]">
            {data.complaintId}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Status
          </dt>
          <dd className="mt-0.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-semibold ${s.bg} ${s.text}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
              {data.status}
            </span>
          </dd>
        </div>
        {data.category && (
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Category
            </dt>
            <dd className="mt-0.5 text-[#111827]">{data.category}</dd>
          </div>
        )}
        {data.block && (
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Block
            </dt>
            <dd className="mt-0.5 text-[#111827]">{data.block}</dd>
          </div>
        )}
        {data.eta && (
          <div className="col-span-2">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              {isSuccess ? "Estimated Resolution" : "Last Updated"}
            </dt>
            <dd className="mt-0.5 text-[#111827]">{data.eta}</dd>
          </div>
        )}
        {data.remark && (
          <div className="col-span-2">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Admin remark
            </dt>
            <dd className="mt-0.5 text-[#374151]">{data.remark}</dd>
          </div>
        )}
      </dl>
      <div className="flex flex-wrap gap-2 border-t border-border bg-[#F8FAFC] px-4 py-3">
        <button
          onClick={copyId}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-[10px] border border-border bg-background px-3 py-1.5 text-[12px] font-medium text-[#111827] transition-colors hover:bg-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#22C55E]" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy Complaint ID
            </>
          )}
        </button>
        <button
          onClick={() => onTrack(`Track complaint ${data.complaintId}`)}
          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-[10px] bg-primary px-3 py-1.5 text-[12px] font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Search className="h-3.5 w-3.5" /> Track Complaint
        </button>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const complaint = useComplaintCard(isUser ? "" : message.text);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  }

  return (
    <div
      className={`flex gap-2.5 animate-fade-in-up sm:gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-[#111827] text-white"
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
      </div>
      <div className={`flex min-w-0 max-w-[85%] flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={
            isUser
              ? "rounded-[12px] bg-primary px-3.5 py-2.5 text-[14px] leading-relaxed text-primary-foreground"
              : "rounded-[12px] border border-border bg-[#F8FAFC] px-3.5 py-2.5 text-[14px] leading-relaxed text-[#111827]"
          }
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.text}</p>
          ) : (
            <div className="prose prose-sm max-w-none break-words prose-p:my-1.5 prose-ul:my-1.5 prose-strong:text-[#111827] prose-a:text-primary">
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          )}
        </div>
        {!isUser && complaint && <ComplaintCard data={complaint} onTrack={(t) => window.dispatchEvent(new CustomEvent("sagesync-quick", { detail: t }))} />}
        <div
          className={`mt-1 flex items-center gap-2 text-[11px] text-[#6B7280] ${
            isUser ? "flex-row-reverse" : ""
          }`}
        >
          <span>{formatTime(message.ts)}</span>
          {!isUser && (
            <button
              onClick={copyText}
              aria-label="Copy response"
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-[#6B7280] transition-colors hover:bg-[#F8FAFC] hover:text-[#111827] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-[#22C55E]" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 animate-fade-in-up" aria-label="SageSync is typing">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#111827] text-white">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="rounded-[12px] border border-border bg-[#F8FAFC] px-3.5 py-3">
        <div className="flex items-center gap-1.5">
          <span
            className="typing-dot h-1.5 w-1.5 rounded-full bg-[#6B7280]"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="typing-dot h-1.5 w-1.5 rounded-full bg-[#6B7280]"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="typing-dot h-1.5 w-1.5 rounded-full bg-[#6B7280]"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const quickLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how" },
    { label: "FAQ", href: "#faq" },
    { label: "Chat", href: "#chat" },
    { label: "Privacy", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "GitHub", href: "#" },
  ];
  const techStack = [
    "React",
    "Tailwind CSS",
    "n8n",
    "OpenAI",
    "Google Sheets",
  ];
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <BrandMark />
              <div className="leading-tight">
                <div className="text-[15px] font-semibold tracking-tight text-[#111827]">
                  SageSync
                </div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">
                  Official AI Campus Companion
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-[#374151]">
              Helping students access university services quickly.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Github, label: "GitHub" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-border text-[#6B7280] transition-colors hover:border-[#111827]/20 hover:text-[#111827]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#111827]">
              Quick Links
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 text-[14px] md:grid-cols-1">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[#6B7280] transition-colors hover:text-[#111827]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#111827]">
              Technology Stack
            </div>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {techStack.map((t) => (
                <li key={t} className="flex items-center gap-2 text-[#374151]">
                  <span className="h-1 w-1 rounded-full bg-[#6B7280]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#111827]">
              Get in touch
            </div>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li className="flex items-center gap-2 text-[#374151]">
                <Mail className="h-3.5 w-3.5 text-[#6B7280]" aria-hidden="true" />
                sagesync@sageuniversity.in
              </li>
              <li className="flex items-center gap-2 text-[#374151]">
                <MapPin className="h-3.5 w-3.5 text-[#6B7280]" aria-hidden="true" />
                Indore, MP, India
              </li>
              <li className="flex items-center gap-2 text-[#374151]">
                <ClipboardX className="h-3.5 w-3.5 text-[#6B7280]" aria-hidden="true" />
                Report an issue
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-[12px] text-[#6B7280] md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} SageSync. Built for SAGE University Indore students.</div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
            All systems normal
          </div>
        </div>
      </div>
    </footer>
  );
}
