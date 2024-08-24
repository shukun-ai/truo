const path = require('path');

const dockerCompose = require('docker-compose');
const isPortReachable = require('is-port-reachable');

module.exports = async () => {
  const dockerComposeVersion = await dockerCompose.v2.version();
  // eslint-disable-next-line no-console
  console.log('dockerComposeVersion', dockerComposeVersion);

  process.env.MONGO_URI = 'mongodb://localhost:20000/shukun_test';
  const isDBReachable = await isPortReachable(20000);

  if (!isDBReachable) {
    await dockerCompose.v2.upAll({
      cwd: path.join(__dirname),
      log: true,
      verbose: true,
    });
  }
};
