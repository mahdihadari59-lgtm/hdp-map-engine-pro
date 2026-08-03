import { Polyline, Marker, Popup } from "react-leaflet";
export default function NavigationLayer() {
  const route = [[35.6892, 51.3890], [35.695, 51.37], [35.7036, 51.3516]];
  return (
    <>
      <Polyline positions={route} pathOptions={{ color: "#7b1fa2", weight: 5, dashArray: "10, 10" }} />
      <Marker position={route[0]}><Popup>📍 مبدأ</Popup></Marker>
      <Marker position={route[route.length - 1]}><Popup>🏁 مقصد</Popup></Marker>
    </>
  );
}
