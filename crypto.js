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
      "id": "STD;Donchian_Channels"
    },
  ],
  column4: [
    "STD;MA%Ribbon",
    "STD;PSAR",
    "STD;Linear_Regression",
  ]
};

// 第三組的完整配置（帶顏色覆蓋）
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

  // 技術指標配置
  studies: indicatorSets.column3,

  // 指標顏色覆蓋配置
  studies_overrides: {
    "moving average.ma.color.0": "#ff9800",
    "moving average exponential.ma.color.0": "#00bcd4",
  },
};

// 從頁面標題或 URL 自動檢測加密貨幣符號
function detectCryptoSymbol() {
  const title = document.title;
  const url = window.location.pathname;

  if (title.includes('XAUTUSDT') || url.includes('xaut')) {
    return { symbol: 'PIONEX:XAUTUSDT.P', prefix: 'xautusdt' };
  } else if (title.includes('SLVXUSDT') || url.includes('slvx')) {
    return { symbol: 'PIONEX:SLVXUSDT.P', prefix: 'slvxusdt' };
  } else if (title.includes('ETHUSDT') || url.includes('eth')) {
    return { symbol: 'BINANCE:ETHUSDT', prefix: 'ethusdt' };
  } else if (title.includes('BTCUSDT') || url.includes('btc')) {
    return { symbol: 'BINANCE:BTCUSDT', prefix: 'btcusdt' };
  } else if (title.includes('SOLUSDT') || url.includes('sol')) {
    return { symbol: 'BINANCE:SOLUSDT', prefix: 'solusdt' };
  } else if (title.includes('XRPUSDT') || url.includes('xrp')) {
    return { symbol: 'BINANCE:XRPUSDT', prefix: 'xrpusdt' };
  }

  // 預設為 ETHUSDT
  return { symbol: 'BINANCE:ETHUSDT', prefix: 'ethusdt' };
}

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
  const cryptoInfo = detectCryptoSymbol();
  const cryptoSymbol = cryptoInfo.symbol;
  const prefix = cryptoInfo.prefix;


  console.log(`TradingView 已載入，開始創建 ${cryptoSymbol} 技術分析圖表...`);

  // Detect if we should use long-term intervals (folder 'm')
  const isLongTerm = window.location.pathname.includes('/m/');

  if (isLongTerm) {
    // 1週圖表
    setTimeout(() => createChart(`tradingview_${prefix}_1w_col1`, cryptoSymbol, "1W", indicatorSets.column1, false), 100);
    setTimeout(() => createChart(`tradingview_${prefix}_1w_col2`, cryptoSymbol, "1W", indicatorSets.column2, false), 200);
    setTimeout(() => createChart(`tradingview_${prefix}_1w_col3`, cryptoSymbol, "1W", indicatorSets.column3, true), 300);
    setTimeout(() => createChart(`tradingview_${prefix}_1w_col4`, cryptoSymbol, "1W", indicatorSets.column4, false), 400);

    // 1月圖表
    setTimeout(() => createChart(`tradingview_${prefix}_1M_col1`, cryptoSymbol, "1M", indicatorSets.column1, false), 500);
    setTimeout(() => createChart(`tradingview_${prefix}_1M_col2`, cryptoSymbol, "1M", indicatorSets.column2, false), 600);
    setTimeout(() => createChart(`tradingview_${prefix}_1M_col3`, cryptoSymbol, "1M", indicatorSets.column3, true), 700);
    setTimeout(() => createChart(`tradingview_${prefix}_1M_col4`, cryptoSymbol, "1M", indicatorSets.column4, false), 800);

    // 3月圖表
    setTimeout(() => createChart(`tradingview_${prefix}_3M_col1`, cryptoSymbol, "3M", indicatorSets.column1, false), 900);
    setTimeout(() => createChart(`tradingview_${prefix}_3M_col2`, cryptoSymbol, "3M", indicatorSets.column2, false), 1000);
    setTimeout(() => createChart(`tradingview_${prefix}_3M_col3`, cryptoSymbol, "3M", indicatorSets.column3, true), 1100);
    setTimeout(() => createChart(`tradingview_${prefix}_3M_col4`, cryptoSymbol, "3M", indicatorSets.column4, false), 1200);
  } else {
    // 1小時圖表
    setTimeout(() => createChart(`tradingview_${prefix}_1h_col1`, cryptoSymbol, "60", indicatorSets.column1, false), 100);
    setTimeout(() => createChart(`tradingview_${prefix}_1h_col2`, cryptoSymbol, "60", indicatorSets.column2, false), 200);
    setTimeout(() => createChart(`tradingview_${prefix}_1h_col3`, cryptoSymbol, "60", indicatorSets.column3, true), 300);
    setTimeout(() => createChart(`tradingview_${prefix}_1h_col4`, cryptoSymbol, "60", indicatorSets.column4, false), 400);

    // 4小時圖表
    setTimeout(() => createChart(`tradingview_${prefix}_4h_col1`, cryptoSymbol, "240", indicatorSets.column1, false), 500);
    setTimeout(() => createChart(`tradingview_${prefix}_4h_col2`, cryptoSymbol, "240", indicatorSets.column2, false), 600);
    setTimeout(() => createChart(`tradingview_${prefix}_4h_col3`, cryptoSymbol, "240", indicatorSets.column3, true), 700);
    setTimeout(() => createChart(`tradingview_${prefix}_4h_col4`, cryptoSymbol, "240", indicatorSets.column4, false), 800);

    // 1天圖表
    setTimeout(() => createChart(`tradingview_${prefix}_1d_col1`, cryptoSymbol, "1D", indicatorSets.column1, false), 900);
    setTimeout(() => createChart(`tradingview_${prefix}_1d_col2`, cryptoSymbol, "1D", indicatorSets.column2, false), 1000);
    setTimeout(() => createChart(`tradingview_${prefix}_1d_col3`, cryptoSymbol, "1D", indicatorSets.column3, true), 1100);
    setTimeout(() => createChart(`tradingview_${prefix}_1d_col4`, cryptoSymbol, "1D", indicatorSets.column4, false), 1200);
  }
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

// 鍵盤快捷鍵：Shift+M 開啟 TradingView Widgets 頁面
window.addEventListener("keydown", function (e) {
  if (e.shiftKey && (e.key === 'M' || e.key === 'm')) {
    e.preventDefault();
    window.open('https://jacobhsu.github.io/tradingview-widgets/', '_blank');
    console.log('已開啟 TradingView Widgets 頁面');
  }
});