import { IDString } from '@shukun/schema';
import { HttpQuerySchema } from '@shukun/schema';

export interface CodeResolver {
  source: {
    findAll: <T>(atomName: string, query: HttpQuerySchema) => Promise<T[]>;
    findOne: <T>(atomName: string, query: HttpQuerySchema) => Promise<T>;
    createOne: <T>(atomName: string, data: T) => Promise<{ _id: IDString }>;
    updateOne: <T>(
      id: IDString,
      atomName: string,
      data: Partial<T>,
    ) => Promise<void>;
    deleteOne: (id: IDString, atomName: string) => Promise<void>;
    count: (atomName: string, query: HttpQuerySchema) => Promise<number>;
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
