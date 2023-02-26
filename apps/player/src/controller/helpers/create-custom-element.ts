export function createCustomElement(
  containerName: string,
  id: string,
  tag: string,
): HTMLElement {
  const element = document.createElement(tag);
  element.id = `${containerName}-${id}`;
  return element;
}
