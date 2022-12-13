import { MetadataFieldType } from '@shukun/schema';

export const zhTranslation = {
  electron: {
    fieldType: {
      [MetadataFieldType.Text]: '文本',
      [MetadataFieldType.NameText]: '标识符',
      [MetadataFieldType.LargeText]: '长文本', // @todo should remove it
      [MetadataFieldType.SingleSelect]: '单选',
      [MetadataFieldType.MultiSelect]: '多选',
      [MetadataFieldType.Boolean]: '布尔值',
      [MetadataFieldType.DateTime]: '日期与时间',
      [MetadataFieldType.Integer]: '整数',
      [MetadataFieldType.Float]: '浮点数',
      [MetadataFieldType.Currency]: '货币',
      [MetadataFieldType.Password]: '密码',
      [MetadataFieldType.ManyToMany]: '关联多个模型',
      [MetadataFieldType.ManyToOne]: '关联单个模型',
      [MetadataFieldType.Owner]: '所属人',
      [MetadataFieldType.Attachment]: '图片或附件',
      [MetadataFieldType.Mixed]: 'JSON 结构',
    },
  },
  systemView: {
    ruleKeys: {
      hidden: '输入框隐藏',
      required: '输入框必填',
      disabled: '输入框灰显',
    },
  },
  fields: {
    requiredError: '请务必填写"{{label}}"字段',
  },
};
