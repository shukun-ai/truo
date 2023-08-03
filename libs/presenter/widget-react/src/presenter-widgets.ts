import { ReactWidget } from './abstracts/loader.interface';
import { TextWidget } from './widgets/text/text.widget';

export const presenterWidgets: Record<string, ReactWidget> = {
  text: TextWidget,
};
