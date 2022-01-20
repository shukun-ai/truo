export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/shukun_app_dev',
  },
});
