const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

const BASE_URL = 'https://graphhopper.com/api/1';

class GraphHopperConnector {
  constructor() {
    this.apiKey = config.graphHopperKey;
  }

  async route(from, to, options = {}) {
    try {
      const { data } = await axios.get(`${BASE_URL}/route`, {
        params: {
          point: [`${from.lat},${from.lng}`, `${to.lat},${to.lng}`],
          vehicle: options.vehicle || 'car',
          locale: options.locale || 'en',
          key: this.apiKey,
          instructions: true,
          points_encoded: true,
        },
      });
      return {
        provider: 'graphhopper',
        distance: data.paths[0].distance,
        duration: data.paths[0].time,
        points: data.paths[0].points,
        instructions: data.paths[0].instructions,
      };
    } catch (err) {
      logger.error('GraphHopper route error:', err.message);
      throw err;
    }
  }

  async geocode(query) {
    try {
      const { data } = await axios.get(`${BASE_URL}/geocode`, {
        params: { q: query, key: this.apiKey, locale: 'en' },
      });
      return data.hits.map((hit) => ({
        name: hit.name,
        lat: hit.point.lat,
        lng: hit.point.lng,
        country: hit.country,
      }));
    } catch (err) {
      logger.error('GraphHopper geocode error:', err.message);
      throw err;
    }
  }
}

module.exports = new GraphHopperConnector();
