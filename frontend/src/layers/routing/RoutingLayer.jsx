import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import api from "../../api/client";

export default function RoutingLayer() {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    api.get("/routing/saved").then(r => {
      if (r.success && Array.isArray(r.data)) setRoutes(r.data);
    }).catch(() => {});
  }, []);
  if (!routes.length) return null;
  return routes.map(r => (
    <Polyline key={r.id} positions={[[r.from_lat, r.from_lng], [r.to_lat, r.to_lng]]}
      pathOptions={{ color: "#1976d2", weight: 4, opacity: 0.8 }} />
  ));
}
