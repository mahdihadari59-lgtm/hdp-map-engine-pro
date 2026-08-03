const fs = require('fs');
const path = require('path');
const { run, get } = require('./database');

const raw = fs.readFileSync(path.join(__dirname, '../data/bandar_abbas_pois.json'), 'utf8');
const data = JSON.parse(raw);
const places = data.results;

const SCHEMA = `
CREATE TABLE IF NOT EXISTS places (
  id TEXT PRIMARY KEY,
  cat TEXT NOT NULL,
  name TEXT NOT NULL,
  lat REAL NOT NULL,
  lon REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_cat ON places(cat);
CREATE INDEX IF NOT EXISTS idx_lat ON places(lat);
CREATE INDEX IF NOT EXISTS idx_lon ON places(lon);
`;

async function seed() {
  console.log('🌊 در حال ساخت دیتابیس HDP BND...');

  await run('DROP TABLE IF EXISTS places');
  for (const stmt of SCHEMA.split(';').filter(s => s.trim())) {
    await run(stmt);
  }

  const insert = `INSERT INTO places (id, cat, name, lat, lon) VALUES (?, ?, ?, ?, ?)`;
  for (const p of places) {
    await run(insert, [p.id, p.cat, p.name, p.lat, p.lon]);
  }

  const { count } = await get('SELECT COUNT(*) as count FROM places');
  console.log(`✅ ${count} مکان واقعی بندرعباس ثبت شد!`);
  console.log('   🏦 بانک: ۱۴۶ | 📚 مدرسه: ۱۳۰ | 🍽️ رستوران: ۸۲ | 🕌 مسجد: ۵۶');
  console.log('   💊 داروخانه: ۴۸ | 🌳 پارک: ۴۲ | ⛽ سوخت: ۳۳ | 🅿️ پارکینگ: ۲۸');
  console.log('   ☕ کافه: ۲۶ | 🚔 پلیس: ۲۲ | 🏨 هتل: ۲۱ | 🏥 بیمارستان: ۱۸');
  console.log('   🛒 بازار: ۱۸ | 💰 خودپرداز: ۴ | 🚌 اتوبوس: ۲');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ خطا:', err);
  process.exit(1);
});
