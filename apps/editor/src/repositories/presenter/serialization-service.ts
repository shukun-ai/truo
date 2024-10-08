import { setProp, setProps } from '@ngneat/elf';
import { upsertEntities } from '@ngneat/elf-entities';
import { PresenterSchema } from '@shukun/schema';

import { presenterStore } from './presenter-store';
import { PresenterProcessEntity, processRef } from './process-ref';
import { PresenterVariableEntity, variableRef } from './variable-ref';
import { PresenterWidgetEntity, widgetRef } from './widget-ref';

export const serialization = {
  parse(presenter: PresenterSchema): void {
    const { initialized } = presenterStore.getValue();

    if (initialized) {
      return;
    }

    const widgetEntities = getWidgetEntities(presenter);
    const variableEntities = getVariableEntities(presenter);
    const processEntities = getProcessEntities(presenter);

    presenterStore.update(
      setProps(() => ({ initialized: true, presenterLabel: presenter.label })),
      upsertEntities(widgetEntities, { ref: widgetRef }),
      upsertEntities(variableEntities, { ref: variableRef }),
      upsertEntities(processEntities, { ref: processRef }),
      setProp('nodes', presenter.nodes),
    );
  },
};

const getWidgetEntities = (
  presenter: PresenterSchema,
): PresenterWidgetEntity[] => {
  const widgetEntities: PresenterWidgetEntity[] = [];

  for (const [widgetId, widget] of Object.entries(presenter.widgets)) {
    widgetEntities.push({
      ...widget,
      id: widgetId,
    });
  }

  return widgetEntities;
};

const getVariableEntities = (
  presenter: PresenterSchema,
): PresenterVariableEntity[] => {
  const variableEntities: PresenterVariableEntity[] = [];

  for (const [variableId, variable] of Object.entries(
    presenter.variables ?? {},
  )) {
    variableEntities.push({
      ...variable,
      id: variableId,
    });
  }

  return variableEntities;
};

const getProcessEntities = (
  presenter: PresenterSchema,
): PresenterProcessEntity[] => {
  const processEntities: PresenterProcessEntity[] = [];

  for (const [processId, process] of Object.entries(
    presenter.processes ?? {},
  )) {
    processEntities.push({
      ...process,
      id: processId,
    });
  }

  return processEntities;
};
