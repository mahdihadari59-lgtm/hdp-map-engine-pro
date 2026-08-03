const service = require('../services/TrafficService');

class TrafficController {
  async getHotspots(req, res, next) {
    try {
      const data = await service.getAllHotspots(req.query);
      res.json({ success: true, count: data.length, data });
    } catch (err) { next(err); }
  }

  async createHotspot(req, res, next) {
    try {
      const result = await service.createHotspot(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err) { next(err); }
  }

  async getHotspotById(req, res, next) {
    try {
      const data = await service.getHotspotById(req.params.id);
      if (!data) return res.status(404).json({ success: false, error: 'Hotspot not found' });
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }

  async deleteHotspot(req, res, next) {
    try {
      await service.deleteHotspot(req.params.id);
      res.json({ success: true, message: 'Deleted' });
    } catch (err) { next(err); }
  }

  async getCameras(req, res, next) {
    try {
      const data = await service.getAllCameras(req.query);
      res.json({ success: true, count: data.length, data });
    } catch (err) { next(err); }
  }

  async createCamera(req, res, next) {
    try {
      const result = await service.createCamera(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err) { next(err); }
  }

  async getCameraById(req, res, next) {
    try {
      const data = await service.getCameraById(req.params.id);
      if (!data) return res.status(404).json({ success: false, error: 'Camera not found' });
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }

  async updateCameraStatus(req, res, next) {
    try {
      await service.updateCameraStatus(req.params.id, req.body.status);
      res.json({ success: true, message: 'Status updated' });
    } catch (err) { next(err); }
  }

  async getFines(req, res, next) {
    try {
      const data = await service.getAllFines(req.query);
      res.json({ success: true, count: data.length, data });
    } catch (err) { next(err); }
  }

  async createFine(req, res, next) {
    try {
      const result = await service.createFine(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err) { next(err); }
  }

  async getFineStats(req, res, next) {
    try {
      const data = await service.getFineStats();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }

  async getTrafficStats(req, res, next) {
    try {
      const data = await service.getTrafficStats();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }

  async getNearbyTraffic(req, res, next) {
    try {
      const { lat, lng, radius } = req.query;
      const data = await service.getNearbyTraffic(parseFloat(lat), parseFloat(lng), parseFloat(radius) || 5);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }
}

module.exports = new TrafficController();
