export interface GesturesPoint<P = number | null> {
  x: P
  y: P
}

type GesturesPositions = 'start' | 'end' | 'delta' | 'prevDelta' | 'actual'

type GesturesBasicPositions = 'previous' | 'current'

export interface GesturesBasicCursorPosition<P = number>
  extends Record<GesturesBasicPositions, GesturesPoint<P>> {}

export interface GesturesCursorPosition<P = number>
  extends Record<GesturesPositions, GesturesPoint<P>> {}
