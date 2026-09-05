# Indicator Reading Rules

A lookup table for reading individual indicators correctly. Consult it whenever an indicator appears on the chart.

This file answers **"what does this line mean?"** It does not answer "what is this worth for tomorrow?" — that is the framework's job.

---

## Precedence

`technical_analysis_framework.md` **overrides this file** wherever they disagree.

| Question | Authority |
|----------|-----------|
| What does this indicator's current state mean? | This file |
| How much does that reading matter for the next daily candle? | The framework |
| How much probability can it support? | The framework (§8 evidence thresholds) |
| The two conflict | **The framework wins** |

A concrete conflict: a simple reading rule may call RSI above 70 with price making new highs "bullish". The framework states that overbought alone is not a directional signal and that direction of travel outranks absolute level. On a next-day horizon **the framework is right** — RSI at 70.81 falling from the low 80s is a weakening signal regardless of how any lookup rule classifies it.

## These are readings, not scores

Each rule yields one of three readings: **bullish**, **neutral**, or **bearish**.

**Do not count them.** Do not tally bullish versus bearish, do not compute a percentage, do not derive an overall rating, and do not report any such aggregate.

Equal-weight counting would treat a slow structural indicator as worth the same as a fast momentum indicator, which is exactly the distortion that ruins a one-session forecast. Each reading enters the report as one named piece of evidence and remains subject to the framework's category rules — **three momentum indicators all reading bullish is one category, not three pieces of evidence.**

A `neutral` reading is a real observation ("I looked, and the chart does not resolve a direction"). It is different from `unreadable`, which means the indicator could not be seen at all. Never conflate them.

---

## Trend and structure

### Supertrend
**Read**: which side of the line the candles sit on.
- Bullish: candles above the line · Bearish: candles below

**Trap**: **ignore the line's colour.** Colour is a consequence of position, not an independent signal. A red line with candles above it means the trend has just flipped up — that reads bullish, not bearish.

### Parabolic SAR
**Read**: which side of the candles the dot series sits on.
- Bullish: dots below price · Bearish: dots above price
- A fresh flip to the other side is the entry/exit signal and is worth noting separately from a long-established position.

**Trap**: a flip that happened many sessions ago carries far less information for tomorrow than one that just occurred. For BTC/ETH, see `symbol_calibration_notes.md` — SAR side alone has empirically weak (BTC) to negative (ETH) edge at this horizon; a fresh flip is still worth noting, but do not treat a long-standing side alone as directional evidence for these two symbols.

### Williams Alligator
Three displaced averages: jaw (slowest), teeth, lips (fastest).
**Read**: whether the lines are entangled or separated, and where price sits.
- Bullish: lines separated and fanned with price above them, fastest on top
- Bearish: lines separated with price below, slowest on top
- Neutral: lines intertwined — the "sleeping alligator", a range condition

**Trap**: entangled lines mean **no signal**, not a weak signal. While the alligator sleeps, other trend indicators lose reliability too.

### Williams Fractals
Small up/down arrows marking recent swing highs and lows.
**Read**: whether a later candle has *closed* beyond the level an arrow marks.
- Bullish: a candle has closed above the price level of an up-arrow
- Bearish: a candle has closed below the level of a down-arrow
- Neutral: arrows exist but price has not yet closed beyond them

**Trap**: the arrow marks a **past candle's price level**, not a current position. Seeing an arrow is not the signal; closing beyond its level is. The candle's own colour is irrelevant.

### Zig Zag
**Read**: the sequence of connected swing highs and lows.
- Bullish: higher highs and higher lows · Bearish: lower highs and lower lows
- Neutral: no consistent sequence

**Trap**: this is a lagging structural indicator that repaints its last leg. It describes what has already happened, so it carries little weight over a single candle.

### Linear Regression
**Read**: the slope of the line and where price sits relative to it.
- Bullish: price above the line, slope rising · Bearish: price below, slope falling
- Neutral: price hugging the line, slope near flat

### Multi-Time Period
A row of coloured blocks, one per timeframe.
**Read**: the green-to-red majority across the blocks.
- Bullish: green clearly dominant · Bearish: red clearly dominant
- Neutral: mixed with no clear majority

**Trap**: **only the last block turning green while the rest stay red is neutral, not bullish.** That is an early transition, not a confirmed one.

---

## Channels and bands

### Bollinger Bands
**Read**: contact with a band **together with** whether bandwidth is expanding or contracting.
- Bullish: tagging or breaking the upper band while bandwidth expands
- Bearish: tagging or breaking the lower band while bandwidth expands
- Neutral: drifting near the middle band, **or** touching a band while bandwidth contracts

**Trap**: a band touch on a contracting band is a false-breakout warning, not a directional signal. Band contact alone means nothing without the bandwidth context.

### Keltner Channel
**Read**: whether price has broken a band and held there.
- Bullish: broke above the upper band and held · Bearish: broke below the lower band and held
- Neutral: oscillating inside the channel

### Donchian Channels
Upper = highest high of N periods, lower = lowest low.
**Read**: whether price has broken a boundary.
- Bullish: candle breaks above the upper band (new N-period high)
- Bearish: candle breaks below the lower band
- Neutral: anywhere inside the channel

**Trap**: **this is a pure breakout indicator.** Being inside the channel is neutral whether price sits near the top, the middle, or the bottom. "Close to the upper band" is not a bullish reading.

### Volatility Stop
**Read**: line position relative to price.
- Bullish: line below price · Bearish: line above price

---

## Moving averages

### MA (simple) and EMA (exponential)
**Read**: the ordering of price and the averages.
- Bullish: price > fast MA > slow MA · Bearish: slow MA > fast MA > price
- Neutral: averages entangled or crossing without a settled order

**Trap**: partial ordering is neutral, not bullish. Price reclaiming the fast average while the fast average still sits below the slow one is an unconfirmed transition.

### MA Cross
**Read**: a marked crossover event.
- Bullish: fast crossing up through slow (golden cross)
- Bearish: fast crossing down through slow (death cross)
- Neutral: no crossover, averages running parallel

**Trap**: no crossover means the existing trend continues — it is not a signal in either direction. For BTC/ETH,
see `symbol_calibration_notes.md` — MA/EMA ordering and crosses across nearly every period tested show ~0 to
negative edge at this horizon; treat "bullish alignment" as a much weaker piece of evidence for these two symbols
than the generic framework guidance implies.

### VWMA (volume-weighted)
**Read**: price position plus the average's slope.
- Bullish: price above and VWMA rising · Bearish: price below and VWMA falling
- Neutral: price oscillating around it

**Trap**: VWMA diverging from a plain MA of the same length is informative — it means the move is happening on unrepresentative volume.

### Hull MA
A very low-lag average; turns earlier than an EMA.
**Read**: price position plus slope.
- Bullish: price above and HMA rising · Bearish: price below and HMA falling
- Neutral: price riding the line, or the line flattening

**Trap**: its low lag cuts both ways — it produces more false turns than a slower average. Treat it as an early warning, not a confirmation.

---

## Momentum

The framework's §5 governs interpretation for all of these. The rules below only establish what the reading *is*.

### RSI
**Read**: level relative to 50, and direction of travel.
- Bullish: above 50 and rising · Bearish: below 50 and falling
- Neutral: oscillating around 45–55

**Trap**: in the extreme zones, level alone is not a reading — check for divergence. Price making a new high while RSI does not is bearish divergence; the mirror case is bullish divergence. Per the framework, **overbought in a strong trend routinely persists and is not a sell signal by itself.** For BTC/ETH specifically, see `symbol_calibration_notes.md` — extreme RSI readings are empirically among the strongest evidence this skill has access to, which cuts against reading overbought/oversold as neutral by default for these two symbols.

### CCI (Commodity Channel Index)
**Read**: side of the zero line for trend bias; the ±100 bands for extremes.
- Bullish: above +100 (strong upside momentum) · Bearish: below −100 (strong downside momentum)
- Neutral: oscillating between −100 and +100

**Trap**: unlike RSI/Stochastic, CCI has no fixed upper/lower bound — "extreme" is a threshold (±100), not a
percentage ceiling, so a very large reading is not automatically more meaningful than one just past the
threshold. Treat crossing ±100 as the signal, not the raw magnitude beyond it.

### MACD
**Read**: histogram sign and whether bars are expanding or contracting.
- Bullish: histogram positive and expanding · Bearish: histogram negative and expanding downward
- Neutral: histogram contracting toward zero from either side

**Trap**: a contracting histogram is an early deceleration warning that precedes crossovers. A positive but shrinking histogram is **not** a bullish reading.

### Stochastic RSI
**Read**: the zone in which a %K/%D crossover occurred.
- Bullish: %K crossing above %D from below 20 · Bearish: %K crossing below %D from above 80
- Neutral: the two lines entangled in the 20–80 mid band

**Trap**: crossover *height* is the signal. A cross in the middle band carries little information. This oscillator is fast and noisy — confirming evidence, never a primary driver.

### ROC (Rate of Change)
**Read**: side of the zero line and direction of travel.
- Bullish: above zero and rising · Bearish: below zero and falling
- Neutral: oscillating across zero

### Ultimate Oscillator
A weighted blend of three timeframes into one 0–100 line, designed to reduce the false divergences a single-
period oscillator produces.
**Read**: the 30/70 extremes, same shape as RSI.
- Bullish: below 30 (oversold) · Bearish: above 70 (overbought)
- Neutral: oscillating in the 30–70 mid band

**Trap**: because it blends three periods, it lags a single-period oscillator at turns — do not expect it to
lead RSI or Stochastic RSI at an exact reversal candle. Its value is in the extremes being less prone to a false
signal, not in early timing.

### DMI / ADX
Three lines: +DI (bull strength), −DI (bear strength), ADX (trend strength, **directionless**).
**Read**: ADX first as a gate, then which DI leads.
- Bullish: +DI above −DI **and** ADX above 25
- Bearish: −DI above +DI **and** ADX above 25
- Neutral: ADX below 25, regardless of which DI leads

**Trap**: **ADX is a threshold, not a direction.** Below 25 the DI crossovers are mostly noise. A rising ADX confirms whatever direction is already in place; it never supplies one. For ETH specifically, see `symbol_calibration_notes.md` — an ADX-confirmed bullish reading has empirically negative edge; do not treat this reading as confirmation for that symbol.

### Aroon
Two 0–100 lines: Up (recency of new highs), Down (recency of new lows).
**Read**: which line dominates and how decisively.
- Bullish: Up near 100 and clearly above Down · Bearish: Down near 100 and clearly above Up
- Neutral: both entangled near the middle

**Trap**: for BTC/ETH, see `symbol_calibration_notes.md` — this reading has been empirically near-zero (BTC) to
negative (ETH, both directions) at the ~24h horizon. A dominant Aroon reading should not, alone, move a
probability for these two symbols.

---

## Volatility

Volatility indicators supply **magnitude, not direction**. None of them yields a bullish or bearish reading on its own.

### ATR
**Read**: the current value, and whether it is rising or falling.
- Expanding: larger expected range; combined with a directional break this confirms the break has force
- Contracting: compression, a coiling condition with no directional information

The framework §6 uses this value to derive the expected range and flat zone. That is its primary job here.

### Choppiness Index
**Read**: which band the value sits in.
- Below 38.2: a trending regime — trend-following readings are more reliable
- 38.2 to 61.8: indeterminate
- Above 61.8: a ranging regime

**Trap**: **CI never indicates direction.** Its role is to grade how much every *other* trend indicator should be trusted. Above 61.8, downgrade all trend-following readings and bias the forecast toward Flat. This is the single most misused indicator on the board.

### Historical Volatility
**Read**: whether the level is relatively high or low, and whether it is turning up.
- Low and turning up: a move is starting — direction must come from price, not from HV
- Low and flat: compression, no signal
- High after an extended expansion: often late in a move; chasing is unfavourable

---

## Volume and money flow

### OBV
**Read**: OBV direction compared with price direction.
- Bullish: both rising together · Bearish: both falling together
- Neutral: diverging — a reversal warning rather than a directional reading

### MFI
A volume-weighted RSI, 0–100.
- Bullish: above 50 and rising · Bearish: below 50 and falling
- Bearish: above 80 while price makes a new high that MFI does not confirm (divergence)
- Neutral: hovering near 50

### CMF
A zero-line oscillator for accumulation versus distribution.
- Bullish: positive and rising · Bearish: negative and falling
- Neutral: hovering near zero

---

## Confluence checks

Two indicators pointing the same way is materially stronger evidence than either alone. Two pointing opposite ways is **not** a tie to be broken by picking the more persuasive one — per framework §8, record the conflict and shift weight toward Flat.

| Pair | Agreement reads | Disagreement reads |
|------|-----------------|--------------------|
| **Alligator × Fractals** | Alligator open in the same direction as a confirmed fractal break — a strong structural signal | Alligator sleeping, or pointing against the break — the fractal signal is void |
| **Bollinger × Keltner (squeeze)** | Bollinger bands pushing outside Keltner *with* a directional break — the move is releasing | Bollinger contained inside Keltner — energy is coiling, direction unknown, neutral |
| **MA × EMA** | Both sets in the same directional order — confirmed | Orders disagree — a transition in progress, neutral |
| **SAR × Linear Regression** | Dots below price with regression sloping up, or the mirror — short and medium term aligned | Directions differ, or regression near flat — neutral |
| **Supertrend × MACD** | Price on the bullish side of Supertrend with a positive histogram, or the mirror — trend and momentum resonate | Trend and momentum disagree — this is the most common real conflict; treat it as evidence of an unpredictable session |
| **RSI × MFI dual-extreme** | Both simultaneously overbought (RSI>70 and MFI>80) or both simultaneously oversold (RSI<30 and MFI<20) — for BTC/ETH this is the strongest empirically-validated confluence in `symbol_calibration_notes.md`, especially the dual-overbought (Bear) case | Only one is extreme while the other is mid-range — treat as a single ordinary RSI or MFI reading, not this confluence |
| **RSI extreme × ADX>20** | An extreme RSI reading (>70 or <30) while ADX confirms the market is actively trending (>20, direction-agnostic) — reinforces the RSI reading, most notably for ETH per `symbol_calibration_notes.md` | ADX below 20 (a quiet/ranging market) alongside an extreme RSI — read the RSI extreme on its own, without the reinforcement |

**These pairs are not extra evidence items.** A confluence check qualifies the two readings it combines; it does not add a third.

**For BTC/ETH**, `symbol_calibration_notes.md` found the opposite is also true: a pairing that sounds like it
should reinforce — the ADX+Aroon+SAR three-way trend alignment — carries almost no empirical edge at this
horizon. Confluence is not automatically stronger just because more indicators agree; check the calibration
notes before treating an alignment as meaningful for these two symbols.

---

## Provenance and drift

These rules are distilled from the decision trees in the `T` object of a project checklist tool, which encodes them as a source of truth for a separate interactive workflow.

**This file is a snapshot and will drift** as those rules evolve. It cannot self-update. To compare against the current source:

```bash
curl -s https://raw.githubusercontent.com/JacobHsu/crypto-watch/main/check.html \
  | awk '/^const T = \{/,/^\};/'
```

That returns the decision trees as structured data. Diff them against this file when the upstream rules are known to have changed.

Note that the upstream trees classify each indicator as BUY / WAIT / SELL for a tally-based workflow. **That classification and its scoring were deliberately not carried over** — see "These are readings, not scores" above.
