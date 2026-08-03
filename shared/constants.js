/**
 * Shared constants between backend and frontend
 */

// Layer IDs
export const LAYERS = {
  TILE: 'tile',
  OFFLINE: 'offline',
  ROUTING: 'routing',
  TRAFFIC: 'traffic',
  CAMERA: 'camera',
  HEATMAP: 'heatmap',
  CLUSTER: 'cluster',
  NAVIGATION: 'navigation',
  VOICE: 'voice',
  PREDICTION: 'prediction',
  WEATHER: 'weather',
  EMERGENCY: 'emergency',
  TOURISM: 'tourism',
  TRANSPORT: 'transport',
  KNOWLEDGE: 'knowledge',
  AI_SAHEL: 'ai-sahel',
  GRAPH_HOPPER: 'graphhopper',
  NESHAN: 'neshan',
};

// API Endpoints
export const API_BASE = '/api/v1';

export const ENDPOINTS = {
  TRAFFIC: `${API_BASE}/traffic`,
  ROUTING: `${API_BASE}/routing`,
  NAVIGATION: `${API_BASE}/navigation`,
  HEATMAP: `${API_BASE}/heatmap`,
  TILE: `${API_BASE}/tile`,
  CAMERA: `${API_BASE}/camera`,
  WEATHER: `${API_BASE}/weather`,
  EMERGENCY: `${API_BASE}/emergency`,
  TOURISM: `${API_BASE}/tourism`,
  TRANSPORT: `${API_BASE}/transport`,
  PREDICTION: `${API_BASE}/prediction`,
  OFFLINE: `${API_BASE}/offline`,
  CLUSTER: `${API_BASE}/cluster`,
  VOICE: `${API_BASE}/voice`,
  KNOWLEDGE: `${API_BASE}/knowledge`,
};

// Map defaults
export const DEFAULT_CENTER = [35.6892, 51.3890]; // Tehran
export const DEFAULT_ZOOM = 12;
export const MAX_ZOOM = 19;
export const MIN_ZOOM = 3;

// Tile providers
export const TILE_PROVIDERS = {
  OSM: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  CARTO: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  SATELLITE: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
};

// Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export const COLORS = {
  TRAFFIC_LOW: '#4caf50',
  TRAFFIC_MEDIUM: '#ff9800',
  TRAFFIC_HIGH: '#f44336',
  EMERGENCY: '#d32f2f',
  TOURISM: '#1976d2',
  TRANSPORT: '#7b1fa2',
  WEATHER_CLEAR: '#4fc3f7',
  WEATHER_RAIN: '#0277bd',
  WEATHER_STORM: '#37474f',
};
