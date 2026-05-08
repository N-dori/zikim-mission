import '@testing-library/jest-dom'
// provide fetch and web globals for Node environments
// node-fetch v2 is CJS and exports fetch, Request, Response, Headers
// @ts-ignore
const nodeFetch = require('node-fetch')
// @ts-ignore
global.fetch = nodeFetch
// @ts-ignore
global.Request = nodeFetch.Request
// @ts-ignore
global.Response = nodeFetch.Response
// @ts-ignore
global.Headers = nodeFetch.Headers

import { server } from './src/test/mockServer'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
