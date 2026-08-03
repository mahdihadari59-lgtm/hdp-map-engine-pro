import { useSelector } from 'react-redux';

export default function StatsPanel() {
  const stats = useSelector(s => s.map.stats);
  if (!stats.total) return null;

  return (
    <div className="stats-bar">
      <div className="stat-box">
        <div className="num">{stats.total}</div>
        <div className="label">کل مکان‌ها</div>
      </div>
      <div className="stat-box">
        <div className="num">{stats.categories?.length || 15}</div>
        <div className="label">دسته‌بندی</div>
      </div>
    </div>
  );
}
