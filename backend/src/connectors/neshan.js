const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

const BASE_URL = 'https://api.neshan.org';

class NeshanConnector {
  constructor() {
    this.apiKey = config.neshanKey;
  }

  async route(from, to, options = {}) {
    try {
      const { data } = await axios.get(`${BASE_URL}/v4/direction`, {
        headers: { 'Api-Key': this.apiKey },
        params: {
          origin: `${from.lat},${from.lng}`,
          destination: `${to.lat},${to.lng}`,
          type: options.type || 'car',
          avoidTrafficZone: options.avoidTrafficZone || false,
        },
      });
      return {
        provider: 'neshan',
        distance: data.routes[0].legs[0].distance.value,
        duration: data.routes[0].legs[0].duration.value,
        overview_polyline: data.routes[0].overview_polyline,
        legs: data.routes[0].legs,
      };
    } catch (err) {
      logger.error('Neshan route error:', err.message);
      throw err;
    }
  }

  async search(query, lat, lng) {
    try {
      const { data } = await axios.get(`${BASE_URL}/v1/search`, {
        headers: { 'Api-Key': this.apiKey },
        params: { term: query, lat, lng },
      });
      return data.items.map((item) => ({
        title: item.title,
        address: item.address,
        lat: item.location.y,
        lng: item.location.x,
        type: item.type,
      }));
    } catch (err) {
      logger.error('Neshan search error:', err.message);
      throw err;
    }
  }

  async reverseGeocode(lat, lng) {
    try {
      const { data } = await axios.get(`${BASE_URL}/v4/reverse`, {
        headers: { 'Api-Key': this.apiKey },
        params: { lat, lng },
      });
      return {
        address: data.address,
        city: data.city,
        region: data.region,
      };
    } catch (err) {
      logger.error('Neshan reverse geocode error:', err.message);
      throw err;
    }
  }
}

module.exports = new NeshanConnector();
