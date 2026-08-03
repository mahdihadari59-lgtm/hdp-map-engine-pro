const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Middleware
app.use(express.json());

// Load data
let places = [];
try {
  const dataPath = path.join(__dirname, '..', 'data', 'bandar_abbas_pois.json');
  console.log('Loading data from:', dataPath);
  
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const parsedData = JSON.parse(rawData);
  // داده توی results هست
  places = parsedData.results || [];
  console.log(`✅ Loaded ${places.length} places`);
} catch (error) {
  console.error('❌ Error loading data:', error.message);
  places = [
    { id: "1", name: "Test Place 1", lat: 27.18, lon: 56.27 },
    { id: "2", name: "Test Place 2", lat: 27.19, lon: 56.28 }
  ];
}

// Routes
app.get('/api/places', (req, res) => {
  res.json(places);
});

app.get('/api/places/:id', (req, res) => {
  const place = places.find(p => p.id === req.params.id);
  if (place) {
    res.json(place);
  } else {
    res.status(404).json({ error: 'Place not found' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(), 
    count: places.length 
  });
});

module.exports = app;
