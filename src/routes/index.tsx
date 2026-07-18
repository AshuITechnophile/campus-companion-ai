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
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const SUGGESTIONS = [
  { icon: BookOpen, label: "Library timings" },
  { icon: HomeIcon, label: "Hostel fees" },
  { icon: Bus, label: "Transport routes" },
  { icon: LifeBuoy, label: "ERP help" },
  { icon: ClipboardList, label: "Raise a complaint" },
  { icon: Search, label: "Track a complaint" },
  { icon: Phone, label: "Contact admin" },
  { icon: CalendarDays, label: "Exam schedule" },
];

const SECTIONS = ["top", "features", "how", "faq", "contact", "chat"] as const;

function LandingPage() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <AnnouncementBar />
      <Nav />
      <Hero />
      <TrustSection />
      <Features />
      <HowItWorks />
      <FAQ />
      <Contact />
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
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-6 py-2 text-xs">
        <span className="inline-flex h-[18px] items-center rounded-full border border-border bg-background px-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#111827]">
          New
        </span>
        <span className="text-[#6B7280]">
          Official AI Campus Companion — now with complaint tracking
        </span>
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
      <Sparkles className="h-4 w-4" />
    </div>
  );
}

function Nav() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <BrandMark />
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight text-[#111827]">
              SageSync
            </div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280]">
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
          <a
            href="#contact"
            className="hidden text-[13px] font-medium text-[#6B7280] hover:text-[#111827] sm:inline-flex"
          >
            Contact
          </a>
          <Button
            asChild
            size="sm"
            className="h-9 rounded-[10px] bg-primary px-3.5 text-[13px] font-medium text-primary-foreground hover:bg-primary/90"
          >
            <a href="#chat">
              Launch SageSync <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#374151]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Official AI Campus Companion
            </div>
            <h1 className="mt-6 text-[40px] font-bold leading-[1.05] tracking-tight text-[#111827] md:text-[56px]">
              The Fastest Way to
              <br />
              Get Campus Help.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#374151] md:text-[18px]">
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
                  <Check className="h-4 w-4 text-[#22C55E]" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — browser preview */}
          <div className="relative">
            <div className="overflow-hidden rounded-[12px] border border-border bg-card shadow-[0_1px_2px_rgba(17,24,39,0.04),0_12px_32px_-16px_rgba(17,24,39,0.12)]">
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
      {/* browser chrome */}
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
      {/* chat body */}
      <div className="flex flex-col gap-4 bg-background px-5 py-6">
        <PreviewBubble
          role="user"
          text="What are the library timings?"
        />
        <PreviewBubble
          role="assistant"
          text="The **Central Library** is open **Monday–Saturday** from **8 AM to 8 PM**."
        />
        <PreviewBubble
          role="user"
          text="I want to register a hostel complaint."
        />
        <PreviewBubble
          role="assistant"
          text="Sure. Please provide your **Student Name** and **Student ID** to get started."
        />
        {/* input row */}
        <div className="mt-2 flex items-center gap-2 rounded-[10px] border border-border bg-background px-3 py-2">
          <span className="flex-1 text-[13px] text-[#6B7280]">
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
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-[13px] font-medium text-[#374151]"
            >
              <Icon className="h-4 w-4 text-[#6B7280]" />
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
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl reveal">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Features
          </div>
          <h2 className="mt-3 text-[32px] font-bold tracking-tight text-[#111827] md:text-[36px]">
            Everything a SAGE student needs, in one place.
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-[#374151]">
            From official contacts to complaint tracking — SageSync gives you
            direct, verified answers without the runaround.
          </p>
        </div>

        {/* Asymmetric grid: 6-col x 3-row */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
          {/* Row 1: 4 + 2 */}
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
          {/* Row 2: 2 + 2 + 2 */}
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
          {/* Row 3: 2 + 4 */}
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
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-[#111827]">
        {title}
      </h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-[#374151]">
        {desc}
      </p>
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
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl reveal">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            How It Works
          </div>
          <h2 className="mt-3 text-[32px] font-bold tracking-tight text-[#111827] md:text-[36px]">
            A clear path, from question to resolution.
          </h2>
        </div>

        <div className="relative mt-16">
          {/* vertical line */}
          <div
            aria-hidden
            className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-border md:left-1/2 md:-translate-x-1/2"
          />
          <ol className="space-y-8">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className={`reveal relative grid grid-cols-[40px_1fr] items-start gap-4 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* left/right content */}
                <div
                  className={`md:${i % 2 === 0 ? "text-right md:pr-12" : "md:pl-12"}`}
                >
                  <div
                    className={`inline-flex flex-col rounded-[12px] border border-border bg-background p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(17,24,39,0.04),0_8px_20px_-12px_rgba(17,24,39,0.12)] md:${
                      i % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6B7280]">
                      Step {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-1.5 text-[20px] font-semibold tracking-tight text-[#111827]">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-[#374151]">
                      {s.desc}
                    </p>
                  </div>
                </div>
                {/* node */}
                <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-[#111827] md:left-1/2 md:-translate-x-1/2">
                  <s.icon className="h-[18px] w-[18px]" />
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
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.5fr]">
          <div className="reveal">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              FAQ
            </div>
            <h2 className="mt-3 text-[32px] font-bold tracking-tight text-[#111827] md:text-[36px]">
              Frequently asked questions.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[#374151]">
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
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-[15px] font-semibold text-[#111827]">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#6B7280] transition-transform ${
            open ? "rotate-180" : ""
          }`}
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
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl reveal">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Contact
          </div>
          <h2 className="mt-3 text-[32px] font-bold tracking-tight text-[#111827] md:text-[36px]">
            Talk to a real person, when you need one.
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-[#374151]">
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
                <it.icon className="h-[18px] w-[18px]" />
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
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="max-w-2xl reveal">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Live demo
          </div>
          <h2 className="mt-3 text-[32px] font-bold tracking-tight text-[#111827] md:text-[36px]">
            Talk to SageSync.
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-[#374151]">
            Ask anything about SAGE University Indore, or describe an issue to
            raise a complaint.
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
    <div className="overflow-hidden rounded-[16px] border border-border bg-card shadow-[0_1px_2px_rgba(17,24,39,0.04),0_12px_32px_-16px_rgba(17,24,39,0.12)]">
      <div className="flex items-center justify-between border-b border-border bg-[#F8FAFC] px-5 py-3">
        <div className="flex items-center gap-2.5">
          <BrandMark size="sm" />
          <div>
            <div className="text-[13px] font-semibold text-[#111827]">
              SageSync
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" /> Online
            </div>
          </div>
        </div>
        <div className="text-[11px] font-medium text-[#6B7280]">
          Powered by AI
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex h-[520px] flex-col gap-4 overflow-y-auto bg-background px-4 py-6 md:px-8"
      >
        {messages.length === 0 && <EmptyState onPick={submit} />}
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} text={m.text} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <div className="flex items-start gap-2 rounded-[10px] border border-[#EF4444]/30 bg-[#EF4444]/5 p-3 text-sm text-[#EF4444]">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-border bg-[#F8FAFC] px-4 py-3 md:px-6">
          {SUGGESTIONS.slice(0, 4).map((s) => (
            <button
              key={s.label}
              onClick={() => submit(s.label)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-border bg-background px-2.5 py-1 text-[12px] font-medium text-[#374151] transition-colors hover:border-[#111827]/20 hover:text-[#111827] disabled:opacity-50"
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
          className="max-h-40 min-h-[40px] flex-1 resize-none rounded-[10px] border border-input bg-background px-3 py-2.5 text-sm outline-none transition-shadow focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="h-10 w-10 shrink-0 rounded-[10px] bg-primary hover:bg-primary/90"
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
      <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#111827] text-white">
        <Sparkles className="h-4 w-4" />
      </div>
      <h3 className="mt-4 text-[20px] font-semibold tracking-tight text-[#111827]">
        How can I help you today?
      </h3>
      <p className="mt-1.5 max-w-md text-[14px] text-[#374151]">
        Ask about SAGE University life, timings, contacts, or describe an issue
        to raise a complaint.
      </p>
      <p className="mt-6 text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
        Try one of these
      </p>
      <div className="mt-3 grid w-full max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onPick(s.label)}
            className="group flex items-center gap-2 rounded-[10px] border border-border bg-background px-3 py-2 text-left text-[12.5px] font-medium text-[#374151] transition-all hover:-translate-y-0.5 hover:border-[#111827]/20 hover:text-[#111827] hover:shadow-[0_2px_4px_rgba(17,24,39,0.04),0_6px_16px_-10px_rgba(17,24,39,0.15)]"
          >
            <s.icon className="h-3.5 w-3.5 text-[#6B7280] transition-transform group-hover:scale-110" />
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
        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#111827] text-white">
          <Sparkles className="h-3 w-3" />
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? "order-1" : ""}`}>
        <div
          className={
            isUser
              ? "rounded-[10px] bg-primary px-3.5 py-2 text-[14px] text-primary-foreground"
              : "rounded-[10px] border border-border bg-[#F8FAFC] px-3.5 py-2 text-[14px] text-[#111827]"
          }
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{text}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-strong:text-[#111827]">
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
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#111827] text-white">
        <Sparkles className="h-3 w-3" />
      </div>
      <div className="rounded-[10px] border border-border bg-[#F8FAFC] px-3.5 py-2.5">
        <div className="flex items-center gap-1">
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
  const cols = [
    {
      title: "Product",
      links: ["Features", "How It Works", "Chat", "Changelog"],
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
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
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
              Helping SAGE University students instantly access official campus
              information, department contacts, student services and complaint
              management.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-border text-[#6B7280] transition-colors hover:border-[#111827]/20 hover:text-[#111827]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-[#111827]">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[#6B7280] transition-colors hover:text-[#111827]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
