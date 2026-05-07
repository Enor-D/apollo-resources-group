"use client";

import { useState } from "react";
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
  Zap,
  BarChart3,
  FileText,
  Activity
} from "lucide-react";

type Lang = "en" | "ru";

const copy = {
  en: {
    nav: ["Group", "Mining", "Philosophy", "Investor"],
    heroKicker: "ASSET MANAGEMENT • COMMODITIES TRADING • BROWNFIELD INVESTMENTS • DEAL FINANCING",
    heroTitle: "Building Strategic Value Across Resources, Energy & Industrial Technologies",
    heroText:
      "Apollo Resources Group is a strategic asset management and resources holding operating across Switzerland, the UAE and Central Asia.",
    explore: "Explore Group",
    investor: "Investor Access",
    resourcePlatform: "Resource Platform",
    cities: ["Geneva", "Dubai", "Almaty"],
    overviewLabel: "Group Overview",
    overviewTitle: "A vertically integrated resource-backed platform",
    overviewText:
      "The Group combines commodities trading, mining assets, technical operations, additive manufacturing and deal financing into one industrial capital platform.",
    numbers: [
      ["3", "Core regions"],
      ["127", "Team members"],
      ["100+ mln", "AUM"],
      ["2013", "Year of Foundation"]
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
    copperPlatform: "Copper Platform",
    copperPlatformText:
      "Brownfield assets, processing infrastructure and trading capability create an integrated value chain.",
    assetLabel: "Asset",
    philosophyTitle: "Investment Philosophy",
    philosophyText:
      "We pursue resource-backed opportunities where capital, operating discipline and strategic partnerships can unlock long-term value.",
    philosophyItems: [
      "Resource-backed value",
      "Operational involvement",
      "Strategic partnerships",
      "Central Asia growth corridor"
    ],
    investorTitle: "Investor Access",
    investorText:
      "A multi-level investor environment with public market intelligence, private portfolio materials and restricted transaction data rooms.",
    tiers: [
      ["Demo Access", "Open real-time market dashboard"],
      ["Investor Access", "Private investor materials"],
      ["Partner Deal Room", "Restricted transaction room"]
    ],
    openDemo: "Open Demo",
    demoLabel: "Demo Access",
    marketDashboard: "Market Intelligence Dashboard",
    watchlist: "Watchlist",
    chartPreview: "Chart Preview",
    availableDemo: "Available in Demo",
    marketSubtitle: "Metals • Energy • Indices • Mega Caps",
    demoText:
      "Demo version connects to a real-time market data dashboard on a separate page.",
    demoModules: [
      "Metals watchlist",
      "Energy resources",
      "Major indices",
      "Mega-cap equities",
      "Market chart preview",
      "Public macro snapshot"
    ],
    passwordPlaceholder: "Enter investor password",
    unlock: "Unlock",
    lockedModules: [
      {
        title: "Investor Access",
        desc: "Portfolio updates, corporate presentations, asset materials and quarterly reporting.",
        level: "Private"
      },
      {
        title: "Partner Deal Room",
        desc: "Transaction teasers, financial models, due diligence materials and restricted deal documentation.",
        level: "Restricted"
      }
    ],
    contactTitle: "Global Presence",
    contactText:
      "Operating across Switzerland, UAE and Central Asia.",
    offices: ["Geneva, Switzerland", "Dubai, UAE", "Central Asia"],
    footer: "Strategic Capital • Resources • Industrial Technologies"
  },
  ru: {
    nav: ["Группа", "Mining", "Философия", "Инвесторам"],
    heroKicker: "УПРАВЛЕНИЕ АКТИВАМИ • ТОРГОВЛЯ СЫРЬЕМ • BROWNFIELD-ИНВЕСТИЦИИ • ФИНАНСИРОВАНИЕ СДЕЛОК",
    heroTitle: "Создаем стратегическую стоимость в ресурсах, энергетике и промышленных технологиях",
    heroText:
      "Apollo Resources Group — стратегический холдинг по управлению активами и ресурсами с операциями в Швейцарии, ОАЭ и Центральной Азии.",
    explore: "О группе",
    investor: "Доступ инвестора",
    resourcePlatform: "Ресурсная платформа",
    cities: ["Женева", "Дубай", "Алматы"],
    overviewLabel: "Обзор группы",
    overviewTitle: "Вертикально интегрированная платформа, обеспеченная ресурсными активами",
    overviewText:
      "Группа объединяет торговлю сырьевыми товарами, горнодобывающие активы, технические операции, аддитивное производство и финансирование сделок в единую промышленно-инвестиционную платформу.",
    numbers: [
      ["3", "Ключевых региона"],
      ["127", "Членов команды"],
      ["100+ млн", "AUM"],
      ["2013", "Год основания"]
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
    copperPlatform: "Медная платформа",
    copperPlatformText:
      "Brownfield-активы, перерабатывающая инфраструктура и торговые возможности формируют интегрированную цепочку стоимости.",
    assetLabel: "Актив",
    philosophyTitle: "Инвестиционная философия",
    philosophyText:
      "Мы фокусируемся на ресурсно обеспеченных возможностях, где капитал, операционная дисциплина и стратегические партнерства раскрывают долгосрочную стоимость.",
    philosophyItems: [
      "Стоимость, обеспеченная ресурсами",
      "Операционное участие",
      "Стратегические партнерства",
      "Коридор роста Центральной Азии"
    ],
    investorTitle: "Доступ для инвесторов",
    investorText:
      "Многоуровневая investor-зона с открытой рыночной аналитикой, закрытыми материалами по портфелю и приватными deal room-разделами.",
    tiers: [
      ["Demo Access", "Открытая панель real-time котировок"],
      ["Investor Access", "Закрытые материалы инвестора"],
      ["Partner Deal Room", "Закрытый deal room"]
    ],
    openDemo: "Открыть демо",
    demoLabel: "Demo Access",
    marketDashboard: "Панель рыночных котировок",
    watchlist: "Список котировок",
    chartPreview: "Превью графика",
    availableDemo: "Доступно в демо",
    marketSubtitle: "Металлы • Энергия • Индексы • Mega Cap",
    demoText:
      "Демо-версия ведет на отдельную страницу с real-time market data dashboard.",
    demoModules: [
      "Котировки металлов",
      "Энергетические ресурсы",
      "Основные индексы",
      "Акции mega-cap",
      "Превью рыночных графиков",
      "Макроэкономический обзор"
    ],
    passwordPlaceholder: "Введите пароль инвестора",
    unlock: "Открыть",
    lockedModules: [
      {
        title: "Доступ инвестора",
        desc: "Обновления портфеля, корпоративные презентации, материалы по активам и квартальная отчетность.",
        level: "Закрыто"
      },
      {
        title: "Партнерский Deal Room",
        desc: "Тизеры сделок, финансовые модели, due diligence-материалы и закрытая документация по сделкам.",
        level: "Ограничено"
      }
    ],
    contactTitle: "Глобальное присутствие",
    contactText:
      "Операции в Швейцарии, ОАЭ и Центральной Азии.",
    offices: ["Женева, Швейцария", "Дубай, ОАЭ", "Центральная Азия"],
    footer: "Стратегический капитал • Ресурсы • Промышленные технологии"
  }
};

const subsidiaries = [
  {
    name: "Apollo Resources AG",
    placeEn: "Switzerland",
    placeRu: "Швейцария",
    descEn: "Strategic holding and international corporate platform.",
    descRu: "Стратегическая холдинговая и международная корпоративная платформа."
  },
  {
    name: "Apollo Resources DMCC",
    placeEn: "Dubai, UAE",
    placeRu: "Дубай, ОАЭ",
    descEn: "Commodity trading hub specialized in energy resources, base and minor metals.",
    descRu: "Торговый хаб в ОАЭ по энергетическим ресурсам, базовым и малым металлам."
  },
  {
    name: "Argelum LLP",
    placeEn: "Almaty, Kazakhstan",
    placeRu: "Алматы, Казахстан",
    descEn: "Local office focused on commodities trading and private equity.",
    descRu: "Локальный офис с фокусом на торговлю сырьем и private equity."
  },
  {
    name: "Additech Tech LLP",
    placeEn: "Central Asia",
    placeRu: "Центральная Азия",
    descEn: "Advanced industrial and additive technologies platform in Central Asia.",
    descRu: "Платформа промышленных и аддитивных технологий в Центральной Азии."
  },
  {
    name: "Sunkaruya LLP",
    placeEn: "Karaganda region",
    placeRu: "Карагандинская область",
    descEn: "Prominent copper mining project in Karaganda region.",
    descRu: "Медный проект в Карагандинской области."
  },
  {
    name: "Apollo Resources Kazakhstan LLP",
    placeEn: "Kazakhstan",
    placeRu: "Казахстан",
    descEn: "Local copper mines operator managing strategic mining assets.",
    descRu: "Оператор медных активов и стратегических горнодобывающих проектов."
  },
  {
    name: "Geodrill LLP",
    placeEn: "Kazakhstan",
    placeRu: "Казахстан",
    descEn: "Drilling company operating in the Republic of Kazakhstan.",
    descRu: "Буровая компания, работающая в Республике Казахстан."
  },
  {
    name: "Drum Tech LLP",
    placeEn: "Kazakhstan",
    placeRu: "Казахстан",
    descEn: "Technical services company managing company technical operations.",
    descRu: "Техническая сервисная компания, управляющая операционными процессами."
  }
];

const focus = [
  {
    titleEn: "Asset Management",
    titleRu: "Управление активами",
    descEn: "Strategic capital allocation, long-term portfolio management and resource-backed investment platforms.",
    descRu: "Стратегическое распределение капитала, долгосрочное управление портфелем и ресурсно обеспеченные инвестиционные платформы.",
    icon: Shield
  },
  {
    titleEn: "Mining & Processing",
    titleRu: "Добыча и переработка",
    descEn: "Copper-focused brownfield assets, heap leaching and processing infrastructure.",
    descRu: "Медные brownfield-активы, кучное выщелачивание и переработка.",
    icon: Mountain
  },
  {
    titleEn: "Industrial Technologies",
    titleRu: "Промышленные технологии",
    descEn: "Advanced manufacturing, technical services and modernization of industrial supply chains.",
    descRu: "Передовое производство, технические сервисы и модернизация промышленных цепочек.",
    icon: Factory
  },
  {
    titleEn: "Commodities Trading",
    titleRu: "Торговля сырьем",
    descEn: "Energy resources, base metals, minor metals and structured trade flows.",
    descRu: "Энергетические ресурсы, базовые и малые металлы, структурированные торговые потоки.",
    icon: TrendingUp
  }
];

const assets = [
  {
    name: "Sunkaruya Copper Mine",
    locationEn: "Karaganda region",
    locationRu: "Карагандинская область",
    statsEn: ["Copper", "Drilling operations ongoing", "Exploration stage"],
    statsRu: ["Медь", "Идут буровые работы", "Стадия разведки"]
  },
  {
    name: "Spasskoye Copper Mine",
    locationEn: "Akmola region",
    locationRu: "Акмолинская область",
    statsEn: ["Copper", "Exploration plan preparation", "Development stage"],
    statsRu: ["Медь", "Составляется план разведки", "Стадия развития"]
  },
  {
    name: "Don Copper Mine",
    locationEn: "Karaganda region",
    locationRu: "Карагандинская область",
    statsEn: ["Copper", "Geophysical works starting", "Exploration stage"],
    statsRu: ["Медь", "Начинается геофизика", "Стадия разведки"]
  },
  {
    name: "Karaganda Processing Site",
    locationEn: "Karaganda city",
    locationRu: "г. Караганда",
    statsEn: ["Copper processing", "Heap leaching pond", "20–60 tons/month concentrate"],
    statsRu: ["Переработка меди", "Пруд кучного выщелачивания", "20–60 тонн/месяц концентрата"]
  }
];

const marketPreview = [
  { name: "Copper", ticker: "COMEX: HG", price: "$4.62", change: "+1.24%", group: "Metals" },
  { name: "Gold", ticker: "XAU/USD", price: "$2,392", change: "+0.41%", group: "Metals" },
  { name: "Silver", ticker: "XAG/USD", price: "$31.14", change: "-0.22%", group: "Metals" },
  { name: "Platinum", ticker: "XPT/USD", price: "$1,037", change: "+0.19%", group: "Metals" },
  { name: "Aluminum", ticker: "LME: ALI", price: "$2,545", change: "+0.63%", group: "Metals" },
  { name: "Nickel", ticker: "LME: NICKEL", price: "$19,260", change: "-0.38%", group: "Metals" },
  { name: "Brent Oil", ticker: "UKOIL", price: "$82.50", change: "+0.77%", group: "Energy" }
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
  const t = copy[lang];

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
                href={["#group-structure", "#assets", "#philosophy", "#investor"][index]}
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
              <a href="#group-structure" className="inline-flex items-center justify-center gap-2 rounded-full bg-copper-500 px-6 py-4 text-sm font-bold text-white shadow-copper transition hover:bg-copper-700">
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
                  {t.resourcePlatform}
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
                {t.cities.map((city) => (
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
        <Label>{t.overviewLabel}</Label>
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

      <Section id="group-structure" className="pt-0">
        <Label>{t.structureTitle}</Label>
        <div className="mb-10">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.structureTitle}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/62">{t.structureText}</p>
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
              <div className="mt-1 text-xs uppercase tracking-[.18em] text-white/38">{lang === "en" ? s.placeEn : s.placeRu}</div>
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
          {focus.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.titleEn} className="glass rounded-[2rem] p-7 transition hover:border-copper-300/40">
                <Icon className="mb-8 text-copper-100" size={32} />
                <h3 className="text-2xl font-semibold">{lang === "en" ? card.titleEn : card.titleRu}</h3>
                <p className="mt-4 leading-7 text-white/58">{lang === "en" ? card.descEn : card.descRu}</p>
              </div>
            );
          })}
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
              <div className="text-sm uppercase tracking-[.22em] text-copper-100">{t.copperPlatform}</div>
              <p className="mt-3 text-sm leading-7 text-white/62">{t.copperPlatformText}</p>
            </div>
          </div>
          <div className="grid gap-4">
            {assets.map((asset) => {
              const stats = lang === "en" ? asset.statsEn : asset.statsRu;
              return (
                <div key={asset.name} className="rounded-[1.5rem] border border-white/10 bg-white/[.035] p-6">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <h3 className="text-2xl font-semibold">{asset.name}</h3>
                      <div className="mt-1 flex items-center gap-2 text-sm text-white/45">
                        <MapPin size={15} /> {lang === "en" ? asset.locationEn : asset.locationRu}
                      </div>
                    </div>
                    <div className="rounded-full bg-copper-500/10 px-3 py-1 text-xs uppercase tracking-[.2em] text-copper-100">
                      {t.assetLabel}
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {stats.map((stat) => (
                      <div key={stat} className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white/65">
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
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
              {t.philosophyItems.map((x) => (
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
        <div className="grid gap-8 md:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.investorTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-white/62">{t.investorText}</p>

            <div className="mt-8 grid gap-3">
              {[
                { title: t.tiers[0][0], desc: t.tiers[0][1], Icon: Unlock, href: "/demo" },
                { title: t.tiers[1][0], desc: t.tiers[1][1], Icon: Lock, href: "#investor-private" },
                { title: t.tiers[2][0], desc: t.tiers[2][1], Icon: Shield, href: "#investor-private" }
              ].map(({ title, desc, Icon, href }) => (
                <a
                  key={title}
                  href={href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[.035] p-4 transition hover:border-copper-300/40 hover:bg-copper-500/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper-500/10 text-copper-100">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="font-semibold">{title}</div>
                      <div className="text-sm text-white/45">{desc}</div>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-white/30 transition group-hover:text-copper-100" />
                </a>
              ))}
            </div>
          </div>

          <div className="glass overflow-hidden rounded-[2rem]">
            <div className="border-b border-white/10 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm uppercase tracking-[.24em] text-copper-100">
                    <Activity size={16} /> {t.demoLabel}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold">{t.marketDashboard}</h3>
                </div>
                <a href="/demo" className="w-fit rounded-full bg-copper-500/10 px-3 py-1 text-xs uppercase tracking-[.2em] text-copper-100 transition hover:bg-copper-500/20">
                  {t.openDemo}
                </a>
              </div>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-[1.05fr_.95fr]">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[.22em] text-white/38">{t.watchlist}</div>
                    <div className="mt-1 text-lg font-semibold">{t.marketSubtitle}</div>
                  </div>
                  <TrendingUp className="text-copper-100" />
                </div>

                <div className="max-h-[430px] overflow-hidden rounded-2xl border border-white/10">
                  {marketPreview.map((row, index) => (
                    <div
                      key={`${row.name}-${row.ticker}`}
                      className={`grid grid-cols-[1fr_.8fr_.7fr_.6fr] items-center gap-3 px-4 py-3 text-sm ${
                        index !== marketPreview.length - 1 ? "border-b border-white/10" : ""
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-white/85">{row.name}</div>
                        <div className="text-xs text-white/35">{row.group}</div>
                      </div>
                      <div className="text-white/45">{row.ticker}</div>
                      <div className="text-right font-semibold text-white/76">{row.price}</div>
                      <div className={`text-right font-semibold ${row.change.startsWith("+") ? "text-copper-100" : "text-white/45"}`}>
                        {row.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5">
                <div className="relative min-h-[260px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(184,111,54,.18),transparent_34%)]" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[.22em] text-white/38">{t.chartPreview}</div>
                        <div className="mt-1 text-xl font-semibold">Copper / Macro Basket</div>
                      </div>
                      <BarChart3 className="text-copper-100" />
                    </div>

                    <div className="mt-8 h-32">
                      <svg viewBox="0 0 420 140" className="h-full w-full">
                        <defs>
                          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgba(184,111,54,.45)" />
                            <stop offset="100%" stopColor="rgba(184,111,54,0)" />
                          </linearGradient>
                        </defs>
                        <path d="M0 104 C40 88, 64 98, 96 78 C132 55, 162 72, 192 48 C224 22, 250 60, 284 42 C320 22, 358 32, 420 18 L420 140 L0 140 Z" fill="url(#area)" />
                        <path d="M0 104 C40 88, 64 98, 96 78 C132 55, 162 72, 192 48 C224 22, 250 60, 284 42 C320 22, 358 32, 420 18" fill="none" stroke="#d89b64" strokeWidth="3" />
                      </svg>
                    </div>

                    <p className="mt-5 text-sm leading-6 text-white/52">{t.demoText}</p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                  <div className="mb-4 text-xs uppercase tracking-[.22em] text-white/38">{t.availableDemo}</div>
                  <div className="grid grid-cols-2 gap-3">
                    {t.demoModules.map((module) => (
                      <a key={module} href="/demo" className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-sm text-white/62 transition hover:border-copper-300/40 hover:text-white">
                        {module}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div id="investor-private" className="grid gap-4 border-t border-white/10 p-5 md:grid-cols-2">
              {t.lockedModules.map((module, index) => {
                const Icon = index === 0 ? FileText : Shield;
                return (
                  <div key={module.title} className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <Icon className="text-copper-100" />
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[.18em] text-white/38">
                        {module.level}
                      </span>
                    </div>
                    <h4 className="mt-6 text-xl font-semibold">{module.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-white/52">{module.desc}</p>
                    <div className="mt-5 flex items-center gap-3">
                      <input
                        placeholder={t.passwordPlaceholder}
                        type="password"
                        className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-copper-300/50"
                      />
                      <button className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-copper-100">
                        {t.unlock}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
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
              {t.offices.map((office) => (
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


{
  title: "Geodrill LLP",
  location: "Kazakhstan",
  badge: "INFRASTRUCTURE",
  tags: [
    "Drilling services",
    "Exploration support",
    "Mining infrastructure",
  ],
  description:
    "Integrated drilling and geological support platform operating across Kazakhstan.",
},
{
  title: "Apollo Resources DMCC",
  location: "Dubai, UAE",
  badge: "TRADING",
  tags: [
    "Commodity trading",
    "Offtake structuring",
    "International flows",
  ],
  description:
    "International commodity trading and strategic metals distribution platform.",
},
