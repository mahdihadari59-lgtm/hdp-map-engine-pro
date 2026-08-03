import { CircleMarker, Popup } from "react-leaflet";
export default function AiSahelLayer() {
  const zones = [
    { id: 1, lat: 35.65, lng: 51.42, level: "moderate", label: "ساحل جنوبی" },
    { id: 2, lat: 35.72, lng: 51.38, level: "safe", label: "منطقه امن" },
  ];
  return zones.map(z => (
    <CircleMarker key={z.id} center={[z.lat, z.lng]} radius={20}
      pathOptions={{ color: z.level === "safe" ? "#4caf50" : "#ff9800", fillOpacity: 0.2, weight: 2 }}>
      <Popup><div dir="rtl">🌊 {z.label}<br/>{z.level}</div></Popup>
    </CircleMarker>
  ));
}
