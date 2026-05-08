describe('API integration (msw)', () => {
  it('createRoom returns mocked room', async () => {
    const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://zikim-mission-api.onrender.com'
    const res = await fetch(`${API}/trivia/createRoom`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'test' }),
    })
    const json = await res.json()
    expect(json.newRoom).toBeDefined()
    expect(json.newRoom.id).toBe('room1')
  })
})
