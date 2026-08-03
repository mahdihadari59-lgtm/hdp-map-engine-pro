import { useSelector, useDispatch } from 'react-redux';
import { toggleLayer } from '../store';

const LAYERS = [
  { id: 'all', name: 'همه جاها', icon: '🔘' },
  { id: 'bank', name: 'بانک', icon: '🏦' },
  { id: 'restaurant', name: 'رستوران', icon: '🍽️' },
  { id: 'school', name: 'مدرسه', icon: '📚' },
  { id: 'pharmacy', name: 'داروخونه', icon: '💊' },
  { id: 'fuel', name: 'جایگاه سوخت', icon: '⛽' },
  { id: 'cafe', name: 'کافه', icon: '☕' },
  { id: 'police', name: 'پلیس', icon: '🚔' },
  { id: 'hospital', name: 'بیمارستان', icon: '🏥' },
  { id: 'atm', name: 'خودپرداز', icon: '💰' },
  { id: 'park', name: 'پارک', icon: '🌳' },
  { id: 'parking', name: 'پارکینگ', icon: '🅿️' },
  { id: 'market', name: 'بازار', icon: '🛒' },
  { id: 'hotel', name: 'هتل', icon: '🏨' },
  { id: 'mosque', name: 'مسجد', icon: '🕌' },
  { id: 'bus_station', name: 'پایانه اتوبوس', icon: '🚌' }
];

export default function LayerSwitcher() {
  const dispatch = useDispatch();
  const active = useSelector(s => s.map.activeLayers);

  return (
    <div className="layer-grid">
      {LAYERS.map(l => (
        <button
          key={l.id}
          className={`layer-btn ${active.includes(l.id) ? 'active' : ''}`}
          onClick={() => dispatch(toggleLayer(l.id))}
        >
          <span>{l.icon}</span>
          <span>{l.name}</span>
        </button>
      ))}
    </div>
  );
}
