import { TypeException } from '@shukun/exception';
import { RoleResourceType } from '@shukun/schema';

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

  private prepareType(type: string): RoleResourceType {
    const types: string[] = Object.values(RoleResourceType);
    if (!types.includes(type)) {
      throw new TypeException('Did not support resource type: {{type}}', {
        type,
      });
    }
    return type as RoleResourceType;
  }

  private prepareAction(
    type: RoleResourceType,
    action?: string,
  ): AcPermission['action'] {
    switch (type) {
      case RoleResourceType.Developer:
        return this.toLegacyAction('read');
      case RoleResourceType.Internal:
        return this.toLegacyAction('read');
      case RoleResourceType.Public:
        return this.toLegacyAction('read');
      case RoleResourceType.Source:
        return this.toLegacyAction(action);
      case RoleResourceType.Tenant:
        return this.toLegacyAction('read');
      case RoleResourceType.View:
        return this.toLegacyAction('read');
      case RoleResourceType.Webhook:
        return this.toLegacyAction('create');
      default:
        throw new TypeException('Did not support resource type: {{type}}', {
          type,
        });
    }
  }

  private toLegacyAction(action?: string): AcPermission['action'] {
    if (!action) {
      throw new TypeException('Did not find action when convert role.');
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
