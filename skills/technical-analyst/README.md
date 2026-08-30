# technical-analyst — Skill 說明

> 次日漲跌預測 skill。給它日線圖，它輸出三個互斥的次日結果，各附機率、由 ATR 推導的預期區間、以及失效價位。

**目前狀態：已改造完成。** 從上游下載後，已從「週線中長期情境分析」改寫為「次日方向預測」。

---

## 來源與改造

| 項目 | 內容 |
|------|------|
| 上游 | [sundial-org/awesome-openclaw-skills](https://github.com/sundial-org/awesome-openclaw-skills/tree/main/skills/technical-analyst) |
| 授權 | 上游 repo 根目錄**無 LICENSE 檔**，散佈前請自行確認 |
| 原版用途 | 週線圖的中長期情境分析 |
| 改造後用途 | **日線圖的次日方向預測** |
| 本目錄 | `skills/technical-analyst/` — 開發用，改造在此進行 |
| 已安裝 | `.claude/skills/technical-analyst/` — Claude Code 實際載入的位置，**目前仍是原版** |

「openclaw」是散佈通路的名字，不是格式的名字。這份 skill 用的是 Anthropic Agent Skills 規格（frontmatter 只有 `name` + `description`），Claude Code 直接可載入，不需要 `npx sundial-hub add`——複製進 `.claude/skills/` 即可。

---

## 檔案結構

```
technical-analyst/
├── SKILL.md                                    流程骨架（英文，執行用）· 通用
├── references/
│   ├── technical_analysis_framework.md         判斷準則（英文，執行用）· 通用
│   ├── indicator_reading_rules.md              ★ 單一指標查表 · 通用
│   └── chart_sources.md                        ★ 取圖來源 · 唯一的專案耦合點
├── assets/
│   └── analysis_template.md                    報告模板（英文，執行用）· 通用
├── zh-TW/                                      中文對照，僅供閱讀，不參與執行
│   ├── SKILL.zh-TW.md
│   ├── technical_analysis_framework.zh-TW.md
│   ├── analysis_template.zh-TW.md
│   ├── indicator_reading_rules.zh-TW.md
│   └── chart_sources.zh-TW.md
└── README.md                                   本檔
```

**本體維持英文**，中文對照放在 `zh-TW/`，與 `references/`、`assets/` 分開，避免執行時被誤讀為規則來源。

---

## 自動取圖

不必再自己貼圖。沒提供圖片時，skill 會自己去抓部署站台的日線圖。

```
1. 使用者已提供圖片            → 直接用，優先於一切
2. references/chart_sources.md → 依該檔抓圖
3. 兩者皆無                    → 請使用者提供圖片（原版行為）
```

### 預設抓兩張

| 頁面 | 提供什麼 |
|------|---------|
| `o/{symbol}.html?t=1d` | **RSI · Stochastic RSI · MACD · ATR** · DMI/ADX · Aroon · ROC · Choppiness · HV · OBV · MFI · CMF · Supertrend · HMA · BB · VWMA |
| `{symbol}/1d.html` | **MA 20/50 · EMA 20/50** · Donchian · Alligator · Fractals · SAR · KC · VStop · Zig Zag · LinReg |

兩張缺一不可——`o/` 頁**沒有** MA/EMA 20/50，`1d.html` 頁沒有振盪指標。未指定幣種時預設 BTC。

### 通用性怎麼保住

所有專案細節（網址、頁面對應、抓圖參數）**只存在於 `references/chart_sources.md`**。其餘檔案連一個網址都沒有，`SKILL.md` 也只提到這個檔名。

**刪掉或換掉那一個檔案，skill 立刻回到通用狀態**，退回請使用者貼圖。要接到別的圖表來源，也只需要重寫這一檔。

### 抓圖機制與踩過的坑

用 **Microlink API + `waitForTimeout=15000`**，免費層不需 API key，與 [screenshot-api.js:40](../../screenshot-api.js#L40) 同一套參數。

> ⚠️ **不要改用 `wait_until: networkidle` 類的抓圖工具。** 實測用 xcrawl 抓 `o/btc.html?t=1d`，回傳 HTTP 200 但**指標一個都沒渲染**——4 張圖只有 2 張畫出 K 棒，MACD/RSI/ATR 副圖全是空白灰塊。TradingView 的 studies 是在 network idle **之後**才非同步畫上 canvas 的，只有固定秒數的等待有效。這條路已經試過，不用再試。

因為這個失敗模式真實存在，`chart_sources.md` 定義了抓圖後的驗證程序（副圖有內容、圖例有數值、每張圖都畫出來），`SKILL.md` 也加了 Hard Rule 7：驗證不過就重抓一次，再失敗就停止。

### 意外收穫：圖例數值可讀

1920×1080、`deviceScaleFactor=1` 下，指標圖例完全清晰：

```
RSI 14 close 70.81      ATR 14 RMA 2,197.29     MACD 12 26 close 9 501.42
MA 20 close 71,765.82   EMA 20 close 73,605.51  收=78,070.57 −159.43 (−0.20%)
```

代表 skill 可以**引用精確數字**當證據，而不只是描述線的相對位置。framework 為此新增了第 0 節「從圖例讀數值」，並要求最近收盤價與 ATR 這兩個關鍵值優先用讀的、不要用估的。`deviceScaleFactor=2` 因此沒有必要。

---

## 運作流程

```
0. 取圖：使用者提供 → 用；否則依 chart_sources.md 自動抓
1. 確認收到幾張圖、是不是日線、哪些指標缺席
     圖不清楚／指標被裁切／副圖空白 → 直接停止，不做預測
2. 讀 references/technical_analysis_framework.md
3. 逐張分析八個面向，每項附一句話證據：
     趨勢 → 支撐阻力 → 均線 → 成交量
        → 型態/K棒 → 動能振盪 → 波動度 → 綜合
4. 以 ATR 推導預期區間，產出三個互斥情境
5. 套 assets/analysis_template.md 出報告（結論先行）
6. 存成 [SYMBOL]_forecast_[YYYY-MM-DD].md
```

### 三個情境

設 **C** = 最近一根已完成的日 K 收盤價：

| 情境 | 定義 |
|------|------|
| **Up** | 次日收盤 > C + 0.5 ATR |
| **Down** | 次日收盤 < C − 0.5 ATR |
| **Flat** | 次日收盤落在 C ± 0.5 ATR 內 |

互斥且窮盡，機率加總 100%，以 **5% 為級距**（證據撐不起更細的精度）。

每個情境必附：具名的支持證據清單、預期價格區間、**失效價位**。

---

## 改造了什麼

原版有五個問題，對「預測明日」全是致命傷：

### 1 · 全篇綁死週線
均線寫死 20 / 50 / 200 **週**。→ 全數改為對應的日線週期，`Weekly Timeframe` 原則改為日線主、4H 輔，並明確禁止用週線圖預測次日。

### 2 · 沒有預測期限
原版的 target level 不綁時間，等於**永遠不會算錯**。→ 新增「明日」的明確定義（下一根日 K 收盤 vs 最近收盤），並區分 24/7 市場與有開收盤市場的跳空風險；每個情境強制附失效價位。

### 3 · 完全沒有動能指標，也沒有 ATR ⭐
這是最關鍵的缺口。原版的五個分析面向（趨勢結構、支撐阻力、均線、成交量、型態）**全是中長期工具**。要預測下一根 K 棒，真正管用的是短線動能與波動區間，而原版一個字都沒提。

→ 新增兩節：
- **Momentum and Oscillators** — RSI / MACD / Stochastic 的判讀與背離
- **Volatility and Expected Range** — ATR(14) 推導次日區間，這也是讓預測**可被否證**的關鍵

### 4 · 四情境不互斥、機率可憑空給
原版四個開放式情境彼此重疊，機率沒有任何證據約束。→ 改為三個互斥且窮盡的結果，並建立證據門檻表：45~55% 需兩個不同類別的具名證據，60~70% 需三個類別且無反向訊號，**70% 以上純圖表判讀不允許**。

新增「什麼才算證據」的定義——具名指標 + 觀察到的讀數。「動能看起來很強」這類敘述不算數。

### 5 · 未聲明預測的先天限制
→ 新增 **Known Limits of Next-Day Forecasting** 一節，明講單日方向接近隨機、一根 K 棒是很小的樣本、圖表遺漏了重要驅動因素。並指出：**若一連串預測大多落在 65~70% 信心，那是校準失敗而不是有洞見。**

### 另外新增：Hard Rules
六條硬規則，防止在看不清楚時用市場知識填補空缺：

```
只有看得到的才算數      → 不可讀的項目排除，禁止用新聞或記憶中的價位補洞
每個判斷都要附證據      → 寫不出具體證據 → 該項作廢
機率要追溯得到證據      → 只用 5% 級距，不得假精確
要回報可讀性覆蓋率      → 建立在少數可讀項目上必須明顯標示
沒有圖就不預測          → 空報告優於假報告
不得超出預測期間        → 只預測一根日 K
```

---

## 指標判讀規則

端到端實跑暴露一個缺口：**skill 看得到指標，卻不知道怎麼讀。** 兩張截圖渲染了約 26 個指標，framework 只對其中 6 個（RSI · MACD · Stochastic RSI · ATR · MA/EMA · 成交量）有明確規則，其餘約 20 個沒有。

[indicator_reading_rules.md](references/indicator_reading_rules.md) 補上這一塊，蒸餾自 [check.html](../../check.html) 的 `T` 決策樹。價值不在「Supertrend 是趨勢指標」這種常識，而在**誤讀陷阱**：

```
Supertrend  → 看 K 線位置，不看線的顏色。顏色是結果，位置才是訊號
Donchian    → 純突破型。在通道內不管靠上靠下都是中性，「接近上軌」不是偏多
Choppiness  → 永遠不指示方向。它的角色是評定其他趨勢指標該被信任多少
DMI / ADX   → ADX 是門檻不是方向。低於 25 時 DI 交叉多為雜訊
Fractals    → 箭頭標的是過去某根 K 棒的價位。看到箭頭不是訊號，收盤突破才是
Multi-Time  → 只有最後一格轉綠、其餘仍紅 = 中性，不是偏多
```

### 只取規則，不取計票

`check.html` 的 36 項會產出 BUY/WAIT/SELL 計票與 ≥60% 的綜合判斷。**那部分刻意沒有移植。**

計票回答的是「方向偏向」，不是「次日機率」——而且 36 項裡大量是結構型慢指標（多時間框架、鱷魚、ZigZag、唐奇安），等權計票會讓它們壓過真正主宰單一交易時段的快速動能讀數，把上一階段花力氣移除的週線偏誤整包帶回來。

所以規則移植過來後改寫成中性讀數（bullish / neutral / bearish），並由 [SKILL.md 硬規則第 8 條](SKILL.md) 明文禁止計數、算佔比或導出綜合評級。**計分留在 check.html，那裡才是它該待的地方。**

### 優先順序

| 問題 | 依據 |
|------|------|
| 這根線代表什麼 | `indicator_reading_rules.md` |
| 這對明天值多少機率 | `technical_analysis_framework.md` |
| **兩者衝突** | **framework 優先** |

例如查表可能把「RSI > 70 且價創新高」判為看多，但 framework 明講超買本身不是方向訊號、移動方向比絕對水位重要。次日預測的語境下 framework 才對。

### 漂移風險

這是蒸餾快照，**你改了 `check.html` 的規則，skill 不會跟著變**。無法自動同步，只能人工比對：

```bash
curl -s https://raw.githubusercontent.com/JacobHsu/crypto-watch/main/check.html \
  | awk '/^const T = \{/,/^\};/'
```

回傳 521 行結構化決策樹，拿它跟 `indicator_reading_rules.md` 對 diff。

> 執行期即時抓取這條路實測可行（不需執行 JS），但選了蒸餾版換取每次少一次網路呼叫與更精簡的內容。漂移是這個選擇的已知代價。

---

## 使用前提

這個 skill 需要**能讀到圖**。TradingView 是跨域 iframe 裡的 canvas，DOM 讀不到數值——只能靠視覺判讀截圖。圖太小、指標被裁切、或副圖沒渲染完時，硬規則會讓它停止而不是硬猜，這是預期行為。

要得到有意義的輸出，圖上至少要有：可讀的價格軸、一個動能振盪指標（RSI / MACD / Stochastic 擇一）、以及 ATR。缺席的指標會被明確標示為排除在證據之外。走自動取圖時這三樣都齊備。

Microlink 免費層有每日配額，一次預測消耗兩次抓圖。截圖寫到暫存目錄，不落在 repo 內。

---

## 驗證紀錄

- [x] **端到端實跑**（2026-08-30，BTC）：依 Step 0 自動抓兩張圖 → 兩張都通過渲染驗證 → 產出合規報告（三個互斥情境、機率加總 100%、每個機率掛具名證據且多為圖例精確值、ATR 區間、失效價位）。repo 未被污染
- [x] **抓圖可行性**：`waitForTimeout=15000` 下兩頁指標全數渲染，圖例數值可讀
- [x] **失敗偵測**：`waitForTimeout=2000` 重現半成品——副圖**整個消失**、主圖無疊加、圖例只剩 OHLC。據此修正了驗證判準
- [x] **耦合隔離**：grep 確認執行用檔案中所有專案痕跡都在 `chart_sources.md` 內，`SKILL.md` 只出現檔名、零網址

實跑發現並已補進 `chart_sources.md` 的四件事：

1. **`收=` 是進行中的 K 棒，不是前收。** 24/7 市場沒有跳空，`C = 開`，且要拿印出來的漲跌值驗算。這個陷阱的通用版也寫進了 framework 第 0 節
2. **沒有 20 日均量的數值**，framework 第 4 節的量能比較只能目視估——已列為此來源最弱的證據項
3. **Microlink 會回快取，必須帶 `force=true`。** 實測相隔兩小時的兩次抓取回傳位元組完全相同的 PNG；加了 `force` 才拿到真正即時的資料。**這是最糟的失敗模式**——圖渲染完美、通過每一項驗證、產出看起來很篤定的預測，而它建立在舊價格上
4. **重試值 25000 不可用。** API 自身有約 29 秒導航逾時，25000 會直接 `EBRWSRTIMEOUT`。已改為 **首次 15000、重試 20000**

第 3、4 點是第二次實跑（2026-08-30 15:07）才暴露的。同一次也**驗證了失敗偵測有效**：補充頁第一次抓回來所有線都畫出來了但圖例全部沒有數值，規則正確攔下、沒讓它進入分析。

- [x] **通用性回退**（2026-08-30）：移走 `chart_sources.md` 後載入 skill，它依 Step 0 第 3 分支退回請求貼圖並說明圖上需要什麼——沒有報錯、沒有自行亂抓、沒有憑既有知識硬給方向。證實專案耦合確實只在那一個檔案
- [x] **已同步** `.claude/skills/technical-analyst/`（5 個執行檔，不含 `zh-TW/` 與 README）

### 待辦

- [ ] **觸發範圍**：「預測 BTC 明天漲跌」應觸發，「分析這張週線圖的長期結構」不應觸發。**無法自測**——skill 一旦載入就失去中立立場，必須在新 session 直接打那句話看會不會跳出 skill 呼叫。文字上三個觸發子句都綁死在 next-day / tomorrow / next-session / daily charts，週線長期結構應該防得住；殘留邊界是「貼日線圖問怎麼看」可能觸發

---

> 此 skill 產出為技術分析參考，非投資建議。單日方向預測的準確度有其先天上限，機率應視為粗略分級。
