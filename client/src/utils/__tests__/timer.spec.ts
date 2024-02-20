import { test, expect } from 'vitest'
import { timer } from '../timer'

const redirectTimer = () => {
  return new Promise((resolve) => {
    let time = 0
    timer({
      duration: 1000,
      step: 100,
      onUpdate: (t: number) => {
        time = t
      },
      onComplete: (t: number) => {
        time = t
        resolve(time)
      }
    })
  })
}

test('Utils: Timer func', async () => {
  await expect.soft(redirectTimer()).resolves.toBe(0)
})
