// 根目錄頁面：技術指標配置
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

// 初始化圖表：1h / 4h / 1d × 4欄
function initializeCharts() {
  const { symbol, prefix } = detectCryptoSymbol();
  console.log(`TradingView 已載入，開始創建 ${symbol} 技術分析圖表...`);

  // 1小時
  setTimeout(() => createChart(`tradingview_${prefix}_1h_col1`, symbol, "60",  indicatorSets.column1, false), 100);
  setTimeout(() => createChart(`tradingview_${prefix}_1h_col2`, symbol, "60",  indicatorSets.column2, false), 200);
  setTimeout(() => createChart(`tradingview_${prefix}_1h_col3`, symbol, "60",  indicatorSets.column3, true),  300);
  setTimeout(() => createChart(`tradingview_${prefix}_1h_col4`, symbol, "60",  indicatorSets.column4, false), 400);

  // 4小時
  setTimeout(() => createChart(`tradingview_${prefix}_4h_col1`, symbol, "240", indicatorSets.column1, false), 500);
  setTimeout(() => createChart(`tradingview_${prefix}_4h_col2`, symbol, "240", indicatorSets.column2, false), 600);
  setTimeout(() => createChart(`tradingview_${prefix}_4h_col3`, symbol, "240", indicatorSets.column3, true),  700);
  setTimeout(() => createChart(`tradingview_${prefix}_4h_col4`, symbol, "240", indicatorSets.column4, false), 800);

  // 1天
  setTimeout(() => createChart(`tradingview_${prefix}_1d_col1`, symbol, "1D",  indicatorSets.column1, false), 900);
  setTimeout(() => createChart(`tradingview_${prefix}_1d_col2`, symbol, "1D",  indicatorSets.column2, false), 1000);
  setTimeout(() => createChart(`tradingview_${prefix}_1d_col3`, symbol, "1D",  indicatorSets.column3, true),  1100);
  setTimeout(() => createChart(`tradingview_${prefix}_1d_col4`, symbol, "1D",  indicatorSets.column4, false), 1200);
}

// 啟動
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeIfReady);
} else {
  initializeIfReady();
}
