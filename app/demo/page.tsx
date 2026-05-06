"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, BarChart3, Globe2, TrendingUp, Activity } from "lucide-react";

const groups = [
  { key: "metals", label: "Metals" },
  { key: "energy", label: "Energy" },
  { key: "indices", label: "Major Indices" },
  { key: "mega", label: "Mega Caps" },
  { key: "fx", label: "FX / Macro" },
];

const quotes = [
  { group: "metals", name: "Copper", ticker: "COMEX: HG", price: "$4.62", change: "+1.24%", note: "Industrial metal" },
  { group: "metals", name: "Gold", ticker: "XAU/USD", price: "$2,392", change: "+0.41%", note: "Precious metal" },
  { group: "metals", name: "Silver", ticker: "XAG/USD", price: "$31.14", change: "-0.22%", note: "Precious metal" },
  { group: "metals", name: "Platinum", ticker: "XPT/USD", price: "$1,037", change: "+0.19%", note: "Precious metal" },
  { group: "metals", name: "Aluminum", ticker: "LME: ALI", price: "$2,545", change: "+0.63%", note: "Base metal" },
  { group: "metals", name: "Nickel", ticker: "LME: NICKEL", price: "$19,260", change: "-0.38%", note: "Battery / stainless metal" },

  { group: "energy", name: "Brent Oil", ticker: "UKOIL", price: "$82.50", change: "+0.77%", note: "Energy benchmark" },
  { group: "energy", name: "WTI Oil", ticker: "USOIL", price: "$78.14", change: "+0.52%", note: "Energy benchmark" },
  { group: "energy", name: "Natural Gas", ticker: "NATGAS", price: "$2.68", change: "-1.08%", note: "Energy commodity" },
  { group: "energy", name: "Heating Oil", ticker: "HO1!", price: "$2.48", change: "+0.36%", note: "Refined product" },

  { group: "indices", name: "S&P 500", ticker: "SPX", price: "5,218", change: "+0.34%", note: "US large-cap index" },
  { group: "indices", name: "Nasdaq 100", ticker: "NDX", price: "18,240", change: "+0.58%", note: "US technology index" },
  { group: "indices", name: "Dow Jones", ticker: "DJI", price: "39,112", change: "+0.21%", note: "US blue-chip index" },
  { group: "indices", name: "Russell 2000", ticker: "RUT", price: "2,081", change: "-0.09%", note: "US small-cap index" },
  { group: "indices", name: "FTSE 100", ticker: "UKX", price: "8,214", change: "+0.18%", note: "UK equity index" },

  { group: "mega", name: "NVIDIA", ticker: "NVDA", price: "$910.18", change: "+2.10%", note: "Semiconductors" },
  { group: "mega", name: "Apple", ticker: "AAPL", price: "$192.44", change: "-0.18%", note: "Consumer technology" },
  { group: "mega", name: "Microsoft", ticker: "MSFT", price: "$421.90", change: "+0.47%", note: "Software / cloud" },
  { group: "mega", name: "Amazon", ticker: "AMZN", price: "$184.12", change: "+0.31%", note: "E-commerce / cloud" },
  { group: "mega", name: "Alphabet", ticker: "GOOGL", price: "$171.55", change: "+0.28%", note: "Search / AI / cloud" },
  { group: "mega", name: "Meta", ticker: "META", price: "$487.21", change: "+0.74%", note: "Social platforms / AI" },
  { group: "mega", name: "Tesla", ticker: "TSLA", price: "$182.63", change: "-0.42%", note: "EV / energy storage" },

  { group: "fx", name: "US Dollar Index", ticker: "DXY", price: "104.21", change: "-0.15%", note: "USD macro basket" },
  { group: "fx", name: "EUR/USD", ticker: "EURUSD", price: "1.0834", change: "+0.11%", note: "Major FX pair" },
  { group: "fx", name: "USD/KZT", ticker: "USDKZT", price: "451.70", change: "+0.05%", note: "Kazakhstan tenge" },
  { group: "fx", name: "US 10Y Yield", ticker: "US10Y", price: "4.28%", change: "-0.03%", note: "Rates benchmark" },
];

export default function DemoMarketDashboard() {
  const [active, setActive] = useState("metals");

  const filtered = useMemo(() => quotes.filter((q) => q.group === active), [active]);
  const activeLabel = groups.find((g) => g.key === active)?.label || "Metals";

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
              <div className="text-[10px] uppercase tracking-[0.34em] text-white/45">Demo Market Dashboard</div>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-copper-500/30 bg-copper-500/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-copper-100">
              <Activity size={14} /> Demo Access
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
              Market Intelligence <span className="text-copper-300">& Quotes</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">
              Demo-level access to a curated market dashboard focused on metals, energy, major indices, mega-cap equities and macro indicators.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[.035] p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[.22em] text-white/38">Current category</div>
                <div className="mt-1 text-2xl font-semibold">{activeLabel}</div>
              </div>
              <Globe2 className="text-copper-100" />
            </div>
            <p className="mt-5 text-sm leading-6 text-white/52">
              This page is structured like a lightweight investing dashboard. Live TradingView widgets or licensed market data API can be connected in the next step.
            </p>
          </div>
        </section>

        <section className="mb-6 flex flex-wrap gap-3">
          {groups.map((group) => (
            <button
              key={group.key}
              onClick={() => setActive(group.key)}
              className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                active === group.key
                  ? "border-copper-300/50 bg-copper-500 text-white shadow-copper"
                  : "border-white/10 bg-white/[.035] text-white/62 hover:border-copper-300/40 hover:text-white"
              }`}
            >
              {group.label}
            </button>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <div className="text-xs uppercase tracking-[.22em] text-white/38">Watchlist</div>
                <h2 className="mt-1 text-2xl font-semibold">{activeLabel}</h2>
              </div>
              <TrendingUp className="text-copper-100" />
            </div>

            <div>
              {filtered.map((row, index) => (
                <div
                  key={row.ticker}
                  className={`grid grid-cols-[1fr_.85fr_.7fr_.6fr] items-center gap-3 px-5 py-4 text-sm ${
                    index !== filtered.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <div>
                    <div className="text-base font-semibold text-white/88">{row.name}</div>
                    <div className="text-xs text-white/38">{row.note}</div>
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

          <div className="grid gap-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] p-6 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(184,111,54,.2),transparent_35%)]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[.22em] text-white/38">Chart preview</div>
                    <h3 className="mt-1 text-2xl font-semibold">{activeLabel} Basket</h3>
                  </div>
                  <BarChart3 className="text-copper-100" />
                </div>

                <div className="mt-10 h-56">
                  <svg viewBox="0 0 520 220" className="h-full w-full">
                    <defs>
                      <linearGradient id="areaDemo" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(184,111,54,.45)" />
                        <stop offset="100%" stopColor="rgba(184,111,54,0)" />
                      </linearGradient>
                    </defs>
                    <path d="M0 168 C38 154, 72 164, 108 136 C148 102, 184 124, 218 90 C258 50, 292 104, 332 72 C372 40, 418 54, 520 30 L520 220 L0 220 Z" fill="url(#areaDemo)" />
                    <path d="M0 168 C38 154, 72 164, 108 136 C148 102, 184 124, 218 90 C258 50, 292 104, 332 72 C372 40, 418 54, 520 30" fill="none" stroke="#d89b64" strokeWidth="4" />
                  </svg>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-xs text-white/38">Assets</div>
                    <div className="mt-1 text-xl font-semibold">{filtered.length}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-xs text-white/38">Positive</div>
                    <div className="mt-1 text-xl font-semibold">{filtered.filter((x) => x.change.startsWith("+")).length}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-xs text-white/38">Mode</div>
                    <div className="mt-1 text-xl font-semibold">Demo</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-copper-500/20 bg-copper-500/10 p-6">
              <div className="text-xs uppercase tracking-[.22em] text-copper-100">Next integration</div>
              <p className="mt-3 text-sm leading-7 text-white/62">
                The next production step is to replace demo data with TradingView widgets or a licensed market data feed for real-time quotes and interactive charts.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
