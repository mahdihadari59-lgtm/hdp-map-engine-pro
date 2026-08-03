const logger = require('../utils/logger');
async function initSchema() {
  logger.info('JSON DB initialized (no schema needed)');
}
module.exports = { initSchema };
