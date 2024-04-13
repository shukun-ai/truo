const dockerCompose = require('docker-compose');
const isCI = require('is-ci');
const MongoClient = require('mongodb').MongoClient;

module.exports = async () => {
  await cleanDatabase('mongodb://localhost:20000/shukun_test');
  await cleanDatabase('mongodb://localhost:20000/shukun_test_project');
  if (isCI) {
    await dockerCompose.down();
  }
  // TODO clean database occasionally
};

const cleanDatabase = async (uri) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    await db.dropDatabase();
  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    await client.close();
  }
};
