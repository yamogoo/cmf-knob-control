import { KnobEvent, ButtonEvent } from '@app/types/controls'

declare global {
  interface GlobalEventHandlersEventMap {
    knobturnleft: KnobEvent
    knobturnright: KnobEvent
    knobpress: KnobEvent
    knobrelease: KnobEvent
    knobdata: KnobEvent

    launchbutton: ButtonEvent
    launchbuttonpress: ButtonEvent
    launchbuttonrelease: ButtonEvent

    backbutton: ButtonEvent
    backbuttonpress: ButtonEvent
    backbuttonrelease: ButtonEvent

    lidsensor: ButtonEvent
  }
}
