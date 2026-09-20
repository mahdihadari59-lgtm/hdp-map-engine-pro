const express = require('express');
const router = express.Router();

const osrm = require('../../connectors/osrm');

router.get('/', (req, res) => {
  res.json({
    success: true,
    module: 'routing',
    providers: ['osrm', 'graphhopper', 'neshan'],
  });
});

router.get('/route', async (req, res) => {
  try {
    const {
      start,
      end,
      profile = 'driving',
    } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        success: false,
        error: 'start and end are required',
        example:
          '/api/v1/routing/route?start=56.2666,27.1832&end=56.2750,27.1865',
      });
    }

    const [startLng, startLat] = start.split(',').map(Number);
    const [endLng, endLat] = end.split(',').map(Number);

    if (
      !Number.isFinite(startLat) ||
      !Number.isFinite(startLng) ||
      !Number.isFinite(endLat) ||
      !Number.isFinite(endLng)
    ) {
      return res.status(400).json({
        success: false,
        error: 'Invalid coordinates',
      });
    }

    const result = await osrm.route(
      {
        lat: startLat,
        lng: startLng,
      },
      {
        lat: endLat,
        lng: endLng,
      },
      {
        profile,
        geometries: 'geojson',
        overview: 'full',
        steps: true,
      }
    );

    res.json(result);
  } catch (err) {
    res.status(502).json({
      success: false,
      provider: 'osrm',
      error: err.message,
    });
  }
});

module.exports = router;
