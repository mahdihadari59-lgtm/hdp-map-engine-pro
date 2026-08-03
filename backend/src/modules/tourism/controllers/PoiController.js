const service = require('../services/PoiService');

class PoiController {
  async getPois(req, res, next) {
    try {
      const data = await service.getAllPois(req.query);
      res.json({ success: true, count: data.length, data });
    } catch (err) { next(err); }
  }

  async getPoiById(req, res, next) {
    try {
      const data = await service.getPoiById(req.params.id);
      if (!data) return res.status(404).json({ success: false, error: 'POI not found' });
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }

  async getNearbyPois(req, res, next) {
    try {
      const { lat, lng, radius } = req.query;
      const data = await service.getNearbyPois(parseFloat(lat), parseFloat(lng), parseFloat(radius) || 5);
      res.json({ success: true, count: data.length, data });
    } catch (err) { next(err); }
  }

  async getCategories(req, res, next) {
    try {
      const data = await service.getCategories();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }
}
module.exports = new PoiController();
