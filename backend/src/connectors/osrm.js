const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

const DEFAULT_BASE_URL = 'https://router.project-osrm.org';

class OSRMConnector {
  constructor() {
    this.baseUrl =
      (config.osrmBaseUrl || process.env.OSRM_BASE_URL || DEFAULT_BASE_URL)
        .replace(/\/$/, '');
  }

  async route(from, to, options = {}) {
    try {
      if (!from || !to) {
        throw new Error('OSRM requires from and to coordinates');
      }

      const profile = options.profile || 'driving';

      const coordinates =
        `${from.lng},${from.lat};${to.lng},${to.lat}`;

      const { data } = await axios.get(
        `${this.baseUrl}/route/v1/${profile}/${coordinates}`,
        {
          params: {
            overview: options.overview || 'full',
            geometries: options.geometries || 'geojson',
            steps: options.steps !== false,
            alternatives: options.alternatives || false,
          },
          timeout: options.timeout || 10000,
        }
      );

      if (!data || data.code !== 'Ok' || !data.routes?.length) {
        throw new Error(
          `OSRM routing failed: ${data?.code || 'NO_ROUTE'}`
        );
      }

      const route = data.routes[0];

      return {
        success: true,
        provider: 'osrm',
        distance: route.distance,
        duration: route.duration,
        distance_km: Number((route.distance / 1000).toFixed(3)),
        duration_min: Number((route.duration / 60).toFixed(2)),
        geometry: route.geometry,
        legs: route.legs || [],
        waypoints: data.waypoints || [],
      };
    } catch (err) {
      logger.error('OSRM route error:', err.message);
      throw err;
    }
  }
}

module.exports = new OSRMConnector();
