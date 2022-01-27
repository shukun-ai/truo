// TODO: should be removed, because should extract server types into separated library.
export type IDString = string;

// TODO: should be removed, because should extract server types into separated library.
export interface SourceServiceCreateDto {
  [keyName: string]: unknown;
}

// TODO: should be removed, because should extract server types into separated library.
export interface QueryOptions {
  filter: any;
  sort?: string | any;
  limit?: number;
  skip?: number;
  select?: string | any;
  populate?: string | any;
}

// TODO: should be removed, because should extract server types into separated library.
export type QueryParserOptions = QueryOptions & { count?: boolean };

export interface CodeResolver {
  source: {
    findAll: <T>(atomName: string, query: QueryParserOptions) => Promise<T[]>;
    findOne: <T>(atomName: string, query: QueryParserOptions) => Promise<T>;
    createOne: (
      atomName: string,
      data: SourceServiceCreateDto,
    ) => Promise<{ _id: IDString }>;
    updateOne: (
      id: IDString,
      atomName: string,
      data: SourceServiceCreateDto,
    ) => Promise<void>;
    deleteOne: (id: IDString, atomName: string) => Promise<void>;
    count: (atomName: string, query: QueryParserOptions) => Promise<number>;
    addToMany: (
      id: IDString,
      atomName: string,
      electronName: string,
      foreignId: string,
    ) => Promise<void>;
    removeFromMany: (
      id: IDString,
      atomName: string,
      electronName: string,
      foreignId: string,
    ) => Promise<void>;
    increase: (
      id: IDString,
      atomName: string,
      electronName: string,
      increment: number,
    ) => Promise<void>;
    decrease: (
      id: IDString,
      atomName: string,
      electronName: string,
      increment: number,
    ) => Promise<void>;
  };
}
