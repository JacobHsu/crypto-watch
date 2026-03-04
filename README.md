# Crypto Watch - 加密貨幣監控儀表板

一個類似 cryptowatch.net 的實時加密貨幣監控網站，使用 TradingView Advanced Real-Time Chart 技術。

## 功能特色

- **實時圖表**: 使用 TradingView 的專業圖表技術
- **多頁面設計**: 主頁面 + 各幣種深度分析 + 特殊分析模式
- **多幣種監控**: BTC, ETH, XRP, SOL + RWA 資產 (SLVX, USOX, EWJX, EWYX)
- **多時間框架**: 1小時、4小時、日線圖表
- **四欄指標配置**: 每個時間框架顯示四組不同技術指標
- **自動截圖**: 每週一台灣時間 8:00 自動生成圖表截圖
- **響應式設計**: 適配各種螢幕尺寸
- **深色主題**: 專業的交易介面風格

## 頁面說明

### 主頁面 (`index.html`)
- **說明**: 綜合多幣種監控，四欄 × 三個時間框架
- **訪問**: https://jacobhsu.github.io/crypto-watch/

### 幣種深度分析頁面

每個幣種頁面使用 `crypto-base.js` 自動偵測符號，提供 1h/4h/1d × 4 欄指標組合：

| 頁面 | 交易對 | 交易所 |
|------|--------|--------|
| `btc.html` | BTCUSDT | Binance |
| `eth.html` | ETHUSDT | Binance |
| `sol.html` | SOLUSDT | Binance |
| `xrp.html` | XRPUSDT | Binance |

**訪問**: https://jacobhsu.github.io/crypto-watch/btc
(eth / sol / xrp 同理)

### 山寨幣通用頁面 (`altcoin.html`)
- **說明**: 通用山寨幣分析，透過 `?s=` 參數切換幣種，未定義的幣種自動組成 `BINANCE:XUSDT`
- **預設支援**: SOL, XRP, BNB, DOGE, ADA, SUI, PEPE, WLD 等（未列出的幣種自動 fallback）
- **交易所**: Binance (現貨)
- **訪問**: https://jacobhsu.github.io/crypto-watch/altcoin?s=WLD

#### 鍵盤快捷鍵（在任意幣種頁面按下）

| 快捷鍵 | 動作 | 時間框架 | 欄數 |
|--------|------|---------|------|
| 無 | `altcoin.html?s=X` | 1h / 4h / 1d | 4欄 |
| Shift+1 | `1/altcoin.html?s=X` | 1h / 1d | 5欄 |
| Shift+M | `m/altcoin.html?s=X` | 1w / 1M / 3M | 4欄 |
| Shift+W | 開啟 TradingView Widgets 頁面 | — | — |

### RWA 資產分析頁面 (`rwa.html`)
- **說明**: 實物資產代幣 (RWA)，透過 `?s=` 參數切換幣種
- **支援幣種**: SLVX (白銀)、USOX (美國石油)、EWJX (日本ETF)、EWYX (韓國ETF)
- **交易所**: Pionex
- **訪問**: https://jacobhsu.github.io/crypto-watch/rwa?s=SLVX

### MA 分析頁面 (`ma.html`)
- **技術指標**: MA Cross + Williams Alligator
- **適用場景**: 趨勢跟隨
- **訪問**: https://jacobhsu.github.io/crypto-watch/ma

### EMA 分析頁面 (`ema.html`)
- **技術指標**: SMA20/50 + EMA20/50 + Donchian Channels
- **適用場景**: 移動平均線分析
- **訪問**: https://jacobhsu.github.io/crypto-watch/ema


## 技術架構

- **前端**: HTML5, CSS3, JavaScript
- **圖表**: TradingView Advanced Real-Time Chart
- **數據源**: Binance 交易所 (主力幣種) / Pionex (RWA 資產)
- **自動化**: GitHub Actions + Puppeteer
- **樣式**: 現代化深色主題設計

## 四欄指標配置 (crypto.js)

主頁面與各幣種深度分析頁面共用四欄指標：

| 欄位 | 技術指標 | 說明 |
|------|----------|------|
| 第一欄 | Multi-Time Period Charts + Williams Fractals + Williams Alligator | 多時間框架 + 碎形 + 鱷魚線 |
| 第二欄 | Bollinger Bands + Keltner Channels + Supertrend | 波動性 + 趨勢確認 |
| 第三欄 | SMA20/50 + EMA20/50 + Donchian Channels | 移動平均線 (含顏色覆蓋) |
| 第四欄 | Chandelier Exit + PSAR + Linear Regression | 出場訊號 + 線性回歸 |

時間框架：**1小時 / 4小時 / 日線**

## 自動截圖系統

### 功能說明
- 每週一台灣時間 8:00 (UTC 週一 0:00) 自動拍攝截圖
- **BTC頁面截圖**: `btc.png`
- **ETH頁面截圖**: `eth.png`
- 每次更新覆蓋舊檔案，提供穩定的固定 URL

### 訪問截圖
- **BTC分析截圖**: https://jacobhsu.github.io/crypto-watch/screenshots/btc.png
- **ETH分析截圖**: https://jacobhsu.github.io/crypto-watch/screenshots/eth.png
- **展示頁面**: https://jacobhsu.github.io/crypto-watch/screenshots/

### 設置方法

#### 1. GitHub Actions 設定
前往 Repository **Settings** → **Actions** → **General**：
- 選擇 **"Allow all actions and reusable workflows"**
- 在 **"Workflow permissions"** 選擇 **"Read and write permissions"**
- 勾選 **"Allow GitHub Actions to create and approve pull requests"**

#### 2. GitHub Pages 設定
前往 Repository **Settings** → **Pages**：
- **Source**: 選擇 **"Deploy from a branch"**
- **Branch**: 選擇 **"main"** 和 **"/ (root)"**

#### 3. Repository 要求
- Repository 必須是 **Public**
- 主分支名稱為 **main**

#### 4. 手動觸發
前往 **Actions** 標籤 → 選擇 **"Weekly Crypto Watch Screenshot"** → 點擊 **"Run workflow"**

### 本地測試
```bash
npm install puppeteer
node screenshot.js
```

## 監控幣種

### 主力幣種 (Binance)
- **BTC/USDT** (比特幣)
- **ETH/USDT** (以太坊)
- **XRP/USDT** (瑞波幣)
- **SOL/USDT** (Solana)

### RWA 資產 (Pionex)
- **SLVXUSDT.P** (白銀 RWA)
- **USOXUSDT.P** (美國石油 RWA)
- **EWJXUSDT.P** (日本 ETF RWA)
- **EWYXUSDT.P** (韓國 ETF RWA)

## 專案結構

```
crypto-watch/
├── index.html              # 主頁面
├── btc.html                # BTC 深度分析
├── eth.html                # ETH 深度分析
├── sol.html                # SOL 深度分析
├── xrp.html                # XRP 深度分析
├── altcoin.html            # 山寨幣通用分析 (?s=WLD|SOL|...) 1h/4h/1d
├── rwa.html                # RWA 資產分析 (?s=SLVX|USOX|EWJX|EWYX)
├── ma.html                 # MA 分析頁面
├── ema.html                # EMA 分析頁面
├── 5min.html               # 5分鐘分析頁面
├── crypto-base.js          # 共用基礎配置 + 幣種自動偵測
├── crypto.js               # 主頁面/幣種頁面四欄指標配置
├── script.js               # 主頁面輔助腳本
├── script_ma.js            # MA 頁面腳本
├── script_ema.js           # EMA 頁面腳本
├── script_5min.js          # 5分鐘頁面腳本
├── styles.css              # 共用樣式
├── screenshot.js           # 自動截圖腳本 (Puppeteer)
├── package.json            # Node.js 依賴
├── 1/                      # Shift+1 子目錄 (1h/1d × 5欄)
│   ├── altcoin.html        # 山寨幣 (?s=WLD|SOL|...)
│   ├── rwa.html            # RWA 資產
│   ├── btc.html / eth.html
│   └── crypto.js           # 1/ 專用指標配置
├── m/                      # Shift+M 子目錄 (1w/1M/3M × 4欄)
│   ├── altcoin.html        # 山寨幣 (?s=WLD|SOL|...)
│   ├── rwa.html / sol.html / xrp.html
│   ├── btc.html / eth.html
│   └── crypto.js           # m/ 專用長週期指標配置
├── .github/workflows/
│   └── weekly-screenshot.yml  # 每週截圖 GitHub Actions
└── screenshots/            # 截圖輸出目錄
```

## 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 應用場景

1. **交易監控**: 實時監控多個幣種的技術指標
2. **趨勢分析**: 四欄指標組合全面分析市場趨勢
3. **RWA 追蹤**: 監控白銀、石油、ETF 等實物資產代幣
4. **報告生成**: 自動截圖功能便於生成每週報告
5. **API 整合**: 固定截圖 URL 可嵌入其他應用
