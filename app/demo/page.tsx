"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Activity, BarChart3, Globe2, Terminal, RefreshCw } from "lucide-react";

type CategoryKey = "metals" | "energy" | "indices" | "mega" | "fx";

type Instrument = {
  name: string;
  code: string;
  subtitle: string;
  last: number;
  unit: string;
  change: number;
  changePct: number;
  source: string;
  points: number[];
};

const categories: { key: CategoryKey; command: string; label: string; subtitle: string; instruments: Instrument[] }[] = [
  {
    key: "metals",
    command: "METALS <GO>",
    label: "METALS",
    subtitle: "LME-style base metals and precious metals snapshot",
    instruments: [
      { name: "Copper", code: "LME CU", subtitle: "LME Copper Cash", last: 13400, unit: "USD/ton", change: 112, changePct: 0.84, source: "Investing / LME proxy", points: [12890,12960,13020,12970,13110,13240,13180,13310,13400] },
      { name: "Aluminum", code: "LME AL", subtitle: "LME Aluminum", last: 3481, unit: "USD/ton", change: 26, changePct: 0.75, source: "Investing / LME proxy", points: [3350,3364,3388,3405,3398,3425,3446,3460,3481] },
      { name: "Lead", code: "LME PB", subtitle: "LME Lead", last: 2195, unit: "USD/ton", change: 8.4, changePct: 0.38, source: "Investing / LME proxy", points: [2130,2140,2137,2150,2162,2158,2176,2188,2195] },
      { name: "Zinc", code: "LME ZN", subtitle: "LME Zinc", last: 2875, unit: "USD/ton", change: 14.2, changePct: 0.50, source: "Investing / LME proxy", points: [2790,2805,2818,2809,2830,2844,2858,2864,2875] },
      { name: "Nickel", code: "LME NI", subtitle: "LME Nickel", last: 19260, unit: "USD/ton", change: -73, changePct: -0.38, source: "Investing / LME proxy", points: [19580,19470,19310,19420,19290,19340,19180,19320,19260] },
      { name: "Gold", code: "XAU", subtitle: "Spot Gold", last: 4703, unit: "USD/oz", change: 19.3, changePct: 0.41, source: "Investing / spot proxy", points: [4590,4618,4630,4660,4648,4682,4695,4686,4703] },
      { name: "Silver", code: "XAG", subtitle: "Spot Silver", last: 77.83, unit: "USD/oz", change: -0.17, changePct: -0.22, source: "Investing / spot proxy", points: [75.8,76.1,76.8,77.4,77.1,78.0,78.2,78.0,77.83] },
      { name: "Platinum", code: "XPT", subtitle: "Spot Platinum", last: 2077, unit: "USD/oz", change: 3.9, changePct: 0.19, source: "Investing / spot proxy", points: [2025,2038,2050,2044,2058,2068,2061,2070,2077] },
      { name: "Palladium", code: "XPD", subtitle: "Spot Palladium", last: 1552, unit: "USD/oz", change: -8.1, changePct: -0.52, source: "Investing / spot proxy", points: [1580,1574,1568,1572,1559,1561,1550,1558,1552] }
    ]
  },
  {
    key: "energy",
    command: "ENERGY <GO>",
    label: "ENERGY",
    subtitle: "Crude oil benchmarks",
    instruments: [
      { name: "WTI Oil", code: "WTI", subtitle: "WTI Crude Oil", last: 79.40, unit: "USD/bbl", change: 0.41, changePct: 0.52, source: "Market proxy", points: [76.8,77.1,77.9,78.4,78.0,78.8,79.0,79.2,79.4] },
      { name: "Brent Oil", code: "BRENT", subtitle: "Brent Crude Oil", last: 82.50, unit: "USD/bbl", change: 0.63, changePct: 0.77, source: "Market proxy", points: [80.4,80.9,81.1,81.5,81.0,81.8,82.2,82.0,82.5] }
    ]
  },
  {
    key: "indices",
    command: "INDEX <GO>",
    label: "MAJOR INDICES",
    subtitle: "Major global equity benchmarks",
    instruments: [
      { name: "S&P 500", code: "SPX", subtitle: "US large-cap index", last: 5218, unit: "points", change: 17.7, changePct: 0.34, source: "Index proxy", points: [5108,5120,5135,5160,5150,5188,5195,5200,5218] },
      { name: "Nasdaq Composite", code: "IXIC", subtitle: "US technology-heavy index", last: 18240, unit: "points", change: 105.4, changePct: 0.58, source: "Index proxy", points: [17850,17920,18010,17970,18100,18130,18195,18170,18240] },
      { name: "Dow Jones", code: "DJI", subtitle: "US blue-chip index", last: 39112, unit: "points", change: 82.1, changePct: 0.21, source: "Index proxy", points: [38820,38860,38940,39010,38920,39050,39120,39090,39112] },
      { name: "Russell 2000", code: "RUT", subtitle: "US small-cap index", last: 2081, unit: "points", change: -1.9, changePct: -0.09, source: "Index proxy", points: [2104,2098,2088,2092,2079,2086,2081,2083,2081] },
      { name: "FTSE 100", code: "UKX", subtitle: "UK equity index", last: 8214, unit: "points", change: 14.8, changePct: 0.18, source: "Index proxy", points: [8130,8152,8160,8174,8188,8195,8200,8208,8214] },
      { name: "DAX", code: "DAX", subtitle: "Germany equity index", last: 18420, unit: "points", change: 60.8, changePct: 0.33, source: "Index proxy", points: [18120,18180,18240,18220,18310,18360,18388,18405,18420] },
      { name: "Euro Stoxx 50", code: "SX5E", subtitle: "Eurozone blue-chip index", last: 5045, unit: "points", change: 12.6, changePct: 0.25, source: "Index proxy", points: [4970,4985,5002,4995,5010,5025,5030,5038,5045] }
    ]
  },
  {
    key: "mega",
    command: "MEGACAP <GO>",
    label: "MEGA CAPS",
    subtitle: "Large public companies across technology, finance, energy and consumer sectors",
    instruments: [
      { name: "NVIDIA", code: "NVDA", subtitle: "Semiconductors / AI", last: 910.18, unit: "USD/share", change: 18.72, changePct: 2.10, source: "Equity proxy", points: [850,862,874,868,890,902,895,908,910.18] },
      { name: "Apple", code: "AAPL", subtitle: "Consumer technology", last: 192.44, unit: "USD/share", change: -0.35, changePct: -0.18, source: "Equity proxy", points: [194,193.5,192.8,193.2,192.0,191.6,192.4,192.8,192.44] },
      { name: "Microsoft", code: "MSFT", subtitle: "Software / cloud", last: 421.90, unit: "USD/share", change: 1.98, changePct: 0.47, source: "Equity proxy", points: [410,412,415,416,414,418,420,421,421.9] },
      { name: "Amazon", code: "AMZN", subtitle: "E-commerce / cloud", last: 184.12, unit: "USD/share", change: 0.57, changePct: 0.31, source: "Equity proxy", points: [180,181,182.5,181.8,183.2,183.6,184,183.7,184.12] },
      { name: "Alphabet", code: "GOOGL", subtitle: "Search / AI / cloud", last: 171.55, unit: "USD/share", change: 0.48, changePct: 0.28, source: "Equity proxy", points: [166,168,169.5,168.8,170,170.8,171.2,171,171.55] },
      { name: "Meta", code: "META", subtitle: "Social platforms / AI", last: 487.21, unit: "USD/share", change: 3.58, changePct: 0.74, source: "Equity proxy", points: [470,474,480,478,482,485,484,486,487.21] },
      { name: "Tesla", code: "TSLA", subtitle: "EV / energy storage", last: 182.63, unit: "USD/share", change: -0.77, changePct: -0.42, source: "Equity proxy", points: [188,186,184,185,183,181.5,182.1,183.4,182.63] },
      { name: "Berkshire Hathaway", code: "BRK.B", subtitle: "Diversified holding", last: 418.55, unit: "USD/share", change: 1.32, changePct: 0.32, source: "Equity proxy", points: [410,412,414,413,415,416,417,418,418.55] },
      { name: "JPMorgan Chase", code: "JPM", subtitle: "Banking / financial services", last: 202.70, unit: "USD/share", change: 1.11, changePct: 0.55, source: "Equity proxy", points: [196,198,199,200,199.5,201,202,201.8,202.7] },
      { name: "Exxon Mobil", code: "XOM", subtitle: "Energy major", last: 117.40, unit: "USD/share", change: 0.42, changePct: 0.36, source: "Equity proxy", points: [114,115,115.8,116,116.4,116.8,117.2,117,117.4] },
      { name: "Walmart", code: "WMT", subtitle: "Retail / consumer staples", last: 68.90, unit: "USD/share", change: 0.19, changePct: 0.28, source: "Equity proxy", points: [67.4,67.8,68.1,68,68.3,68.6,68.4,68.7,68.9] }
    ]
  },
  {
    key: "fx",
    command: "FXMACRO <GO>",
    label: "FX / MACRO",
    subtitle: "Currencies, dollar index and rates",
    instruments: [
      { name: "US Dollar Index", code: "DXY", subtitle: "US dollar strength index", last: 104.21, unit: "index points", change: -0.16, changePct: -0.15, source: "Macro proxy", points: [105,104.8,104.6,104.9,104.5,104.4,104.2,104.3,104.21] },
      { name: "EUR/USD", code: "EURUSD", subtitle: "Major FX pair", last: 1.0834, unit: "USD per EUR", change: 0.0012, changePct: 0.11, source: "FX proxy", points: [1.078,1.079,1.081,1.080,1.082,1.083,1.0825,1.0831,1.0834] },
      { name: "USD/KZT", code: "USDKZT", subtitle: "Kazakhstan tenge", last: 451.70, unit: "KZT per USD", change: 0.23, changePct: 0.05, source: "FX proxy", points: [449.8,450.2,450.5,450.1,451.0,451.4,451.1,451.5,451.7] },
      { name: "US 10Y Yield", code: "US10Y", subtitle: "Rates benchmark", last: 4.28, unit: "%", change: -0.03, changePct: -0.70, source: "Rates proxy", points: [4.38,4.35,4.32,4.33,4.29,4.31,4.27,4.30,4.28] },
      { name: "Bitcoin", code: "BTC", subtitle: "Digital asset macro proxy", last: 67250, unit: "USD", change: 820, changePct: 1.23, source: "Crypto proxy", points: [65000,65400,66000,65800,66500,66800,66200,67000,67250] }
    ]
  }
];

function formatLast(value: number, unit: string) {
  if (!Number.isFinite(value)) return "—";
  const decimals =
    value >= 1000 ? 0 :
    value >= 100 ? 2 :
    value >= 10 ? 2 :
    value >= 1 ? 4 : 4;

  if (unit === "%") return `${value.toFixed(2)}%`;
  if (unit === "points" || unit === "index points") {
    return value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

function Sparkline({ points, positive }: { points: number[]; positive: boolean }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 170;
  const height = 44;
  const coords = points.map((point, index) => {
    const x = (index / Math.max(points.length - 1, 1)) * width;
    const y = height - ((point - min) / range) * (height - 8) - 4;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-10 w-full">
      <polyline
        points={coords}
        fill="none"
        stroke={positive ? "#f0a24a" : "rgba(255,255,255,.55)"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LargeChart({ points, positive }: { points: number[]; positive: boolean }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 760;
  const height = 320;
  const coords = points.map((point, index) => {
    const x = (index / Math.max(points.length - 1, 1)) * width;
    const y = height - ((point - min) / range) * (height - 36) - 18;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const line = coords.join(" ");
  const area = `0,${height} ${line} ${width},${height}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
      <defs>
        <linearGradient id="terminalArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(240,162,74,.38)" />
          <stop offset="100%" stopColor="rgba(240,162,74,0)" />
        </linearGradient>
      </defs>
      <line x1="0" y1="80" x2={width} y2="80" stroke="rgba(255,255,255,.08)" />
      <line x1="0" y1="160" x2={width} y2="160" stroke="rgba(255,255,255,.08)" />
      <line x1="0" y1="240" x2={width} y2="240" stroke="rgba(255,255,255,.08)" />
      <polyline points={area} fill="url(#terminalArea)" />
      <polyline
        points={line}
        fill="none"
        stroke={positive ? "#f0a24a" : "rgba(255,255,255,.72)"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DemoTerminalDashboard() {
  const [active, setActive] = useState<CategoryKey>("metals");
  const selected = useMemo(() => categories.find((category) => category.key === active) || categories[0], [active]);
  const [activeCode, setActiveCode] = useState("LME CU");

  const activeInstrument = selected.instruments.find((item) => item.code === activeCode) || selected.instruments[0];

  function selectCategory(key: CategoryKey) {
    const next = categories.find((category) => category.key === key) || categories[0];
    setActive(key);
    setActiveCode(next.instruments[0].code);
  }

  const positive = activeInstrument.change >= 0;
  const topStrip = [
    categories[0].instruments[0],
    categories[0].instruments[5],
    categories[1].instruments[1],
    categories[2].instruments[0],
    categories[4].instruments[0]
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#020303] text-[#f7f4ef]">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="relative mx-auto max-w-[1500px] px-4 py-5 md:px-6">
        <header className="mb-4 grid gap-3 border border-[#2b2b2b] bg-black/80 p-3 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <a href="/#investor" className="inline-flex w-fit items-center gap-2 border border-[#3a3a3a] bg-[#111] px-3 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#f0a24a] transition hover:bg-[#191919]">
            <ArrowLeft size={15} /> Back
          </a>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border border-[#f0a24a]/60 bg-[#261608] font-bold text-[#f0a24a]">Λ</div>
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.24em] text-white">Apollo Resources Terminal</div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/45">Demo market access / no external navigation</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-[.18em] text-white/45">
            <RefreshCw size={14} /> Snapshot Mode
          </div>
        </header>

        <section className="mb-4 overflow-hidden border border-[#2b2b2b] bg-[#080808]">
          <div className="flex min-w-max animate-none">
            {topStrip.map((item) => (
              <button
                key={item.code}
                onClick={() => {
                  const parent = categories.find((category) => category.instruments.some((instrument) => instrument.code === item.code)) || categories[0];
                  setActive(parent.key);
                  setActiveCode(item.code);
                }}
                className="grid grid-cols-[90px_120px_95px_90px] gap-3 border-r border-[#2b2b2b] px-4 py-3 text-left text-xs transition hover:bg-[#111]"
              >
                <span className="font-bold text-[#f0a24a]">{item.code}</span>
                <span className="text-white/68">{item.name}</span>
                <span className="text-right text-white">{formatLast(item.last, item.unit)}</span>
                <span className={`text-right font-bold ${item.change >= 0 ? "text-[#f0a24a]" : "text-white/55"}`}>
                  {item.change >= 0 ? "+" : ""}{item.changePct.toFixed(2)}%
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-4 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="border border-[#2b2b2b] bg-black/75 p-5">
            <div className="mb-3 inline-flex items-center gap-2 border border-[#f0a24a]/40 bg-[#2a1708] px-3 py-1 text-xs font-bold uppercase tracking-[.24em] text-[#f0a24a]">
              <Activity size={14} /> Demo Access
            </div>
            <h1 className="text-4xl font-black uppercase tracking-[-0.04em] text-white md:text-6xl">
              Market Command Center
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/56 md:text-base">
              Bloomberg-inspired commodity and market dashboard for metals, energy, indices, mega-cap equities and FX / macro indicators.
            </p>
          </div>

          <div className="border border-[#2b2b2b] bg-black/75 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[.22em] text-white/38">Command</div>
                <div className="mt-1 flex items-center gap-2 text-2xl font-black text-[#f0a24a]">
                  <Terminal size={22} /> {selected.command}
                </div>
              </div>
              <Globe2 className="text-[#f0a24a]" />
            </div>
            <div className="text-sm leading-6 text-white/55">{selected.subtitle}</div>
          </div>
        </section>

        <section className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-5">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => selectCategory(category.key)}
              className={`border px-4 py-3 text-left text-xs font-black uppercase tracking-[.16em] transition ${
                active === category.key
                  ? "border-[#f0a24a] bg-[#2a1708] text-[#f0a24a]"
                  : "border-[#2b2b2b] bg-[#090909] text-white/50 hover:border-[#f0a24a]/50 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
          <div className="overflow-hidden border border-[#2b2b2b] bg-black/80">
            <div className="grid grid-cols-[1.2fr_.7fr_.7fr_.55fr_.55fr_.65fr] border-b border-[#2b2b2b] bg-[#0d0d0d] px-4 py-3 text-[11px] font-bold uppercase tracking-[.16em] text-white/38">
              <div>Instrument</div>
              <div>Last</div>
              <div>Unit</div>
              <div>Chg</div>
              <div>Chg %</div>
              <div>Trend</div>
            </div>

            {selected.instruments.map((item) => {
              const isActive = item.code === activeInstrument.code;
              const itemPositive = item.change >= 0;

              return (
                <button
                  key={item.code}
                  onClick={() => setActiveCode(item.code)}
                  className={`grid w-full grid-cols-[1.2fr_.7fr_.7fr_.55fr_.55fr_.65fr] items-center border-b border-[#1f1f1f] px-4 py-3 text-left text-xs transition hover:bg-[#121212] ${
                    isActive ? "bg-[#211508]" : ""
                  }`}
                >
                  <div>
                    <div className="font-black uppercase text-white">{item.name}</div>
                    <div className="mt-1 text-[11px] text-white/38">{item.code} / {item.subtitle}</div>
                  </div>
                  <div className="font-bold text-white">{formatLast(item.last, item.unit)}</div>
                  <div className="text-white/50">{item.unit}</div>
                  <div className={itemPositive ? "font-bold text-[#f0a24a]" : "font-bold text-white/55"}>
                    {item.change >= 0 ? "+" : ""}{item.change.toFixed(item.last < 10 ? 4 : 2)}
                  </div>
                  <div className={itemPositive ? "font-bold text-[#f0a24a]" : "font-bold text-white/55"}>
                    {item.change >= 0 ? "+" : ""}{item.changePct.toFixed(2)}%
                  </div>
                  <div>
                    <Sparkline points={item.points} positive={itemPositive} />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid gap-4">
            <div className="border border-[#2b2b2b] bg-black/80">
              <div className="flex items-center justify-between border-b border-[#2b2b2b] bg-[#0d0d0d] px-5 py-4">
                <div>
                  <div className="text-xs uppercase tracking-[.22em] text-white/38">Selected instrument</div>
                  <div className="mt-1 text-2xl font-black uppercase text-white">{activeInstrument.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[.16em] text-[#f0a24a]">{activeInstrument.code} / {activeInstrument.source}</div>
                </div>
                <BarChart3 className="text-[#f0a24a]" />
              </div>

              <div className="grid grid-cols-3 border-b border-[#2b2b2b]">
                <div className="border-r border-[#2b2b2b] p-4">
                  <div className="text-[11px] uppercase tracking-[.18em] text-white/38">Last</div>
                  <div className="mt-1 text-2xl font-black text-white">{formatLast(activeInstrument.last, activeInstrument.unit)}</div>
                  <div className="mt-1 text-xs text-white/40">{activeInstrument.unit}</div>
                </div>
                <div className="border-r border-[#2b2b2b] p-4">
                  <div className="text-[11px] uppercase tracking-[.18em] text-white/38">Change</div>
                  <div className={`mt-1 text-2xl font-black ${positive ? "text-[#f0a24a]" : "text-white/60"}`}>
                    {activeInstrument.change >= 0 ? "+" : ""}{activeInstrument.change.toFixed(activeInstrument.last < 10 ? 4 : 2)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[11px] uppercase tracking-[.18em] text-white/38">Change %</div>
                  <div className={`mt-1 text-2xl font-black ${positive ? "text-[#f0a24a]" : "text-white/60"}`}>
                    {activeInstrument.change >= 0 ? "+" : ""}{activeInstrument.changePct.toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="h-[360px] p-5">
                <LargeChart points={activeInstrument.points} positive={positive} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-[#2b2b2b] bg-black/80 p-4">
                <div className="text-[11px] font-bold uppercase tracking-[.18em] text-white/38">Market Notes</div>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Base metals are displayed in LME-style USD per metric ton. Precious metals are displayed in USD per ounce. Energy is displayed in USD per barrel.
                </p>
              </div>
              <div className="border border-[#2b2b2b] bg-black/80 p-4">
                <div className="text-[11px] font-bold uppercase tracking-[.18em] text-white/38">Access Layer</div>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Demo mode contains internal navigation only. No ticker, chart or market table item redirects to external resources.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
