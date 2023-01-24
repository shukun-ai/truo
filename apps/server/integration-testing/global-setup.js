const path = require('path');

const dockerCompose = require('docker-compose');
const isPortReachable = require('is-port-reachable');

module.exports = async () => {
  const isDBReachable = await isPortReachable(20000);

  if (!isDBReachable) {
    await dockerCompose.upAll({
      cwd: path.join(__dirname),
      log: true,
    });
  }
};
