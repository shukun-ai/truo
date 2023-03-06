export interface IAppController {
  mountApp(root: HTMLElement): Promise<void>;
}
