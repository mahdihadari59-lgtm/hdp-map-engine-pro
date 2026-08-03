import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../../api/client";

const icon = L.divIcon({ html: "🚨", className: "emergency-marker", iconSize: [24, 24] });

export default function EmergencyLayer() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    api.get("/emergency").then(r => {
      if (r.success && Array.isArray(r.data)) setServices(r.data);
    }).catch(() => {});
  }, []);
  if (!services.length) return null;
  return services.map(s => (
    <Marker key={s.id} position={[s.lat, s.lng]} icon={icon}>
      <Popup><div dir="rtl">🚨 {s.name}<br/>⭐ {s.rating}</div></Popup>
    </Marker>
  ));
}
