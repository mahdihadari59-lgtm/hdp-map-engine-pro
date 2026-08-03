const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/places', require('./routes/places'));
app.use('/api/v1/nearby', require('./routes/nearby'));
app.use('/api/v1/stats', require('./routes/stats'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', region: 'bandar_abbas', app: 'hdp-bnd' });
});

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'یه مشکلی پیش اومد، دوباره تلاش کن!' });
});

module.exports = app;
