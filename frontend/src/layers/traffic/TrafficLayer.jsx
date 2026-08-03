import { useEffect, useState } from "react";
import { CircleMarker, Popup } from "react-leaflet";
import api from "../../api/client";

const colors = { low: "#4caf50", medium: "#ff9800", high: "#f44336" };

export default function TrafficLayer() {
  const [hotspots, setHotspots] = useState([]);
  useEffect(() => {
    api.get("/traffic/hotspots").then(r => {
      if (r.success && Array.isArray(r.data)) setHotspots(r.data);
    }).catch(() => {});
  }, []);
  if (!hotspots.length) return null;
  return hotspots.map(h => (
    <CircleMarker key={h.id} center={[h.lat, h.lng]} radius={8}
      pathOptions={{ color: colors[h.severity] || "#999", fillColor: colors[h.severity] || "#999", fillOpacity: 0.6 }}>
      <Popup><div dir="rtl"><strong>🚦 ترافیک</strong><br/>{h.severity}<br/>{h.description}</div></Popup>
    </CircleMarker>
  ));
}
