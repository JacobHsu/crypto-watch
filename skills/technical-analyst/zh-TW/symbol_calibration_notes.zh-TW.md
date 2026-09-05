# symbol_calibration_notes.md 中文對照

> **翻譯版，僅供閱讀。** 實際執行以 [`../references/symbol_calibration_notes.md`](../references/symbol_calibration_notes.md) 英文原檔為準。

選用檔案。只有具備獨立實證回測的標的才會出現在這裡；預測的標的不在下方清單中時，直接略過本檔，回退使用 `technical_analysis_framework.md` 與 `indicator_reading_rules.md` 的通用處理方式。

目前涵蓋：**BTC、ETH**。

## 這是什麼

姊妹專案 `py-tvscreener` 用程式化方式讀取 TradingView 資料，跑過一次真正的回測：針對每個技術指標的讀數，量測未來 24 小時價格「真的照預期方向走」的實際勝率，並與該標的同期「無條件上漲機率」（baseline）比較。兩者之差（勝率 − baseline）就是「edge」——來源報告是 `docs/indicator-backtest/README.md`，由 `scripts/backtest_indicator_accuracy.py` 產生。

本檔把該報告蒸餾成這個 skill 實際會預測的兩個標的專用版本。

## 怎麼用

- 預測標的是 BTC 或 ETH 時，在 Step 2 跟 `technical_analysis_framework.md`、`indicator_reading_rules.md` 一起讀。
- 本檔**不授權計票或算分**（`SKILL.md` 的 Hard Rule 8 完全不變）。它只是告訴你，在判斷 framework §8 的證據數量門檻時，哪些具名證據類別該多給權重、哪些該少給——下方標記「實證上較弱／負向」的類別，即使形式上滿足了通用的類別數規則，也不該單獨用來把機率推離 50/50。
- `indicator_reading_rules.md` 仍然決定一個讀數**是什麼**；本檔決定一個**正確**的讀數對這個特定標的**值多少**。

## 時間框架與解析度的但書——使用任何數字前請先讀這段

來源回測讀的是**1 小時級別**的指標數值，量測未來 **24 小時**的走向。這個 skill 讀的是**日線級別**的指標數值，預測**下一根日 K**（對 24/7 的加密貨幣來說同樣約為 24 小時，所以預測期限是對得上的，但指標本身的時間解析度不同）。請把以下每個數字都當成**方向性的校準訊號**——哪一類證據真的有用、哪一類沒用——而不是可以直接套用到不同指標解析度上的精確機率。這份樣本本身也明顯偏多頭（2026-02 至今），還沒經過空頭市場或劇烈回檔的驗證。

## BTC

### 實證上較強的證據（該多給權重）

| 讀數 | 方向 | Edge |
|---|---|---|
| Ultimate Oscillator > 70（超買） | Bear（預期下跌） | **+16.6pp** —— 全報告單一最強訊號 |
| 射擊之星 K 線型態 | Bear | +8.9pp |
| MFI > 80（超買） | Bear | +6.4pp |
| RSI(14) > 70（超買） | Bear | +5.2pp |
| 倒錘形 K 線型態 | Bull | +4.6pp |

**要注意的不對稱**：這些讀數的超賣／偏多鏡像，對 BTC **不管用**。RSI<30、MFI<20、Ultimate Oscillator<30 全部接近零甚至明顯為負（Ultimate Oscillator Bull：−9.8pp）。對 BTC 而言，「超賣」不該被讀成「可能反彈」——只有超買→回落這個方向才有真實 edge。

### 實證上較弱／負向的證據（不要讓它們單獨撐起一個機率）

ADX+DI 方向、Aroon 主導方、Parabolic SAR 位置、MA/Technical 綜合評級，以及幾乎所有 SMA/EMA 交叉與排列——對 BTC 來說 edge 都落在接近零到微負之間。特別值得注意的是，這個 skill 自己 Confluence Checks 表裡當作加強確認證據的 **ADX+Aroon+SAR 三向同向**，對 BTC 的 edge 只有 +0.9pp（Bull）／+1.3pp（Bear）——本質上就是雜訊，不是天真的「多個訊號同向＝更可信」推論所暗示的那種相互驗證訊號。

## ETH

### 實證上較強的證據（該多給權重）

| 讀數 | 方向 | Edge |
|---|---|---|
| MFI > 80（超買） | Bear | +13.1pp |
| RSI(14) > 70（超買）且 ADX > 20 | Bear | +13pp |
| RSI(14) > 70（超買） | Bear | +12.4pp |
| RSI(14) < 30（超賣）且 ADX > 20 | Bull | +7.8pp |
| Stochastic %K < 20 / > 80 | Bear | +7.4pp |
| CCI(20) < −100 / > 100（極端值） | Bear | +6.7pp |
| RSI(14) < 30（超賣） | Bull | +6.5pp |

跟 BTC 不同，**RSI 極端值對 ETH 兩個方向都有用**——超賣真的能預測反彈，不是只有超買預測回落才管用。

### 實證上較弱／負向的證據（不要讓它們單獨撐起一個機率）

**ADX 偏多方向（+DI > −DI，ADX ≥ 25）對 ETH 反而有害：edge −9.5pp——比丟銅板還差。** 這是全報告最強的負向發現，看到 ADX 確認的上升趨勢讀數時，對 ETH 應該保持真正的懷疑，而不是當成確認訊號。對 ETH 同樣為負向的還有：MA/Technical 綜合評級、多數 SMA/EMA 交叉，以及 Aroon（兩個方向都是負的）——還有一個違反教科書直覺的：**空頭吞噬 K 線型態（−5.7pp）**。

## 兩個標的通用的最佳組合訊號

**RSI(14) > 70 且 MFI > 80 同時成立**（同時超買）是整份報告表現最好的訊號：**BTC +10.9pp、ETH +15.3pp，皆為 Bear 方向**。對應 `indicator_reading_rules.md` Confluence Checks 表裡新增的「RSI × MFI 雙極端」那一列。超賣鏡像（RSI<30 且 MFI<20，預期反彈）對 BTC 不可靠（−6.2pp），但對 ETH 有中等程度的用處（+4.4pp）——跟上面單一指標的 BTC/ETH 不對稱現象一致。

## 來源與漂移

蒸餾自 `py-tvscreener` repo 的 `docs/indicator-backtest/README.md` §3.1（BTC）與 §3.2（ETH），由 `scripts/backtest_indicator_accuracy.py` 產生。該報告每次重跑（累積更多歷史資料後）都會被覆寫——**本檔會跟著過時，且無法自動同步。** 要更新時，重讀該報告目前的版本，把「高可靠」與「負向」段落跟上面的表格做 diff，尤其是等樣本涵蓋過一次空頭市場或劇烈回檔之後——來源報告本身就明講這段還沒被驗證過。
