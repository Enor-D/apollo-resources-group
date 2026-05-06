"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Factory,
  Globe2,
  Lock,
  MapPin,
  Mountain,
  Pickaxe,
  Shield,
  TrendingUp,
  Unlock,
  Zap
} from "lucide-react";

type Lang = "en" | "ru";

const copy = {
  en: {
    nav: ["Group", "Mining", "Philosophy", "Investor"],
    heroKicker: "ASSET MANAGEMENT • COMMODITIES TRADING • BROWNFIELD INVESTMENTS • DEAL FINANCING",
    heroTitle: "Building Strategic Value Across Resources, Energy & Industrial Technologies",
    heroText:
      "Apollo Resources Group is a strategic asset management and resources holding operating across Central Asia, CIS and the Middle East.",
    explore: "Explore Group",
    investor: "Investor Access",
    overviewTitle: "A vertically integrated resource-backed platform",
    overviewText:
      "The Group combines commodities trading, mining assets, technical operations, additive manufacturing and deal financing into one industrial capital platform.",
    numbers: [
      ["3", "Core regions"],
      ["21", "Team members"],
      ["1.5M+", "Tons Cu reserves across key copper assets"],
      ["2024", "Mining & processing development start"]
    ],
    structureTitle: "Group Structure",
    structureText:
      "A multi-jurisdictional holding ecosystem built around trading, copper mining, industrial services and advanced manufacturing.",
    focusTitle: "Focus Areas",
    focusText:
      "Apollo Resources Group allocates capital and operating capability into resource-backed, industrial and strategic opportunities.",
    assetsTitle: "Mining Assets & Processing Units",
    assetsText:
      "Copper-focused brownfield mining and processing portfolio across Kazakhstan.",
    philosophyTitle: "Investment Philosophy",
    philosophyText:
      "We pursue resource-backed opportunities where capital, operating discipline and strategic partnerships can unlock long-term value.",
    investorTitle: "Private Investor Section",
    investorText:
      "Access portfolio updates, corporate materials, transaction teasers, reports and confidential investor documents.",
    passwordPlaceholder: "Enter investor password",
    unlock: "Unlock",
    lockedNote:
      "Demo password: APOLLO2026. For production, connect Supabase, NextAuth or Vercel authentication.",
    contactTitle: "Global Presence",
    contactText:
      "Operating across Switzerland, UAE and Central Asia.",
    footer: "Strategic Capital • Resources • Industrial Technologies"
  },
  ru: {
    nav: ["Группа", "Mining", "Философия", "Инвесторам"],
    heroKicker: "УПРАВЛЕНИЕ АКТИВАМИ • ТОРГОВЛЯ СЫРЬЕМ • BROWNFIELD-ИНВЕСТИЦИИ • ФИНАНСИРОВАНИЕ СДЕЛОК",
    heroTitle: "Создаем стратегическую стоимость в ресурсах, энергетике и промышленных технологиях",
    heroText:
      "Apollo Resources Group — стратегический холдинг по управлению активами и ресурсами с операциями в Центральной Азии, СНГ и на Ближнем Востоке.",
    explore: "О группе",
    investor: "Доступ инвестора",
    overviewTitle: "Вертикально интегрированная платформа, обеспеченная ресурсными активами",
    overviewText:
      "Группа объединяет торговлю сырьевыми товарами, горнодобывающие активы, технические операции, аддитивное производство и финансирование сделок в единую промышленно-инвестиционную платформу.",
    numbers: [
      ["3", "Ключевых региона"],
      ["21", "Член команды"],
      ["1.5M+", "Тонн запасов Cu по ключевым медным активам"],
      ["2024", "Старт развития добычи и переработки"]
    ],
    structureTitle: "Структура группы",
    structureText:
      "Многоюрисдикционная экосистема холдинга вокруг трейдинга, медных активов, промышленных сервисов и передового производства.",
    focusTitle: "Направления",
    focusText:
      "Apollo Resources Group направляет капитал и операционные компетенции в ресурсные, промышленные и стратегические возможности.",
    assetsTitle: "Горнодобывающие активы и переработка",
    assetsText:
      "Медные brownfield-активы и перерабатывающая инфраструктура в Казахстане.",
    philosophyTitle: "Инвестиционная философия",
    philosophyText:
      "Мы фокусируемся на ресурсно обеспеченных возможностях, где капитал, операционная дисциплина и стратегические партнерства раскрывают долгосрочную стоимость.",
    investorTitle: "Закрытый раздел для инвесторов",
    investorText:
      "Доступ к обновлениям портфеля, корпоративным материалам, тизерам сделок, отчетам и конфиденциальным документам.",
    passwordPlaceholder: "Введите пароль инвестора",
    unlock: "Открыть",
    lockedNote:
      "Демо-пароль: APOLLO2026. Для production нужно подключить Supabase, NextAuth или Vercel authentication.",
    contactTitle: "Глобальное присутствие",
    contactText:
      "Операции в Швейцарии, ОАЭ и Центральной Азии.",
    footer: "Стратегический капитал • Ресурсы • Промышленные технологии"
  }
};

const subsidiaries = [
  {
    name: "Apollo Resources AG",
    place: "Switzerland",
    descEn: "Strategic holding and international corporate platform.",
    descRu: "Стратегическая холдинговая и международная корпоративная платформа."
  },
  {
    name: "Apollo Resources DMCC",
    place: "Dubai, UAE",
    descEn: "Commodity trading hub specialized in energy resources, base and minor metals.",
    descRu: "Торговый хаб в ОАЭ по энергетическим ресурсам, базовым и малым металлам."
  },
  {
    name: "Additech LLP",
    place: "Central Asia",
    descEn: "Additive manufacturing center in Central Asia.",
    descRu: "Центр аддитивного производства в Центральной Азии."
  },
  {
    name: "Drum Tech LLP",
    place: "Kazakhstan",
    descEn: "Technical services company managing company technical operations.",
    descRu: "Техническая сервисная компания, управляющая операционными процессами."
  },
  {
    name: "Sunkaruya LLP",
    place: "Karaganda region",
    descEn: "Prominent copper mine in Karaganda region.",
    descRu: "Медный рудник в Карагандинской области."
  },
  {
    name: "Apollo Resources Kazakhstan LLP",
    place: "Kazakhstan",
    descEn: "Local copper mines operator owning Don and Spasskoye mines.",
    descRu: "Оператор медных рудников в Казахстане, владеющий Don и Spasskoye."
  },
  {
    name: "Geodrill LLP",
    place: "Kazakhstan",
    descEn: "Drilling company operating in the Republic of Kazakhstan.",
    descRu: "Буровая компания, работающая в Республике Казахстан."
  },
  {
    name: "Argelum LLP",
    place: "Almaty, Kazakhstan",
    descEn: "Local office focused on commodities trading and private equity.",
    descRu: "Локальный офис с фокусом на торговлю сырьем и private equity."
  }
];

const focus = [
  ["Asset Management", "Strategic capital allocation, long-term portfolio management and resource-backed investment platforms.", Shield],
  ["Mining & Processing", "Copper-focused brownfield assets, heap leaching and processing infrastructure.", Mountain],
  ["Industrial Technologies", "Advanced manufacturing, technical services and modernization of industrial supply chains.", Factory],
  ["Commodities Trading", "Energy resources, base metals, minor metals and structured trade flows.", TrendingUp]
];

const focusRu = [
  ["Управление активами", "Стратегическое распределение капитала, долгосрочное управление портфелем и ресурсно обеспеченные инвестиционные платформы.", Shield],
  ["Добыча и переработка", "Медные brownfield-активы, кучное выщелачивание и переработка.", Mountain],
  ["Промышленные технологии", "Передовое производство, технические сервисы и модернизация промышленных цепочек.", Factory],
  ["Торговля сырьем", "Энергетические ресурсы, базовые и малые металлы, структурированные торговые потоки.", TrendingUp]
];

const assets = [
  {
    name: "Sunkaruya Copper Mine",
    location: "Karaganda region",
    stats: ["Copper", "Drilling operations ongoing", "Exploration stage"]
  },
  {
    name: "Spasskoye Copper Mine",
    location: "Akmola region",
    stats: ["Copper", "Exploration plan preparation", "Development stage"]
  },
  {
    name: "Don Copper Mine",
    location: "Karaganda region",
    stats: ["Copper", "Geophysical works starting", "Exploration stage"]
  },
  {
    name: "Karaganda Processing Site",
    location: "Karaganda city",
    stats: ["Copper processing", "Heap leaching pond", "20–60 tons/month concentrate"]
  }
];

const portfolioDocs = [
  "Corporate Introduction",
  "Portfolio Update",
  "Mining Asset Overview",
  "Transaction Teasers",
  "Quarterly Reports",
  "Confidential Data Room"
];

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-copper-500/30 bg-copper-500/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-copper-100">
      <span className="h-1.5 w-1.5 rounded-full bg-copper-300" />
      {children}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const t = copy[lang];
  const focusCards = lang === "en" ? focus : focusRu;

  const handleUnlock = () => {
    if (password.trim().toUpperCase() === "APOLLO2026") setUnlocked(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050608] text-[#f7f4ef]">
      <div className="fixed inset-0 noise opacity-70" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,111,54,.16),transparent_34%),linear-gradient(to_bottom,transparent,rgba(0,0,0,.78))]" />

      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-copper-500/40 bg-copper-500/10 text-lg font-bold text-copper-100">
              Λ
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em]">Apollo Resources</div>
              <div className="text-[10px] uppercase tracking-[0.34em] text-white/45">Group</div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-white/65 lg:flex">
            {t.nav.map((item, index) => (
              <a
                key={item}
                href={["#portfolio", "#assets", "#philosophy", "#investor"][index]}
                className="transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "ru" : "en")}
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-copper-300/50 hover:text-white"
            >
              {lang === "en" ? "RU" : "EN"}
            </button>
            <a
              href="#investor"
              className="hidden rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-copper-100 md:inline-flex"
            >
              {t.investor}
            </a>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center px-5 pt-28 md:px-8">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-copper-500/20" />
          <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[880px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-copper-500/20"
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.1fr_.9fr]">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-7 text-xs uppercase tracking-[0.32em] text-copper-100/80">{t.heroKicker}</div>
            <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
              {t.heroTitle.split(" ").slice(0, -3).join(" ")}{" "}
              <span className="copper-gradient">{t.heroTitle.split(" ").slice(-3).join(" ")}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65 md:text-xl">{t.heroText}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#group" className="inline-flex items-center justify-center gap-2 rounded-full bg-copper-500 px-6 py-4 text-sm font-bold text-white shadow-copper transition hover:bg-copper-700">
                {t.explore} <ArrowRight size={17} />
              </a>
              <a href="#investor" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-bold text-white/85 transition hover:border-white/35 hover:text-white">
                <Lock size={17} /> {t.investor}
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.15 }} className="glass relative min-h-[460px] overflow-hidden rounded-[2rem] p-6 shadow-copper">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(184,111,54,.24),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.08),transparent)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[.22em] text-white/55">
                  Resource Platform
                </div>
                <Globe2 className="text-copper-100" />
              </div>
              <div className="my-16">
                <div className="relative mx-auto h-72 w-72 rounded-full border border-white/15">
                  <div className="absolute left-[48%] top-[22%] h-3 w-3 rounded-full bg-copper-300 map-dot" />
                  <div className="absolute left-[34%] top-[42%] h-3 w-3 rounded-full bg-copper-300 map-dot" />
                  <div className="absolute left-[62%] top-[50%] h-3 w-3 rounded-full bg-copper-300 map-dot" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 rounded-full border border-dashed border-copper-300/30"
                  />
                  <div className="absolute inset-20 rounded-full bg-copper-500/10 blur-2xl" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {["Geneva", "Dubai", "Almaty"].map((city) => (
                  <div key={city} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <MapPin className="mx-auto mb-2 text-copper-100" size={18} />
                    <div className="text-sm font-semibold">{city}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="group">
        <Label>Group Overview</Label>
        <div className="grid gap-10 md:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.overviewTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-white/62">{t.overviewText}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.numbers.map(([num, label]) => (
              <div key={label} className="glass rounded-[1.5rem] p-6">
                <div className="text-4xl font-semibold text-copper-100">{num}</div>
                <div className="mt-3 text-sm leading-6 text-white/58">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="portfolio" className="pt-0">
        <Label>{t.structureTitle}</Label>
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.structureTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/62">{t.structureText}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {subsidiaries.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="group rounded-[1.5rem] border border-white/10 bg-white/[.035] p-5 transition hover:border-copper-300/40 hover:bg-copper-500/10"
            >
              <Building2 className="mb-8 text-copper-100" />
              <h3 className="text-lg font-semibold">{s.name}</h3>
              <div className="mt-1 text-xs uppercase tracking-[.18em] text-white/38">{s.place}</div>
              <p className="mt-4 text-sm leading-6 text-white/58">{lang === "en" ? s.descEn : s.descRu}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <Label>{t.focusTitle}</Label>
        <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.focusTitle}</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/62">{t.focusText}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {focusCards.map(([title, desc, Icon]) => (
            <div key={title as string} className="glass rounded-[2rem] p-7 transition hover:border-copper-300/40">
              <Icon className="mb-8 text-copper-100" size={32} />
              <h3 className="text-2xl font-semibold">{title as string}</h3>
              <p className="mt-4 leading-7 text-white/58">{desc as string}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="assets">
        <Label>{t.assetsTitle}</Label>
        <div className="grid gap-10 md:grid-cols-[.85fr_1.15fr]">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.assetsTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-white/62">{t.assetsText}</p>
            <div className="mt-8 rounded-[2rem] border border-copper-500/20 bg-copper-500/10 p-6">
              <Pickaxe className="mb-4 text-copper-100" />
              <div className="text-sm uppercase tracking-[.22em] text-copper-100">Copper Platform</div>
              <p className="mt-3 text-sm leading-7 text-white/62">
                Brownfield assets, processing infrastructure and trading capability create an integrated value chain.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {assets.map((asset) => (
              <div key={asset.name} className="rounded-[1.5rem] border border-white/10 bg-white/[.035] p-6">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <h3 className="text-2xl font-semibold">{asset.name}</h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-white/45">
                      <MapPin size={15} /> {asset.location}
                    </div>
                  </div>
                  <div className="rounded-full bg-copper-500/10 px-3 py-1 text-xs uppercase tracking-[.2em] text-copper-100">
                    Asset
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {asset.stats.map((stat) => (
                    <div key={stat} className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white/65">
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="philosophy">
        <div className="glass overflow-hidden rounded-[2.5rem] p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_.9fr] md:items-center">
            <div>
              <Label>{t.philosophyTitle}</Label>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.philosophyTitle}</h2>
              <p className="mt-6 text-lg leading-8 text-white/62">{t.philosophyText}</p>
            </div>
            <div className="grid gap-4">
              {[
                "Resource-backed value",
                "Operational involvement",
                "Strategic partnerships",
                "Central Asia growth corridor"
              ].map((x) => (
                <div key={x} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                  <Zap className="text-copper-100" />
                  <span className="text-white/75">{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="investor">
        <Label>{t.investorTitle}</Label>
        <div className="grid gap-8 md:grid-cols-[.95fr_1.05fr]">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.investorTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-white/62">{t.investorText}</p>
            <p className="mt-5 text-sm leading-6 text-white/38">{t.lockedNote}</p>
          </div>
          <div className="glass rounded-[2rem] p-6 md:p-8">
            {!unlocked ? (
              <div>
                <Lock className="mb-8 text-copper-100" size={36} />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  placeholder={t.passwordPlaceholder}
                  type="password"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/28 focus:border-copper-300/50"
                />
                <button
                  onClick={handleUnlock}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-bold text-black transition hover:bg-copper-100"
                >
                  <Unlock size={18} /> {t.unlock}
                </button>
              </div>
            ) : (
              <div>
                <Unlock className="mb-6 text-copper-100" size={36} />
                <h3 className="text-2xl font-semibold">Investor Data Room</h3>
                <div className="mt-6 grid gap-3">
                  {portfolioDocs.map((doc) => (
                    <div key={doc} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 p-4">
                      <span className="text-white/72">{doc}</span>
                      <span className="rounded-full bg-copper-500/10 px-3 py-1 text-xs text-copper-100">Private</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(184,111,54,.18),rgba(255,255,255,.04))] p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_.8fr] md:items-end">
            <div>
              <Label>{t.contactTitle}</Label>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.contactTitle}</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/62">{t.contactText}</p>
            </div>
            <div className="grid gap-3">
              {["Geneva, Switzerland", "Dubai, UAE", "Central Asia"].map((office) => (
                <div key={office} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <MapPin className="text-copper-100" size={18} />
                  <span>{office}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <footer className="relative border-t border-white/10 px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-white/45 md:flex-row md:items-center">
          <div>© 2026 Apollo Resources Group</div>
          <div>{t.footer}</div>
        </div>
      </footer>
    </main>
  );
}
