export interface KnobEmittedData {
  angle: number
  count: number
  dir: number
}
export interface ButtonEmmitedData {
  state: boolean
}

export interface KnobEvent extends CustomEvent<KnobEmittedData> {}

export interface ButtonEvent extends CustomEvent<ButtonEmmitedData> {}
