import { describe, expect, test } from 'vitest'
import { ControlBoard } from '../../controlBoard'
import { Logger } from '../../utils/logger'

describe('Control Board', () => {
  test('default baud rate should be 115200', () => {
    const logger = new Logger('App name')
    const board = new ControlBoard(logger)
    const baudRate = board.baudRate

    expect(baudRate).toBe(115200)
  })
})
