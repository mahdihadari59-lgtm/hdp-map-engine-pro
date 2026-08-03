import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../../api/client";

const icon = L.divIcon({ html: "📷", className: "camera-marker", iconSize: [24, 24] });

export default function CameraLayer() {
  const [cameras, setCameras] = useState([]);
  useEffect(() => {
    api.get("/camera").then(r => {
      if (r.success && Array.isArray(r.data)) setCameras(r.data);
    }).catch(() => {});
  }, []);
  if (!cameras.length) return null;
  return cameras.map(c => (
    <Marker key={c.id} position={[c.lat, c.lng]} icon={icon}>
      <Popup><div dir="rtl">📷 {c.type}<br/>وضعیت: {c.status}</div></Popup>
    </Marker>
  ));
}
