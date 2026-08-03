const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { runAsync, persist } = require('../database/jsondb');
const logger = require('../utils/logger');
const seedData = require('../../../data/seed.json');

async function seed() {
  logger.info('Seeding JSON database...');
  for (const h of seedData.hotspots) await runAsync('hotspots', h);
  logger.info(`Seeded ${seedData.hotspots.length} hotspots`);
  for (const c of seedData.cameras) await runAsync('cameras', c);
  logger.info(`Seeded ${seedData.cameras.length} cameras`);
  for (const f of seedData.fines) await runAsync('fines', f);
  logger.info(`Seeded ${seedData.fines.length} fines`);
  for (const p of seedData.pois) await runAsync('pois', p);
  logger.info(`Seeded ${seedData.pois.length} POIs`);
  for (const w of seedData.weather) await runAsync('weather', w);
  logger.info(`Seeded ${seedData.weather.length} weather records`);
  for (const r of seedData.routes) await runAsync('routes', r);
  logger.info(`Seeded ${seedData.routes.length} routes`);
  for (const t of seedData.transport) await runAsync('transport', t);
  logger.info(`Seeded ${seedData.transport.length} transport lines`);
  persist();
  logger.info('Database seeding complete!');
  process.exit(0);
}
seed().catch(err => { logger.error('Seed failed:', err); process.exit(1); });
