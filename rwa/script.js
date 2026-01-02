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
function createChart(containerId, exchange, symbol, interval) {
  const config = {
    ...chartConfig,
    container_id: containerId,
    symbol: `${exchange}:${symbol}`,
    interval: interval,
    timezone: "Asia/Taipei",
    autosize: true,
  };

  try {
    new TradingView.widget(config);
    console.log(
      `圖表已創建: ${exchange}:${symbol} - ${interval}`
    );
  } catch (error) {
    console.error(`創建圖表失敗 ${exchange}:${symbol}:`, error);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '<div class="loading">載入失敗</div>';
    }
  }
}

// 等待 TradingView 載入的函數
function initializeIfReady(initCallback) {
  if (typeof TradingView !== "undefined") {
    initCallback();
  } else {
    console.log("等待 TradingView 載入...");
    setTimeout(() => initializeIfReady(initCallback), 100);
  }
}

// 自動初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initializeIfReady(initializeCharts));
} else {
  initializeIfReady(initializeCharts);
}

// 幣種配置（已在 HTML 中定義為全局變量）
// CRYPTO_SYMBOLS 來自 index.html

// 初始化所有圖表
function initializeCharts() {
  console.log("🎬 TradingView 已載入，開始創建圖表...");
  console.log("幣種配置:", CRYPTO_SYMBOLS);

  let delay = 100;

  CRYPTO_SYMBOLS.forEach(({ symbol, prefix, exchange }) => {
    console.log(`準備創建 ${exchange}:${symbol} 的圖表...`);

    // 15分鐘圖表
    setTimeout(() => {
      console.log(`創建: tradingview_${prefix}_15m`);
      createChart(`tradingview_${prefix}_15m`, exchange, symbol, "15");
    }, delay);
    delay += 100;

    // 1小時圖表
    setTimeout(() => {
      console.log(`創建: tradingview_${prefix}_1h`);
      createChart(`tradingview_${prefix}_1h`, exchange, symbol, "60");
    }, delay);
    delay += 100;

    // 4小時圖表
    setTimeout(() => {
      console.log(`創建: tradingview_${prefix}_4h`);
      createChart(`tradingview_${prefix}_4h`, exchange, symbol, "240");
    }, delay);
    delay += 100;
  });
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