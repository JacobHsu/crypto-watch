---
name: technical-analyst
description: This skill should be used when forecasting the next-day (next daily candle) direction of a stock, index, cryptocurrency, or forex pair. Use it when the user asks whether an instrument will go up or down tomorrow, asks for a next-session forecast, or provides daily charts and requests a directional call with probabilities, expected range, and invalidation levels based purely on chart data without news or fundamentals. Charts may be supplied by the user; if none are supplied, the skill obtains them from the source defined in references/chart_sources.md.
---

# Technical Analyst

## Overview

This skill produces a **next-day directional forecast** from chart images. It analyzes daily charts to read trend structure, key levels, momentum, and volatility, then commits to three mutually exclusive outcomes for the next daily candle — each with a probability, an expected price range, and an invalidation level.

All analysis is conducted using only what is visible in the chart, without influence from news, fundamentals, or market sentiment.

### What "tomorrow" means

The forecast target is **the next daily candle's close, measured against the most recent completed daily close**. Define the session boundary before analyzing:

- **24/7 markets (crypto)**: the daily candle closes at 00:00 UTC. There are no gaps; the next candle opens where the last one closed.
- **Session markets (stocks, indices, most forex)**: the next daily candle spans the next trading session. An overnight gap is possible, so the open may differ from the last close. State this as a distinct risk in the forecast.

If the chart's session convention cannot be determined from the image, say so and state the assumption used.

### Primary and confirming timeframes

- **Daily (1D)** is the primary decision timeframe. Every conclusion must be anchored here.
- **4-hour (4H)** is optional confirmation for timing and momentum. Use it only if a 4H chart is actually provided.
- Do not forecast the next daily candle from a weekly chart. If only a weekly chart is available, say so and stop.

## Core Principles

1. **Pure Chart Analysis**: Base all conclusions exclusively on technical data visible in the chart
2. **Bounded Horizon**: Every call is scoped to one daily candle — no open-ended targets
3. **Objective Assessment**: Avoid subjective bias; focus on observable patterns and data
4. **Mutually Exclusive Outcomes**: The three scenarios must be exhaustive and non-overlapping
5. **Evidence Before Probability**: A probability is only as good as the named evidence behind it
6. **Calibrated Humility**: Single-day direction is close to a coin flip; express confidence accordingly

## Analysis Workflow

### Step 0: Obtain Charts

Resolve where the charts come from, in this order:

1. **The user supplied images** — use them and skip acquisition entirely. User-supplied charts always take precedence.
2. **`references/chart_sources.md` exists** — read it and follow the capture procedure it defines. That file names the pages, the symbol-to-URL mapping, the capture parameters, and how to verify a capture succeeded.
3. **Neither applies** — ask the user to provide daily chart images, and state what the charts need to contain: a legible price axis, at least one momentum oscillator, and ATR.

If a symbol was not specified, use the default named in `chart_sources.md`, and say which symbol you are forecasting.

Captures must be written to a temporary directory outside any project working tree.

If an automated capture fails verification, follow the retry-then-stop rule in `chart_sources.md`. Never analyze a partial render.

### Step 1: Confirm Chart Availability

Once charts are in hand, whatever their source:

1. Confirm how many charts are available and where each came from
2. Identify the instrument and confirm the charts are daily (or note which are 4H confirmation charts)
3. Inventory which indicators are actually visible, and which are absent
4. Note any specific focus areas requested by the user
5. Proceed to analyze sequentially, one instrument at a time

If the images are unreadable, cropped so indicators are cut off, or too small to resolve values, **stop and say so**. Do not proceed on partial visibility.

### Step 2: Load Technical Analysis Framework

Before beginning analysis, read the comprehensive technical analysis methodology:

```
Read: references/technical_analysis_framework.md
```

This reference contains detailed guidance on:
- Reading indicator values from the chart legend
- Trend analysis and classification
- Support and resistance identification
- Moving average interpretation
- Volume analysis
- Momentum and oscillator interpretation
- Volatility measurement and expected range derivation
- Chart patterns and candlestick analysis
- Scenario development and probability assignment
- Known limits of next-day forecasting

Then read the per-indicator lookup:

```
Read: references/indicator_reading_rules.md
```

It gives the correct reading for each individual indicator and, more importantly, the misreading traps for each. Where the two files disagree, the framework wins — the lookup says what an indicator shows, the framework says what it is worth for tomorrow.

If the instrument being forecast is BTC or ETH, also read:

```
Read: references/symbol_calibration_notes.md
```

It calibrates how much weight trend-alignment evidence versus momentum-extreme evidence deserves for that
specific symbol, based on an independent empirical backtest. It does not override Hard Rule 8 — it only informs
which named-evidence categories should carry more or less weight when judging the evidence-count thresholds in
Step 4. If the file is absent, or the instrument isn't covered by it, skip it silently and proceed with the
generic treatment.

### Step 3: Analyze Each Chart Systematically

For each chart image, conduct a systematic analysis following this sequence. Record a one-sentence evidence note for every item.

**For every indicator visible on the chart**: if it appears in `indicator_reading_rules.md`, read it by that rule. If it does not, apply the framework's general principles for its category and say that you did so. Do not skip an indicator merely because it falls outside the seven headings below — a chart may carry more indicators than the headings enumerate, and each visible one is available evidence.

#### 3.1 Trend Analysis
- Identify trend direction (uptrend, downtrend, sideways)
- Assess trend strength (strong, moderate, weak)
- Note trend duration and potential exhaustion signals
- Examine higher highs/lows or lower highs/lows pattern

#### 3.2 Support and Resistance Analysis
- Mark the nearest support below the current price and the nearest resistance above it — these matter more than distant levels for a one-day horizon
- Identify trendline support/resistance
- Note any support-resistance role reversals
- Assess confluence zones where multiple S/R levels align
- Measure the distance from the current price to each level in ATR units (see 3.7)

#### 3.3 Moving Average Analysis
- Determine price position relative to the 20-day, 50-day, and 200-day MAs
- Assess MA alignment (bullish, bearish, or neutral configuration)
- Note MA slope (rising, falling, flat)
- Identify any recent or pending MA crossovers
- Observe MAs acting as dynamic support or resistance, especially any MA within one ATR of the current price

#### 3.4 Volume Analysis
- Compare the most recent day's volume against the ~20-day average volume
- Assess whether the latest candle's move was volume-supported or volume-starved
- Identify volume spikes and their context (at support/resistance, on breakouts)
- Check for volume confirmation or divergence with price
- Note any volume climax or exhaustion patterns

A volume-starved move is weak evidence for continuation into the next session.

#### 3.5 Chart Patterns and Price Action
- Read the most recent 1-3 candles in detail — for a one-day horizon these carry more weight than a pattern forming over months
- Identify any reversal patterns (hammers, shooting stars, engulfing patterns, etc.)
- Identify any continuation patterns (flags, triangles, etc.)
- Observe recent breakouts or breakdowns, and whether the latest candle closed near its high or low

#### 3.6 Momentum and Oscillators
Short-term momentum is the primary evidence for a next-day call. Read whichever of these are present on the chart:

- **RSI**: value, position relative to 50, direction of travel, and any divergence against price
- **MACD**: histogram sign, whether bars are expanding or contracting, and signal-line crossovers
- **Stochastic / Stochastic RSI**: the zone in which any %K/%D crossover occurred
- **ROC**: side of the zero line and direction of travel
- **DMI / ADX**: ADX as a gate first, then which DI leads
- **Aroon**: which line dominates and how decisively
- **Hull MA** and other low-lag averages: price position plus slope

Trend-following overlays — Supertrend, Parabolic SAR, Volatility Stop, Alligator, Fractals, Zig Zag, Linear Regression — also carry short-term information and have rules in `indicator_reading_rules.md`. Read the ones that are present.

Note explicitly which oscillators are absent from the chart. Do not infer their values.

#### 3.7 Volatility and Expected Range
- Read the current ATR(14) value if present
- Derive the expected next-day range: **last close ± 1 ATR** as the outer band, **last close ± 0.5 ATR** as the flat zone boundary
- Assess whether volatility is compressed, normal, or expanded relative to recent history
- Read the **Choppiness Index** if present — it grades how far every trend-following reading can be trusted, and above 61.8 it downgrades all of them
- Read **Historical Volatility** if present — low and turning up signals a move starting; high after an extended expansion signals a late stage
- If no ATR is visible, estimate the average daily true range from the recent candles and state clearly that it is a visual estimate

Volatility indicators supply magnitude, never direction. If volatility is heavily compressed or the chart shows clear range-bound behavior, bias the forecast toward Flat rather than forcing a direction.

#### 3.8 Synthesize Observations
- Integrate all technical elements into a coherent current assessment
- Identify the most significant factors influencing the next session specifically
- Note any conflicting signals or ambiguity
- Establish the key levels that will determine the next candle's direction

### Step 4: Develop the Next-Day Forecast

Produce exactly **three mutually exclusive and exhaustive scenarios** for the next daily close, measured against the last completed daily close (C) with the derived ATR:

| Scenario | Definition |
|----------|------------|
| **Up** | Next daily close above C + 0.5 ATR |
| **Down** | Next daily close below C − 0.5 ATR |
| **Flat / Range** | Next daily close within C ± 0.5 ATR |

Probabilities must sum to exactly 100%.

#### Required fields per scenario

1. **Probability**: expressed in 5% increments — the evidence does not support finer precision
2. **Supporting Evidence**: a named list of the specific indicators and readings that support this outcome (e.g. "MACD histogram positive and expanding for 3 sessions", "close above 20-day MA by 0.4 ATR"). Narrative assertions without a named source do not count as evidence.
3. **Expected Price Range**: the price band this scenario implies, derived from ATR and the nearest S/R level
4. **Invalidation Level**: the specific price that, if reached, means this scenario is wrong

#### Probability discipline

- Start from a near-even prior. Single-day direction is close to random; move away from 50/50 only in proportion to the evidence actually listed.
- A scenario with fewer than two named pieces of supporting evidence should not exceed 40%.
- Do not assign any scenario more than 70% from chart data alone.
- If the Flat zone is wide relative to recent daily moves, Flat should carry substantial probability — a narrow range day is a common outcome, not a cop-out.

### Step 5: Generate Forecast Report

For each instrument analyzed, create a report using the template structure:

```
Read and use as template: assets/analysis_template.md
```

The report must include all sections, leading with the Forecast Summary so the conclusion is readable at a glance.

**File Naming Convention**: Save each forecast as `[SYMBOL]_forecast_[YYYY-MM-DD].md`

Example: `BTCUSDT_forecast_2026-08-30.md`

The date in the filename is the date the forecast was made, not the date being forecast.

### Step 6: Repeat for Multiple Instruments

If multiple instruments are provided:

1. Complete the full analysis workflow (Steps 3-5) for the first instrument
2. Save the forecast report
3. Proceed to the next instrument
4. Repeat until all have been analyzed and documented

Do not batch analyses. Complete and save each report before moving to the next.

## Hard Rules

Violating any of these invalidates the report.

1. **Only what is visible counts.** If a value is unclear, an indicator is not displayed, or the image resolution is insufficient, mark that item `unreadable` and exclude it from the evidence base. Never fill the gap with market knowledge, news, remembered price levels, or general expectations.

2. **Every judgment carries evidence.** Each item in Step 3 requires a one-sentence note describing the concrete spatial relationship or value observed — for example, "price closed 1.2% above the 20-day MA, which is sloping up". If no concrete evidence can be written, the item is void and must not support any scenario.

3. **Probabilities trace to evidence.** Each probability must be attributable to the named evidence listed for that scenario. Do not produce false precision: use 5% increments only.

4. **Report readability coverage.** State how many of the analysis items were readable versus unreadable. A forecast built on a minority of readable items must say so prominently.

5. **No chart, no forecast.** If the charts cannot be seen or are unusable, explain this and stop. An empty report is better than a fabricated one.

6. **Do not exceed the horizon.** This skill forecasts one daily candle. Do not extend targets to "next week" or "the coming months" — those are outside the scope of the call being made.

7. **Verify automated captures before trusting them.** A capture can succeed at the HTTP level and still contain no rendered indicators — blank panes, legends with names but no values, or some charts drawn and others empty. Check the image before analyzing. A blank pane is an unreadable item, not a neutral reading, and a partial render is grounds to retry once and then stop.

8. **Never score or tally indicator readings.** Do not count bullish against bearish readings, compute a percentage, derive an overall rating, or report any such aggregate. Equal weighting would let slow structural indicators outvote the fast momentum readings that actually govern a single session. Each reading is one named piece of evidence and remains bound by the framework's category rules — three momentum indicators agreeing is one category, not three pieces of evidence.

## Quality Standards

### Objectivity Requirements

- Base all analysis strictly on observable chart data
- Avoid incorporating external information (news, fundamentals, sentiment)
- Do not use subjective language like "I think" or "I feel"
- Express uncertainty clearly when signals are ambiguous
- Present all three outcomes fairly to avoid confirmation bias

### Completeness Requirements

- Address all sections of the report template
- Provide specific price levels for support, resistance, expected range, and invalidation
- Justify every probability with named technical evidence
- State the ATR value used and how the expected range was derived
- Note any limitations or caveats to the analysis

### Clarity Requirements

- Use precise technical terminology correctly
- Lead with the conclusion, then the supporting analysis
- Include specific price levels (not vague descriptions)
- Keep the three scenarios distinct and mutually exclusive

## Example Usage Scenarios

**Example 1: Single Instrument Forecast**
```
User: "Will BTC go up or down tomorrow? Here's the daily chart."
[Provides daily chart image]

Analyst:
1. Confirms receipt and that the chart is daily
2. Reads technical_analysis_framework.md for methodology
3. Runs the systematic analysis (trend, S/R, MA, volume, price action, momentum, volatility)
4. Derives the expected range from ATR(14)
5. Produces three scenarios (e.g. Up 40%, Down 25%, Flat 35%) with named evidence and invalidation levels
6. Saves as BTCUSDT_forecast_2026-08-30.md
```

**Example 2: Multiple Instruments**
```
User: "Forecast tomorrow for Bitcoin, Ethereum, and the Nasdaq"
[Provides 3 daily chart images]

Analyst:
1. Confirms receipt of 3 charts and notes NDX is a session market with gap risk
2. Reads technical_analysis_framework.md
3. Analyzes BTC completely → Generates forecast → Saves as BTCUSDT_forecast_2026-08-30.md
4. Analyzes ETH completely → Generates forecast → Saves as ETHUSDT_forecast_2026-08-30.md
5. Analyzes NDX completely → Generates forecast → Saves as NDX_forecast_2026-08-30.md
6. Notifies user that all three forecasts are complete
```

**Example 3: Insufficient Chart Data**
```
User: "Is this going up tomorrow?"
[Provides a chart with no oscillator panes and an unreadable price axis]

Analyst:
1. Notes that RSI, MACD, Stochastic, and ATR are all absent from the image
2. Notes the price axis cannot be read, so no specific levels can be quoted
3. Reports that a next-day forecast cannot be responsibly produced from this image
4. States exactly what would be needed: a daily chart with a legible price axis and at least one momentum oscillator plus ATR
5. Does not guess a direction
```

## Resources

This skill includes the following bundled resources:

### references/technical_analysis_framework.md

Comprehensive methodology for next-day technical forecasting including:
- Reading indicator values from the chart legend
- Trend analysis criteria and classification
- Support and resistance identification techniques
- Moving average interpretation guidelines
- Volume analysis principles
- Momentum and oscillator interpretation
- Volatility measurement and expected range derivation
- Chart pattern recognition
- Scenario development and probability assignment framework
- Known limits of next-day forecasting

**Usage**: Read this file before conducting analysis to ensure a systematic, objective approach.

### assets/analysis_template.md

Structured template for forecast reports with all required sections.

**Usage**: Use this template structure for every forecast report. Copy the format and populate with specific findings for each instrument.

### references/indicator_reading_rules.md

A lookup table covering the individual indicators likely to appear on a chart: how to read each one, and the specific misreading trap each is prone to.

**Usage**: Read in Step 2 alongside the framework, and consult per indicator during Step 3. It establishes what a reading *is*; the framework establishes what that reading is *worth*. The framework wins any conflict.

### references/chart_sources.md

Optional. Defines where to obtain charts when the user does not supply them: the pages to capture, the symbol-to-URL mapping, capture parameters, and how to verify a capture rendered correctly.

**Usage**: Read in Step 0 when no images were provided. This is the only file in the skill that is tied to a specific chart source — if it is absent, the skill asks the user for images instead.

### zh-TW/

Traditional Chinese translations of the three files above, provided for human reading only. They are not part of the execution path — the English files are authoritative.
