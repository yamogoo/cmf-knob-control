export const flattenMatrix = <T>(_matrix: Readonly<Array<Array<T>>>): Array<T> => {
  const matrix: Array<Array<T>> = [..._matrix]
  const flatten: Array<T> = []

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      flatten.push(matrix[y][x])
    }
  }

  return flatten
}
