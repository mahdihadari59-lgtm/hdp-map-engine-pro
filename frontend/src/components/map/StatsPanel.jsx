import React from "react";
import { useSelector } from "react-redux";

export default function StatsPanel() {
  const stats = useSelector(s => s.map.stats);
  const isLoading = useSelector(s => s.map.isLoading);

  // Calculate totals from array stats
  const hotspotCount = Array.isArray(stats.hotspots)
    ? stats.hotspots.reduce((sum, h) => sum + (h.count || 0), 0)
    : (stats.hotspots || 0);

  const fineCount = Array.isArray(stats.fines)
    ? stats.fines.reduce((sum, f) => sum + (f.count || 0), 0)
    : 0;

  return (
    <div className="stats-panel">
      <h4>📊 Stats</h4>
      {isLoading && <div className="loading">Loading...</div>}
      <div className="stat-row">
        <span>🔴 Hotspots</span>
        <strong>{hotspotCount}</strong>
      </div>
      <div className="stat-row">
        <span>📷 Cameras</span>
        <strong>{stats.cameras || 0}</strong>
      </div>
      <div className="stat-row">
        <span>💰 Fines</span>
        <strong>{fineCount}</strong>
      </div>
    </div>
  );
}
