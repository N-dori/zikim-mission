// Shared round helpers used by both trivia games (179 + רצועת עזה),
// single-player and group. Keeps shuffling/round-size logic in one place.

export const ROUND_MAX = 12

// Plain random shuffle (single-player).
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// FNV-1a string hash → 32-bit seed.
function hashSeed(str: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// mulberry32 PRNG — deterministic from a numeric seed.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return function () {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Deterministic shuffle keyed by a seed string — every client that passes the
// same seed (e.g. a roomId) gets the SAME order, so group play stays in sync.
export function seededShuffle<T>(arr: readonly T[], seed: string): T[] {
  const a = [...arr]
  const rand = mulberry32(hashSeed(seed))
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// A group round: same shuffled order for everyone in the room, capped at ROUND_MAX.
export function buildRound<T>(deck: readonly T[], roomId: string): T[] {
  return seededShuffle(deck, roomId).slice(0, ROUND_MAX)
}

// Friendly room label from a possibly-suffixed stored name ("מחלקה א_2" → "מחלקה א").
export function roomLabel(name: string | null | undefined): string {
  return (name ?? '').replace(/_\d+$/, '')
}
