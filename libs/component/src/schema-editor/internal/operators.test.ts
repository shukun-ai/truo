import { VariableSchema } from '../variable-schema';

import { updateProperty, updatePropertyName } from './operators';

describe('operators', () => {
  describe('updateProperty', () => {
    it('should update single property', () => {
      const output = updateProperty(
        {
          type: 'object',
          properties: {},
        },
        {
          type: 'string',
        },
        'test',
      );

      const expected: VariableSchema = {
        type: 'object',
        properties: {
          test: {
            type: 'string',
          },
        },
      };

      expect(output).toEqual(expected);
    });

    it('should update single property in multiple properties', () => {
      const output = updateProperty(
        {
          type: 'object',
          properties: {
            age: { type: 'number' },
          },
        },
        {
          type: 'string',
        },
        'test',
      );

      const expected: VariableSchema = {
        type: 'object',
        properties: {
          age: { type: 'number' },
          test: {
            type: 'string',
          },
        },
      };

      expect(output).toEqual(expected);
    });

    it('should remove single property', () => {
      const output = updateProperty(
        {
          type: 'object',
          properties: {
            test: {
              type: 'string',
            },
          },
        },
        null,
        'test',
      );

      const expected: VariableSchema = {
        type: 'object',
        properties: {},
      };

      expect(output).toEqual(expected);
    });

    it('should remove single property in multiple properties', () => {
      const output = updateProperty(
        {
          type: 'object',
          properties: {
            age: { type: 'number' },
            test: {
              type: 'string',
            },
          },
        },
        null,
        'test',
      );

      const expected: VariableSchema = {
        type: 'object',
        properties: {
          age: { type: 'number' },
        },
      };

      expect(output).toEqual(expected);
    });
  });

  describe('updatePropertyName', () => {
    it('should rename property', () => {
      const output = updatePropertyName(
        {
          type: 'object',
          properties: {
            test: {
              type: 'string',
            },
            test2: {
              type: 'string',
            },
          },
        },
        'test',
        'test1',
      );

      const expected: VariableSchema = {
        type: 'object',
        properties: {
          test1: {
            type: 'string',
          },
          test2: {
            type: 'string',
          },
        },
      };

      expect(output).toEqual(expected);
    });

    it('should rename property', () => {
      expect(() => {
        updatePropertyName(
          {
            type: 'object',
            properties: {
              test: {
                type: 'string',
              },
              test2: {
                type: 'string',
              },
            },
          },
          'test',
          'test2',
        );
      }).toThrow(new Error('新属性名重复'));
    });
  });
});
