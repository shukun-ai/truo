import { IDString, SourceServiceCreateDto } from '../../app.type';
import { QueryParserOptions } from '../../util/query/interfaces';

export interface Scope {
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
