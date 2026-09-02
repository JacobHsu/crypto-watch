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

// 時間級別細看頁：檔名 → TradingView interval
const TIMEFRAME_INTERVALS = {
  "15m": "15",
  "1h": "60",
  "4h": "240",
  "1d": "1D",
};

// 已建立細看頁的幣種（對應 btc/ 、eth/ 目錄）
const DETAIL_SYMBOLS = ["btc", "eth"];

// 快捷鍵字母 → 時間級別
const TIMEFRAME_KEYS = { h: "1h", f: "4h", d: "1d" };

// 從頁面標題或 URL 自動檢測加密貨幣符號
function detectCryptoSymbol() {
  // rwa.html 透過 ?s= 參數注入設定
  if (window.__RWA_CONFIG__) {
    return window.__RWA_CONFIG__;
  }

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
// overrides: 呼叫端的額外設定，最後套用（例如細看頁四格都要顯示側邊工具列）
function createChart(containerId, symbol, interval, indicatorSet, isColumn3 = false, overrides = {}) {
  const preset = isColumn3
    ? { ...column3ChartConfig }
    : { ...baseChartConfig, studies: indicatorSet };

  const config = {
    ...preset,
    container_id: containerId,
    symbol: symbol,
    interval: interval,
    timezone: "Asia/Taipei",
    autosize: true,
    ...overrides,
  };

  try {
    new TradingView.widget(config);
    // console.log(`圖表已創建: ${symbol} - ${interval} - ${containerId}`);
  } catch (error) {
    console.error(`創建圖表失敗 ${symbol}:`, error);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '<div class="loading">載入失敗</div>';
    }
  }
}

// 依目前頁面位置算出細看頁目標
// 回傳 { href, sameTab }；目前幣種沒有細看頁時回傳 null
function resolveTimeframeTarget(tf) {
  const path = window.location.pathname;

  // 已在細看頁（btc/1h.html）：同分頁切換級別
  if (/\/(btc|eth)\/[^/]+\.html$/.test(path)) {
    return { href: `${tf}.html`, sameTab: true };
  }

  const { prefix } = detectCryptoSymbol();
  const sym = prefix.replace("usdt", "");
  if (!DETAIL_SYMBOLS.includes(sym)) {
    return null;
  }

  // 1/ 、m/ 、o/ 等子目錄頁面需回上一層
  const dir = path.replace(/[^/]*$/, "");
  const base = /\/(1|m|o)\/$/.test(dir) ? "../" : "";

  return { href: `${base}${sym}/${tf}.html`, sameTab: false };
}

// ── 交易對自動偵測 ────────────────────────────────────────────────
// 一律問 TradingView scanner，不問交易所自己的 API：
//   1. scanner 就是圖表的資料來源，「scanner 查得到」等於「圖畫得出來」
//   2. Binance 只在 200 回應帶 Access-Control-Allow-Origin，查無交易對的 400
//      不帶，瀏覽器會整個擋掉，前端分不出「沒這個幣」與「連不上 API」；
//      scanner 帶 no_404=true 時查無資料是 200 + null，可以正常判讀
const TV_SCANNER = "https://scanner.tradingview.com";

// TradingView 上是否有這個 symbol
function tvSymbolExists(symbol) {
  const url = `${TV_SCANNER}/symbol?symbol=${encodeURIComponent(symbol)}&fields=close&no_404=true`;
  return fetch(url)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => Boolean(data && data.close !== undefined))
    .catch(() => false);
}

// 派網有少數交易對的 symbol 代碼跟代號對不上，例如
// XYZX→XYZUSDT.P、0G→ZEROGUSDT.P、2Z→TWOZUSDT.P、4→FOURUSDT.P、
// EDEN→OPENEDENUSDT.P、AIA→DEAGENTAIUSDT.P。
// 這種只能反過來用 description 撈（描述才是真正的代號）。
function tvFindPionexSymbol(ticker) {
  // 不要帶 Content-Type：scanner 的 Access-Control-Allow-Headers 只有 Referer / Accept，
  // 帶了會觸發 preflight 然後被擋掉。省略時瀏覽器送 text/plain（CORS 安全清單、
  // 不觸發 preflight），scanner 一樣吃得下 JSON body。
  return fetch(`${TV_SCANNER}/crypto/scan`, {
    method: "POST",
    body: JSON.stringify({
      filter: [
        { left: "exchange", operation: "equal", right: "PIONEX" },
        { left: "description", operation: "match", right: `${ticker} USDT` },
      ],
      columns: ["description"],
      range: [0, 20],
    }),
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((body) => {
      const rows = (body && body.data) || [];
      // description 形如 "XYZX USDT PERPETUAL"；反向盤（"USDT QQQX PERP"）不會中
      const hit = rows.find((r) => r.d[0].toUpperCase().startsWith(`${ticker} USDT `));
      return hit ? hit.s : null;
    })
    .catch(() => null);
}

// 派網代號 → 可用的 symbol；先照命名規則猜，猜不中再用 description 反查
function resolvePionexSymbol(ticker) {
  const guess = `PIONEX:${ticker}USDT.P`;
  return tvSymbolExists(guess).then((ok) => (ok ? guess : tvFindPionexSymbol(ticker)));
}

// 頁面對照表以外的代號要用哪個交易所
// altcoin.html 預設 BINANCE:{代號}USDT，rwa.html 預設 PIONEX:{代號}USDT.P，
// 預設值查無資料時才換到另一邊（派網的 RWA / 美股代幣 Binance 沒有現貨，
// 反之派網也沒有多數山寨幣）。全部查不到就 fail-open 沿用頁面原本的預設值。
// 回傳 Promise（不會 reject）或 null（該頁面不需要偵測）。
function resolveSymbolExchange() {
  const detect = window.__SYMBOL_AUTODETECT__;
  if (!detect) {
    return null;
  }

  const { ticker, prefer } = detect;
  const binanceSymbol = `BINANCE:${ticker}USDT`;

  const lookup =
    prefer === "PIONEX"
      ? resolvePionexSymbol(ticker).then((sym) =>
          sym || tvSymbolExists(binanceSymbol).then((ok) => (ok ? binanceSymbol : null))
        )
      : tvSymbolExists(binanceSymbol).then((ok) => (ok ? null : resolvePionexSymbol(ticker)));

  return lookup.then((symbol) => {
    if (!symbol || symbol === window.__RWA_CONFIG__.symbol) {
      return;
    }
    window.__RWA_CONFIG__ = { symbol, prefix: `${ticker.toLowerCase()}usdt` };
    console.log(`${ticker} 改用 ${symbol}`);
  });
}

window.__SYMBOL_READY__ = resolveSymbolExchange();

// 檢查 TradingView 是否已載入並初始化圖表
// initializeCharts() 由各頁面的 crypto.js 定義
function initializeIfReady() {
  if (typeof TradingView === "undefined") {
    console.log("等待 TradingView 載入...");
    setTimeout(initializeIfReady, 100);
    return;
  }

  // altcoin.html / rwa.html 的交易對偵測是非同步的，
  // 等 window.__SYMBOL_READY__ 定案再建圖；其他頁面沒有這個旗標就直接建
  const ready = window.__SYMBOL_READY__;
  if (ready && typeof ready.then === "function") {
    ready.then(() => initializeCharts());
  } else {
    initializeCharts();
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
    const target = '1/' + filename + window.location.search;
    window.open(target, '_blank');
    console.log('已開啟 ' + target);
  }

  // Shift+m 開啟 /m/ 對應檔案
  if (e.shiftKey && (e.key === 'M' || e.key === 'm')) {
    e.preventDefault();
    const filename = window.location.pathname.split('/').pop();
    const target = 'm/' + filename + window.location.search;
    window.open(target, '_blank');
    console.log('已開啟 ' + target);
  }

  // Shift+C 開啟 check.html
  if (e.shiftKey && (e.key === 'C' || e.key === 'c')) {
    e.preventDefault();
    const base = window.location.href.replace(/\/[^/]*$/, '/');
    const target = base + 'check.html';
    window.open(target, '_blank');
    console.log('已開啟 check.html');
  }

  // Shift+T 開啟 Traders Union 預測頁面（BTC / ETH 頁面）
  if (e.shiftKey && (e.key === 'T' || e.key === 't')) {
    const { symbol } = detectCryptoSymbol();
    if (symbol.includes('BTC')) {
      e.preventDefault();
      window.open('https://tradersunion.com/currencies/forecast/btc-usd/daily-and-weekly/', '_blank');
      console.log('已開啟 Traders Union BTC 預測頁面');
    } else if (symbol.includes('ETH')) {
      e.preventDefault();
      window.open('https://tradersunion.com/currencies/forecast/ethusd/daily-and-weekly/', '_blank');
      console.log('已開啟 Traders Union ETH 預測頁面');
    }
  }

  // Shift+H / Shift+F / Shift+D 開啟 1h / 4h / 1d 細看頁（2×2）
  // 在細看頁上按則同分頁切換級別
  if (e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
    const tf = TIMEFRAME_KEYS[e.key.toLowerCase()];
    const target = tf ? resolveTimeframeTarget(tf) : null;
    if (target) {
      e.preventDefault();
      if (target.sameTab) {
        window.location.href = target.href;
      } else {
        window.open(target.href, '_blank');
      }
      console.log('已開啟 ' + target.href);
    }
  }

  // Shift+4 開啟 Kronos Demo 頁面（僅 BTC 頁面）
  if (e.shiftKey && e.key === '$') {
    const { symbol } = detectCryptoSymbol();
    if (symbol.includes('BTC')) {
      e.preventDefault();
      window.open('https://shiyu-coder.github.io/Kronos-demo/', '_blank');
      console.log('已開啟 Kronos Demo 頁面');
    }
  }
});
