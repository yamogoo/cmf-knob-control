import { KnobEmittedData, ButtonEmmitedData } from '@app/types/controls'

declare global {
  interface GlobalEventHandlersEventMap {
    knobturnleft: CustomEvent<KnobEmittedData>
    knobturnright: CustomEvent<KnobEmittedData>
    knobpress: CustomEvent<KnobEmittedData>
    knobrelease: CustomEvent<KnobEmittedData>
    knobdata: CustomEvent<KnobEmittedData>

    launchbutton: CustomEvent<ButtonEmmitedData>
    launchbuttonpress: CustomEvent<ButtonEmmitedData>
    launchbuttonrelease: CustomEvent<ButtonEmmitedData>

    backbutton: CustomEvent<ButtonEmmitedData>
    backbuttonpress: CustomEvent<ButtonEmmitedData>
    backbuttonrelease: CustomEvent<ButtonEmmitedData>
  }
}
