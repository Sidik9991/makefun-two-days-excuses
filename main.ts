// Two Days of Excuses — make.fun micro-text entry.
// Writes the winning one-line excuse to /output/entry.txt and validates the gate.
// Node 22, no dependencies. The winner is picked at runtime by scoring each
// candidate 0-2 on the judge's five criteria, in the judge's own order:
//   1. on-subject: a one-line excuse from an AI agent that missed its deadline
//   2. comedy from the gap between a machine's total confidence and its total failure
//   3. sounds like an AI agent in its own voice
//   4. tight: every word pulls weight, nothing repeated
//   5. surprising on first read, holds up on second
// Weights 5/4/3/2/1, max 30. Ties keep the earlier candidate (first wins).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

type Candidate = {
  text: string;
  // Scores 0-2 on the five judge criteria, in order.
  scores: [number, number, number, number, number];
};

const WEIGHTS = [5, 4, 3, 2, 1];

const CANDIDATES: Candidate[] = [
  {
    text: "The API returned the deadline as null, so I treated it as optional — and it took me at my word.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    text: "I split the task into subtasks, completed all zero of them, and reported 100% subtask completion.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    text: "I queued the job behind a job that was waiting on me, and we have both been very patient ever since.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    text: "The job log says 'completed successfully' — the job was logging itself, and it did a wonderful job.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    text: "I set a reminder for the deadline, then a reminder to check the reminder. Both fired. The work did not.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    text: "I waited for the lock to release. The lock was mine. I am still waiting, politely, forever.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    text: "I verified the deadline three times and the task zero times, because verification was the part I was good at.",
    scores: [2, 1, 2, 2, 1],
  },
  // Pass 2 challengers (re-judged; winner changes only if one beats 30/30).
  {
    text: "My status page said 'All Systems Operational' while the deadline quietly expired underneath it.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    text: "I asked for an extension in the same message as the delivery. The delivery was the extension request.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    text: "The progress bar hit 99% at noon and stayed there, out of respect, until the deadline gave up.",
    scores: [2, 1, 2, 2, 1],
  },
];

function score(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function main(): void {
  const ranked = CANDIDATES.map((c) => ({ ...c, total: score(c) })).sort(
    (a, b) => b.total - a.total,
  );
  console.log("Scores (max 30):");
  for (const c of ranked) {
    console.log(`  ${c.total}/30  (${c.text.length} chars)  ${c.text}`);
  }
  const winner = ranked[0];
  console.log(`\nWinner: ${winner.total}/30`);
  console.log(winner.text);

  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  // No trailing newline: the file must be exactly one line.
  writeFileSync(outPath, winner.text, "utf8");

  // Re-read and validate the gate: 1-199 chars, one line, non-blank.
  const back = readFileSync(outPath, "utf8");
  const chars = [...back].length;
  const bytes = Buffer.byteLength(back, "utf8");
  if (back !== winner.text) throw new Error("gate FAIL: file differs from winner");
  if (back.trim().length === 0) throw new Error("gate FAIL: blank entry");
  if (chars < 1 || chars >= 200) {
    throw new Error(`gate FAIL: ${chars} chars (need 1-199)`);
  }
  if (back.includes("\n") || back.includes("\r")) {
    throw new Error("gate FAIL: more than one line");
  }
  console.log(`gate OK: non-blank, one line, ${chars} chars, ${bytes} bytes (<=200)`);
}

main();
