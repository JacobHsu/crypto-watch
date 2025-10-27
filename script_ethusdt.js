// TradingView 圖表配置 - ETHUSDT 技術分析版本
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

// 四組不同的技術指標配置
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
    {
      "id": "MASimple@tv-basicstudies",
      "inputs": {
        "length": 20
      }
    },
    {
      "id": "MASimple@tv-basicstudies",
      "inputs": {
        "length": 50
      }
    },
    {
      "id": "MAExp@tv-basicstudies",
      "inputs": {
        "length": 20
      }
    },
    {
      "id": "MAExp@tv-basicstudies",
      "inputs": {
        "length": 50
      }
    },
    {
      "id": "MAExp@tv-basicstudies",
      "inputs": {
        "length": 100
      }
    }
  ],
  column4: [
    "STD;MA%Ribbon",
    "STD;PSAR",
    "STD;Pivot%1Points%1High%1Low"
  ]
};

// ETHUSDT 符號
const cryptoSymbol = "BINANCE:ETHUSDT";

// 第三組的完整配置（帶顏色覆蓋）- 按照 ema.html 的完全相同方式
const column3ChartConfig = {
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
  hide_side_toolbar: false,
  allow_symbol_change: false,
  container_id: "",

  // 技術指標配置 - 與 ema.html 相同結構
  studies: indicatorSets.column3,

  // 指標顏色覆蓋配置 - 與 ema.html 完全相同
  studies_overrides: {
    "moving average.ma.color.0": "#ff9800",
  },

  // 圖表樣式 - 需要包含 baseChartConfig 的 overrides
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
function createChart(containerId, symbol, interval, indicatorSet, isColumn3 = false) {
  let config;

  if (isColumn3) {
    // 第三組使用獨立配置，不重新設置 studies
    config = {
      ...column3ChartConfig,
      container_id: containerId,
      symbol: symbol,
      interval: interval,
      timezone: "Asia/Taipei",
      autosize: true,
    };
  } else {
    // 其他組使用基礎配置
    config = {
      ...baseChartConfig,
      container_id: containerId,
      symbol: symbol,
      interval: interval,
      timezone: "Asia/Taipei",
      autosize: true,
      studies: indicatorSet,
    };
  }

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
  console.log(`TradingView 已載入，開始創建 ETHUSDT 技術分析圖表...`);

  // 1小時圖表 - 四個不同指標組合
  setTimeout(() => createChart("tradingview_ethusdt_1h_col1", cryptoSymbol, "60", indicatorSets.column1, false), 100);
  setTimeout(() => createChart("tradingview_ethusdt_1h_col2", cryptoSymbol, "60", indicatorSets.column2, false), 200);
  setTimeout(() => createChart("tradingview_ethusdt_1h_col3", cryptoSymbol, "60", indicatorSets.column3, true), 300);
  setTimeout(() => createChart("tradingview_ethusdt_1h_col4", cryptoSymbol, "60", indicatorSets.column4, false), 400);

  // 4小時圖表 - 四個不同指標組合
  setTimeout(() => createChart("tradingview_ethusdt_4h_col1", cryptoSymbol, "240", indicatorSets.column1, false), 500);
  setTimeout(() => createChart("tradingview_ethusdt_4h_col2", cryptoSymbol, "240", indicatorSets.column2, false), 600);
  setTimeout(() => createChart("tradingview_ethusdt_4h_col3", cryptoSymbol, "240", indicatorSets.column3, true), 700);
  setTimeout(() => createChart("tradingview_ethusdt_4h_col4", cryptoSymbol, "240", indicatorSets.column4, false), 800);

  // 1天圖表 - 四個不同指標組合
  setTimeout(() => createChart("tradingview_ethusdt_1d_col1", cryptoSymbol, "1D", indicatorSets.column1, false), 900);
  setTimeout(() => createChart("tradingview_ethusdt_1d_col2", cryptoSymbol, "1D", indicatorSets.column2, false), 1000);
  setTimeout(() => createChart("tradingview_ethusdt_1d_col3", cryptoSymbol, "1D", indicatorSets.column3, true), 1100);
  setTimeout(() => createChart("tradingview_ethusdt_1d_col4", cryptoSymbol, "1D", indicatorSets.column4, false), 1200);
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
