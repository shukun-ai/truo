const dockerCompose = require('docker-compose');
const isCI = require('is-ci');

module.exports = async () => {
  if (isCI) {
    dockerCompose.down();
  }
  // TODO clean database occasionally
};
