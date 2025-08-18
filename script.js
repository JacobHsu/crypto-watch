// TradingView 圖表配置
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

  // 技術指標配置
  studies: ["BB@tv-basicstudies", "KLTNR@tv-basicstudies", "STD;Supertrend"],

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
function createChart(containerId, symbol, interval) {
  const config = {
    ...chartConfig,
    container_id: containerId,
    symbol: `BINANCE:${symbol}`,
    interval: interval,
    timezone: "Asia/Taipei",
    autosize: true,
  };

  try {
    new TradingView.widget(config);
    console.log(
      `圖表已創建: ${symbol} - ${interval}}`
    );
  } catch (error) {
    console.error(`創建圖表失敗 ${symbol}:`, error);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '<div class="loading">載入失敗</div>';
    }
  }
}

// 等待頁面載入完成後初始化圖表
document.addEventListener("DOMContentLoaded", function () {
  // 等待 TradingView 腳本載入
  const checkTradingView = setInterval(() => {
    if (typeof TradingView !== "undefined") {
      clearInterval(checkTradingView);
      initializeCharts();
    }
  }, 100);

  // 超時處理
  setTimeout(() => {
    if (typeof TradingView === "undefined") {
      clearInterval(checkTradingView);
      console.error("TradingView 載入超時");
    }
  }, 10000);
});

// 初始化所有圖表
function initializeCharts() {
  console.log("TradingView 已載入，開始創建圖表...");

  // 15分鐘圖表
  setTimeout(() => createChart("tradingview_btc_15m", "BTCUSDT", "15"), 100);
  setTimeout(() => createChart("tradingview_eth_15m", "ETHUSDT", "15"), 200);
  setTimeout(() => createChart("tradingview_xrp_15m", "XRPUSDT", "15"), 300);
  setTimeout(() => createChart("tradingview_sol_15m", "SOLUSDT", "15"), 400);

  // 1小時圖表
  setTimeout(() => createChart("tradingview_btc_1h", "BTCUSDT", "60"), 500);
  setTimeout(() => createChart("tradingview_eth_1h", "ETHUSDT", "60"), 600);
  setTimeout(() => createChart("tradingview_xrp_1h", "XRPUSDT", "60"), 700);
  setTimeout(() => createChart("tradingview_sol_1h", "SOLUSDT", "60"), 800);

  // 4小時圖表
  setTimeout(() => createChart("tradingview_btc_4h", "BTCUSDT", "240"), 900);
  setTimeout(() => createChart("tradingview_eth_4h", "ETHUSDT", "240"), 1000);
  setTimeout(() => createChart("tradingview_xrp_4h", "XRPUSDT", "240"), 1100);
  setTimeout(() => createChart("tradingview_sol_4h", "SOLUSDT", "240"), 1200);
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
