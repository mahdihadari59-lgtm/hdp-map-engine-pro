import { useEffect, useState } from "react";
import { Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../../api/client";

const busIcon = L.divIcon({ html: "🚌", className: "transport-marker", iconSize: [20, 20] });
const metroIcon = L.divIcon({ html: "🚇", className: "transport-marker", iconSize: [20, 20] });

export default function TransportLayer() {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    api.get("/transport").then(r => {
      if (r.success && Array.isArray(r.data)) setLines(r.data);
    }).catch(() => {});
  }, []);
  if (!lines.length) return null;
  return lines.map(line => {
    const stops = typeof line.stops === "string" ? JSON.parse(line.stops) : line.stops;
    if (!stops?.length) return null;
    return (
      <div key={line.id}>
        <Polyline positions={stops.map(s => [s.lat, s.lng])}
          pathOptions={{ color: line.type === "metro" ? "#7b1fa2" : "#1976d2", weight: 3 }} />
        {stops.map((s, i) => (
          <Marker key={`${line.id}-${i}`} position={[s.lat, s.lng]} icon={line.type === "metro" ? metroIcon : busIcon}>
            <Popup>{line.line} - ایستگاه {i + 1}</Popup>
          </Marker>
        ))}
      </div>
    );
  });
}
