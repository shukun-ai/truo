import { MetadataSchema, MetadataFieldType } from '../../types/application';

import { mergeMetadata } from './dependency-merge';

const currentAtoms: MetadataSchema[] = [
  {
    name: 'product_categories',
    label: '商品分类',
    electrons: [
      {
        name: 'owner',
        label: '创建人',
        fieldType: MetadataFieldType.Owner,
        isRequired: false,
        referenceTo: 'system__users',
        foreignName: 'displayName',
      },
      {
        name: 'label',
        label: '分类名称',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
        isUnique: false,
        isIndexed: true,
      },
      {
        name: 'priority',
        label: '排序',
        fieldType: MetadataFieldType.Integer,
        isRequired: true,
        isIndexed: true,
      },
      {
        name: 'visible',
        label: '是否显示',
        fieldType: MetadataFieldType.Boolean,
        isRequired: true,
      },
      {
        name: 'menu',
        label: '上级分类',
        fieldType: MetadataFieldType.ManyToOne,
        isRequired: true,
        referenceTo: 'menu_categories',
        foreignName: 'label',
        isIndexed: true,
      },
      {
        name: 'cover',
        label: '封面图片',
        fieldType: MetadataFieldType.Attachment,
        isRequired: true,
      },
    ],
  },
  {
    name: 'system__users',
    label: '用户表',
    electrons: [
      {
        name: 'displayName',
        label: '真实姓名',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
      },
      {
        name: 'companyName',
        label: '公司名称',
        fieldType: MetadataFieldType.Text,
        isRequired: false,
        isUnique: false,
        isIndexed: false,
      },
      {
        name: 'employeeNumber',
        label: '员工编号',
        fieldType: MetadataFieldType.Text,
        isRequired: false,
        isUnique: false,
        isIndexed: false,
      },
    ],
  },
];

const dependencyAtoms: MetadataSchema[] = [
  {
    name: 'system__users',
    label: '用户表',
    electrons: [
      {
        name: 'owner',
        label: '创建人',
        fieldType: MetadataFieldType.Owner,
        isRequired: false,
        referenceTo: 'system__users',
        foreignName: 'username',
      },
      {
        name: 'username',
        label: '用户名',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
        isUnique: true,
        isIndexed: true,
      },
      {
        name: 'displayName',
        label: '显示名',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
      },
      {
        name: 'password',
        label: '密码',
        fieldType: MetadataFieldType.Password,
        isRequired: true,
      },
      {
        name: 'avatar',
        label: '用户头像',
        fieldType: MetadataFieldType.Attachment,
        isRequired: false,
      },
      {
        name: 'locale',
        label: '语言',
        fieldType: MetadataFieldType.Text,
        isRequired: false,
      },
      {
        name: 'timezone',
        label: '时区',
        fieldType: MetadataFieldType.Text,
        isRequired: false,
      },
    ],
  },
];

const expectedAtoms: MetadataSchema[] = [
  {
    name: 'product_categories',
    label: '商品分类',
    electrons: [
      {
        name: 'owner',
        label: '创建人',
        fieldType: MetadataFieldType.Owner,
        isRequired: false,
        referenceTo: 'system__users',
        foreignName: 'displayName',
      },
      {
        name: 'label',
        label: '分类名称',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
        isUnique: false,
        isIndexed: true,
      },
      {
        name: 'priority',
        label: '排序',
        fieldType: MetadataFieldType.Integer,
        isRequired: true,
        isIndexed: true,
      },
      {
        name: 'visible',
        label: '是否显示',
        fieldType: MetadataFieldType.Boolean,
        isRequired: true,
      },
      {
        name: 'menu',
        label: '上级分类',
        fieldType: MetadataFieldType.ManyToOne,
        isRequired: true,
        referenceTo: 'menu_categories',
        foreignName: 'label',
        isIndexed: true,
      },
      {
        name: 'cover',
        label: '封面图片',
        fieldType: MetadataFieldType.Attachment,
        isRequired: true,
      },
    ],
  },
  {
    name: 'system__users',
    label: '用户表',
    electrons: [
      {
        name: 'displayName',
        label: '真实姓名',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
      },
      {
        name: 'companyName',
        label: '公司名称',
        fieldType: MetadataFieldType.Text,
        isRequired: false,
        isUnique: false,
        isIndexed: false,
      },
      {
        name: 'employeeNumber',
        label: '员工编号',
        fieldType: MetadataFieldType.Text,
        isRequired: false,
        isUnique: false,
        isIndexed: false,
      },
      {
        name: 'owner',
        label: '创建人',
        fieldType: MetadataFieldType.Owner,
        isRequired: false,
        referenceTo: 'system__users',
        foreignName: 'username',
      },
      {
        name: 'username',
        label: '用户名',
        fieldType: MetadataFieldType.Text,
        isRequired: true,
        isUnique: true,
        isIndexed: true,
      },
      {
        name: 'password',
        label: '密码',
        fieldType: MetadataFieldType.Password,
        isRequired: true,
      },
      {
        name: 'avatar',
        label: '用户头像',
        fieldType: MetadataFieldType.Attachment,
        isRequired: false,
      },
      {
        name: 'locale',
        label: '语言',
        fieldType: MetadataFieldType.Text,
        isRequired: false,
      },
      {
        name: 'timezone',
        label: '时区',
        fieldType: MetadataFieldType.Text,
        isRequired: false,
      },
    ],
  },
];

describe('dependency-merge', () => {
  it('mergeMetadata', () => {
    const output = mergeMetadata(currentAtoms, dependencyAtoms);
    expect(output).toEqual(expectedAtoms);
  });

  //   it("mergeElectron", () => {
  //     const output = mergeElectron(
  //       {
  //         name: "current",
  //         label: "current",
  //         fieldType: MetadataFieldType.SingleSelect,
  //         isRequired: true,
  //       },
  //       {
  //         name: "dependency",
  //         label: "dependency",
  //         fieldType: MetadataFieldType.SingleSelect,
  //         isRequired: false,
  //         options: [{ key: "red", label: "red" }],
  //       }
  //     );
  //     expect(output).toEqual({
  //       name: "current",
  //       label: "current",
  //       fieldType: MetadataFieldType.SingleSelect,
  //       isRequired: true,
  //       options: [{ key: "red", label: "red" }],
  //     });
  //   });
});
