// o/ 頁面：四組技術分析（副圖面板）
// 每一組 = 一張圖表：主圖指標疊在價格走勢圖上，三個副圖指標各自成為下方獨立窗格
//
// 時間級別由 ?t= 參數決定（15m / 1h / 4h / 1d），未指定或無法辨識時回退 4h：
//   o/btc.html            → 4H（預設）
//   o/btc.html?t=1d       → 1D
//   o/altcoin.html?s=SOL&t=1d  → 與 ?s= 併用
const analysisGroups = {
  // 第一組 趨勢面：判斷主要方向、趨勢強度與趨勢是否正在形成
  // 主圖 SuperTrend + 副圖 MACD / Directional Movement / CCI
  // 原本第四個副圖是 Aroon；py-tvscreener 對 BTC/ETH 的實證回測顯示 Aroon 幾乎是雜訊
  // （BTC 兩方向 edge 皆 ~+1pp）甚至負向（ETH 兩方向皆 ~-2pp），換成 CCI（ETH edge +6.7pp）
  group1: [
    "STD;Supertrend",
    "MACD@tv-basicstudies",
    "STD;DMI",
    "CCI@tv-basicstudies",
  ],
  // 第二組 動能面：判斷短期強弱、轉折與價格加速程度
  // 主圖 Hull MA (HMA) + 副圖 RSI / Stochastic RSI / Ultimate Oscillator
  // 原本第四個副圖是 ROC；py-tvscreener 從未直接回測 ROC，但同類指標（Awesome Oscillator、
  // Momentum）edge 都接近零，換成 Ultimate Oscillator（BTC 全報告最強單一訊號，edge +16.6pp）
  group2: [
    "STD;Hull%1MA",
    "RSI@tv-basicstudies",
    "STD;Stochastic_RSI",
    "STD;Ultimate_Oscillator",
  ],
  // 第三組 波動面：判斷波動壓縮、擴張與是否容易走出趨勢
  // 主圖 Bollinger Bands + 副圖 ATR / Choppiness Index / Historical Volatility
  group3: [
    "BB@tv-basicstudies",
    "ATR@tv-basicstudies",
    "STD;Choppiness_Index",
    "STD;Historical_Volatility",
  ],
  // 第四組 量價面：判斷價格變化是否有成交量與資金流向支持
  // 主圖 VWMA 20 + 副圖 On Balance Volume / Money Flow Index / Chaikin Money Flow
  group4: [
    "STD;VWMA",
    "STD;On_Balance_Volume",
    "STD;Money_Flow",
    "STD;Chaikin_Money_Flow",
  ],
};

// 時間級別 → 說明欄頂端顯示的文字
const PANE_TF_LABELS = {
  "15m": "15M · 15 分鐘級別",
  "1h": "1H · 1 小時級別",
  "4h": "4H · 4 小時級別",
  "1d": "1D · 日線級別",
};

const DEFAULT_PANE_TF = "4h";

// 從 ?t= 取出時間級別；未指定或無法辨識時回退到預設值
// TIMEFRAME_INTERVALS 由 crypto-base.js 提供（15m / 1h / 4h / 1d）
function detectPaneTimeframe() {
  const raw = (new URLSearchParams(window.location.search).get("t") || "").toLowerCase();
  const key = TIMEFRAME_INTERVALS[raw] ? raw : DEFAULT_PANE_TF;

  if (raw && key !== raw) {
    console.warn(`無法辨識的時間級別 ?t=${raw}，改用預設 ${DEFAULT_PANE_TF}`);
  }

  return { key, interval: TIMEFRAME_INTERVALS[key], label: PANE_TF_LABELS[key] };
}

// 把時間級別反映到分頁標題與說明欄標示
// HTML 的靜態標題帶 "- 4H" 作為 JS 失效時的 fallback，這裡先去尾再重新掛上
function applyPaneTimeframeUI(tf) {
  document.title = document.title.replace(/\s+-\s+[0-9A-Za-z]+$/, "") + " - " + tf.key.toUpperCase();

  const label = document.querySelector(".panel-tf");
  if (label) {
    label.textContent = tf.label;
  }
}

const paneTimeframe = detectPaneTimeframe();
applyPaneTimeframeUI(paneTimeframe);

// 初始化圖表：四組並排，全部使用同一個時間級別
function initializeCharts() {
  const { symbol, prefix } = detectCryptoSymbol();
  const { key, interval } = paneTimeframe;
  console.log(`TradingView 已載入，開始創建 ${symbol} ${key.toUpperCase()} 四組技術分析圖表...`);

  ["group1", "group2", "group3", "group4"].forEach((g, i) => {
    setTimeout(
      () => createChart(`tradingview_${prefix}_${g}`, symbol, interval, analysisGroups[g], false),
      100 * (i + 1)
    );
  });
}

// 啟動
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeIfReady);
} else {
  initializeIfReady();
}
