const app = require('./app');
const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║     🚢  HDP BND  —  بک‌اند              ║');
  console.log('║     نقشه هوشمند بندرعباس               ║');
  console.log(`║     پورت: ${PORT}                        ║`);
  console.log('╚══════════════════════════════════════════╝');
});
