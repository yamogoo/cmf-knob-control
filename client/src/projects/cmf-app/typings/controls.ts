export interface KnobEmittedData {
  angle: number
  count: number
  dir: number
}

export interface KnobEvent extends CustomEvent<KnobEmittedData> {}

export interface ButtonEmmitedData {
  state: boolean
}

export interface ButtonEvent extends CustomEvent<ButtonEmmitedData> {}
