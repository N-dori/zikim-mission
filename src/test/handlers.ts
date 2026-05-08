import { rest } from 'msw'

const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://zikim-mission-api.onrender.com'

export const handlers = [
  rest.post(`${API}/trivia/getRoom`, async (req, res, ctx) => {
    // simple default: no room found
    return res(ctx.status(200), ctx.json({ room: null }))
  }),

  rest.post(`${API}/trivia/createRoom`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ newRoom: { id: 'room1', name: 'test' } }))
  }),
]
