import { ContainerWidget } from './custom-elements/container-widget';
import { InputWidget } from './custom-elements/input-widget';
import { TextWidget } from './custom-elements/text-widget';

export function getLocalElementConstructor(): Record<
  string,
  CustomElementConstructor
> {
  return {
    'sk-text': TextWidget,
    'sk-input': InputWidget,
    'sk-container': ContainerWidget,
  };
}
