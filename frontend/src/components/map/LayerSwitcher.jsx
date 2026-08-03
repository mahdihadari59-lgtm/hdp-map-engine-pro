import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLayer } from "../../store";
import { LAYER_CONFIG } from "../../config/constants";

export default function LayerSwitcher({ tileProvider, onTileChange }) {
  const dispatch = useDispatch();
  const activeLayers = useSelector(s => s.map.activeLayers);
  return (
    <div className="layer-switcher">
      <h3>🗺️ Layers</h3>
      <div className="layer-list">
        {LAYER_CONFIG.map(l => (
          <label key={l.id} className="layer-item">
            <input type="checkbox" checked={activeLayers.includes(l.id)} onChange={() => dispatch(toggleLayer(l.id))} />
            <span>{l.icon}</span><span>{l.name}</span>
          </label>
        ))}
      </div>
      <div className="tile-provider">
        <label>Base:</label>
        <select value={tileProvider} onChange={e => onTileChange(e.target.value)}>
          <option value="osm">OpenStreetMap</option>
          <option value="carto">Carto</option>
          <option value="satellite">Satellite</option>
        </select>
      </div>
    </div>
  );
}
