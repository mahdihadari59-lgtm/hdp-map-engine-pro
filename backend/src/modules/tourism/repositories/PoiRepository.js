const BaseRepository = require('../../traffic/repositories/BaseRepository');
const { allAsync } = require('../../../database/jsondb');
const { haversine } = require('../../../utils/geo');

class PoiRepository extends BaseRepository {
  constructor() { super('pois'); }

  async findByCategory(category) {
    const rows = await allAsync(this.table);
    return rows.filter(r => r.category === category);
  }

  async findByCity(city) {
    const rows = await allAsync(this.table);
    return rows.filter(r => r.city === city);
  }

  async findNearby(lat, lng, radiusKm = 5) {
    const rows = await allAsync(this.table);
    return rows
      .map(r => ({ ...r, distance: haversine(lat, lng, r.lat, r.lng) / 1000 }))
      .filter(r => r.distance < radiusKm)
      .sort((a, b) => a.distance - b.distance);
  }

  async getCategories() {
    const rows = await allAsync(this.table);
    const counts = {};
    rows.forEach(r => { counts[r.category] = (counts[r.category] || 0) + 1; });
    return Object.entries(counts).map(([category, count]) => ({ category, count }));
  }
}
module.exports = new PoiRepository();
