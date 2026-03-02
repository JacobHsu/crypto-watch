// 共用基礎配置
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

  return { symbol: 'BINANCE:ETHUSDT', prefix: 'ethusdt' };
}

// 創建圖表的函數
// isColumn3: 使用各頁面自定義的 column3ChartConfig（含 studies_overrides）
function createChart(containerId, symbol, interval, indicatorSet, isColumn3 = false) {
  let config;

  if (isColumn3) {
    config = {
      ...column3ChartConfig,
      container_id: containerId,
      symbol: symbol,
      interval: interval,
      timezone: "Asia/Taipei",
      autosize: true,
    };
  } else {
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
// initializeCharts() 由各頁面的 crypto.js 定義
function initializeIfReady() {
  if (typeof TradingView !== "undefined") {
    initializeCharts();
  } else {
    console.log("等待 TradingView 載入...");
    setTimeout(initializeIfReady, 100);
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

// 鍵盤快捷鍵：Shift+W 開啟 TradingView Widgets 頁面
window.addEventListener("keydown", function (e) {
  if (e.shiftKey && (e.key === 'W' || e.key === 'w')) {
    e.preventDefault();
    window.open('https://jacobhsu.github.io/tradingview-widgets/', '_blank');
    console.log('已開啟 TradingView Widgets 頁面');
  }

  // Shift+1 開啟 /1/ 對應檔案
  if (e.shiftKey && e.key === '!') {
    e.preventDefault();
    const filename = window.location.pathname.split('/').pop();
    const target = '1/' + filename;
    window.open(target, '_blank');
    console.log('已開啟 ' + target);
  }

  // Shift+m 開啟 /m/ 對應檔案
  if (e.shiftKey && (e.key === 'M' || e.key === 'm')) {
    e.preventDefault();
    const filename = window.location.pathname.split('/').pop();
    const target = 'm/' + filename;
    window.open(target, '_blank');
    console.log('已開啟 ' + target);
  }
});
