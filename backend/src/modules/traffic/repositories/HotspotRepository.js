const BaseRepository = require('./BaseRepository');
const { allAsync } = require('../../../database/jsondb');
const { haversine } = require('../../../utils/geo');

class HotspotRepository extends BaseRepository {
  constructor() { super('hotspots'); }
  async findBySeverity(severity) {
    const rows = await allAsync(this.table);
    return rows.filter(r => r.severity === severity).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
  async findNearby(lat, lng, radiusKm = 5) {
    const rows = await allAsync(this.table);
    return rows.map(r => ({ ...r, distance: haversine(lat, lng, r.lat, r.lng) / 1000 }))
      .filter(r => r.distance < radiusKm).sort((a, b) => a.distance - b.distance);
  }
  async getStats() {
    const rows = await allAsync(this.table);
    const stats = {};
    rows.forEach(r => { stats[r.severity] = (stats[r.severity] || 0) + 1; });
    return Object.entries(stats).map(([severity, count]) => ({ severity, count }));
  }
}
module.exports = new HotspotRepository();
