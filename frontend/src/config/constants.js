export const API_BASE = "/api/v1";
export const LAYERS = {
  TILE: "tile", OFFLINE: "offline", ROUTING: "routing", TRAFFIC: "traffic",
  CAMERA: "camera", HEATMAP: "heatmap", CLUSTER: "cluster", NAVIGATION: "navigation",
  VOICE: "voice", PREDICTION: "prediction", WEATHER: "weather", EMERGENCY: "emergency",
  TOURISM: "tourism", TRANSPORT: "transport", KNOWLEDGE: "knowledge",
  AI_SAHEL: "ai-sahel", GRAPH_HOPPER: "graphhopper", NESHAN: "neshan",
};
export const LAYER_CONFIG = [
  { id: "tile", name: "Base Map", icon: "🗺️", defaultOn: true },
  { id: "traffic", name: "Traffic", icon: "🚦", defaultOn: true },
  { id: "camera", name: "Cameras", icon: "📷", defaultOn: false },
  { id: "heatmap", name: "Heatmap", icon: "🔥", defaultOn: false },
  { id: "routing", name: "Routing", icon: "🛣️", defaultOn: false },
  { id: "navigation", name: "Navigation", icon: "🧭", defaultOn: false },
  { id: "weather", name: "Weather", icon: "🌤️", defaultOn: false },
  { id: "emergency", name: "Emergency", icon: "🚨", defaultOn: false },
  { id: "tourism", name: "Tourism", icon: "🏛️", defaultOn: false },
  { id: "transport", name: "Transport", icon: "🚌", defaultOn: false },
  { id: "cluster", name: "Clusters", icon: "📍", defaultOn: false },
  { id: "prediction", name: "AI Prediction", icon: "🤖", defaultOn: false },
  { id: "voice", name: "Voice", icon: "🎙️", defaultOn: false },
  { id: "offline", name: "Offline", icon: "📴", defaultOn: false },
  { id: "knowledge", name: "Knowledge", icon: "🧠", defaultOn: false },
  { id: "ai-sahel", name: "AI Sahel", icon: "🌊", defaultOn: false },
];
export const COLORS = {
  TRAFFIC_LOW: "#4caf50", TRAFFIC_MEDIUM: "#ff9800", TRAFFIC_HIGH: "#f44336",
  EMERGENCY: "#d32f2f", TOURISM: "#1976d2", TRANSPORT: "#7b1fa2",
};
