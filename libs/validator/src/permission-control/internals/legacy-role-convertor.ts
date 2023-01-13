import { TypeException } from '@shukun/exception';

import { AllowedResourceTypes } from '../permission-control.type';

import { AcPermission } from './external-access-control.type';
import { LegacyActionConvertor } from './legacy-action-convertor';

export class LegacyRoleConvertor {
  parse(stringPermission: string): Omit<AcPermission, 'role'> {
    const { type, name, action, attributes } =
      this.splitStringPermission(stringPermission);

    const roleResourceType = this.prepareType(type);

    return {
      resource: `${roleResourceType}/${name}`,
      action: this.prepareAction(roleResourceType, action),
      attributes: this.prepareAttributes(attributes),
    };
  }

  private splitStringPermission(stringPermission: string): {
    type: string;
    name: string;
    action?: string;
    attributes?: string;
  } {
    const [type, name, action, attributes] = stringPermission.split('/');

    if (!type || !name) {
      throw new TypeException(
        'Did not find resource type and name: {{stringPermission}}',
        {
          stringPermission,
        },
      );
    }

    return {
      type,
      name,
      action: action || undefined,
      attributes: attributes || undefined,
    };
  }

  private prepareType(type: string): AllowedResourceTypes {
    switch (type) {
      case 'source':
        return AllowedResourceTypes.Source;
      case 'view':
        return AllowedResourceTypes.View;
      case 'webhook':
        return AllowedResourceTypes.Webhook;
      default:
        throw new TypeException('Did not support resource type: {{type}}', {
          type,
        });
    }
  }

  private prepareAction(
    type: AllowedResourceTypes,
    action?: string,
  ): AcPermission['action'] {
    switch (type) {
      case AllowedResourceTypes.Source:
        return this.toLegacyAction(action);
      case AllowedResourceTypes.View:
        return this.toLegacyAction('read');
      case AllowedResourceTypes.Webhook:
        return this.toLegacyAction('create');
    }
  }

  private toLegacyAction(action?: string): AcPermission['action'] {
    if (!action) {
      throw new TypeException('Forget to configure "action" in permission.');
    }
    return new LegacyActionConvertor().parse(action);
  }

  private prepareAttributes(attributes?: string): string {
    if (!attributes) {
      return '*';
    }
    return attributes;
  }
}
