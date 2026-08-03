const { allAsync, getAsync, runAsync, updateAsync, deleteAsync, countAsync } = require('../../../database/jsondb');

class BaseRepository {
  constructor(tableName) { this.table = tableName; }
  async findAll(options = {}) {
    let rows = await allAsync(this.table);
    if (options.where) rows = rows.filter(r => Object.entries(options.where).every(([k, v]) => r[k] == v));
    if (options.orderBy) {
      const parts = options.orderBy.split(/[ \t]+/);
      const key = parts[0], order = parts[1];
      rows.sort((a, b) => order === 'DESC' ? (b[key] > a[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1));
    }
    if (options.limit) rows = rows.slice(0, options.limit);
    return rows;
  }
  async findById(id) { return getAsync(this.table, id); }
  async create(data) { return runAsync(this.table, data); }
  async update(id, data) { return updateAsync(this.table, id, data); }
  async delete(id) { return deleteAsync(this.table, id); }
  async count() { return countAsync(this.table); }
}
module.exports = BaseRepository;
