export const firstOrNull = <Model>(entities: Model[]): Model | null =>
  entities.length === 0 ? null : entities[0];

export const lastOrNull = <Model>(entities: Model[]): Model | null =>
  entities.length === 0 ? null : entities[entities.length - 1];
