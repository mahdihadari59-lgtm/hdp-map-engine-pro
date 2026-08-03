import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../../api/client";

const icons = { sunny: "☀️", cloudy: "☁️", rain: "🌧️", storm: "⛈️", snow: "❄️", fog: "🌫️" };

export default function WeatherLayer() {
  const [stations, setStations] = useState([]);
  useEffect(() => {
    api.get("/weather").then(r => {
      if (r.success && Array.isArray(r.data)) setStations(r.data);
      else setStations([
        { id: 1, lat: 35.6892, lng: 51.389, temp: 32, condition: "sunny", humidity: 25, wind: 12 },
        { id: 2, lat: 35.7036, lng: 51.3516, temp: 30, condition: "cloudy", humidity: 30, wind: 15 },
      ]);
    }).catch(() => {});
  }, []);
  if (!stations.length) return null;
  return stations.map(s => (
    <Marker key={s.id} position={[s.lat, s.lng]} icon={L.divIcon({
      html: `<div style="font-size:22px">${icons[s.condition] || "🌡️"}</div>`,
      className: "weather-marker", iconSize: [28, 28]
    })}>
      <Popup><div dir="rtl">{icons[s.condition]} {s.temp}°C<br/>رطوبت: {s.humidity}%</div></Popup>
    </Marker>
  ));
}
