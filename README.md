# Crypto Watch - 加密貨幣監控儀表板

一個類似 cryptowatch.net 的實時加密貨幣監控網站，使用 TradingView Advanced Real-Time Chart 技術。

## 🚀 功能特色

- **實時圖表**: 使用 TradingView 的專業圖表技術
- **雙頁面設計**: 兩種不同的技術指標分析
- **多幣種監控**: BTC/USDT, ETH/USDT, XRP/USDT, SOL/USDT
- **多時間框架**: 15分鐘、1小時、4小時圖表
- **自動截圖**: 每小時自動生成圖表截圖
- **響應式設計**: 適配各種螢幕尺寸
- **深色主題**: 專業的交易介面風格

## 📊 頁面說明

### 主頁面 (`index.html`)
- **技術指標**: Bollinger Bands + Keltner Channels + Supertrend
- **適用場景**: 波動性分析、趨勢確認
- **訪問**: https://jacobhsu.github.io/crypto-watch/

### MA 分析頁面 (`ma.html`)
- **技術指標**: 移動平均交叉 + 威廉鱷魚線
- **適用場景**: 趨勢跟隨、多時間框架分析
- **訪問**: https://jacobhsu.github.io/crypto-watch/ma

## 🛠️ 技術架構

- **前端**: HTML5, CSS3, JavaScript
- **圖表**: TradingView Advanced Real-Time Chart
- **數據源**: Binance 交易所
- **自動化**: GitHub Actions + Puppeteer
- **樣式**: 現代化深色主題設計

## 📱 使用方法

### 本地使用
1. 直接開啟 `index.html` 或 `ma.html` 檔案
2. 等待 TradingView 圖表載入
3. 查看各幣種的實時價格和技術指標

### 線上訪問
- **主頁面**: https://jacobhsu.github.io/crypto-watch/
- **MA分析**: https://jacobhsu.github.io/crypto-watch/ma
- **自動截圖**: https://jacobhsu.github.io/crypto-watch/screenshots/

## 📸 自動截圖系統

### 功能說明
- 每小時自動拍攝 MA 分析頁面截圖
- 固定檔名：`crypto-watch-latest.png`
- 每次更新覆蓋舊檔案，提供穩定的固定 URL

### 訪問截圖
- **固定 URL**: https://jacobhsu.github.io/crypto-watch/screenshots/crypto-watch-latest.png
- **展示頁面**: https://jacobhsu.github.io/crypto-watch/screenshots/

### 設置方法

#### 1. GitHub Actions 設定
前往 Repository **Settings** → **Actions** → **General**：
- ✅ 選擇 **"Allow all actions and reusable workflows"**
- ✅ 在 **"Workflow permissions"** 選擇 **"Read and write permissions"**
- ✅ 勾選 **"Allow GitHub Actions to create and approve pull requests"**

#### 2. GitHub Pages 設定
前往 Repository **Settings** → **Pages**：
- ✅ **Source**: 選擇 **"Deploy from a branch"**
- ✅ **Branch**: 選擇 **"main"** 和 **"/ (root)"**
- ✅ 點擊 **Save**

#### 3. Repository 要求
- ✅ Repository 必須是 **Public**
- ✅ 主分支名稱為 **main**

#### 4. 手動測試
前往 **Actions** 標籤 → 選擇 **"Hourly Crypto Watch Screenshot"** → 點擊 **"Run workflow"**

### 本地測試
```bash
# 安裝依賴
npm install puppeteer

# 執行截圖
node screenshot.js
```

## 📈 監控幣種

### 所有時間框架 (15分鐘、1小時、4小時)
- **BTC/USDT** (比特幣)
- **ETH/USDT** (以太坊)  
- **XRP/USDT** (瑞波幣)
- **SOL/USDT** (Solana)

## 🔧 技術指標說明

### 主頁面指標
- **Bollinger Bands (BB)**: 布林帶，顯示價格波動範圍
- **Keltner Channels (KC)**: 肯特納通道，基於 ATR 的趨勢指標
- **Supertrend**: 超級趨勢指標，判斷趨勢方向

### MA 分析頁面指標
- **移動平均交叉**: 多條移動平均線的交叉信號
- **威廉鱷魚線**: Williams Alligator，趨勢跟隨指標

## 🌐 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📁 專案結構

```
crypto-watch/
├── index.html              # 主頁面 (BB+KC+Supertrend)
├── ma.html                 # MA分析頁面 (MA+Alligator)
├── script.js              # 主頁面腳本
├── script_ma.js           # MA頁面腳本
├── styles.css             # 共用樣式
├── screenshot.js          # 截圖腳本
├── package.json           # Node.js 依賴
├── .github/workflows/     # GitHub Actions
└── screenshots/           # 截圖輸出目錄
```

## 🎯 應用場景

1. **交易監控**: 實時監控多個幣種的技術指標
2. **趨勢分析**: 使用不同指標組合分析市場趨勢
3. **報告生成**: 自動截圖功能便於生成定期報告
4. **API 整合**: 固定截圖 URL 可嵌入其他應用
