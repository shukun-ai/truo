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
  version: {
    version: string;
    commitHash: string;
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
  version: {
    version: process.env.VERSION || '',
    commitHash: process.env.COMMIT_HASH || '',
  },
});

const getRegisterMode = () => {
  switch (process.env.VITE_ORG_REGISTER_MODE) {
    case 'self-create':
      return 'self-create';
    case 'disabled':
      return 'disabled';
    default:
      return 'disabled';
  }
};
