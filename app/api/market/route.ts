import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const allowedSymbols = new Set([
  "HG=F", "GC=F", "SI=F", "PL=F", "PA=F", "ALI=F", "LEAD", "ZINC",
  "CL=F", "BZ=F",
  "^GSPC", "^IXIC", "^DJI", "^RUT", "^FTSE", "^GDAXI", "^STOXX50E",
  "NVDA", "AAPL", "MSFT", "AMZN", "GOOGL", "META", "TSLA", "BRK-B", "JPM", "XOM", "WMT",
  "DX-Y.NYB", "EURUSD=X", "USDKZT=X", "^TNX", "BTC-USD"
]);

const fallback: Record<string, { price: number; change: number; changePct: number; points: number[] }> = {
  "LEAD": { price: 2195, change: 8.4, changePct: 0.38, points: [2130,2140,2137,2150,2162,2158,2176,2188,2195] },
  "ZINC": { price: 2875, change: 14.2, changePct: 0.50, points: [2790,2805,2818,2809,2830,2844,2858,2864,2875] }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawSymbol = searchParams.get("symbol") || "HG=F";
  const symbol = decodeURIComponent(rawSymbol);

  if (!allowedSymbols.has(symbol)) {
    return NextResponse.json({ error: "Unsupported symbol" }, { status: 400 });
  }

  if (fallback[symbol]) {
    return NextResponse.json({
      symbol,
      source: "fallback",
      ...fallback[symbol]
    });
  }

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1mo&interval=1d`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 ApolloResourcesMarketDashboard"
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) throw new Error(`Upstream status ${response.status}`);

    const data = await response.json();
    const result = data?.chart?.result?.[0];
    const meta = result?.meta;
    const quote = result?.indicators?.quote?.[0];

    const closes = (quote?.close || []).filter((x: number | null) => typeof x === "number") as number[];
    const price = meta?.regularMarketPrice || closes[closes.length - 1] || 0;
    const previous = meta?.chartPreviousClose || closes[0] || price;
    const change = price - previous;
    const changePct = previous ? (change / previous) * 100 : 0;

    return NextResponse.json({
      symbol,
      source: "yahoo",
      price,
      change,
      changePct,
      points: closes.slice(-30)
    });
  } catch (error) {
    const synthetic = [100, 101, 100.7, 102, 103.4, 102.8, 104.1, 105.3, 106];
    return NextResponse.json({
      symbol,
      source: "fallback",
      price: synthetic[synthetic.length - 1],
      change: synthetic[synthetic.length - 1] - synthetic[0],
      changePct: ((synthetic[synthetic.length - 1] - synthetic[0]) / synthetic[0]) * 100,
      points: synthetic
    });
  }
}
