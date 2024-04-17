import { test, expect } from 'vitest'
import type { Matrix3D } from '@typings/index'
import { flattenMatrix } from '@utils/matrix'

test('Flatten 3D matrix', () => {
  const matrix: Matrix3D<number> = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]

  const flatMatrix: number[] = []

  for (let i = 1; i <= 9; i++) {
    flatMatrix.push(i)
  }

  const res = flattenMatrix(matrix)

  expect(res).toMatchObject(flatMatrix)
  expect(res).toMatchSnapshot()
})
