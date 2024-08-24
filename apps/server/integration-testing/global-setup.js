const path = require('path');

const dockerCompose = require('docker-compose');
const isPortReachable = require('is-port-reachable');

module.exports = async () => {
  process.env.MONGO_URI = 'mongodb://localhost:20000/shukun_test';

  const isDBReachable = await isPortReachable(20000);

  if (!isDBReachable) {
    await dockerCompose.upAll({
      cwd: path.join(__dirname),
      log: true,
      verbose: true,
    });
  }
};
