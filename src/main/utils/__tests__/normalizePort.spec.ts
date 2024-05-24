import { describe, expect, test } from 'vitest'

import normalizePort from '../normalizePort'

describe('normalizePort', () => {
  test.each(['0000', '9013', '1qdwq23'])('(%s) should be of type "number"', (port: string) => {
    const normalizedPort = normalizePort(port)
    const isNumber = typeof normalizedPort === 'number'

    expect(isNumber).toBe(true)
    expect(isNumber).toMatchSnapshot()
  })
})
