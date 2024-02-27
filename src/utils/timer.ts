export interface BasicTimer {
  onUpdate?: (t: number) => void
  onComplete?: (t: number) => void
  duration: number
  step?: number
}

export function cancelableTimer(_op: BasicTimer) {
  const op = Object.assign({ duration: 5000, step: 100 }, _op)
  let time: number = op.duration
  const ms = op.step ?? 0
  let timerId: ReturnType<typeof setInterval> | undefined = undefined

  if (op.onUpdate) op.onUpdate(time)

  timerId = setInterval(() => {
    if (time > 0) {
      time -= ms
      if (op.onUpdate) op.onUpdate(time)
    }

    if (time === 0) {
      if (op.onComplete) op.onComplete(time)
    }
  }, ms)

  return function () {
    clearInterval(timerId)
  }
}

export function cancelableInterval(cb: () => void, ms = 1000): Function {
  let timerId: ReturnType<typeof setInterval> | undefined = undefined

  timerId = setInterval(() => {
    cb()
  }, ms)

  return function () {
    if (timerId) clearInterval(timerId)
  }
}
