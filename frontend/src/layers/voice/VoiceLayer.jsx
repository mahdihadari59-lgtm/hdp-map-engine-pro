import { useMap } from "react-leaflet";
import { useEffect } from "react";
export default function VoiceLayer() {
  const map = useMap();
  useEffect(() => {
    const handleMove = () => {
      if ("speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance("در حال حرکت");
        utter.lang = "fa-IR"; utter.rate = 1.2;
        window.speechSynthesis.speak(utter);
      }
    };
    map.on("moveend", handleMove);
    return () => map.off("moveend", handleMove);
  }, [map]);
  return null;
}
