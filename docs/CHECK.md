# BTCUSDT Investment Checklist — 說明書

> `check.html` 的操作手冊，相當於飛行員使用前閱讀的 Checklist Manual。

---

## 概覽

### 用途
對著 TradingView 圖表，逐一核對技術指標，由系統引導判斷，最終給出投資建議。適合技術分析新手，不需要自行判斷漲跌，只需回答「你看到什麼」。

### 使用流程
```
1. 打開 {symbol}.html   → 執行 Section A (PAGE I)  檢查
2. 打開 1/{symbol}.html → 執行 Section B (PAGE II) 檢查
3. 查看底部 FINAL DECISION
```
每次執行檢查表對應一個**時間框架**（例如 1H）。
若要核對 4H，重置後再跑一遍即可。
適用任意幣種：btc / eth / sol / xrp 等。

### Header 欄位
| 欄位 | 用途 |
|------|------|
| ANALYST | 填入姓名或代號 |
| DATE | 當天日期 |
| TIMEFRAME | 本次核對的時間框架（1H / 4H / 1D 等）|

---

## 互動方式

1. **點擊指標名稱** → 展開引導問題面板
2. **選擇你在圖表看到的狀態** → 可能有追加問題
3. **系統顯示結果** → `▲ BUY` / `─ WAIT` / `▼ SELL`
4. 結果顯示後，指標行右側狀態更新，面板自動收合
5. 點「重新判斷」可重設單項；Section 右上角「重置」可清空整段

### 分數計算
- 每個 Section 底部顯示 BUY / WAIT / SELL 各項統計
- **最終判斷**：BUY ≥ 60% → `▲ GO`，SELL ≥ 60% → `▼ NO-GO`，其餘 → `◈ WAIT`

### 列印
直接 `Ctrl+P`，互動面板自動隱藏，輸出為乾淨的黑白飛行檢查表格式。

---

## Section A — PAGE I（`{symbol}.html`）

對應圖表：`4 欄 × 任意時間框架`，共 **16 個核對項目**。

### COL 1 — TREND（趨勢系統）

#### WILLIAMS ALLIGATOR（威廉鱷魚）
> Bill Williams 三線趨勢系統。三條線 = 鱷魚的顎（Jaw）、牙（Teeth）、唇（Lips）。

| 顏色 | 線名 | 週期 |
|------|------|------|
| 🔵 藍線 | 顎 Jaw | 13 期，位移 8 |
| 🔴 紅線 | 牙 Teeth | 8 期，位移 5 |
| 🟢 綠線 | 唇 Lips | 5 期，位移 3 |

**判斷邏輯：**
```
三線糾纏           → 鱷魚睡覺，盤整，觀望
三線分開 + 價格在上  → 鱷魚張口向上，🟢 BUY
  由上到下：綠 > 紅 > 藍
三線分開 + 價格在下  → 鱷魚張口向下，🔴 SELL
  由上到下：藍 > 紅 > 綠
```

---

#### WILLIAMS FRACTALS（威廉碎形）
> 在 K 線上下方標記近期高低點的小箭頭（△▽）。

**判斷邏輯：**
```
出現 △ 向上箭頭，且 K 線已向上穿過那個位置  → 🟢 BUY
有箭頭但尚未突破，或無明顯新箭頭               → ⬛ WAIT
出現 ▽ 向下箭頭，且 K 線已向下穿過那個位置  → 🔴 SELL
```

> ⚠️ 碎形訊號的有效性需搭配鱷魚確認，見下方組合指標。

---

#### MULTI-TIME PERIOD（多時間框架）
> 在單一圖表上同時顯示多個時間框架的趨勢方向。

**判斷邏輯：**
```
大多數框架向上一致  → 多框架共振看漲，🟢 BUY
方向混合不一致      → 趨勢分歧，⬛ WAIT
大多數框架向下一致  → 多框架共振看跌，🔴 SELL
```

---

#### ↳ ALLIGATOR × FRACTAL（組合判斷）
> Bill Williams 原始系統核心規則：碎形訊號必須由鱷魚確認才有效。

**判斷邏輯：**
```
鱷魚張口向上 + 上方 △ 碎形突破  → 🟢 BUY（強力訊號）
鱷魚張口向下 + 下方 ▽ 碎形跌破  → 🔴 SELL（強力訊號）
鱷魚睡覺（三線糾纏）             → ⬛ WAIT（碎形訊號無效，忽略）
鱷魚方向與碎形訊號相反           → ⬛ WAIT（訊號矛盾，觀望）
```

---

### COL 2 — CHANNEL（通道系統）

#### BOLLINGER BANDS（布林通道）
> 以移動平均線為中軌，上下各加減 2 倍標準差為上下軌。

**判斷邏輯：**
```
觸碰/突破上軌
  + 帶寬擴大（通道張開）  → 🟢 BUY
  + 帶寬收窄（通道緊縮）  → ⬛ WAIT（注意假突破）
在中軌附近游走            → ⬛ WAIT
觸碰/跌破下軌
  + 帶寬擴大（通道張開）  → 🔴 SELL
  + 帶寬收窄（通道緊縮）  → ⬛ WAIT（可能反彈）
```

---

#### KELTNER CHANNEL（肯特納通道）
> 以 EMA 為中線，上下各加減 ATR 倍數，比布林通道更平滑。

**判斷邏輯：**
```
突破上軌且站穩  → 🟢 BUY
在通道內部游走  → ⬛ WAIT
跌破下軌且站穩  → 🔴 SELL
```

---

#### BB / KC SQUEEZE（布林 × 肯特納擠壓）
> 同時觀察兩個通道的寬窄關係，判斷市場是否處於蓄勢待發狀態。

**概念：**
```
BB 比 KC 窄（BB 收在 KC 裡面）  → Squeeze ON：能量積聚，等待方向
BB 比 KC 寬（BB 突出 KC 外側）  → Squeeze OFF：行情啟動
```

**判斷邏輯：**
```
BB 收在 KC 裡面                    → ⬛ WAIT（蓄勢待發）
BB 突出 KC 外 + K 線向上突破       → 🟢 BUY
BB 突出 KC 外 + K 線向下突破       → 🔴 SELL
```

---

#### SUPERTREND（超級趨勢線）
> 跟隨趨勢的動態支撐/阻力線。

**⚠️ 重要：以 K 線位置為準，顏色是結果不是原因。**

```
K 線在線的上方（不管線是綠或紅）  → 🟢 BUY
K 線在線的下方（不管線是綠或紅）  → 🔴 SELL
```

> 若看到紅線但 K 線在線上方，這是趨勢剛轉換的訊號，選「K線在上方」= BUY。

---

### COL 3 — MOVING AVERAGE（均線系統）

#### MA 20 / 50（簡單移動平均線）
> MA20 反應較快（橙色），MA50 反應較慢，兩者排列判斷趨勢。

**判斷邏輯：**
```
K線 > MA20 > MA50（多頭排列）  → 🟢 BUY
均線糾纏或交叉混亂              → ⬛ WAIT
MA50 > MA20 > K線（空頭排列）  → 🔴 SELL
```

---

#### EMA 20 / 50（指數移動平均線）
> EMA20 反應較快（青色），比 MA 更敏感地反應近期價格變化。

**判斷邏輯：**
```
K線 > EMA20 > EMA50（多頭排列）  → 🟢 BUY
EMA 糾纏或排列混亂                → ⬛ WAIT
EMA50 > EMA20 > K線（空頭排列）  → 🔴 SELL
```

---

#### DONCHIAN CHANNELS（唐奇安通道）
> 上軌 = 近 N 期最高點，下軌 = 近 N 期最低點，通道突破代表創新高/低。

**判斷邏輯：**
```
K 線突破上軌（創近期新高）  → 🟢 BUY
K 線在通道中間區域          → ⬛ WAIT
K 線跌破下軌（創近期新低）  → 🔴 SELL
```

---

#### ↳ MA × EMA 共振（組合判斷）
> MA（慢）與 EMA（快）方向一致時，趨勢訊號更可靠。

**判斷邏輯：**
```
MA 和 EMA 都多頭排列  → 🟢 BUY（共振確認）
方向不一致            → ⬛ WAIT（趨勢轉換中）
MA 和 EMA 都空頭排列  → 🔴 SELL（共振確認）
```

---

### COL 4 — EXIT（出場/趨勢確認）

#### CHANDELIER EXIT（吊燈出場）
> 依據 ATR 計算的動態停損線。有兩條線：**藍色 Long Exit** 跟在 K 線下方（多頭保護）；**橙色 Short Exit** 跟在 K 線上方（空頭壓制）。

**判斷邏輯：**
```
藍色 Long Exit 在 K 線下方（持續）     → 🟢 BUY（Long Exit 支撐多頭）
K 線剛跌破藍色 Long Exit 線            → 🔴 SELL（多頭出場訊號）
橙色 Short Exit 在 K 線上方（持續）    → 🔴 SELL（Short Exit 壓制空頭）
K 線剛突破橙色 Short Exit 線           → 🟢 BUY（空頭出場 / 買入訊號）
```

---

#### PARABOLIC SAR（拋物線停損）
> 一排跟隨趨勢的小圓點，出現在 K 線上方或下方。

**判斷邏輯：**
```
SAR 點持續在 K 線下方    → 🟢 BUY（上升趨勢）
SAR 點剛翻到 K 線下方    → 🟢 BUY（趨勢轉換入場）
SAR 點持續在 K 線上方    → 🔴 SELL（下降趨勢）
SAR 點剛翻到 K 線上方    → 🔴 SELL（出場訊號）
```

---

#### LINEAR REGRESSION（線性迴歸）
> 穿越 K 線的趨勢基準直線，斜率反映趨勢方向。

**判斷邏輯：**
```
K線在線上方 + 斜率向上  → 🟢 BUY
K線在線附近 + 近乎水平  → ⬛ WAIT
K線在線下方 + 斜率向下  → 🔴 SELL
```

---

#### ↳ CHANDELIER × SAR（組合判斷）
> 兩個出場工具同向確認，訊號可靠度大幅提升。

**判斷邏輯：**
```
藍色 Long Exit 在下方 + SAR 點在下方  → 🟢 BUY（雙重多頭確認）
兩者方向不一致                         → ⬛ WAIT（等待一致）
橙色 Short Exit 在上方 + SAR 點在上方  → 🔴 SELL（雙重空頭確認）
```

---

## Section B — PAGE II（`1/{symbol}.html`）

對應圖表：`5 欄 × 任意時間框架`，共 **19 個核對項目**。

### COL 1 — CLOUD / STRUCTURE（雲層 / 結構）

#### ICHIMOKU CLOUD（一目均衡表）
> 包含多條線與雲層色塊，是多功能趨勢系統。觀察重點：K線與雲層的相對位置。

**判斷邏輯：**
```
K線在雲層上方
  + 未來雲為綠色  → 🟢 BUY（強勢多頭）
  + 未來雲為紅色  → ⬛ WAIT（多頭偏弱）
K線在雲層之內    → ⬛ WAIT（方向不明）
K線在雲層下方    → 🔴 SELL（空頭格局）
```

---

#### ZIG ZAG（折線指標）
> 連接重要高低點，形成 W 型（底部）或 M 型（頂部）的折線結構。

**判斷邏輯：**
```
高點遞升 + 低點遞升（每波都比上一波高）  → 🟢 BUY
高低點無規律                              → ⬛ WAIT
高點遞降 + 低點遞降（每波都比上一波低）  → 🔴 SELL
```

---

#### CHAIKIN MONEY FLOW（CMF 資金流向）
> 零軸上下的柱狀指標，反映資金流入或流出的方向與強度。

**判斷邏輯：**
```
正值（零軸以上）且持續上升  → 🟢 BUY（資金流入）
接近零軸或橫盤              → ⬛ WAIT
負值（零軸以下）且持續下降  → 🔴 SELL（資金流出）
```

---

### COL 2 — TREND / VOLUME（趨勢 / 量能）

#### MA RIBBON（均線帶）
> 多條不同週期的移動平均線疊在一起，觀察整體展開方向。

**判斷邏輯：**
```
帶狀整體向上展開（扇形向上）  → 🟢 BUY（多頭排列）
均線帶糾纏，難以分辨方向     → ⬛ WAIT（趨勢轉換中）
帶狀整體向下展開（扇形向下）  → 🔴 SELL（空頭排列）
```

---

#### VWMA（量加權移動平均線）
> 納入成交量權重的移動平均線，比普通 MA 更能反映市場真實方向。

**判斷邏輯：**
```
K線在 VWMA 上方 + VWMA 向上  → 🟢 BUY（有量支撐）
K線在 VWMA 附近游走           → ⬛ WAIT
K線在 VWMA 下方 + VWMA 向下  → 🔴 SELL（有量下壓）
```

---

#### ON BALANCE VOLUME（OBV 能量潮）
> 累積成交量趨勢線，方向應與 K 線一致；若不一致則為背離警告。

**判斷邏輯：**
```
OBV 與 K 線同步上升  → 🟢 BUY（量價齊揚）
OBV 與 K 線方向相反  → ⬛ WAIT（量價背離，注意反轉）
OBV 與 K 線同步下降  → 🔴 SELL（量價齊跌）
```

---

### COL 3 — VOLATILITY（波動性）

#### VOLATILITY STOP（波動停損）
> 類似 SAR，依波動率計算的動態停損線。

**判斷邏輯：**
```
綠色線在 K 線下方  → 🟢 BUY
紅色線在 K 線上方  → 🔴 SELL
```

---

#### SUPERTREND（超級趨勢線）
> 同 Section A，以 K 線位置為準（不看顏色）。

---

#### AVG TRUE RANGE (ATR)（平均真實波幅）
> 衡量市場波動幅度，本身不判斷方向，配合趨勢判斷進場時機。

**判斷邏輯：**
```
ATR 擴大（波動增加）
  + K 線配合上漲  → 🟢 BUY（有力突破）
  + K 線配合下跌  → 🔴 SELL（有力跌破）
ATR 收縮（波動減少）  → ⬛ WAIT（蓄勢待發）
```

---

### COL 4 — SIGNAL（訊號）

#### MA CROSS（均線交叉）
> 專門標記短線均線穿越長線均線的交叉事件。

**判斷邏輯：**
```
金叉（短均從下穿上長均）  → 🟢 BUY（多頭轉換）
無交叉，均線平行          → ⬛ WAIT（延續趨勢）
死叉（短均從上穿下長均）  → 🔴 SELL（空頭轉換）
```

---

#### BOOKER REVERSAL（布克反轉）
> 在潛在反轉位置標記彩色訊號的型態識別指標。

**判斷邏輯：**
```
出現看漲反轉標記（綠色）  → 🟢 BUY
無明顯標記                → ⬛ WAIT
出現看跌反轉標記（紅色）  → 🔴 SELL
```

---

#### DIVERGENCE INDICATOR（背離指標）
> 偵測 K 線與指標之間的背離現象，預警趨勢反轉。

**概念：**
- **看漲背離**：K 線創新低，但指標未創新低 → 底部反轉訊號
- **看跌背離**：K 線創新高，但指標未創新高 → 頂部反轉訊號

**判斷邏輯：**
```
無背離（K線與指標方向一致）  → ⬛ WAIT（繼承當前趨勢）
看漲背離                      → 🟢 BUY（潛在底部）
看跌背離                      → 🔴 SELL（潛在頂部）
```

---

### COL 5 — MOMENTUM（動能）

#### MACD（指數平滑異同移動平均）
> 觀察柱狀圖（Histogram）的位置與方向，判斷多空動能強弱。

**判斷邏輯：**
```
正值柱（零軸上方）且持續增高  → 🟢 BUY（多頭加速）
柱狀縮小或接近零軸            → ⬛ WAIT（動能減弱）
負值柱（零軸下方）且持續增高  → 🔴 SELL（空頭加速）
```

---

#### PARABOLIC SAR
> 同 Section A。

---

#### ENVELOPE（包絡線）
> 在移動平均線上下方各平移固定百分比的通道。

**判斷邏輯：**
```
K線在上方包絡線附近
  + 趨勢強勁持續上升  → 🟢 BUY（多頭動能充足）
  + 動能減弱橫盤      → ⬛ WAIT（謹慎追漲）
K線在中線附近         → ⬛ WAIT
K線在下方包絡線附近   → 🔴 SELL
```

---

#### ↳ MACD × SAR 共振（組合判斷）
> 動能（MACD）+ 趨勢方向（SAR）雙重對齊，進場勝率較高。

**判斷邏輯：**
```
MACD 正值柱 + SAR 點在下方  → 🟢 BUY（動能趨勢雙確認）
MACD 與 SAR 方向不一致      → ⬛ WAIT（動能與趨勢矛盾）
MACD 負值柱 + SAR 點在上方  → 🔴 SELL（動能趨勢雙確認）
```

---

## 圖表顏色對照表

| 顏色 | 說明 | 指標 |
|------|------|------|
| 🟢 綠 `#4caf50` | 唇 Lips | Williams Alligator |
| 🔴 紅 `#e91e63` | 牙 Teeth | Williams Alligator |
| 🔵 藍 `#2196f3` | 顎 Jaw / Long Exit | Williams Alligator / Chandelier Exit |
| 🟠 橙 `#ff9800` | MA 簡單均線 / Short Exit | MA 20/50 / Chandelier Exit |
| 🩵 青 `#00bcd4` | EMA 指數均線 | EMA 20/50 |

---

## 組合指標彙整

| 符號 | 組合 | 所在欄位 | Section |
|------|------|---------|---------|
| `↳ ALLIGATOR × FRACTAL` | 鱷魚確認碎形有效性 | TREND | A |
| `↳ MA × EMA 共振` | 兩組均線方向一致性 | MOVING AVERAGE | A |
| `↳ CHANDELIER × SAR` | 吊燈 + SAR 雙重確認 | EXIT | A |
| `↳ MACD × SAR 共振` | 動能 + 趨勢雙確認 | MOMENTUM | B |
| `BB / KC SQUEEZE` | 布林 × 肯特納擠壓偵測 | CHANNEL | A |

---

## 最終判斷邏輯

```
已核對項目中，BUY 佔比 ≥ 60%  → ▲ GO（看漲，可考慮買入）
已核對項目中，SELL 佔比 ≥ 60% → ▼ NO-GO（看跌，避免多單）
其餘情況                        → ◈ WAIT（方向不明，觀望）
```

> 此為參考建議，非投資建議。最終決策仍需結合風險管理與個人判斷。

---

## 技術指標總表（字母索引）

| 指標 | 中文名 | TradingView 類型 | 判斷方向 | 出現於 |
|------|--------|-----------------|----------|--------|
| **ATR** · Average True Range | 平均真實波幅 | 波動性 | 衡量波動幅度，本身無方向；ATR 擴大 = 行情啟動 | B |
| **BB** · Bollinger Bands | 布林帶 | 波動性 | 突破上軌+擴張 → BUY；跌破下軌+擴張 → SELL | A |
| **BB/KC Squeeze** | 布林×肯特納擠壓 | 波動性（組合） | BB 收進 KC → 蓄勢；BB 突出 KC+方向 → 啟動 | A |
| **Booker Reversal** · Rob Booker | 布克反轉 | 趨勢追蹤 | 看漲標記 → BUY；看跌標記 → SELL | B |
| **Chandelier Exit** | 吊燈停損 | 趨勢追蹤 | 藍色 Long Exit 在下 → BUY；橙色 Short Exit 在上 → SELL | A |
| **CMF** · Chaikin Money Flow | 蔡金資金流量 | 成交量 | 正值上升 → BUY（資金流入）；負值下降 → SELL | B |
| **Divergence Indicator** | 背離指標 | 振盪器 | 看漲背離 → BUY；看跌背離 → SELL；無背離 → WAIT | B |
| **Donchian Channels** · DC | 唐奇安通道 | 波動性 | 突破上軌（創新高）→ BUY；跌破下軌 → SELL | A |
| **EMA** · Exponential Moving Average | 指數移動平均線 | 移動均線 | K線 > EMA20 > EMA50 → BUY；反之 → SELL | A |
| **Envelope** · ENV | 包絡線 | 移動均線 | K線在上包絡附近且強勢 → BUY；在下包絡 → SELL | B |
| **Ichimoku Cloud** | 一目均衡表 | 趨勢追蹤 | K線在雲上+未來雲綠 → BUY；在雲下 → SELL | B |
| **Keltner Channel** · KC | 肯特納通道 | 波動性 | 突破上軌站穩 → BUY；跌破下軌站穩 → SELL | A |
| **Linear Regression** | 線性回歸 | 趨勢追蹤 | K線在線上+斜率向上 → BUY；在線下+向下 → SELL | A |
| **MA** · Simple Moving Average | 簡單移動平均線 | 移動均線 | K線 > MA20 > MA50 → BUY；反之 → SELL | A |
| **MA Cross** | 移動平均線交叉 | 趨勢追蹤 | 金叉（短穿上長）→ BUY；死叉 → SELL | B |
| **MA Ribbon** | 移動平均線緞帶 | 移動均線 | 帶狀向上展開 → BUY；向下展開 → SELL | B |
| **MACD** | 移動平均收斂/發散指標 | 振盪器 | 正值柱持續增高 → BUY；負值柱持續增高 → SELL | B |
| **Multi-Time Period Charts** | 多時段圖表指標 | 趨勢追蹤 | 大多框架向上 → BUY；混合 → WAIT；向下 → SELL | A |
| **OBV** · On Balance Volume | 能量潮指標 | 成交量 | OBV 與 K 線同步上升 → BUY；背離 → WAIT | B |
| **PSAR** · Parabolic SAR | 拋物線 SAR | 趨勢追蹤 | 點在 K 線下方 → BUY；在上方 → SELL | A / B |
| **Supertrend** | 超級趨勢 | 趨勢追蹤 | K線在線**上方**（不看顏色）→ BUY；在**下方** → SELL | A / B |
| **VWMA** · Volume Weighted MA | 成交量加權移動均線 | 移動均線 | K線在 VWMA 上且線向上 → BUY；反之 → SELL | B |
| **Volatility Stop** | 波動停損 | 波動性 | 綠線在下 → BUY；紅線在上 → SELL | B |
| **Williams Alligator** | 威廉鱷魚 | 趨勢追蹤 | 三線分開+價格在上（綠>紅>藍）→ BUY；在下 → SELL | A |
| **Williams Fractals** | 威廉分型 | 趨勢追蹤 | △ 突破 → BUY；▽ 跌破 → SELL；未突破 → WAIT | A |
| **Zig Zag** | Zig Zag | 趨勢追蹤 | 高低點遞升 → BUY；遞降 → SELL | B |
