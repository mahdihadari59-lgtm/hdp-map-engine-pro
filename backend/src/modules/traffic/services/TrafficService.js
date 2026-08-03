const hotspotRepo = require('../repositories/HotspotRepository');
const cameraRepo = require('../repositories/CameraRepository');
const routeRepo = require('../repositories/RouteRepository');
const fineRepo = require('../repositories/FineRepository');
const logger = require('../../../utils/logger');

class TrafficService {
  // Hotspots
  async getAllHotspots(filters = {}) {
    if (filters.severity) {
      return hotspotRepo.findBySeverity(filters.severity);
    }
    if (filters.lat && filters.lng) {
      return hotspotRepo.findNearby(filters.lat, filters.lng, filters.radius || 5);
    }
    return hotspotRepo.findAll({ orderBy: 'timestamp DESC', limit: filters.limit || 100 });
  }

  async getHotspotById(id) {
    return hotspotRepo.findById(id);
  }

  async createHotspot(data) {
    return hotspotRepo.create(data);
  }

  async deleteHotspot(id) {
    return hotspotRepo.delete(id);
  }

  // Cameras
  async getAllCameras(filters = {}) {
    if (filters.type) return cameraRepo.findByType(filters.type);
    if (filters.active) return cameraRepo.findActive();
    if (filters.lat && filters.lng) {
      return cameraRepo.findNearby(filters.lat, filters.lng, filters.radius || 5);
    }
    return cameraRepo.findAll();
  }

  async getCameraById(id) {
    return cameraRepo.findById(id);
  }

  async createCamera(data) {
    return cameraRepo.create(data);
  }

  async updateCameraStatus(id, status) {
    return cameraRepo.update(id, { status });
  }

  // Fines
  async getAllFines(filters = {}) {
    if (filters.plate) return fineRepo.findByPlate(filters.plate);
    return fineRepo.findAll({ orderBy: 'date DESC', limit: filters.limit || 100 });
  }

  async createFine(data) {
    return fineRepo.create(data);
  }

  async getFineStats() {
    const byType = await fineRepo.getStats();
    const total = await fineRepo.getTotalRevenue();
    return { byType, totalRevenue: total };
  }

  // Stats
  async getTrafficStats() {
    const [hotspotStats, fineStats, cameraCount] = await Promise.all([
      hotspotRepo.getStats(),
      fineRepo.getStats(),
      cameraRepo.count(),
    ]);
    return {
      hotspots: hotspotStats,
      fines: fineStats,
      cameras: cameraCount,
    };
  }

  async getNearbyTraffic(lat, lng, radius = 5) {
    const [hotspots, cameras] = await Promise.all([
      hotspotRepo.findNearby(lat, lng, radius),
      cameraRepo.findNearby(lat, lng, radius),
    ]);
    return { hotspots, cameras, radius };
  }
}

module.exports = new TrafficService();
