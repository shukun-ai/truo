import { ApplicationSchema, MetadataFieldType, ViewType } from '@shukun/schema';

import applicationData from './application.test.json';
import { applicationSchemaValidator } from './validate-application-schema';

describe('application format check.', () => {
  it('applicationSchemaValidator', () => {
    applicationSchemaValidator.validate(applicationData);
  });

  describe('rolePermission', () => {
    const application: ApplicationSchema = {
      title: 'mock',
      roles: [
        {
          name: 'mock',
          label: 'mock',
          permissions: ['source'],
        },
      ],
    };

    it('if the permission is not match rule, then throw.', () => {
      expect(() => applicationSchemaValidator.validate(application)).toThrow();
    });
  });

  describe('electronName', () => {
    const application: ApplicationSchema = {
      title: 'mock',
      metadata: [
        {
          name: 'mock',
          label: 'mock',
          electrons: [
            {
              name: 'WrongMockElectron',
              label: 'mock',
              fieldType: MetadataFieldType.Text,
              isRequired: false,
            },
          ],
        },
      ],
    };

    it('if the electron name is not match rule, then throw.', () => {
      expect(() => applicationSchemaValidator.validate(application)).toThrow();
    });
  });

  describe('atomName', () => {
    const application: ApplicationSchema = {
      title: 'mock',
      metadata: [
        {
          name: 'WrongAtomName',
          label: 'mock',
          electrons: [],
        },
      ],
    };

    it('if the atom name is not match rule, then throw.', () => {
      expect(() => applicationSchemaValidator.validate(application)).toThrow();
    });
  });

  describe('viewName', () => {
    const application: ApplicationSchema = {
      title: 'mock',
      views: [
        {
          name: 'WrongViewName',
          label: 'mock',
          type: ViewType.Simple,
          isVisible: true,
          priority: 10,
        },
      ],
    };

    it('if the view name is not match rule, then throw.', () => {
      expect(() => applicationSchemaValidator.validate(application)).toThrow();
    });
  });

  describe('roleName', () => {
    const application: ApplicationSchema = {
      title: 'mock',
      roles: [
        {
          name: 'WrongRoleName',
          label: 'mock',
          permissions: [],
        },
      ],
    };

    it('if the role name is not match rule, then throw.', () => {
      expect(() => applicationSchemaValidator.validate(application)).toThrow();
    });
  });

  describe('scheduleName', () => {
    const application: ApplicationSchema = {
      title: 'mock',
      schedules: [
        {
          name: 'WrongScheduleName',
          timezone: '',
          cron: '',
          active: true,
        },
      ],
    };

    it('if the schedule name is not match rule, then throw.', () => {
      expect(() => applicationSchemaValidator.validate(application)).toThrow();
    });

    it.todo('if the timezone is not matched.');

    it.todo('if the cron is not matched.');
  });
});
