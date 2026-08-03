const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const DB_FILE = path.join(__dirname, '../../database.json');
const DEFAULT_DATA = {
  hotspots: [], cameras: [], fines: [], pois: [],
  weather: [], routes: [], transport: [], predictions: [],
  tiles: [], knowledge_nodes: [],
};

function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch (e) { logger.error('DB load error:', e.message); }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveDB(data) {
  try { fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); }
  catch (e) { logger.error('DB save error:', e.message); }
}

let db = loadDB();
function getDB() { return db; }
function persist() { saveDB(db); }
setInterval(persist, 30000);

function runAsync(table, data) {
  if (!db[table]) db[table] = [];
  const id = db[table].length > 0 ? Math.max(...db[table].map(r => r.id || 0)) + 1 : 1;
  db[table].push({ ...data, id });
  persist();
  return Promise.resolve({ id, changes: 1 });
}

function getAsync(table, id) {
  if (!db[table]) return Promise.resolve(null);
  return Promise.resolve(db[table].find(r => r.id == id) || null);
}

function allAsync(table, filterFn) {
  if (!db[table]) return Promise.resolve([]);
  let rows = [...db[table]];
  if (filterFn) rows = rows.filter(filterFn);
  return Promise.resolve(rows);
}

function updateAsync(table, id, data) {
  if (!db[table]) return Promise.resolve({ changes: 0 });
  const idx = db[table].findIndex(r => r.id == id);
  if (idx >= 0) { db[table][idx] = { ...db[table][idx], ...data }; persist(); return Promise.resolve({ changes: 1 }); }
  return Promise.resolve({ changes: 0 });
}

function deleteAsync(table, id) {
  if (!db[table]) return Promise.resolve({ changes: 0 });
  const len = db[table].length;
  db[table] = db[table].filter(r => r.id != id);
  persist();
  return Promise.resolve({ changes: len - db[table].length });
}

function countAsync(table) {
  return Promise.resolve(db[table]?.length || 0);
}

module.exports = { getDB, persist, runAsync, getAsync, allAsync, updateAsync, deleteAsync, countAsync };
