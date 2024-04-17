import { test, expect } from 'vitest'
import { shallowMerge, deepMerge } from '@utils/merge'

/* * * Shallow Merge * * */

test('Shallow merge', () => {
  const a = { a: 'a' },
    b = { b: 'b' }

  expect(shallowMerge(a, b)).toMatchObject({ a: 'a', b: 'b' })
  expect(deepMerge(a, b)).toMatchObject({ a: 'a', b: 'b' })
})

test('Shallow merge with overlaps', () => {
  const a = { a: 'a', b: null },
    b = { b: 'b', c: 'c' }

  expect(shallowMerge(a, b)).toMatchObject({ a: 'a', b: 'b', c: 'c' })
})

test('Shallow merge with arrays', () => {
  const a = [1, 2, 3],
    b = [3, 4, 5]

  expect(shallowMerge(a, b)).toMatchObject([1, 2, 3, 3, 4, 5])
})

/* * * Deep Merge * * */

test('Deep merge', () => {
  const a = { a: 'a', b: { a: 'a', b: 'b' } },
    b = { b: { c: 'c' } }

  const res = deepMerge(a, b)

  expect(res).toEqual({ a: 'a', b: { a: 'a', b: 'b', c: 'c' } })
  expect(res).toMatchSnapshot()
})

test.fails('Throw errors on merging with different types', () => {
  const result = deepMerge({ c: 'c' }, ['a', 'b'])
  expect(() => result)
})
