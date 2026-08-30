# Technical Analysis Framework

This reference provides the methodology for producing objective, chart-based **next-day directional forecasts** from daily price charts.

## Core Principles

1. **Chart-Only Analysis**: Base all analysis purely on chart data. Ignore external news, fundamental data, and market sentiment.
2. **Objectivity**: Focus on observable patterns and data rather than subjective interpretations.
3. **Daily Primary Timeframe**: The daily (1D) chart is the decision timeframe. A 4-hour chart may be used for confirmation when provided. Weekly charts are too coarse for a one-session call.
4. **Bounded Horizon**: Every conclusion is scoped to the next daily candle. No open-ended targets.
5. **Probability-Based**: Express the outcome as probabilities over three mutually exclusive scenarios, never as a certainty.

## 0. Reading Values from the Legend

Most charting platforms print a legend showing each indicator's current value — for example `MA 20 close 71,765.82`, `RSI 14 close 70.81`, `ATR 14 RMA 2,197.29`, or an OHLC header such as `開=78,230.00 高=78,330.00 低=77,994.02 收=78,070.57`.

**Read these numbers and quote them.** Evidence built on an exact value is verifiable and reproducible; evidence built on the apparent position of a line is not. "RSI at 70.81, up from the mid-40s three sessions ago" is checkable. "RSI looks overbought" is not.

This matters most for the two readings the forecast depends on numerically:

- **The last daily close (C)** — every scenario boundary is derived from it
- **ATR** — the expected range and the flat zone are computed from it

If either is only estimated visually, say so explicitly and widen the uncertainty.

### Beware the bar in progress

On a live chart the rightmost candle is usually **unfinished**, and the price header describes that unfinished bar rather than the last completed one. Taking it as C silently shifts every scenario boundary.

Establish which bar is complete before fixing C. On a 24/7 market the in-progress bar's open equals the previous close, so C can be recovered from the open; on a session market, look for the last fully formed candle. Cross-check whatever you derive against the printed change value — they must reconcile.

Then state, in the report, how much of the forecast session has already elapsed and in which direction. A forecast issued mid-session is still valid, but the reader has to know that part of the outcome is already determined.

Fall back to visual spatial relationships only when the legend is cropped, overlapping, or otherwise unreadable — and record which values had to be estimated. A legend that shows an indicator's name but no value means the study has not finished rendering; treat that item as unreadable rather than inferring a value from the plotted line.

## 1. Trend Analysis

### Trend Classification

**Uptrend Criteria:**
- Higher highs (HH) and higher lows (HL) pattern
- Price trading above key moving averages
- Moving averages aligned in bullish order (shorter MA > longer MA)

**Downtrend Criteria:**
- Lower highs (LH) and lower lows (LL) pattern
- Price trading below key moving averages
- Moving averages aligned in bearish order (shorter MA < longer MA)

**Sideways/Range-bound:**
- No clear higher high/low or lower high/low pattern
- Price oscillating between defined support and resistance levels
- Moving averages flat or intertwined

### Trend Strength Assessment

**Strong Trend:**
- Clear, consecutive higher highs/lows (uptrend) or lower highs/lows (downtrend)
- Minimal retracements
- Volume confirming price direction

**Weak Trend:**
- Irregular higher/lower highs and lows
- Deep retracements (>50% of prior move)
- Divergence between price and volume

**Trend Exhaustion Signals:**
- Decreasing momentum on new highs/lows
- Volume declining as trend progresses
- Extended distance from moving averages
- Candlestick reversal patterns (e.g., shooting star, hammer, engulfing)

### Trend and the Next-Day Call

Trend sets the prior, not the conclusion. A strong daily uptrend makes an Up outcome somewhat more likely than a Down one, but the effect on a single session is modest — trend alone rarely justifies moving more than 10 percentage points away from an even split. Short-term momentum and proximity to levels carry more weight over one candle.

## 2. Support and Resistance Analysis

### Identifying Support Levels

Support represents price levels where buying interest has historically prevented further decline.

**Criteria for Valid Support:**
- Price has bounced from the level at least 2-3 times
- Volume spikes during bounces
- Longer timeframe support carries more weight
- Round numbers (psychological levels) often act as support

**Support Types:**
- **Horizontal Support**: Previous lows aligning at similar price levels
- **Trendline Support**: Upward-sloping line connecting higher lows
- **Moving Average Support**: Dynamic support from key MAs (e.g., 20-day, 50-day)

### Identifying Resistance Levels

Resistance represents price levels where selling interest has historically prevented further advance.

**Criteria for Valid Resistance:**
- Price has been rejected from the level at least 2-3 times
- Volume spikes during rejections
- Previous significant highs
- Round numbers often act as resistance

**Resistance Types:**
- **Horizontal Resistance**: Previous highs aligning at similar price levels
- **Trendline Resistance**: Downward-sloping line connecting lower highs
- **Moving Average Resistance**: Dynamic resistance from key MAs

### Support/Resistance Significance

**Strong S/R Levels:**
- Tested multiple times (3+ touches)
- Long-standing (months to years)
- High volume at previous touches
- Confluence with other technical factors (Fibonacci, round numbers, moving averages)

**Weak S/R Levels:**
- Only 1-2 touches
- Recent formation
- Low volume at touches

### Support-Resistance Flip

When broken, support often becomes resistance and vice versa. This "role reversal" is a key concept:
- **Broken Support → Resistance**: After downside break, previous support acts as new resistance on retests
- **Broken Resistance → Support**: After upside break, previous resistance acts as new support on pullbacks

### Distance Matters More Than Strength

For a one-day horizon, **how far away a level sits is more important than how strong it is**. Measure the distance from the last close to the nearest level above and below in ATR units:

- **Within 0.5 ATR**: the level is very likely to be tested tomorrow — it dominates the forecast
- **0.5 to 1.5 ATR**: reachable within a normal session
- **Beyond 1.5 ATR**: effectively out of reach for a single candle; do not build a scenario around it

A historically powerful level three ATR away is irrelevant to tomorrow. A minor level half an ATR away is not.

## 3. Moving Average Analysis

### Key Moving Averages for Daily Charts

- **20-day MA**: Short-term trend indicator (approximately one month)
- **50-day MA**: Medium-term trend indicator (approximately one quarter)
- **200-day MA**: Long-term trend indicator (approximately one year)

Use whichever of these are actually plotted on the chart. Do not assume an MA is present because it is conventional.

### Moving Average Interpretations

**Price Position Relative to MAs:**
- **Above all MAs**: Strong bullish structure
- **Below all MAs**: Strong bearish structure
- **Between MAs**: Transitional phase, trend unclear

**Moving Average Crossovers:**
- **Golden Cross**: 50-day MA crosses above 200-day MA (bullish signal)
- **Death Cross**: 50-day MA crosses below 200-day MA (bearish signal)
- Faster crossovers (20-day through 50-day) fire more often and matter more on a short horizon, but produce more false signals

**Moving Average Slope:**
- **Rising MAs**: Bullish momentum
- **Falling MAs**: Bearish momentum
- **Flat MAs**: Consolidation, lack of directional momentum

**Moving Average as Support/Resistance:**
- In uptrends, MAs (especially 20-day and 50-day) often provide dynamic support
- In downtrends, MAs often provide dynamic resistance
- Repeated bounces or rejections from an MA increase its significance
- An MA sitting within one ATR of the last close is a live level for tomorrow; treat it as an S/R level under section 2

### Moving Average Confluence

When multiple MAs cluster together or align:
- **Bullish Alignment**: 20-day > 50-day > 200-day (all rising)
- **Bearish Alignment**: 20-day < 50-day < 200-day (all falling)
- **Compressed/Converging MAs**: Often precedes a significant directional move, but gives no directional information by itself — this raises the odds of a large move without telling you which way

## 4. Volume Analysis

Volume confirms the strength or weakness of price movements.

### The Reference Baseline

Judge the latest day's volume against the **~20-day average volume**, not against the chart's overall appearance. State the comparison explicitly: above average, roughly average, or below average.

### Volume Interpretation Principles

**Volume Confirms Price:**
- **Rising prices + Rising volume**: Healthy uptrend, strong buying
- **Falling prices + Rising volume**: Healthy downtrend, strong selling
- **Rising prices + Falling volume**: Weak uptrend, lack of conviction
- **Falling prices + Falling volume**: Weak downtrend, selling exhaustion possible

### Key Volume Patterns

**Volume Spikes:**
- **At Support**: High volume bounce suggests strong buying interest (bullish)
- **At Resistance**: High volume rejection suggests strong selling interest (bearish)
- **On Breakout**: High volume breakout validates the move
- **Low Volume Breakout**: Often leads to failed breakout (false signal)

**Volume Trends:**
- **Increasing Volume in Trend Direction**: Confirms trend strength
- **Decreasing Volume in Trend Direction**: Warns of potential trend exhaustion
- **Volume Climax**: Extremely high volume often marks trend extremes (capitulation or euphoria)

**Volume Divergence:**
- **Bullish Divergence**: Price making new lows but volume declining (selling exhaustion)
- **Bearish Divergence**: Price making new highs but volume declining (buying exhaustion)

### Volume and the Next-Day Call

A volume-starved move is weak evidence for continuation. If the latest candle moved on below-average volume, discount that candle's directional signal and shift weight toward Flat.

If no volume is plotted on the chart, record volume as unreadable and proceed without it. Do not substitute an impression of activity for a reading.

## 5. Momentum and Oscillators

Momentum is the primary evidence for a next-day call. Structure tells you where price is; momentum tells you what it is doing right now.

Read only the oscillators actually present on the chart, and record which ones are absent.

### RSI (Relative Strength Index)

- **Above 50**: bullish momentum bias; **below 50**: bearish bias
- **Above 70 (overbought)**: in a strong trend this often persists — overbought alone is not a Down signal
- **Below 30 (oversold)**: likewise, not an Up signal on its own
- **Bearish divergence**: price makes a higher high, RSI makes a lower high — momentum is fading
- **Bullish divergence**: price makes a lower low, RSI makes a higher low — selling is fading
- **Direction of travel matters more than level**: RSI rising from 45 to 55 is more informative for tomorrow than a static reading of 68

### MACD

- **Histogram above zero**: bullish momentum; **below zero**: bearish
- **Expanding bars**: momentum accelerating in that direction
- **Contracting bars**: momentum decelerating — an early warning that precedes crossovers
- **Signal-line crossover**: a momentum shift; more meaningful when it occurs away from the zero line
- A histogram that has been shrinking for several sessions weakens any continuation scenario

### Stochastic / Stochastic RSI

- **Above 80**: overbought zone; **below 20**: oversold zone
- **The height of a crossover matters**: a %K/%D bullish cross from below 20 is a stronger signal than one in the middle band
- Mid-band entanglement (20-80, no clear cross) carries no directional information
- Stochastic is fast and noisy; treat it as confirming evidence, not as a primary driver

### Momentum Confluence

When two or more oscillators agree, the evidence is materially stronger than any one alone. When they conflict — for example RSI rising while the MACD histogram contracts — record the conflict and shift weight toward Flat rather than picking the one that fits a preferred narrative.

## 6. Volatility and Expected Range

Volatility does not give direction. It gives the **size of the box** tomorrow's close is likely to land in, and it is what makes a next-day forecast falsifiable rather than vague.

### Deriving the Expected Range

Let **C** be the last completed daily close and **ATR** the current ATR(14) value.

| Band | Range | Meaning |
|------|-------|---------|
| Flat zone | C ± 0.5 ATR | A close in here is a Flat outcome |
| Expected range | C ± 1 ATR | The typical span of a single session |
| Outer band | C ± 1.5 ATR | Reached only on an unusually large day |

Roughly two thirds of daily closes land within about one ATR of the prior close. Treat moves beyond 1.5 ATR as low-probability by construction, and do not set expected targets there.

### If ATR Is Not Plotted

Estimate the average daily true range visually from the last 10-20 candles — the typical high-to-low span, allowing for gaps in session markets. **State explicitly that the value is a visual estimate**, and widen the uncertainty in the probabilities accordingly.

### Volatility States

- **Compressed** (ATR low and falling, narrow candles, tight bands): the flat zone is narrow in absolute terms, so a modest move can still qualify as Up or Down. Compression also precedes expansion — the odds of a large move rise, but the direction remains unknown.
- **Normal**: apply the bands as given
- **Expanded** (ATR high and rising after a large move): the flat zone is wide, which mechanically raises the probability of a Flat outcome in percentage terms. Expanded volatility late in a move often precedes mean reversion rather than continuation.

### Range Conditions Override Direction

If the chart shows clear range-bound behaviour — flat and intertwined moving averages, price oscillating between well-defined boundaries, oscillators cycling in the mid band — **bias the forecast toward Flat**. Forcing a directional call out of a rangebound chart is the most common way this analysis goes wrong.

## 7. Chart Patterns and Candlestick Analysis

### Recency Weighting

For a one-day horizon, the **last one to three candles carry more weight than any multi-month pattern**. Read them explicitly: body size relative to recent candles, wick positions, and whether the close landed near the high or the low of its range.

A close near the high of a wide-range day is meaningful evidence for tomorrow. A months-long triangle that has not yet resolved is not.

### Reversal Patterns

**Bullish Reversal:**
- **Hammer**: Long lower wick, small body at top, appears at support
- **Bullish Engulfing**: Large green candle fully engulfing previous red candle
- **Morning Star**: Three-candle pattern (down, small, up)
- **Double/Triple Bottom**: Price tests support 2-3 times then reverses

**Bearish Reversal:**
- **Shooting Star**: Long upper wick, small body at bottom, appears at resistance
- **Bearish Engulfing**: Large red candle fully engulfing previous green candle
- **Evening Star**: Three-candle pattern (up, small, down)
- **Double/Triple Top**: Price tests resistance 2-3 times then reverses

### Continuation Patterns

**Bullish Continuation:**
- **Bull Flag**: Consolidation after strong move up, then breakout higher
- **Ascending Triangle**: Higher lows with flat resistance, breaks up

**Bearish Continuation:**
- **Bear Flag**: Consolidation after strong move down, then breakdown
- **Descending Triangle**: Lower highs with flat support, breaks down

### Pattern Significance

Patterns carry more weight when:
- Forming at key support/resistance levels
- Accompanied by appropriate volume (high on breakout)
- Confirmed by moving averages and trend structure
- Completing now rather than still forming — an incomplete pattern is not evidence for tomorrow

Multi-candle patterns that would take weeks to resolve should be noted as context but must not drive the next-day probabilities.

## 8. Scenario Development and Probability Assignment

### The Three Scenarios

Every forecast produces exactly three mutually exclusive and exhaustive outcomes for the next daily close, measured against the last close **C**:

| Scenario | Definition |
|----------|------------|
| **Up** | Close above C + 0.5 ATR |
| **Down** | Close below C − 0.5 ATR |
| **Flat / Range** | Close within C ± 0.5 ATR |

Probabilities must sum to exactly 100% and be stated in 5% increments.

### Starting Point

Begin near an even split across the three outcomes and move away from it only in proportion to the evidence actually named. The base rates are unforgiving: for most liquid instruments, daily direction is close to a coin flip, and the flat zone captures a substantial share of sessions by construction.

### Evidence Requirements by Probability Level

| Probability | What it requires |
|-------------|------------------|
| **Up to 40%** | At least one named piece of supporting evidence |
| **45-55%** | At least two named pieces of evidence from different categories (e.g. momentum + level proximity) |
| **60-70%** | At least three named pieces of evidence, no material contradicting signal, and a clearly identified driver |
| **Above 70%** | Not permitted from chart data alone |

"Categories" means the sections of this framework: trend, levels, moving averages, volume, momentum, volatility, price action. Three momentum readings that all say the same thing count as one category, not three.

### What Counts as Evidence

Evidence is a **named indicator with an observed reading**:

- Valid: "MACD histogram positive and expanding for three sessions"
- Valid: "Last close sits 0.3 ATR below the 50-day MA, which is flattening"
- Not valid: "Momentum looks strong"
- Not valid: "The trend is clearly bullish"

An assertion without a named source and reading is narrative, not evidence, and cannot support a probability.

### Handling Conflicting Signals

When categories disagree — momentum bullish but price rejected at resistance, for instance — do not resolve the conflict by choosing the more compelling story. Record both, and shift weight toward Flat. Conflict is genuine information: it means the next session is less predictable, and the probabilities should reflect that.

### Invalidation Levels

Each scenario requires a specific price that would prove it wrong:

- **Up scenario invalidation**: a break below the nearest support, or below the last candle's low
- **Down scenario invalidation**: a break above the nearest resistance, or above the last candle's high
- **Flat scenario invalidation**: a decisive move outside the C ± 0.5 ATR band

A scenario without a concrete invalidation price is not a forecast — it is an opinion that can never be scored.

## 9. Known Limits of Next-Day Forecasting

This section exists to keep the output honest. It should inform the tone of every report.

### Single-Day Direction Is Close to Random

Over a one-session horizon, price movement is dominated by noise, order flow, and information that is not present in the chart. Technical analysis has its best claim on structure and risk levels, not on tomorrow's sign. Any method claiming reliable next-day direction from chart images alone is overstating its case.

**Practical consequence**: probabilities far from even should be rare. A forecast series in which most calls land at 65-70% confidence is miscalibrated, not insightful.

### One Candle Is a Small Sample

A single daily candle can be dominated by one macro release, one large order, or one exchange outage. Structural readings that are sound over twenty sessions can be entirely wrong about the next one. This is expected behaviour, not a failure of the analysis.

### Charts Omit Material Drivers

The chart contains no information about scheduled events, positioning, funding, liquidity conditions, or news. For instruments where those factors dominate short-term movement, the chart-only constraint is a real handicap and should be acknowledged in the report's risk section.

### Precision Is Not Accuracy

A probability of 63% implies a resolution that visual chart reading cannot deliver. Use 5% increments. Similarly, quote price levels at the precision the chart's axis actually supports, not to a precision the image cannot resolve.

### Treat Probabilities as Coarse Grades

Read the numbers as bands rather than point estimates:

| Band | Meaning |
|------|---------|
| 30-40% | Somewhat less likely than the alternatives |
| 40-55% | Genuinely uncertain — the honest answer for most sessions |
| 55-70% | A real lean, supported by multiple independent categories |

### Objectivity Reminders

- Avoid confirmation bias: build all three scenarios before deciding which leads
- Let the chart speak: do not force patterns or signals
- Admit uncertainty: not every chart supports a directional call, and saying so is a valid output
- Focus on probabilities, not predictions: no scenario is certain

### Common Pitfalls to Avoid

- **Forcing direction on a rangebound chart**: the single most common failure mode
- **Ignoring distance**: quoting a level that is three ATR away as if it were reachable tomorrow
- **Weekly thinking on a daily horizon**: letting a multi-month pattern drive a one-session call
- **False precision**: probabilities and price levels finer than the evidence supports
- **Filling gaps with knowledge**: substituting what you know about the instrument for what the chart shows
- **Overconfidence after a correct call**: one hit says nothing about calibration
