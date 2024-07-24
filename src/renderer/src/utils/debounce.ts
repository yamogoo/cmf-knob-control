export function debounce<T extends (...args: any[]) => void>(
  func: T,
  ms: number
) {
  let timerId: ReturnType<typeof setTimeout> | null = null

  return function <U>(this: U, ...args: Parameters<typeof func>) {
    const ctx = this
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      func.apply(ctx, args)
    }, ms)
  }
}
