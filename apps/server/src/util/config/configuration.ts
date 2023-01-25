import { getEnvOrFail } from './helper';

export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  mongo: {
    uri: getEnvOrFail(process.env.MONGO_URI),
  },
  schedule: {
    disabled: process.env.DISABLED_SCHEDULE || false,
  },
});
