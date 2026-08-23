// 根目錄共用：技術指標配置
// 由 crypto.js（3列×4欄總覽）與 tf.js（2×2 單級別細看）共用
const indicatorSets = {
  column1: [
    "STD;Multi-Time%Period%Charts",
    "STD;Whilliams_Fractals",
    "STD;Williams_Alligator",
    "STD;PSAR"
  ],
  column2: [
    "BB@tv-basicstudies",
    "KLTNR@tv-basicstudies",
    "STD;MA%1Cross",
    "STD;Volatility_Stop"
  ],
  column3: [
    { "id": "MASimple@tv-basicstudies", "inputs": { "length": 20 } },
    { "id": "MASimple@tv-basicstudies", "inputs": { "length": 50 } },
    { "id": "MAExp@tv-basicstudies",    "inputs": { "length": 20 } },
    { "id": "MAExp@tv-basicstudies",    "inputs": { "length": 50 } },
    { "id": "STD;Donchian_Channels" },
  ],
  column4: [
    "STD;Zig_Zag",
    "STD;Supertrend",
    "STD;Linear_Regression",
    "STD;VWMA"
  ],
};

// 第三欄專用配置（含 MA 顏色覆蓋）
const column3ChartConfig = {
  ...baseChartConfig,
  hide_side_toolbar: false,
  studies: indicatorSets.column3,
  studies_overrides: {
    "moving average.ma.color.0": "#ff9800",
    "moving average exponential.ma.color.0": "#00bcd4",
  },
};
