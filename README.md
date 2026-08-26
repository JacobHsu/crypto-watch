# Crypto Watch - 加密貨幣監控儀表板

一個類似 cryptowatch.net 的實時加密貨幣監控網站，使用 TradingView Advanced Real-Time Chart 技術。

## 功能特色

- **實時圖表**: 使用 TradingView 的專業圖表技術
- **多頁面設計**: 主頁面 + 各幣種深度分析 + 特殊分析模式
- **多幣種監控**: BTC, ETH, XRP, SOL + RWA 資產 (SLVX 白銀, USOX 石油, EWJX 日股, EWYX 韓股, XAUT 黃金…可用 `rwa?s=` 擴充)
- **多時間框架**: 15分、1小時、4小時、日線、週線、月線、季線（依頁面而異）
- **四欄指標配置**: 每個時間框架顯示四組不同技術指標
- **交易決策 Checklist**: `check.html` 引導式問答，對照圖表逐項核對後給出綜合建議
- **自動截圖**: 每週一台灣時間 8:00 自動生成圖表截圖
- **響應式設計**: 適配各種螢幕尺寸
- **深色主題**: 專業的交易介面風格

## 頁面說明

### 主頁面 (`index.html`)
- **說明**: 綜合多幣種監控，四欄 × 三個時間框架
- **訪問**: https://jacobhsu.github.io/crypto-watch/

### 幣種深度分析頁面

每個幣種頁面使用 `crypto-base.js` 自動偵測符號，提供 1h/4h/1d × 4 欄指標組合：

| 頁面 | 交易對 | 交易所 | 細看頁 |
|------|--------|--------|--------|
| `btc.html` | BTCUSDT | Binance | `btc/1h.html`、`btc/4h.html`、`btc/1d.html` |
| `eth.html` | ETHUSDT | Binance | `eth/1h.html`、`eth/4h.html`、`eth/1d.html` |

> SOL / XRP 等改用 `altcoin.html?s=SOL`、`altcoin.html?s=XRP`（不再有獨立頁面）
>
> 細看頁 = 同樣的四組指標，但一次只看一個時間級別，排成 2×2 四張大圖，
> 用 **Shift+H / Shift+F / Shift+D** 開啟。目前只有 BTC 與 ETH 有。

**訪問**: https://jacobhsu.github.io/crypto-watch/btc
(eth 同理)

### 山寨幣通用頁面 (`altcoin.html`)
- **說明**: 通用山寨幣分析，透過 `?s=` 參數切換幣種，未定義的幣種自動組成 `BINANCE:XUSDT`
- **預設支援**: SOL, XRP, BNB, DOGE, ADA, SUI, PEPE, WLD 等（未列出的幣種自動 fallback）
- **交易所**: Binance (現貨)
- **訪問**: https://jacobhsu.github.io/crypto-watch/altcoin?s=WLD

#### 鍵盤快捷鍵（在任意幣種頁面按下）

> 所有快捷鍵均以新分頁開啟，不離開當前頁面。

**切換版面配置**

| 快捷鍵 | 動作 | 時間框架 | 版面 |
|--------|------|---------|------|
| 無 | `altcoin.html?s=X` | 1h / 4h / 1d | 3列 × 4欄 |
| Shift+1 | `1/altcoin.html?s=X` | 1h / 1d | 2列 × 5欄 |
| Shift+M | `m/altcoin.html?s=X` | 1w / 1M / 3M | 3列 × 4欄 |

**單一時間級別細看頁（2×2 四張大圖）** — 僅 BTC / ETH 有

| 快捷鍵 | 目標 |
|--------|------|
| Shift+H | `btc/1h.html`（1 小時）|
| Shift+F | `btc/4h.html`（4 小時）|
| Shift+D | `btc/1d.html`（日線）|

> 指標沿用根目錄的四欄配置，一次只看一個級別但圖表放大四倍。
> 在細看頁上再按這三個鍵是**同分頁切換級別**；從其他頁按則開新分頁。
> 目前只有 `btc/` 與 `eth/` 建了細看頁（見 `crypto-base.js` 的 `DETAIL_SYMBOLS`），
> 其他幣種按了不會有反應。

**其他**

| 快捷鍵 | 動作 |
|--------|------|
| Shift+W | 開啟 TradingView Widgets 頁面 |
| Shift+C | 開啟 `check.html` 交易決策 Checklist（幣種分頁限定）|
| Shift+T | 開啟 Traders Union 價格預測（BTC / ETH 頁面限定）|
| Shift+4 | 開啟 Kronos Demo 頁面（BTC 頁面限定）|

> `o/` 四組儀表板目前**沒有快捷鍵**，需手動輸入網址。

### RWA 資產分析頁面 (`rwa.html`)
- **說明**: 實物資產代幣 (RWA)，透過 `?s=` 參數切換幣種
- **內建幣種**: SLVX (白銀)、USOX (美國石油)、EWJX (日本ETF)、EWYX (韓國ETF)
- **原油 CFD**: WTI (`TVC:USOIL` 西德州)、BRENT (`TVC:UKOIL` 布蘭特) — 24 小時連續、資料完整（非 Pionex 幣對）
- **任意代號 (fallback)**: `?s=` 也可帶入內建清單以外的代號，會自動組成 `PIONEX:{代號}USDT.P`（prefix 為 `{代號小寫}usdt`）。是否有圖表取決於 Pionex 是否上架該交易對。
  - 例：`?s=XAUT` → `PIONEX:XAUTUSDT.P`（黃金 / Tether Gold）
- **交易所**: Pionex
- **訪問**: https://jacobhsu.github.io/crypto-watch/rwa?s=SLVX
  - 黃金：https://jacobhsu.github.io/crypto-watch/rwa?s=XAUT

### MA 分析頁面 (`ma.html`)
- **技術指標**: MA Cross + Williams Alligator
- **適用場景**: 趨勢跟隨
- **訪問**: https://jacobhsu.github.io/crypto-watch/ma

### EMA 分析頁面 (`ema.html`)
- **技術指標**: SMA20/50 + EMA20/50 + Donchian Channels
- **適用場景**: 移動平均線分析
- **訪問**: https://jacobhsu.github.io/crypto-watch/ema

### 交易決策 Checklist (`check.html`)
- **說明**: 買賣前的逐項檢查表。對著圖表逐一核對指標，每項用引導式問答得出 `▲ BUY` / `─ WAIT` / `▼ SELL`，最後依 60% 門檻給出 `▲ BUY` / `◈ WAIT` / `▼ SELL`
- **兩個段落各自對應一個圖表頁**（共 36 個核對項目）：

  | 段落 | 對照頁面 | 項目數 |
  |------|---------|--------|
  | A ─ PAGE I | `{symbol}.html`（4 欄） | 19 |
  | B ─ PAGE II ─ Pane | `o/{symbol}.html`（四組副圖） | 17 |

  > 核對時 `o/` 的 `?t=` 要與 Checklist 上方選的 TIMEFRAME 一致。
- **開啟方式**: 在幣種分頁（btc / eth / altcoin / rwa）按 **Shift+C**，首頁無效
- **AI 瀏覽器代填**: 頁面內建判讀指引，可讓 Comet 等 AI 瀏覽器對照圖表產出核對報告。用法見 [`docs/CHECK.md`](docs/CHECK.md#ai-瀏覽器判讀comet-等)
- **完整說明書**: [`docs/CHECK.md`](docs/CHECK.md) — 每個指標的判讀邏輯、顏色對照、指標索引
- **訪問**: https://jacobhsu.github.io/crypto-watch/check

### 四組單頁儀表板 (`o/`)
- **說明**: 單頁多指標儀表板。四組並排（趨勢面 / 動能面 / 波動面 / 量價面），每組一張圖＝主圖（走勢圖 + 疊圖指標）＋ 三個副圖窗格，最右側附固定的指標判讀說明欄。
- **時間級別**: 用 `?t=` 參數切換，支援 `15m` / `1h` / `4h` / `1d`，省略時為 `4h`；填入無法辨識的值會自動回退 4h 並在 console 提示
  - `o/btc.html` → 4H ・ `o/btc.html?t=1d` → 1D ・ `o/altcoin.html?s=SOL&t=1d` → 與 `?s=` 併用
  - 目前級別會反映在分頁標題（`… - 1D`）與說明欄頂端的標示上
- **四組配置**:
  - 第一組 趨勢面：SuperTrend + MACD / DMI / Aroon
  - 第二組 動能面：Hull MA (HMA) + RSI / Stochastic RSI / ROC
  - 第三組 波動面：Bollinger Bands + ATR / Choppiness / Historical Volatility
  - 第四組 量價面：VWMA 20 + OBV / MFI / CMF
- **頁面**: `o/btc.html`、`o/eth.html`（SOL / XRP 等改用下方動態頁）
- **動態頁面**:
  - `o/altcoin.html?s=XRP`（山寨幣，支援 SOL / XRP / BNB / DOGE / ADA / SUI / PEPE… 未列出者 fallback `BINANCE:{代號}USDT`）
  - `o/rwa.html?s=WTI`（RWA / 原油，支援 USOX / WTI / BRENT / XAUT / SLVX…）
- **備註**: 一張圖內多個副圖窗格的上下順序由 TradingView 動態決定，重新整理可能洗牌；各窗格左上角自帶指標名稱，以其為準。


## 技術架構

- **前端**: HTML5, CSS3, JavaScript
- **圖表**: TradingView Advanced Real-Time Chart
- **數據源**: Binance 交易所 (主力幣種) / Pionex (RWA 資產)
- **自動化**: GitHub Actions + Microlink API
- **樣式**: 現代化深色主題設計

## 四欄指標配置 (`indicators.js`)

各幣種深度分析頁（`btc.html` 等）與細看頁（`btc/1h.html` 等）共用同一份指標配置，
定義在 `indicators.js`，由 `crypto.js`（3列×4欄）與 `tf.js`（2×2 細看）各自載入：

| 欄位 | 技術指標 | 說明 |
|------|----------|------|
| 第一欄 | Multi-Time Period Charts + Williams Fractals + Williams Alligator + Supertrend | 多時間框架 + 碎形 + 鱷魚線 + 趨勢線 |
| 第二欄 | Bollinger Bands + Keltner Channels + MA Cross + Volatility Stop | 通道 + 交叉訊號 + 波動停損 |
| 第三欄 | SMA20/50 + EMA20/50/100 + Donchian Channels | 移動平均線（含顏色覆蓋：MA 橙、EMA 青）|
| 第四欄 | Zig Zag + PSAR + Linear Regression + VWMA | 結構 + 出場訊號 + 量加權均線 |

時間框架：**1小時 / 4小時 / 日線**

> `index.html` 走的是獨立的 `script.js`，不吃這份配置。
> `1/` 與 `m/` 子目錄各有自己的指標組，定義在各自的 `crypto.js`。

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
node screenshot-api.js
```
> 零依賴，不需要 `npm install`，透過 [Microlink API](https://microlink.io) 截圖（免費 100 req/day）

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
- **XAUTUSDT.P** (黃金 RWA / Tether Gold，透過 `rwa?s=XAUT` fallback)
- **TVC:USOIL** (WTI 西德州原油，`rwa?s=WTI`) / **TVC:UKOIL** (Brent 布蘭特，`rwa?s=BRENT`) — 原油 CFD、24 小時
- 其他：`rwa?s={代號}` 會嘗試 `PIONEX:{代號}USDT.P`（能否顯示視 Pionex 上架而定）

## 專案結構

```
crypto-watch/
├── index.html              # 主頁面
├── btc.html                # BTC 深度分析
├── eth.html                # ETH 深度分析
├── altcoin.html            # 山寨幣通用分析 (?s=SOL|XRP|WLD|...) 1h/4h/1d
├── rwa.html                # RWA 資產分析 (?s=SLVX|USOX|EWJX|EWYX|XAUT|…)
├── ma.html                 # MA 分析頁面
├── ema.html                # EMA 分析頁面
├── check.html              # 交易決策 Checklist (Shift+C)
├── crypto-base.js          # 共用基礎配置 + 幣種自動偵測 + 鍵盤快捷鍵
├── indicators.js           # 根目錄四欄指標配置 (crypto.js 與 tf.js 共用)
├── crypto.js               # 幣種頁面：3列(1h/4h/1d) × 4欄
├── tf.js                   # 細看頁：單一級別 2×2 四張大圖
├── script.js               # 主頁面輔助腳本
├── script_ma.js            # MA 頁面腳本
├── script_ema.js           # EMA 頁面腳本
├── styles.css              # 共用樣式
├── screenshot-api.js       # 截圖腳本 (Microlink API，零依賴)
├── screenshot.js           # 截圖腳本 (Puppeteer，備用)
├── package.json            # Node.js 依賴
├── btc/                    # BTC 細看頁 (Shift+H/F/D，2×2 四張大圖)
│   └── 1h.html / 4h.html / 1d.html
├── eth/                    # ETH 細看頁 (同上)
│   └── 1h.html / 4h.html / 1d.html
├── 1/                      # Shift+1 子目錄 (1h/1d × 5欄)
│   ├── altcoin.html        # 山寨幣 (?s=WLD|SOL|...)
│   ├── rwa.html            # RWA 資產
│   ├── btc.html / eth.html
│   └── crypto.js           # 1/ 專用指標配置
├── m/                      # Shift+M 子目錄 (1w/1M/3M × 4欄)
│   ├── altcoin.html        # 山寨幣 (?s=SOL|XRP|WLD|...)
│   ├── rwa.html
│   ├── btc.html / eth.html
│   └── crypto.js           # m/ 專用長週期指標配置
├── o/                      # 四組單頁儀表板 (?t= 切級別，主圖+三副圖+說明欄)
│   ├── btc.html / eth.html
│   ├── altcoin.html        # 山寨幣 (?s=SOL|XRP|BNB|...)
│   ├── rwa.html            # RWA/原油 (?s=USOX|WTI|BRENT|XAUT|SLVX)
│   └── crypto.js           # o/ 專用：四組指標配置 + ?t= 級別解析
├── docs/
│   └── CHECK.md            # check.html 完整說明書
└── screenshots/            # 截圖輸出目錄
```

> `btc/` 與 `eth/` 細看頁的指標沿用根目錄的 `indicators.js`，
> 只是換成一個級別配 2×2 大圖。新增其他幣種的細看頁需同步更新
> `crypto-base.js` 的 `DETAIL_SYMBOLS`，Shift+H/F/D 才會生效。

## 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 應用場景

1. **交易監控**: 實時監控多個幣種的技術指標
2. **趨勢分析**: 四欄指標組合全面分析市場趨勢
3. **RWA 追蹤**: 監控白銀、石油、ETF 等實物資產代幣
4. **報告生成**: 執行 `node screenshot-api.js` 生成截圖報告（或每週一自動執行）
5. **API 整合**: 固定截圖 URL 可嵌入其他應用


## Star History

<a href="https://www.star-history.com/?repos=JacobHsu%2Fcrypto-watch&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=JacobHsu/crypto-watch&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=JacobHsu/crypto-watch&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=JacobHsu/crypto-watch&type=date&legend=top-left" />
 </picture>
</a>