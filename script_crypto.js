// TradingView 圖表配置 - 通用加密貨幣技術分析版本
const baseChartConfig = {
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

// 五組不同的技術指標配置
const indicatorSets = {
  column1: ["BB@tv-basicstudies", "KLTNR@tv-basicstudies", "STD;Supertrend"],
  column2: [
    "STD;Multi-Time%Period%Charts",
    "STD;MA%1Cross",
    "STD;Williams_Alligator"
  ],
  column3: [
    "STD;PSAR",
    "MACD@tv-basicstudies",
    "RSI@tv-basicstudies"
  ],
  column4: [
    "STD;VWMA",
    "STD;DMI",
    "OBV@tv-basicstudies"
  ],
  column5: [
    "STD;Arnaud%1Legoux%1Moving%1Average",
    "STD;Willams_R",
    "STD;Aroon"
  ]
};

// 加密貨幣符號映射
const cryptoSymbols = {
  BTC: "BTCUSDT",
  ETH: "ETHUSDT",
  SOL: "SOLUSDT",
  WLD: "WLDUSDT"
};

// 獲取當前頁面的加密貨幣類型
function getCurrentCrypto() {
  const cryptoAttr = document.body.getAttribute('data-crypto');
  return cryptoAttr || 'ETH'; // 默認為 ETH
}

// 創建圖表的函數
function createChart(containerId, symbol, interval, indicatorSet) {
  const config = {
    ...baseChartConfig,
    container_id: containerId,
    symbol: `BINANCE:${symbol}`,
    interval: interval,
    timezone: "Asia/Taipei",
    autosize: true,
    studies: indicatorSet,
  };

  try {
    new TradingView.widget(config);
    console.log(`圖表已創建: ${symbol} - ${interval} - ${containerId}`);
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
  const currentCrypto = getCurrentCrypto();
  const symbol = cryptoSymbols[currentCrypto];
  const cryptoLower = currentCrypto.toLowerCase();
  
  console.log(`TradingView 已載入，開始創建 ${currentCrypto} 技術分析圖表...`);

  // 5分鐘圖表 - 五個不同指標組合
  setTimeout(() => createChart(`tradingview_${cryptoLower}_5m_col1`, symbol, "5", indicatorSets.column1), 100);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_5m_col2`, symbol, "5", indicatorSets.column2), 200);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_5m_col3`, symbol, "5", indicatorSets.column3), 300);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_5m_col4`, symbol, "5", indicatorSets.column4), 400);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_5m_col5`, symbol, "5", indicatorSets.column5), 500);

  // 15分鐘圖表 - 五個不同指標組合
  setTimeout(() => createChart(`tradingview_${cryptoLower}_15m_col1`, symbol, "15", indicatorSets.column1), 600);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_15m_col2`, symbol, "15", indicatorSets.column2), 700);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_15m_col3`, symbol, "15", indicatorSets.column3), 800);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_15m_col4`, symbol, "15", indicatorSets.column4), 900);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_15m_col5`, symbol, "15", indicatorSets.column5), 1000);

  // 30分鐘圖表 - 五個不同指標組合
  setTimeout(() => createChart(`tradingview_${cryptoLower}_30m_col1`, symbol, "30", indicatorSets.column1), 1100);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_30m_col2`, symbol, "30", indicatorSets.column2), 1200);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_30m_col3`, symbol, "30", indicatorSets.column3), 1300);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_30m_col4`, symbol, "30", indicatorSets.column4), 1400);
  setTimeout(() => createChart(`tradingview_${cryptoLower}_30m_col5`, symbol, "30", indicatorSets.column5), 1500);
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