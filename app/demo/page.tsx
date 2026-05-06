"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Activity, BarChart3, Globe2, RefreshCw } from "lucide-react";

type CategoryKey = "metals" | "energy" | "indices" | "mega" | "fx";

type Instrument = {
  name: string;
  symbol: string;
  subtitle: string;
};

type MarketData = {
  symbol: string;
  price: number;
  change: number;
  changePct: number;
  points: number[];
  source?: string;
};

const categories: { key: CategoryKey; label: string; subtitle: string; symbols: Instrument[] }[] = [
  {
    key: "metals",
    label: "Metals",
    subtitle: "Precious, industrial and base metals",
    symbols: [
      { name: "Copper", symbol: "HG=F", subtitle: "Copper Futures" },
      { name: "Gold", symbol: "GC=F", subtitle: "Gold Futures" },
      { name: "Silver", symbol: "SI=F", subtitle: "Silver Futures" },
      { name: "Platinum", symbol: "PL=F", subtitle: "Platinum Futures" },
      { name: "Palladium", symbol: "PA=F", subtitle: "Palladium Futures" },
      { name: "Aluminum", symbol: "ALI=F", subtitle: "Aluminum Futures" },
      { name: "Lead", symbol: "LEAD", subtitle: "Base metal indicator" },
      { name: "Zinc", symbol: "ZINC", subtitle: "Base metal indicator" }
    ]
  },
  {
    key: "energy",
    label: "Energy",
    subtitle: "Oil benchmarks",
    symbols: [
      { name: "WTI Oil", symbol: "CL=F", subtitle: "WTI Crude Oil Futures" },
      { name: "Brent Oil", symbol: "BZ=F", subtitle: "Brent Crude Oil Futures" }
    ]
  },
  {
    key: "indices",
    label: "Major Indices",
    subtitle: "Major global market benchmarks",
    symbols: [
      { name: "S&P 500", symbol: "^GSPC", subtitle: "US large-cap index" },
      { name: "Nasdaq Composite", symbol: "^IXIC", subtitle: "US technology-heavy index" },
      { name: "Dow Jones", symbol: "^DJI", subtitle: "US blue-chip index" },
      { name: "Russell 2000", symbol: "^RUT", subtitle: "US small-cap index" },
      { name: "FTSE 100", symbol: "^FTSE", subtitle: "UK equity index" },
      { name: "DAX", symbol: "^GDAXI", subtitle: "Germany equity index" },
      { name: "Euro Stoxx 50", symbol: "^STOXX50E", subtitle: "Eurozone blue-chip index" }
    ]
  },
  {
    key: "mega",
    label: "Mega Caps",
    subtitle: "Large global public companies",
    symbols: [
      { name: "NVIDIA", symbol: "NVDA", subtitle: "Semiconductors / AI" },
      { name: "Apple", symbol: "AAPL", subtitle: "Consumer technology" },
      { name: "Microsoft", symbol: "MSFT", subtitle: "Software / cloud" },
      { name: "Amazon", symbol: "AMZN", subtitle: "E-commerce / cloud" },
      { name: "Alphabet", symbol: "GOOGL", subtitle: "Search / AI / cloud" },
      { name: "Meta", symbol: "META", subtitle: "Social platforms / AI" },
      { name: "Tesla", symbol: "TSLA", subtitle: "EV / energy storage" },
      { name: "Berkshire Hathaway", symbol: "BRK-B", subtitle: "Diversified holding" },
      { name: "JPMorgan Chase", symbol: "JPM", subtitle: "Banking / financial services" },
      { name: "Exxon Mobil", symbol: "XOM", subtitle: "Energy major" },
      { name: "Walmart", symbol: "WMT", subtitle: "Retail / consumer staples" }
    ]
  },
  {
    key: "fx",
    label: "FX / Macro",
    subtitle: "Currencies, dollar index, rates and macro indicators",
    symbols: [
      { name: "US Dollar Index", symbol: "DX-Y.NYB", subtitle: "Dollar basket" },
      { name: "EUR/USD", symbol: "EURUSD=X", subtitle: "Major FX pair" },
      { name: "USD/KZT", symbol: "USDKZT=X", subtitle: "Kazakhstan tenge" },
      { name: "US 10Y Yield", symbol: "^TNX", subtitle: "Rates benchmark" },
      { name: "Bitcoin", symbol: "BTC-USD", subtitle: "Digital asset macro proxy" }
    ]
  }
];

function formatPrice(value: number, symbol: string) {
  if (!Number.isFinite(value)) return "—";
  if (symbol.includes("=X") || symbol === "DX-Y.NYB") return value.toLocaleString("en-US", { maximumFractionDigits: 4 });
  if (symbol === "^TNX") return `${value.toFixed(2)}%`;
  if (value > 1000) return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (value > 100) return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return value.toLocaleString("en-US", { maximumFractionDigits: 3 });
}

function MiniChart({ points, positive }: { points: number[]; positive: boolean }) {
  const safePoints = points.length > 1 ? points : [100, 101, 100.6, 102, 103];
  const min = Math.min(...safePoints);
  const max = Math.max(...safePoints);
  const range = max - min || 1;
  const width = 520;
  const height = 220;
  const coords = safePoints.map((point, index) => {
    const x = (index / Math.max(safePoints.length - 1, 1)) * width;
    const y = height - ((point - min) / range) * (height - 28) - 14;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const line = coords.join(" ");
  const area = `0,${height} ${line} ${width},${height}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
      <defs>
        <linearGradient id="chartArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(184,111,54,.45)" />
          <stop offset="100%" stopColor="rgba(184,111,54,0)" />
        </linearGradient>
      </defs>
      <polyline points={area} fill="url(#chartArea)" />
      <polyline points={line} fill="none" stroke={positive ? "#d89b64" : "rgba(255,255,255,.62)"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DemoMarketDashboard() {
  const [active, setActive] = useState<CategoryKey>("metals");
  const selected = useMemo(() => categories.find((c) => c.key === active) || categories[0], [active]);
  const [activeSymbol, setActiveSymbol] = useState(selected.symbols[0].symbol);
  const [dataMap, setDataMap] = useState<Record<string, MarketData>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveSymbol(selected.symbols[0].symbol);
  }, [selected]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const results = await Promise.all(
          selected.symbols.map(async (item) => {
            const response = await fetch(`/api/market?symbol=${encodeURIComponent(item.symbol)}`, { cache: "no-store" });
            const data = (await response.json()) as MarketData;
            return [item.symbol, data] as const;
          })
        );

        if (!cancelled) {
          setDataMap((previous) => ({ ...previous, ...Object.fromEntries(results) }));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const timer = window.setInterval(load, 60000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [selected]);

  const activeInstrument = selected.symbols.find((s) => s.symbol === activeSymbol) || selected.symbols[0];
  const activeData = dataMap[activeInstrument.symbol];
  const isPositive = (activeData?.change || 0) >= 0;

  return (
    <main className="min-h-screen overflow-hidden bg-[#050608] text-[#f7f4ef]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(184,111,54,.18),transparent_30%),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:auto,46px_46px,46px_46px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-8 md:px-8">
        <header className="mb-10 flex flex-col justify-between gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <a href="/#investor" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-copper-300/50 hover:text-white">
            <ArrowLeft size={16} /> Back to Investor Access
          </a>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-copper-500/40 bg-copper-500/10 font-bold text-copper-100">Λ</div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em]">Apollo Resources</div>
              <div className="text-[10px] uppercase tracking-[0.34em] text-white/45">Internal Market Dashboard</div>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-8 md:grid-cols-[.95fr_1.05fr] md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-copper-500/30 bg-copper-500/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-copper-100">
              <Activity size={14} /> Demo Access
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
              Real-time Market <span className="text-copper-300">Dashboard</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">
              Select a market category to view internal quotes and an interactive chart. No external navigation is used on this page.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[.035] p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[.22em] text-white/38">Selected category</div>
                <div className="mt-1 text-2xl font-semibold">{selected.label}</div>
              </div>
              <Globe2 className="text-copper-100" />
            </div>
            <p className="mt-5 text-sm leading-6 text-white/52">{selected.subtitle}</p>
          </div>
        </section>

        <section className="mb-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActive(category.key)}
              className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                active === category.key
                  ? "border-copper-300/50 bg-copper-500 text-white shadow-copper"
                  : "border-white/10 bg-white/[.035] text-white/62 hover:border-copper-300/40 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </section>

        <section className="mb-6 flex flex-wrap gap-2">
          {selected.symbols.map((symbol) => (
            <button
              key={symbol.symbol}
              onClick={() => setActiveSymbol(symbol.symbol)}
              className={`rounded-xl border px-4 py-2 text-xs font-semibold transition ${
                activeSymbol === symbol.symbol
                  ? "border-copper-300/50 bg-copper-500/20 text-copper-100"
                  : "border-white/10 bg-black/25 text-white/50 hover:border-copper-300/40 hover:text-white"
              }`}
            >
              {symbol.name}
            </button>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <div className="text-xs uppercase tracking-[.22em] text-white/38">Watchlist</div>
                <h2 className="mt-1 text-2xl font-semibold">{selected.label}</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                {loading && <RefreshCw size={14} className="animate-spin" />}
                Auto-refresh 60s
              </div>
            </div>

            <div>
              {selected.symbols.map((row, index) => {
                const data = dataMap[row.symbol];
                const positive = (data?.change || 0) >= 0;

                return (
                  <button
                    key={row.symbol}
                    onClick={() => setActiveSymbol(row.symbol)}
                    className={`grid w-full grid-cols-[1fr_.6fr_.6fr] items-center gap-3 px-5 py-4 text-left text-sm transition hover:bg-white/[.045] ${
                      index !== selected.symbols.length - 1 ? "border-b border-white/10" : ""
                    } ${activeSymbol === row.symbol ? "bg-copper-500/10" : ""}`}
                  >
                    <div>
                      <div className="text-base font-semibold text-white/88">{row.name}</div>
                      <div className="text-xs text-white/38">{row.subtitle}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white/76">{data ? formatPrice(data.price, row.symbol) : "Loading"}</div>
                      <div className="text-xs text-white/35">{row.symbol}</div>
                    </div>
                    <div className={`text-right font-semibold ${positive ? "text-copper-100" : "text-white/45"}`}>
                      {data ? `${positive ? "+" : ""}${data.changePct.toFixed(2)}%` : "—"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <div className="text-xs uppercase tracking-[.22em] text-white/38">Interactive chart</div>
                <div className="mt-1 text-2xl font-semibold">{activeInstrument.name}</div>
                <div className="mt-1 text-sm text-white/40">{activeInstrument.subtitle}</div>
              </div>
              <BarChart3 className="text-copper-100" />
            </div>

            <div className="p-5">
              <div className="mb-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-xs text-white/38">Price</div>
                  <div className="mt-1 text-xl font-semibold">{activeData ? formatPrice(activeData.price, activeInstrument.symbol) : "Loading"}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-xs text-white/38">Change</div>
                  <div className={`mt-1 text-xl font-semibold ${isPositive ? "text-copper-100" : "text-white/58"}`}>
                    {activeData ? `${isPositive ? "+" : ""}${activeData.change.toFixed(2)}` : "—"}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-xs text-white/38">Change %</div>
                  <div className={`mt-1 text-xl font-semibold ${isPositive ? "text-copper-100" : "text-white/58"}`}>
                    {activeData ? `${isPositive ? "+" : ""}${activeData.changePct.toFixed(2)}%` : "—"}
                  </div>
                </div>
              </div>

              <div className="h-[360px] rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                <MiniChart points={activeData?.points || []} positive={isPositive} />
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-copper-500/20 bg-copper-500/10 p-4 text-sm leading-6 text-white/60">
                Data is displayed inside Apollo Resources Group demo environment. External links and third-party navigation are disabled on this page.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
