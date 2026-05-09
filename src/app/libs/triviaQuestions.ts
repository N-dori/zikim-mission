'use client'

import { Question } from '@/app/assets/data/triviaData'
import { apiFetch } from './apiClient'

let cache: { version: string; questions: Question[] } | null = null
let inflight: Promise<Question[]> | null = null

export async function getQuestions(): Promise<Question[]> {
  if (cache) return cache.questions
  if (inflight) return inflight

  inflight = (async () => {
    const res = await apiFetch('/trivia/questions', { method: 'GET' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    cache = { version: data.version, questions: data.questions }
    inflight = null
    return cache.questions
  })()

  return inflight
}

export function getCachedQuestions(): Question[] | null {
  return cache ? cache.questions : null
}
