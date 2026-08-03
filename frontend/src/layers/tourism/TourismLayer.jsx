import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../../api/client";

const icon = L.divIcon({ html: "🏛️", className: "tourism-marker", iconSize: [24, 24] });

export default function TourismLayer() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    api.get("/tourism").then(r => {
      if (r.success && Array.isArray(r.data)) setPlaces(r.data);
    }).catch(() => {});
  }, []);
  if (!places.length) return null;
  return places.map(p => (
    <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
      <Popup><div dir="rtl">🏛️ {p.name}<br/>⭐ {p.rating}</div></Popup>
    </Marker>
  ));
}
