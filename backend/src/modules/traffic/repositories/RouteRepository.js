const BaseRepository = require('./BaseRepository');
const { allAsync } = require('../../../database/sqlite');

class RouteRepository extends BaseRepository {
  constructor() {
    super('routes');
  }

  async findByName(name) {
    return allAsync('SELECT * FROM routes WHERE name LIKE ?', [`%${name}%`]);
  }

  async findPopular(limit = 10) {
    return allAsync('SELECT * FROM routes ORDER BY created_at DESC LIMIT ?', [limit]);
  }
}

module.exports = new RouteRepository();
