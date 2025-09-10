// TradingView 圖表配置 - 5分鐘分析版本
const chartConfig = {
  width: "100%",
  height: "100%",
  theme: "dark",
  style: "1",
  locale: "zh_TW",
  toolbar_bg: "#131722",
  enable_publishing: false,
  hide_top_toolbar: true,
  hide_legend: false,
  save_image: false,
  hide_side_toolbar: true,
  allow_symbol_change: false,
  container_id: "",

  // 技術指標配置 - Bollinger Bands 和 Stochastic RSI
  studies: [
    "BB@tv-basicstudies",
    "STD;Stochastic_RSI", // "STD;VWMA", // "STD;MA%1Cross",
    "STD;MA%1Cross",
  ],

  // ETH 技術分析專用配置 - MACD, PSAR, VWMA
  ethTechStudies: [
    "STD;PSAR",
    "MACD@tv-basicstudies",
    "STD;VWMA",              
  ],

  // 圖表樣式
  overrides: {
    "paneProperties.background": "#131722",
    "paneProperties.backgroundType": "solid",
    "paneProperties.vertGridProperties.color": "#363c4e",
    "paneProperties.horzGridProperties.color": "#363c4e",
    "symbolWatermarkProperties.transparency": 90,
    "scalesProperties.textColor": "#d1d4dc",
    "scalesProperties.backgroundColor": "#131722",
    "mainSeriesProperties.candleStyle.upColor": "#089981",
    "mainSeriesProperties.candleStyle.downColor": "#f23645",
    "mainSeriesProperties.candleStyle.drawWick": true,
    "mainSeriesProperties.candleStyle.drawBorder": true,
    "mainSeriesProperties.candleStyle.borderColor": "#378658",
    "mainSeriesProperties.candleStyle.borderUpColor": "#089981",
    "mainSeriesProperties.candleStyle.borderDownColor": "#f23645",
    "mainSeriesProperties.candleStyle.wickUpColor": "#089981",
    "mainSeriesProperties.candleStyle.wickDownColor": "#f23645",
  },
};

// 創建圖表的函數
function createChart(containerId, symbol, interval, isEthTech = false) {
  const config = {
    ...chartConfig,
    container_id: containerId,
    symbol: `BINANCE:${symbol}`,
    interval: interval,
    timezone: "Asia/Taipei",
    autosize: true,
    studies: isEthTech ? chartConfig.ethTechStudies : chartConfig.studies,
  };

  try {
    new TradingView.widget(config);
    console.log(`圖表已創建: ${symbol} - ${interval}${isEthTech ? ' (技術分析)' : ''}`);
  } catch (error) {
    console.error(`創建圖表失敗 ${symbol}:`, error);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '<div class="loading">載入失敗</div>';
    }
  }
}

// 檢查 TradingView 是否已載入並初始化圖表
function initializeIfReady() {
  if (typeof TradingView !== "undefined") {
    initializeCharts();
  } else {
    console.log("等待 TradingView 載入...");
    // 如果 TradingView 還沒載入，等待一下再試
    setTimeout(initializeIfReady, 100);
  }
}

// 立即檢查是否可以初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeIfReady);
} else {
  initializeIfReady();
}

// 初始化所有圖表
function initializeCharts() {
  console.log("TradingView 已載入，開始創建圖表...");

  // 1分鐘圖表
  setTimeout(() => createChart("tradingview_eth_1m", "ETHUSDT", "1"), 100);
  setTimeout(() => createChart("tradingview_eth_tech_1m", "ETHUSDT", "1", true), 200);
  setTimeout(() => createChart("tradingview_btc_1m", "BTCUSDT", "1"), 300);
  setTimeout(() => createChart("tradingview_wld_1m", "WLDUSDT", "1"), 400);

  // 3分鐘圖表
  setTimeout(() => createChart("tradingview_eth_3m", "ETHUSDT", "3"), 500);
  setTimeout(() => createChart("tradingview_eth_tech_3m", "ETHUSDT", "3", true), 600);
  setTimeout(() => createChart("tradingview_btc_3m", "BTCUSDT", "3"), 700);
  setTimeout(() => createChart("tradingview_wld_3m", "WLDUSDT", "3"), 800);

  // 5分鐘圖表
  setTimeout(() => createChart("tradingview_eth_5m", "ETHUSDT", "5"), 900);
  setTimeout(() => createChart("tradingview_eth_tech_5m", "ETHUSDT", "5", true), 1000);
  setTimeout(() => createChart("tradingview_btc_5m", "BTCUSDT", "5"), 1100);
  setTimeout(() => createChart("tradingview_wld_5m", "WLDUSDT", "5"), 1200);
}

// 錯誤處理
window.addEventListener("error", function (e) {
  console.error("頁面錯誤:", e.error);
});

// 調整視窗大小時重新調整圖表
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    console.log("視窗大小已改變，圖表將自動調整");
  }, 250);
});