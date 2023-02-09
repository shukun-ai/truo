import { TypeException } from '@shukun/exception';

import { isElectronName } from '../base-validator/is-electron-name';

import {
  PermissionNodes,
  SOURCE_ALLOW_ACTIONS,
} from './permission-control.type';

export class PermissionConvertor {
  parse(stringPermission: string): PermissionNodes {
    const [type, name, action, recordMode, attributeMode, attributes] =
      stringPermission.split(':');

    this.validate(type, name, stringPermission);

    const permissionNodes: PermissionNodes = {
      type,
      name,
      action: this.parseAction(action),
      recordMode: this.parseRecordMode(recordMode),
      attributeMode: this.parseAttributeMode(attributeMode),
      reverseAttributes: this.parseReverseAttributes(attributes),
    };

    this.validateSource(permissionNodes);

    return permissionNodes;
  }

  private parseAction(action?: string): string | null {
    return action ?? null;
  }

  private parseRecordMode(recordMode?: string): PermissionNodes['recordMode'] {
    if (!recordMode) {
      return 'any';
    }

    switch (recordMode) {
      case 'any':
      case 'own':
        return recordMode;
    }

    throw new TypeException('Only support all or own: {{recordMode}}', {
      recordMode,
    });
  }

  private parseAttributeMode(
    attributeMode?: string,
  ): PermissionNodes['attributeMode'] {
    if (!attributeMode) {
      return 'allow';
    }

    switch (attributeMode) {
      case 'allow':
      case 'deny':
        return attributeMode;
    }

    throw new TypeException('Only support allow or deny: {{attributeMode}}', {
      attributeMode,
    });
  }

  private parseReverseAttributes(
    attributes?: string,
  ): PermissionNodes['reverseAttributes'] {
    if (!attributes) {
      return [];
    }
    return attributes.split(',').map((attribute) => {
      if (!isElectronName(attribute)) {
        throw new TypeException(
          'The attribute is not match electron name: {{attribute}}',
          { attribute },
        );
      }
      return attribute;
    });
  }

  private validate(type: unknown, name: unknown, stringPermission: string) {
    if (!type || !name) {
      throw new TypeException(
        'Did not find type and name: {{stringPermission}}. Rule: type:name[:action[[(own)]:attributes]].',
        {
          stringPermission,
        },
      );
    }
  }

  private validateSource(permissionNodes: PermissionNodes): void {
    if (
      permissionNodes.type === 'source' &&
      permissionNodes.action &&
      !SOURCE_ALLOW_ACTIONS.includes(permissionNodes.action)
    ) {
      throw new TypeException(
        'Only support read, create, update, delete for source type, do not support {{name}}',
        {
          name: permissionNodes.action,
        },
      );
    }
  }
}
