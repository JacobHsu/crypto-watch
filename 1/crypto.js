// 1/ 頁面：技術指標配置
const indicatorSets = {
  column1: [
    "STD;Ichimoku%1Cloud",
    "STD;Zig_Zag",
    "STD;Chaikin_Money_Flow"
  ],
  column2: [
    "STD;MA%Ribbon",
    "STD;VWMA",
    "STD;On_Balance_Volume",
  ],
  column3: [
    "STD;Volatility_Stop",
    "STD;Supertrend",
    "STD;Average_True_Range"
  ],
  column4: [
    "STD;MA%1Cross",
    "BookerReversal@tv-basicstudies",
    "STD;Divergence%1Indicator"
  ],
};

// 初始化圖表：1h / 1d × 4欄
function initializeCharts() {
  const { symbol, prefix } = detectCryptoSymbol();
  console.log(`TradingView 已載入，開始創建 ${symbol} 技術分析圖表...`);

  // 1小時
  setTimeout(() => createChart(`tradingview_${prefix}_1h_col1`, symbol, "60", indicatorSets.column1, false), 100);
  setTimeout(() => createChart(`tradingview_${prefix}_1h_col2`, symbol, "60", indicatorSets.column2, false), 200);
  setTimeout(() => createChart(`tradingview_${prefix}_1h_col3`, symbol, "60", indicatorSets.column3, false), 300);
  setTimeout(() => createChart(`tradingview_${prefix}_1h_col4`, symbol, "60", indicatorSets.column4, false), 400);

  // 1天
  setTimeout(() => createChart(`tradingview_${prefix}_1d_col1`, symbol, "1D", indicatorSets.column1, false), 500);
  setTimeout(() => createChart(`tradingview_${prefix}_1d_col2`, symbol, "1D", indicatorSets.column2, false), 600);
  setTimeout(() => createChart(`tradingview_${prefix}_1d_col3`, symbol, "1D", indicatorSets.column3, false), 700);
  setTimeout(() => createChart(`tradingview_${prefix}_1d_col4`, symbol, "1D", indicatorSets.column4, false), 800);
}

// 啟動
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeIfReady);
} else {
  initializeIfReady();
}
