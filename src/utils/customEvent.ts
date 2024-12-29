const eventDefaultValue = {
  bubbles: true,
  composed: true,
};

export function customEventParam(
  customEvent: string,
  valueObj?: { [key: string]: any },
  eventDefault: { [key: string]: boolean } = eventDefaultValue
) {
  return new CustomEvent(customEvent, {
    detail: valueObj,
    ...eventDefault,
  });
}
