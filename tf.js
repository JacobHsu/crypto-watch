// 單一時間級別細看頁：2×2 四張大圖
// 由 btc/1h.html、btc/4h.html、btc/1d.html、eth/*.html 載入
// 指標沿用 indicators.js 的 column1 ~ column4

// 從檔名（1h.html / 4h.html / 1d.html）推出 TradingView interval
function detectInterval() {
  const file = window.location.pathname.split("/").pop().replace(".html", "");
  const interval = TIMEFRAME_INTERVALS[file];

  if (!interval) {
    console.error(`無法辨識時間級別: ${file}`);
    return TIMEFRAME_INTERVALS["1h"];
  }

  return interval;
}

// 細看頁四格都顯示側邊繪圖工具列（總覽頁 3×4 維持只有第三欄顯示）
const detailChartOverrides = { hide_side_toolbar: false };

// 初始化圖表：單一時間級別 × 4 組指標
function initializeCharts() {
  const { symbol, prefix } = detectCryptoSymbol();
  const interval = detectInterval();
  console.log(`TradingView 已載入，開始創建 ${symbol} ${interval} 細看圖表...`);

  setTimeout(() => createChart(`tradingview_${prefix}_col1`, symbol, interval, indicatorSets.column1, false, detailChartOverrides), 100);
  setTimeout(() => createChart(`tradingview_${prefix}_col2`, symbol, interval, indicatorSets.column2, false, detailChartOverrides), 200);
  setTimeout(() => createChart(`tradingview_${prefix}_col3`, symbol, interval, indicatorSets.column3, true,  detailChartOverrides), 300);
  setTimeout(() => createChart(`tradingview_${prefix}_col4`, symbol, interval, indicatorSets.column4, false, detailChartOverrides), 400);
}

// 啟動
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeIfReady);
} else {
  initializeIfReady();
}
