import { describe, expect, test } from 'vitest'

import { parseEnvArgs, parseVPIdEnvArgs } from '../argParsers'

describe('parseEnvArgs', () => {
  test.each(['abcd:efgh,1234:5678'])('%s should parsed to ["abcd:efgh", "1234:5678"]', (str) => {
    const args = parseEnvArgs(str)

    expect(args).toMatchObject(['abcd:efgh', '1234:5678'])
    expect(args).toMatchSnapshot()
  })

  test.each(['key:val', 'abcd:1234'])('%s should heave 2 args', (str) => {
    const args = parseEnvArgs(str, { divider: ':' })
    const length = args.length

    expect(length).toBe(2)
    expect(length).toMatchSnapshot()
  })
})

describe('parseVPIdEnvArgs', () => {
  test.each(['a:1,b:2,c:3'])('(%s) should have args length 3', (str) => {
    const args = parseVPIdEnvArgs(str)
    const length = args.length

    expect(length).toBe(3)
    expect(length).toMatchSnapshot()
  })

  test.each(['a:1,b:2,c:3'])('(%s) the "c" arg should be "3"', (str) => {
    const args = parseVPIdEnvArgs(str)

    const c = args[2][1]
    expect(c).toBe('3')
    expect(c).toMatchSnapshot()
  })

  test.each(['a,b'])('(%s) should have args length 2', (str) => {
    const args = parseVPIdEnvArgs(str)

    expect(args.length).toBe(2)
    expect(args).toMatchSnapshot()
  })
})
