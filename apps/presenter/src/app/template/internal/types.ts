export type TemplateHelpers = {
  [helperName: string]: (...args: any[]) => any;
};
