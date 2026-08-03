import { useEffect, useState } from "react";
import { CircleMarker } from "react-leaflet";
import api from "../../api/client";

export default function HeatmapLayer() {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    api.get("/heatmap").then(r => {
      if (r.success && Array.isArray(r.data)) setPoints(r.data);
    }).catch(() => {});
  }, []);
  if (!points.length) return null;
  return points.map((p, i) => (
    <CircleMarker key={i} center={[p.lat, p.lng]} radius={p.intensity > 60 ? 20 : 14}
      pathOptions={{ color: "transparent", fillColor: `rgba(255, ${255 - p.intensity * 2.5}, 0, 0.4)`, fillOpacity: 0.5 }} />
  ));
}
