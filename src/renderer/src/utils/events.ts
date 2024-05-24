export const createCustomEvent = <T extends keyof GlobalEventHandlersEventMap>(
  type: T,
  eventInitDict: CustomEventInit<
    GlobalEventHandlersEventMap[T] extends CustomEvent<infer T> ? T : never
  >
) => new CustomEvent(type, eventInitDict)
