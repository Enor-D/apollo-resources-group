"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Activity, BarChart3, Globe2 } from "lucide-react";

type CategoryKey = "metals" | "energy" | "indices" | "mega" | "fx";

const categories: { key: CategoryKey; label: string; subtitle: string; symbols: { name: string; tv: string }[] }[] = [
  {
    key: "metals",
    label: "Metals",
    subtitle: "Copper, precious and base metals",
    symbols: [
      { name: "Copper", tv: "COMEX:HG1!" },
      { name: "Gold", tv: "OANDA:XAUUSD" },
      { name: "Silver", tv: "OANDA:XAGUSD" },
      { name: "Platinum", tv: "OANDA:XPTUSD" },
      { name: "Aluminum", tv: "COMEX:ALI1!" },
      { name: "Nickel", tv: "CAPITALCOM:NICKEL" }
    ]
  },
  {
    key: "energy",
    label: "Energy",
    subtitle: "Oil, gas and energy benchmarks",
    symbols: [
      { name: "Brent Oil", tv: "TVC:UKOIL" },
      { name: "WTI Oil", tv: "TVC:USOIL" },
      { name: "Natural Gas", tv: "TVC:NATGAS" },
      { name: "Heating Oil", tv: "NYMEX:HO1!" }
    ]
  },
  {
    key: "indices",
    label: "Major Indices",
    subtitle: "Global large-cap market benchmarks",
    symbols: [
      { name: "S&P 500", tv: "SP:SPX" },
      { name: "Nasdaq 100", tv: "NASDAQ:NDX" },
      { name: "Dow Jones", tv: "DJ:DJI" },
      { name: "Russell 2000", tv: "TVC:RUT" },
      { name: "FTSE 100", tv: "TVC:UKX" },
      { name: "DAX", tv: "XETR:DAX" }
    ]
  },
  {
    key: "mega",
    label: "Mega Caps",
    subtitle: "Major US technology and industrial leaders",
    symbols: [
      { name: "NVIDIA", tv: "NASDAQ:NVDA" },
      { name: "Apple", tv: "NASDAQ:AAPL" },
      { name: "Microsoft", tv: "NASDAQ:MSFT" },
      { name: "Amazon", tv: "NASDAQ:AMZN" },
      { name: "Alphabet", tv: "NASDAQ:GOOGL" },
      { name: "Meta", tv: "NASDAQ:META" },
      { name: "Tesla", tv: "NASDAQ:TSLA" }
    ]
  },
  {
    key: "fx",
    label: "FX / Macro",
    subtitle: "Currencies, dollar index and rates",
    symbols: [
      { name: "US Dollar Index", tv: "TVC:DXY" },
      { name: "EUR/USD", tv: "FX:EURUSD" },
      { name: "USD/KZT", tv: "FX_IDC:USDKZT" },
      { name: "US 10Y Yield", tv: "TVC:US10Y" },
      { name: "Bitcoin", tv: "BITSTAMP:BTCUSD" }
    ]
  }
];

function TradingViewWidget({ symbols, activeSymbol }: { symbols: { name: string; tv: string }[]; activeSymbol: string }) {
  const quotesRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quotesRef.current) return;
    quotesRef.current.innerHTML = "";

    const container = document.createElement("div");
    container.className = "tradingview-widget-container__widget";
    quotesRef.current.appendChild(container);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 520,
      symbolsGroups: [
        {
          name: "Selected Market",
          originalName: "Selected Market",
          symbols: symbols.map((s) => ({ name: s.tv, displayName: s.name }))
        }
      ],
      showSymbolLogo: true,
      isTransparent: true,
      colorTheme: "dark",
      locale: "en",
      backgroundColor: "#050608"
    });
    quotesRef.current.appendChild(script);
  }, [symbols]);

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.innerHTML = "";

    const container = document.createElement("div");
    container.className = "tradingview-widget-container__widget";
    chartRef.current.appendChild(container);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: activeSymbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
      backgroundColor: "#050608",
      gridColor: "rgba(255,255,255,0.06)",
      hide_side_toolbar: false,
      withdateranges: true
    });
    chartRef.current.appendChild(script);
  }, [activeSymbol]);

  return (
    <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] p-3 backdrop-blur-xl">
        <div ref={quotesRef} className="min-h-[520px]" />
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <div className="text-xs uppercase tracking-[.22em] text-white/38">Interactive chart</div>
            <div className="mt-1 text-xl font-semibold">{activeSymbol}</div>
          </div>
          <BarChart3 className="text-copper-100" />
        </div>
        <div ref={chartRef} className="h-[520px]" />
      </div>
    </div>
  );
}

export default function DemoMarketDashboard() {
  const [active, setActive] = useState<CategoryKey>("metals");
  const selected = useMemo(() => categories.find((c) => c.key === active) || categories[0], [active]);
  const [activeSymbol, setActiveSymbol] = useState(selected.symbols[0].tv);

  useEffect(() => {
    setActiveSymbol(selected.symbols[0].tv);
  }, [selected]);

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
              <div className="text-[10px] uppercase tracking-[0.34em] text-white/45">Real-time Market Dashboard</div>
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
              Select a market category to view live TradingView quotes and an interactive chart.
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
              key={symbol.tv}
              onClick={() => setActiveSymbol(symbol.tv)}
              className={`rounded-xl border px-4 py-2 text-xs font-semibold transition ${
                activeSymbol === symbol.tv
                  ? "border-copper-300/50 bg-copper-500/20 text-copper-100"
                  : "border-white/10 bg-black/25 text-white/50 hover:border-copper-300/40 hover:text-white"
              }`}
            >
              {symbol.name}
            </button>
          ))}
        </section>

        <TradingViewWidget symbols={selected.symbols} activeSymbol={activeSymbol} />
      </div>
    </main>
  );
}
