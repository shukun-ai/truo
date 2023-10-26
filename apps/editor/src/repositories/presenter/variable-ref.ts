import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { PresenterVariable } from '@shukun/schema';

export type PresenterVariableEntity = {
  id: string;
} & PresenterVariable;

const { variableEntitiesRef, withVariableEntities } =
  entitiesPropsFactory('variable');

export const withVariable = () => {
  return withVariableEntities<PresenterVariableEntity>();
};

export const variableRef = variableEntitiesRef;

export const createVariableEntityId = (variableId: string): string => {
  return variableId;
};

export const getVariable = (variableEntity: PresenterVariableEntity) => {
  const { id, ...variable } = variableEntity;
  return variable;
};
