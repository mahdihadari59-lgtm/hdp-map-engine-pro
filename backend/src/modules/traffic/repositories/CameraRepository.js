const BaseRepository = require('./BaseRepository');
const { allAsync } = require('../../../database/jsondb');
const { haversine } = require('../../../utils/geo');

class CameraRepository extends BaseRepository {
  constructor() { super('cameras'); }
  async findByType(type) { return (await allAsync(this.table)).filter(r => r.type === type); }
  async findActive() { return (await allAsync(this.table)).filter(r => r.status === 'active'); }
  async findNearby(lat, lng, radiusKm = 5) {
    return (await allAsync(this.table)).map(r => ({ ...r, distance: haversine(lat, lng, r.lat, r.lng) / 1000 }))
      .filter(r => r.distance < radiusKm).sort((a, b) => a.distance - b.distance);
  }
}
module.exports = new CameraRepository();
