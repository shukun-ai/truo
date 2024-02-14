const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const { composePlugins, withNx } = require('@nx/webpack');
const { DefinePlugin } = require('webpack');

const getVersion = () => {
  let commitHash = 'none';

  try {
    commitHash = execSync('git rev-parse --short HEAD').toString().trim();
  } catch (error) {
    console.error('Failed to get commit hash:', error.message);
  }

  let version = 'dev';

  try {
    const packageJsonPath = path.resolve(__dirname, '../../package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);

    version = packageJson.version;
  } catch (error) {
    console.error('Failed to read package.json:', error.message);
  }

  return {
    version,
    commitHash,
  };
};

const version = getVersion();

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx({
    target: 'node',
  }),
  (config) => {
    // Update the webpack config as needed here.
    // e.g. `config.plugins.push(new MyPlugin())`
    config.plugins.push(
      new DefinePlugin({
        'process.env.VERSION': JSON.stringify(version.version),
        'process.env.COMMIT_HASH': JSON.stringify(version.commitHash),
      }),
    );
    return config;
  },
);
