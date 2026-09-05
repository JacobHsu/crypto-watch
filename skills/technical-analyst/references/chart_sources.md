# Chart Sources

This file is the **only** project-specific part of this skill. Everything else — `SKILL.md`, `technical_analysis_framework.md`, `analysis_template.md` — is instrument- and source-agnostic.

Delete or replace this file and the skill returns to its generic behaviour: it will simply ask the user to provide chart images.

---

## Site

Charts are published as static pages that embed TradingView widgets.

**Base URL**: `https://jacobhsu.github.io/crypto-watch/`

Charts render inside cross-origin canvas elements. The DOM contains no indicator values — every reading must come from the rendered image.

---

## Which pages to capture

For a next-day forecast, capture **both** pages below. Together they cover every analysis category the framework requires; neither is sufficient alone.

| Symbol | Primary page (momentum + volatility) | Supplement page (moving averages + structure) |
|--------|--------------------------------------|-----------------------------------------------|
| **BTC** (default when unspecified) | `o/btc.html?t=1d` | `btc/1d.html` |
| **ETH** | `o/eth.html?t=1d` | `eth/1d.html` |
| Any other symbol | `o/altcoin.html?s=<SYM>&t=1d` | none — fall back to `altcoin.html?s=<SYM>` and read **row 3 only** (rows are 1H / 4H / 1D top to bottom) |

Only `btc/` and `eth/` have 2×2 detail pages. For other symbols the supplement is the 3×4 overview, where each chart is much smaller — expect lower readability and mark items unreadable rather than straining.

The `?t=1d` parameter is required. Without it the page defaults to 4H, which is the wrong timeframe for a next-day call.

---

## What each page provides

### `o/{symbol}.html?t=1d` — four charts, each with a main plot plus three panes

| Group | Main plot | Panes |
|-------|-----------|-------|
| 1 · Trend | Supertrend | **MACD** · DMI/ADX · CCI |
| 2 · Momentum | Hull MA (HMA) | **RSI** · **Stochastic RSI** · Ultimate Oscillator |
| 3 · Volatility | Bollinger Bands | **ATR** · Choppiness Index · Historical Volatility |
| 4 · Volume/Flow | VWMA 20 | OBV · MFI · Chaikin Money Flow |

This page supplies momentum (framework §5) and volatility (§6) — the two categories that carry the most weight for a one-day horizon. Volume bars are drawn on all four main plots.

**Aroon and ROC used to occupy the group 1 and group 2 fourth panes and were deliberately dropped.**
`symbol_calibration_notes.md` found Aroon carries ~0 (BTC) to negative (ETH) empirical edge at this horizon, and
ROC's closest tested analogues (Awesome Oscillator, Momentum) score similarly weak — CCI and Ultimate Oscillator
replaced them because they are among the highest-edge indicators in that same backtest (CCI +6.7pp ETH, Ultimate
Oscillator +16.6pp BTC, the single strongest signal in the report). If an older capture or cached screenshot
still shows Aroon/ROC instead, treat it as stale and re-capture with `force=true`.

**This page does not contain MA 20/50 or EMA 20/50.**

### `{symbol}/1d.html` — four large charts, 2×2

| Quadrant | Indicators |
|----------|------------|
| Trend | Multi-Time Period · Williams Fractals · Williams Alligator · Parabolic SAR |
| Channel | Bollinger Bands · Keltner Channel · MA Cross · Volatility Stop |
| **Moving Average** | **MA 20 / MA 50 · EMA 20 / EMA 50** · Donchian Channels |
| Trend / Exit | Zig Zag · Supertrend · Linear Regression · VWMA |

This page supplies the moving average category (framework §3) and the clearest read of the price header, printed on every chart as `開=<open> 高=<high> 低=<low> 收=<close> <change> (<percent>)`. That header describes the **bar in progress** — see "Deriving the last completed close" below before using any of it as C.

---

## Capture method

TradingView draws its studies asynchronously onto canvas **after** the page reports network idle. Any capture that waits only for load or network-idle events returns candles without indicators, or blank panes. A **fixed 15-second wait is required**.

Use Microlink. No API key is needed on the free tier.

```bash
curl -sS -G "https://api.microlink.io" \
  --data-urlencode "url=https://jacobhsu.github.io/crypto-watch/o/btc.html?t=1d" \
  -d "screenshot=true" \
  -d "waitForTimeout=15000" \
  -d "force=true" \
  -d "viewport.width=1920" \
  -d "viewport.height=1080" \
  -d "viewport.deviceScaleFactor=1" \
  -o response.json
```

The response is JSON. Read `data.screenshot.url`, download that PNG to a temporary directory, then read the image file.

```bash
curl -sS -o chart.png "<data.screenshot.url>"
```

### Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| `waitForTimeout` | `15000` | **Do not lower.** This is what allows the studies to finish drawing. |
| `force` | `true` | **Required.** Bypasses the response cache — see below. |
| `viewport.width` / `height` | `1920` / `1080` | Verified legible at this size |
| `viewport.deviceScaleFactor` | `1` | Verified sufficient — legend values are crisp. Raise to `2` only if a page proves too dense to read. |

### `force=true` is not optional

Without it the API returns a **cached screenshot**. Observed in testing: two captures of the same URL taken two hours apart returned byte-identical PNGs. Adding `force=true` returned a genuinely current image with a different price, volume, and oscillator readings.

A cached capture is the worst kind of failure this skill can suffer: it renders perfectly, passes every verification check below, and produces a confident forecast built on stale prices while claiming to be current. **Always send `force=true`.**

If two captures taken minutes apart are byte-identical, suspect the cache regardless.

### The wait ceiling

`waitForTimeout` cannot be raised freely. The API enforces its own navigation timeout of roughly 29 seconds; a request with `waitForTimeout=25000` fails with `EBRWSRTIMEOUT` rather than waiting longer.

**Verified working values: 15000 for the first attempt, 20000 for a retry.** Do not go above 20000.

Use `-G --data-urlencode` for the target URL. Manually escaping the query string is error-prone because the target URL itself contains `?` and `=`.

### Constraints

- **Write captures to a temporary directory outside the repository.** Never save into the project working tree.
- The free tier is rate-limited per day. Two captures are consumed per forecast.
- Captures are live: the two pages are fetched seconds apart, so their last-price readings may differ slightly. Use the close printed on `{symbol}/1d.html` as the authoritative last daily close.

---

## Verifying the capture before analyzing

A capture can succeed at the HTTP level and still be useless. Before analyzing, confirm the image actually contains rendered indicators.

**The most reliable check is the legend.** A fully rendered chart lists every indicator with its current value. An unrendered one shows only the OHLC header, often truncated with an ellipsis.

| Check | Rendered correctly | Not rendered |
|-------|--------------------|--------------|
| **Legend** | `RSI 14 close 70.81`, `ATR 14 RMA 2,197.29`, `MA 20 close 71,765.82` | Only `開=... 高=... 低=...` followed by `...`, with no indicator names or values |
| **Panes** | Three separate panes below each main plot on `o/{symbol}.html?t=1d` | Panes absent entirely and the price chart fills the full height — or present but blank |
| **Main plot overlays** | Supertrend / HMA / Bollinger / VWMA lines drawn over the candles | Bare candles with no lines |
| **Volume** | Volume bars along the bottom of each main plot | No volume bars |
| **All charts** | Every chart on the page drawn | Some charts show candles, others are blank grey rectangles |

Two distinct failure shapes have been observed: **panes missing entirely** (too short a wait) and **panes present but blank** (partial render). Both are failures.

Note that the surrounding page text renders normally in both cases — the descriptive panel on the right is DOM text, not canvas. Its presence proves nothing about whether the charts drew.

If any check fails:

1. Retry once with `waitForTimeout=20000` (still with `force=true`). **Do not use a higher value** — it exceeds the API's own navigation timeout and fails outright.
2. If it fails again, stop and report what was missing — per Hard Rule 5, an empty report is better than a fabricated one. Do not analyze a partial render.

This retry path is not hypothetical. In testing, a capture of the supplement page rendered all indicator lines correctly but left every legend unpopulated — `MA 20 close` with no number, `SAR 0.02 0.02 0.2` with no value, and a price header showing only the last price instead of the full OHLC. The retry at 20000 populated them. **A legend showing an indicator's name without its value is the most common partial render on these pages**, and it is easy to miss because the chart otherwise looks complete.

---

## Reading values from these charts

The indicator legends are rendered as part of the canvas and are legible at the capture settings above. **Quote the numbers.** Values confirmed readable on a verification capture:

- `o/btc.html?t=1d` — `MACD 12 26 close 9 501.42`, `RSI 14 close 70.81`, `Stoch RSI 3 3 14 14 close 61.64 72.59`, `ATR 14 RMA 2,197.29`, `CHOP 14 0 29.76`, `HV 10 48.10`, `MFI 14 79.08`, `OBV −1.17M`, `CMF 20 0.27`, `DMI 14 14 42.8175 38.2621 11.6689`, `CCI 20 close 63.48`, `UO 7 14 28 56.43` (Ultimate Oscillator's legend abbreviates to `UO`, with its three period parameters printed before the value)
- `btc/1d.html` — `開/高/低/收` on every chart header, `MA 20 close 71,765.82`, `MA 50 close 67,331.59`, `EMA 20 close 73,605.51`, `EMA 50 close 69,361.73`, `BB 20 close 2 ...`, `DC 20 0 ...`, `SAR 0.02 0.02 0.2 74,811.22`

Evidence citing an exact legend value is stronger than evidence describing a line's position. Prefer the number whenever it is readable.

### Deriving the last completed close — read this carefully

The chart header prints the **bar currently in progress**, not the last completed daily candle:

```
開=78,230.00  高=78,330.00  低=77,994.02  收=78,070.57  −159.43 (−0.20%)
```

`收` here is the current price of an unfinished bar. Taking it as C is wrong.

These are 24/7 markets with no gaps, so **the current bar's open is the last completed daily close**:

```
C = 開 = 78,230.00
```

Confirm the reading before using it — the printed change must reconcile:

```
收 − 開 = 78,070.57 − 78,230.00 = −159.43   ✓ matches the header
```

If it does not reconcile, the header is being misread; say so rather than guessing.

**Consequence for the forecast target.** The candle being forecast is already partly formed. State this in the report: give the elapsed move (here −0.20%, or 0.07 ATR below C) and note that part of the session under forecast has already happened. This is not a defect in the data — it is a fact about the target that the reader needs.

---

## Known gaps in this source

These are absent from both pages. Mark them unreadable rather than substituting an estimate, except where noted.

| Gap | Consequence |
|-----|-------------|
| **No 200-day MA** | The long-term reference in framework §3 is unavailable. Report the 20-day and 50-day only, and note the omission. |
| **No numeric 20-day average volume** | Framework §4 asks for the latest day's volume against the ~20-day average. Only raw volume bars are plotted, so this comparison must be made **visually against neighbouring bars**. It is the weakest evidence item these charts produce — label it as a visual estimate and do not let it carry a scenario on its own. |
| **DMI legend order is not labelled** | The legend reads three bare numbers, e.g. `DMI 14 14 42.8175 38.2621 11.6689`. Read them as ADX / +DI / −DI per the standard convention, and state that assumption in the report. |

---

## Timeframe note

These pages support 15m / 1h / 4h / 1d. This skill forecasts the next **daily** candle, so always request `?t=1d` and the `1d.html` detail page. Do not mix timeframes within one forecast.
