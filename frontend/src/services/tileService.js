export const tileService = {
  getTileUrl(z, x, y, provider = "osm") {
    const providers = {
      osm: `https://tile.openstreetmap.org/${z}/${x}/${y}.png`,
      carto: `https://basemaps.cartocdn.com/light_all/${z}/${x}/${y}@2x.png`,
      satellite: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,
    };
    return providers[provider] || providers.osm;
  }
};
