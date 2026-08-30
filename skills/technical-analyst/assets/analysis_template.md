# Next-Day Forecast Report

**Ticker/Symbol**: [Symbol Name]
**Timeframe**: Daily (1D) · Forecast target: next daily close
**Analysis Date**: [YYYY-MM-DD]
**Session Convention**: [24/7 UTC daily close | Session market — gap risk applies]
**Analyst**: Claude Technical Analyst

---

## 0. Forecast Summary

| Field | Value |
|-------|-------|
| **Direction** | [Up / Down / Flat] |
| **Probability** | [XX]% (Up [XX]% · Down [XX]% · Flat [XX]%) |
| **Last Close (C)** | [Price] |
| **ATR(14)** | [Value] — [read from chart / visual estimate] |
| **Flat Zone** | [C − 0.5 ATR] to [C + 0.5 ATR] |
| **Expected Range (±1 ATR)** | [C − 1 ATR] to [C + 1 ATR] |
| **Invalidation** | [Price level that would break the leading scenario] |
| **Readability** | [N] of [M] analysis items readable |

**One-line call**: [Single sentence stating the leading outcome and its main driver]

---

## 1. Chart Overview

[Brief description of what the chart shows — instrument, current price level, visible indicators, which panes are present, and anything cropped or unreadable]

**Indicators present**: [list]
**Indicators absent**: [list — these are excluded from the evidence base]

---

## 2. Trend Analysis

### Current Trend
- **Direction**: [Uptrend / Downtrend / Sideways]
- **Strength**: [Strong / Moderate / Weak]
- **Duration**: [How long this trend has been in place]

### Trend Details
[Detailed analysis of the trend structure — higher highs/lows, lower highs/lows, etc.]

**Evidence**: [One sentence describing the concrete spatial relationship observed]

---

## 3. Support and Resistance Levels

### Nearest Levels

| Level | Price | Distance from C | Distance in ATR | Type |
|-------|-------|-----------------|-----------------|------|
| Nearest resistance | [Price] | [%] | [X.X ATR] | [Horizontal / Trendline / MA] |
| Nearest support | [Price] | [%] | [X.X ATR] | [Horizontal / Trendline / MA] |

### Additional Levels in Range
[Any other level within 1.5 ATR. Levels beyond 1.5 ATR are out of reach for one session — note them as context only.]

### Support/Resistance Notes
[Role reversals, confluence zones, or repeated tests]

**Evidence**: [One sentence]

---

## 4. Moving Average Analysis

### Current MA Structure
- **Price vs 20-day MA**: [Above / Below / At] — [distance in % and ATR]
- **Price vs 50-day MA**: [Above / Below / At] — [distance in % and ATR]
- **Price vs 200-day MA**: [Above / Below / At] — [distance in % and ATR]

Mark any MA not plotted on the chart as `not present`.

### MA Configuration
- **Alignment**: [Bullish / Bearish / Neutral]
- **Slope**: [Rising / Falling / Flat]
- **Crossovers**: [Any recent or pending crossovers]

### MA as Live Level
[Any MA within 1 ATR of the last close is a live level for tomorrow — identify it here]

**Evidence**: [One sentence]

---

## 5. Volume Analysis

| Field | Value |
|-------|-------|
| Latest day's volume | [Above / Roughly / Below] the ~20-day average |
| Volume trend | [Increasing / Decreasing / Stable] |
| Confirms latest candle? | [Yes / No / Unclear] |

### Volume Observations
- [Key observation 1 — e.g. volume spike at support]
- [Key observation 2 — e.g. declining volume on rally]

### Volume Confirmation
[Whether volume supports the latest move. A volume-starved move is weak evidence for continuation.]

**Evidence**: [One sentence — or `unreadable` if no volume pane is present]

---

## 6. Momentum and Trend Indicators

List every momentum and trend indicator visible on the chart. Add rows for any not pre-listed; delete rows for any not present. Readings follow `indicator_reading_rules.md`.

| Indicator | Reading (observed value/state) | Signal | Note |
|-----------|-------------------------------|--------|------|
| RSI | [Value, position vs 50, direction of travel] | [Bullish / Bearish / Neutral] | [Divergence?] |
| MACD | [Histogram sign, expanding or contracting] | [Bullish / Bearish / Neutral] | |
| Stochastic RSI | [%K, %D, zone of any crossover] | [Bullish / Bearish / Neutral] | |
| ROC | [Value, side of zero, direction] | [Bullish / Bearish / Neutral] | |
| DMI / ADX | [ADX first, then which DI leads] | [Bullish / Bearish / Neutral] | ADX below 25 → neutral regardless of DI |
| Aroon | [Up vs Down] | [Bullish / Bearish / Neutral] | |
| Hull MA | [Price position, slope] | [Bullish / Bearish / Neutral] | |
| Supertrend | [Which side the candles sit on] | [Bullish / Bearish] | Position, not line colour |
| Parabolic SAR | [Dot side; recent flip?] | [Bullish / Bearish] | |
| Volatility Stop | [Line position] | [Bullish / Bearish] | |
| Alligator | [Separated or entangled; price position] | [Bullish / Bearish / Neutral] | Entangled → no signal |
| Fractals | [Has a candle closed beyond an arrow's level?] | [Bullish / Bearish / Neutral] | Arrow marks a past level, not a position |
| Donchian | [Broken a boundary, or inside?] | [Bullish / Bearish / Neutral] | Inside the channel is always neutral |
| Linear Regression | [Price position, slope] | [Bullish / Bearish / Neutral] | |
| Zig Zag | [High/low sequence] | [Bullish / Bearish / Neutral] | Lagging; low weight for one candle |

### Momentum Assessment
[Do the readings agree or conflict? Direction of travel matters more than absolute level. Conflict shifts weight toward Flat.]

**Do not tally these readings.** No counts, no percentages, no overall rating — see Hard Rule 8.

**Evidence**: [One sentence per indicator read — mark absent indicators explicitly as unreadable or not present]

---

## 7. Volatility and Expected Range

| Field | Value |
|-------|-------|
| ATR(14) | [Value] — [from chart / visual estimate] |
| ATR as % of price | [X.X]% |
| Volatility state | [Compressed / Normal / Expanded] |
| Flat zone (C ± 0.5 ATR) | [Low] to [High] |
| Expected range (C ± 1 ATR) | [Low] to [High] |
| Choppiness Index | [Value] → [Trending < 38.2 / Indeterminate / Ranging > 61.8] |
| Historical Volatility | [Value, relative level, turning up or flat] |
| Bollinger / Keltner | [Band contact, and whether bandwidth is expanding or contracting] |

None of these supplies direction. Choppiness above 61.8 downgrades **every** trend-following reading in section 6 — say so explicitly if it applies.

### Volatility Notes
[Is volatility compressing or expanding? Does the chart show range-bound behaviour that should bias toward Flat?]

**Evidence**: [One sentence]

---

## 8. Recent Price Action

### Last Three Candles

| Session | Body | Close position in range | Note |
|---------|------|-------------------------|------|
| Latest | [Large / Small, green / red] | [Near high / Middle / Near low] | [Observation] |
| −1 | | | |
| −2 | | | |

### Identified Patterns
- **Pattern**: [Name, and whether it is complete or still forming]

Incomplete multi-week patterns are context only and must not drive the probabilities.

**Evidence**: [One sentence]

---

## 9. Current Assessment

### Overall Structure
[Synthesize the sections above into a coherent view of where price stands going into the next session]

### Key Factors for the Next Session
1. [Most important factor]
2. [Second]
3. [Third]

### Conflicting Signals
[Record any disagreement between categories. Conflict is information — it lowers confidence and raises the Flat probability.]

---

## 10. Scenario Analysis

The three scenarios are mutually exclusive and exhaustive. Probabilities sum to 100% and are stated in 5% increments.

### Scenario A: Up — **[XX]%**

Next daily close above **[C + 0.5 ATR]**.

**Supporting Evidence** (named indicator + observed reading):
- [Category — indicator — reading]
- [Category — indicator — reading]
- [Category — indicator — reading]

**Expected Price Range**: [Low] to [High]

**Invalidation Level**: [Price — typically a break below the nearest support or the last candle's low]

---

### Scenario B: Down — **[XX]%**

Next daily close below **[C − 0.5 ATR]**.

**Supporting Evidence**:
- [Category — indicator — reading]
- [Category — indicator — reading]

**Expected Price Range**: [Low] to [High]

**Invalidation Level**: [Price — typically a break above the nearest resistance or the last candle's high]

---

### Scenario C: Flat / Range — **[XX]%**

Next daily close within **[C − 0.5 ATR]** to **[C + 0.5 ATR]**.

**Supporting Evidence**:
- [Category — indicator — reading]
- [Category — indicator — reading]

**Expected Price Range**: [C − 0.5 ATR] to [C + 0.5 ATR]

**Invalidation Level**: A decisive close outside the flat zone in either direction

---

### Probability Justification

| Scenario | Probability | Evidence count | Categories represented |
|----------|-------------|----------------|------------------------|
| Up | [XX]% | [N] | [list] |
| Down | [XX]% | [N] | [list] |
| Flat | [XX]% | [N] | [list] |

Requirements: 45-55% needs at least two categories; 60-70% needs at least three categories and no material contradicting signal; above 70% is not permitted from chart data alone.

---

## 11. Summary

### Leading Outcome
[One or two sentences on the highest-probability scenario and what drives it]

### Levels to Watch
- **Upside trigger**: [Level]
- **Downside trigger**: [Level]
- **Invalidation of the leading call**: [Level]

### Risk Considerations
[Caveats and limits: unreadable items, absent indicators, gap risk for session markets, scheduled events not visible on the chart, conflicting signals]

---

## 12. Disclaimer

This forecast is based purely on technical chart data and does not consider fundamental factors, news, or market sentiment.

Single-day direction is close to random and is dominated by information not present in the chart. The probabilities above are coarse grades, not precise estimates — read 40-55% as genuinely uncertain and treat anything above 70% as unsupported by chart reading alone. This is a probabilistic assessment, not a prediction or an investment recommendation.

---

**End of Forecast**
