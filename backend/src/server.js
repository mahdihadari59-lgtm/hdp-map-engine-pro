const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`============================================`);
  logger.info(`  HDP Map Engine Pro Backend`);
  logger.info(`  Mode: ${config.nodeEnv}`);
  logger.info(`  Port: ${PORT}`);
  logger.info(`  API:  http://localhost:${PORT}/api/v1`);
  logger.info(`  Health: http://localhost:${PORT}/health`);
  logger.info(`============================================`);
});
