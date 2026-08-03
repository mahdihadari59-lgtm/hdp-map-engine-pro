import { useEffect, useState } from "react";
import { CircleMarker, Popup } from "react-leaflet";
import api from "../../api/client";

export default function PredictionLayer() {
  const [predictions, setPredictions] = useState([]);
  useEffect(() => {
    Promise.all([
      api.get("/prediction/traffic?lat=35.6892&lng=51.389"),
      api.get("/prediction/weather?lat=35.6892&lng=51.389"),
    ]).then(([t, w]) => {
      const pts = [];
      if (t.success && t.data) pts.push({ ...t.data, type: "traffic" });
      if (w.success && w.data) pts.push({ ...w.data, type: "weather" });
      setPredictions(pts);
    }).catch(() => {});
  }, []);
  if (!predictions.length) return null;
  return predictions.map((p, i) => (
    <CircleMarker key={i} center={[p.lat || 35.6892, p.lng || 51.389]} radius={15}
      pathOptions={{ color: p.type === "traffic" ? "#f44336" : "#4fc3f7", fillColor: p.type === "traffic" ? "#f44336" : "#4fc3f7", fillOpacity: 0.3, weight: 2, dashArray: "5, 5" }}>
      <Popup><div dir="rtl">🤖 پیش‌بینی {p.type}<br/>اعتماد: {(p.confidence * 100).toFixed(0)}%</div></Popup>
    </CircleMarker>
  ));
}
