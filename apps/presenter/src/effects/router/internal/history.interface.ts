export interface IHistory {
  readonly action: Action;
  readonly location: Location;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  push(to: To, state?: any): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  replace(to: To, state?: any): void;
  go(delta: number): void;
  listen(listener: Listener): () => void;
}

enum Action {
  Pop = 'POP',
  Push = 'PUSH',
  Replace = 'REPLACE',
}

type To = string | Partial<Path>;

interface Path {
  pathname: Pathname;
  search: Search;
  hash: Hash;
}

type Pathname = string;

type Search = string;

type Hash = string;

interface Listener {
  (update: Update): void;
}

interface Update {
  action: Action;
  location: Location;
}

interface Location extends Path {
  state: unknown;
  key: Key;
}

type Key = string;
