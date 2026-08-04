// o/ 頁面：4 小時級別 · 四組技術分析
// 每一組 = 一張圖表：主圖指標疊在價格走勢圖上，三個副圖指標各自成為下方獨立窗格
const analysisGroups = {
  // 第一組 趨勢面：判斷主要方向、趨勢強度與趨勢是否正在形成
  // 主圖 SuperTrend + 副圖 MACD / Directional Movement / Aroon
  group1: [
    "STD;Supertrend",
    "MACD@tv-basicstudies",
    "STD;DMI",
    "STD;Aroon",
  ],
  // 第二組 動能面：判斷短期強弱、轉折與價格加速程度
  // 主圖 Hull MA (HMA) + 副圖 RSI / Stochastic RSI / Rate of Change
  group2: [
    "STD;Hull%1MA",
    "RSI@tv-basicstudies",
    "STD;Stochastic_RSI",
    "ROC@tv-basicstudies",
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

// 初始化圖表：四組並排，全部使用 4 小時（240）級別
function initializeCharts() {
  const { symbol, prefix } = detectCryptoSymbol();
  const interval = "240"; // 4 小時
  console.log(`TradingView 已載入，開始創建 ${symbol} 4H 四組技術分析圖表...`);

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
