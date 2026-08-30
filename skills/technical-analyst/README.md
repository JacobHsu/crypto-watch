# technical-analyst — Skill 說明

> 週線技術分析 skill。給它圖表截圖，它輸出一份含支撐/阻力價位、機率加權情境、失效價位的 Markdown 報告。

**目前狀態：原版未修改。** 從上游原封不動下載，尚未針對本專案改造。

---

## 來源

| 項目 | 內容 |
|------|------|
| 上游 | [sundial-org/awesome-openclaw-skills](https://github.com/sundial-org/awesome-openclaw-skills/tree/main/skills/technical-analyst) |
| 授權 | 上游 repo 根目錄**無 LICENSE 檔**，散佈前請自行確認 |
| 本目錄 | `skills/technical-analyst/` — 開發用副本 |
| 已安裝 | `.claude/skills/technical-analyst/` — Claude Code 實際載入的位置 |

兩份目前內容相同。改造在本目錄進行，確認後再同步過去。

---

## 檔案分工

```
technical-analyst/
├── SKILL.md                                   流程骨架（238 行）
├── references/technical_analysis_framework.md 判斷準則（282 行）
└── assets/analysis_template.md                報告模板（183 行）
```

### `SKILL.md`
定義 skill 的觸發條件與六步流程。frontmatter 的 `description` 決定它何時被叫起來——目前是「使用者提供圖表並要求技術分析」，範圍很寬。

### `references/technical_analysis_framework.md`
真正的判斷邏輯所在，分七節：趨勢分類與強度、支撐阻力辨識、均線解讀、成交量分析、型態與 K 棒、情境與機率分配、紀律與常見陷阱。SKILL.md 要求開始分析前先讀這份。

### `assets/analysis_template.md`
十節報告模板：圖表概述、趨勢、支撐阻力、均線、成交量、型態、當前評估、情境分析、總結、免責聲明。

---

## 運作流程

```
1. 確認收到幾張圖
2. 讀 references/technical_analysis_framework.md 載入方法論
3. 逐張分析六個面向：
     趨勢 → 支撐/阻力 → 均線 → 成交量 → 型態/K棒 → 綜合
4. 產出 2~4 個情境，機率加總 100%
5. 套 assets/analysis_template.md 出報告
6. 存成 [SYMBOL]_technical_analysis_[YYYY-MM-DD].md
7. 多張圖時逐張做完存檔再換下一張，不批次處理
```

### 情境框架

| 情境 | 建議機率 | 條件 |
|------|---------|------|
| Base Case 基準情境 | 40~60% | 依當前結構最可能的走法 |
| Bull Case 多方情境 | 20~40% | 需向上突破阻力 |
| Bear Case 空方情境 | 20~40% | 需向下跌破支撐 |
| Alternative 替代情境 | 5~15% | 機率低但技術上說得通 |

每個情境必須含：**支持因素**（至少 2~3 項）、**目標價位**、**失效價位**（invalidation level，即哪個價位到了就代表這個情境錯了）。

---

## 與本專案的關係

本專案已有 [`check.html`](../../check.html)（說明見 [`docs/CHECK.md`](../../docs/CHECK.md)）作為 36 項指標核對系統。兩者定位不同：

| | check.html | technical-analyst |
|---|-----------|-------------------|
| 輸入 | 對照圖表逐項核對 | 圖表截圖 |
| 產出 | `▲ BUY` / `◈ WAIT` / `▼ SELL` | 敘事型報告 |
| 內容 | 指標訊號，**無價位** | 支撐阻力價位、目標價、失效價位 |
| 級別 | 1H / 4H / 1D | 週線（1W 以上） |
| 防幻覺 | 有硬規則（無證據 → WAIT、看不到圖就停止） | 無等價機制 |

零重疊的地盤是 [`m/`](../../m/) 目錄下的 1W / 3M 圖表——`docs/CHECK.md` 明文將其排除在檢查表之外（指標組合不同），而這個 skill 本來就是為週線設計的。

---

## 改造待辦

原版直接套在本專案上有四個落差：

1. **均線週期寫死** — framework 第 102~106 行假設 20 / 50 / 200 週線，本專案實際載入的組合定義在 [`indicators.js`](../../indicators.js)
2. **重度依賴成交量** — framework 第 4 節整節建立在成交量柱狀圖上，本專案圖表多數沒掛 volume pane；量價資訊實際來自 OBV / MFI / CMF / VWMA
3. **機率可被憑空編造** — framework 第 210~243 行要求給出加總 100% 的百分比，卻沒有任何「拿不出圖上證據就不准給數字」的約束。TradingView 是跨域 iframe 裡的 canvas，只能靠視覺判讀，這條缺口最需要補
4. **觸發範圍過寬** — `description` 會攔截本專案日常的圖表分析提問，應收窄到週線／月線或明確要求情境分析時才觸發

---

> 此 skill 產出為技術分析參考，非投資建議。
