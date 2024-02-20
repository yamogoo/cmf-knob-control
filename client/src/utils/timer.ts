export interface BasicTimer {
  onUpdate?: (t: number) => void
  onComplete?: (t: number) => void
  duration: number
  step: number
}

export function timer(op: BasicTimer = { duration: 5000, step: 100 }) {
  let time: number = op.duration
  const ms = op.step
  let timerId: ReturnType<typeof setInterval> | undefined = undefined

  if (op.onUpdate) op.onUpdate(time)

  timerId = setInterval(() => {
    if (time + ms >= 0) {
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
