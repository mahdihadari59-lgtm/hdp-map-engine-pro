const repo = require('../repositories/PoiRepository');

class PoiService {
  async getAllPois(query = {}) {
    const options = {};
    if (query.limit) options.limit = parseInt(query.limit, 10);
    if (query.category) return repo.findByCategory(query.category);
    if (query.city) return repo.findByCity(query.city);
    return repo.findAll(options);
  }
  async getPoiById(id) { return repo.findById(id); }
  async getNearbyPois(lat, lng, radiusKm) { return repo.findNearby(lat, lng, radiusKm); }
  async getCategories() { return repo.getCategories(); }
}
module.exports = new PoiService();
