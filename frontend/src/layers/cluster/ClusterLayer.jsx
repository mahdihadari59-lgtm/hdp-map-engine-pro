import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../../api/client";

export default function ClusterLayer() {
  const [clusters, setClusters] = useState([]);
  useEffect(() => {
    api.get("/cluster").then(r => {
      if (r.success && Array.isArray(r.data)) setClusters(r.data);
    }).catch(() => {});
  }, []);
  if (!clusters.length) return null;
  return clusters.map((c, i) => (
    <Marker key={i} position={[c.lat, c.lng]} icon={L.divIcon({
      html: `<div style="background:#ff5722;color:#fff;border-radius:50%;width:${Math.min(40, 20 + c.count * 2)}px;height:${Math.min(40, 20 + c.count * 2)}px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:12px;border:2px solid #fff;">${c.count}</div>`,
      className: "cluster-marker", iconSize: [Math.min(40, 20 + c.count * 2), Math.min(40, 20 + c.count * 2)]
    })}>
      <Popup><div dir="rtl">📍 {c.category}<br/>تعداد: {c.count}</div></Popup>
    </Marker>
  ));
}
