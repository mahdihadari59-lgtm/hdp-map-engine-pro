import { useMap } from "react-leaflet";
import { useEffect } from "react";
export default function OfflineLayer() {
  const map = useMap();
  useEffect(() => {
    const control = L.control({ position: "bottomright" });
    control.onAdd = () => {
      const div = L.DomUtil.create("div", "offline-badge");
      div.innerHTML = '<span style="background:#4caf50;color:#fff;padding:4px 8px;border-radius:4px;font-size:11px;">📴 Offline Ready</span>';
      div.style.marginBottom = "30px";
      return div;
    };
    control.addTo(map);
    return () => control.remove();
  }, [map]);
  return null;
}
