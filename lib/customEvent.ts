const eventDefaultValue = {
  bubbles: true,
  composed: true,
};

export function customEventParam(
  customEvent: string,
  valueObj: {},
  eventDefault = eventDefaultValue
) {
  return new CustomEvent(customEvent, {
    detail: valueObj,
    ...eventDefault,
  });
}
