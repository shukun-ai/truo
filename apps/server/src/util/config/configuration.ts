import { getEnvOrFail } from './helper';

export const configuration = (): {
  port: number;
  mongo: {
    uri: string;
  };
  schedule: {
    disabled: boolean;
  };
  org: {
    registerMode: 'self-create' | 'disabled';
  };
} => ({
  port: parseInt(process.env.PORT || '3000', 10),
  mongo: {
    uri: getEnvOrFail(process.env.MONGO_URI),
  },
  schedule: {
    disabled: process.env.DISABLED_SCHEDULE ? true : false,
  },
  org: {
    registerMode: getRegisterMode(),
  },
});

const getRegisterMode = () => {
  switch (process.env.NX_ORG_REGISTER_MODE) {
    case 'self-create':
      return 'self-create';
    case 'disabled':
      return 'disabled';
    default:
      return 'disabled';
  }
};
