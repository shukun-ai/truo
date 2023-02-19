import { PlayerEvent } from '@shukun/schema';
import { BehaviorSubject } from 'rxjs';

import { RepositoryManager } from '../repository/repository-manager';
import { TemplateService } from '../template/template.service';

export class EventQueue {
  queue = new BehaviorSubject<PlayerEvent | null>(null);

  constructor(
    private readonly repositoryManager: RepositoryManager,
    private templateService: TemplateService,
  ) {
    this.handleSetRepository();
  }

  emit(event: PlayerEvent) {
    this.queue.next(event);
  }

  handleSetRepository() {
    this.queue.subscribe((event) => {
      if (event?.action !== 'setRepository') {
        return;
      }

      const { target, path, value } = event;

      const literal = this.templateService.parse(value);
      const identifiers = new Set<string>();
      literal.codes.forEach((code) =>
        code.identifiers.forEach((identifier) => identifiers.add(identifier)),
      );

      const dependencies = this.repositoryManager.getValues([...identifiers]);

      const executedCodes = literal.codes.map((code) => {
        return this.templateService.execute(code, dependencies);
      });

      const result = this.templateService.evaluate(literal, executedCodes);

      this.repositoryManager.set(target, path, result);
    });
  }
}
