import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../../api/client";

const icon = L.divIcon({ html: "🧠", className: "knowledge-marker", iconSize: [24, 24] });

export default function KnowledgeLayer() {
  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    api.get("/knowledge/nodes").then(r => {
      if (r.success && Array.isArray(r.data)) setNodes(r.data);
    }).catch(() => {});
  }, []);
  if (!nodes.length) return null;
  return nodes.map(n => (
    <Marker key={n.id} position={[n.lat || 35.6892, n.lng || 51.389]} icon={icon}>
      <Popup><div dir="rtl">🧠 {n.name}<br/>{n.type}</div></Popup>
    </Marker>
  ));
}
