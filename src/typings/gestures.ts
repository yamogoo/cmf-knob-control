import type { Point } from './controls'

type GesturesPositions = 'start' | 'delta' | 'previous' | 'current'

type GesturesBasicPositions = 'previous' | 'current' | 'delta'

export interface GesturesBasicCursorPosition<P = number>
  extends Record<GesturesBasicPositions, Point<P>> {}

export interface GesturesCursorPosition<P = number> extends Record<GesturesPositions, Point<P>> {}
