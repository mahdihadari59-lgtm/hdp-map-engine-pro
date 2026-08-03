const BaseRepository = require('./BaseRepository');
const { allAsync } = require('../../../database/jsondb');

class FineRepository extends BaseRepository {
  constructor() { super('fines'); }
  async findByPlate(plate) {
    return (await allAsync(this.table)).filter(r => r.plate === plate).sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  async getStats() {
    const rows = await allAsync(this.table);
    const stats = {};
    rows.forEach(r => { if (!stats[r.type]) stats[r.type] = { count: 0, total: 0 }; stats[r.type].count++; stats[r.type].total += r.amount || 0; });
    return Object.entries(stats).map(([type, data]) => ({ type, count: data.count, total: data.total }));
  }
  async getTotalRevenue() { return (await allAsync(this.table)).reduce((sum, r) => sum + (r.amount || 0), 0); }
}
module.exports = new FineRepository();
