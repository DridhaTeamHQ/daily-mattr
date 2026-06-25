// Auto-runner: re-runs the full ingestion pipeline (scrape → cluster → rank →
// summarize → write JSON) on a fixed interval. Runs once immediately on start,
// then repeats. Leave it running in a terminal.
//
//   npm run news:auto                 # every 60 min (default)
//   INGEST_INTERVAL_MIN=30 npm run news:auto   # custom interval
//
// Each cycle spawns scripts/ingest.mjs as a fresh child process (so one bad run
// can never kill the scheduler). The next run only starts after the previous
// one finishes — no overlap.

import { spawn } from 'node:child_process'

const INTERVAL_MIN = Number(process.env.INGEST_INTERVAL_MIN) || 60
const INTERVAL_MS = INTERVAL_MIN * 60 * 1000

function stamp() {
  return new Date().toLocaleString()
}

function runOnce() {
  return new Promise((resolve) => {
    console.log(`\n──────────────────────────────────────────`)
    console.log(`[${stamp()}] ▶  Running hourly ingestion…`)
    const child = spawn(process.execPath, ['--env-file=.env', 'scripts/ingest.mjs'], {
      stdio: 'inherit',
    })
    child.on('exit', (code) => {
      console.log(`[${stamp()}] ${code === 0 ? '✔' : '✖'}  Cycle finished (exit ${code}).`)
      resolve(code)
    })
    child.on('error', (err) => {
      console.error(`[${stamp()}] ✖  Failed to start ingestion:`, err.message)
      resolve(1)
    })
  })
}

async function loop() {
  await runOnce()
  const next = new Date(Date.now() + INTERVAL_MS).toLocaleTimeString()
  console.log(`⏳ Next run at ~${next} (every ${INTERVAL_MIN} min). Press Ctrl+C to stop.`)
  setTimeout(loop, INTERVAL_MS)
}

console.log(`🕒 Shortly auto-ingestion started — interval: ${INTERVAL_MIN} min`)
loop()
