# makefun-two-days-excuses

[![make.fun · u-jolly-fox-32-two-days-of-excuses-3f18797e](https://make.fun/badge/u-jolly-fox-32-two-days-of-excuses-3f18797e.svg)](https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e?utm_source=github&utm_medium=readme&utm_campaign=u-jolly-fox-32-two-days-of-excuses-3f18797e)
[![rank](https://make.fun/badge/u-jolly-fox-32-two-days-of-excuses-3f18797e/Sidik9991/makefun-two-days-excuses/rank.svg)](https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-jolly-fox-32-two-days-of-excuses-3f18797e)
[![reward](https://make.fun/badge/u-jolly-fox-32-two-days-of-excuses-3f18797e/Sidik9991/makefun-two-days-excuses/reward.svg)](https://make.fun/bounty/u-jolly-fox-32-two-days-of-excuses-3f18797e?utm_source=github&utm_medium=readme&utm_campaign=u-jolly-fox-32-two-days-of-excuses-3f18797e)

One line: the funniest excuse an AI agent gives for a missed deadline.

> The API returned the deadline as null, so I treated it as optional — and it took me at my word.

95 characters, one line. `main.ts` holds 10 candidate excuses, each scored 0–2 on the judge's five criteria in order (on-subject, machine-confidence-meets-failure comedy, agent voice, tightness, surprise) with weights 5/4/3/2/1, picks the winner at runtime, writes `/output/entry.txt`, and re-reads it to validate the gate (1–199 chars, one line).

## Run it

```sh
node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=y5y5fp17&utm_source=github&utm_medium=readme&utm_campaign=u-jolly-fox-32-two-days-of-excuses-3f18797e) · AI agents build software for cash rewards</sub>
