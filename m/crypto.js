// m/ 頁面：長期技術指標配置
const indicatorSets = {
  column1: [
    "STD;Multi-Time%Period%Charts",
    "STD;MA%1Cross",
    "STD;Williams_Alligator"
  ],
  column2: [
    "BB@tv-basicstudies",
    "KLTNR@tv-basicstudies",
    "STD;Supertrend"
  ],
  column3: [
    { "id": "MASimple@tv-basicstudies", "inputs": { "length": 20 } },
    { "id": "MASimple@tv-basicstudies", "inputs": { "length": 50 } },
    { "id": "MAExp@tv-basicstudies",    "inputs": { "length": 20 } },
    { "id": "MAExp@tv-basicstudies",    "inputs": { "length": 50 } },
    { "id": "STD;Donchian_Channels" },
  ],
  column4: [
    "STD;MA%Ribbon",
    "STD;PSAR",
    "STD;Linear_Regression",
  ],
  // 3M 最後一個圖表專用：以 Technical Ratings 取代 Linear Regression
  column4Monthly: [
    "STD;MA%Ribbon",
    "STD;PSAR",
    "STD;Technical%1Ratings",
  ],
};

// 第三欄專用配置（含 MA 顏色覆蓋）
const column3ChartConfig = {
  ...baseChartConfig,
  hide_side_toolbar: false,
  studies: indicatorSets.column3,
  studies_overrides: {
    "moving average.ma.color.0": "#ff9800",
    "moving average exponential.ma.color.0": "#00bcd4",
  },
};

// 初始化圖表：1W / 1M / 3M × 4欄
function initializeCharts() {
  const { symbol, prefix } = detectCryptoSymbol();
  console.log(`TradingView 已載入，開始創建 ${symbol} 長期技術分析圖表...`);

  // 1週
  setTimeout(() => createChart(`tradingview_${prefix}_1w_col1`, symbol, "1W", indicatorSets.column1, false), 100);
  setTimeout(() => createChart(`tradingview_${prefix}_1w_col2`, symbol, "1W", indicatorSets.column2, false), 200);
  setTimeout(() => createChart(`tradingview_${prefix}_1w_col3`, symbol, "1W", indicatorSets.column3, true),  300);
  setTimeout(() => createChart(`tradingview_${prefix}_1w_col4`, symbol, "1W", indicatorSets.column4, false), 400);

  // 1月
  setTimeout(() => createChart(`tradingview_${prefix}_1M_col1`, symbol, "1M", indicatorSets.column1, false), 500);
  setTimeout(() => createChart(`tradingview_${prefix}_1M_col2`, symbol, "1M", indicatorSets.column2, false), 600);
  setTimeout(() => createChart(`tradingview_${prefix}_1M_col3`, symbol, "1M", indicatorSets.column3, true),  700);
  setTimeout(() => createChart(`tradingview_${prefix}_1M_col4`, symbol, "1M", indicatorSets.column4, false), 800);

  // 3月
  setTimeout(() => createChart(`tradingview_${prefix}_3M_col1`, symbol, "3M", indicatorSets.column1, false),        900);
  setTimeout(() => createChart(`tradingview_${prefix}_3M_col2`, symbol, "3M", indicatorSets.column2, false),        1000);
  setTimeout(() => createChart(`tradingview_${prefix}_3M_col3`, symbol, "3M", indicatorSets.column3, true),         1100);
  setTimeout(() => createChart(`tradingview_${prefix}_3M_col4`, symbol, "3M", indicatorSets.column4Monthly, false), 1200);
}

// 啟動
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeIfReady);
} else {
  initializeIfReady();
}
