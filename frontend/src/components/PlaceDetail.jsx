const CAT_NAMES = {
  bank: 'بانک', restaurant: 'رستوران', school: 'مدرسه', pharmacy: 'داروخونه',
  fuel: 'جایگاه سوخت', cafe: 'کافه', police: 'پلیس', hospital: 'بیمارستان',
  atm: 'خودپرداز', park: 'پارک', parking: 'پارکینگ', market: 'بازار',
  hotel: 'هتل', mosque: 'مسجد', bus_station: 'پایانه اتوبوس'
};

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

export default function PlaceDetail({ place, nearby, userLocation }) {
  if (!place) {
    return (
      <div className="detail-panel">
        <h3>ℹ️ اطلاعات مکان</h3>
        <div className="detail-content" style={{textAlign:'center',color:'#5c7a99',padding:'2rem 0'}}>
          <p>روی هر نقطه کلیک کن برا...</p>
          <p style={{fontSize:'0.75rem',marginTop:'0.5rem'}}>یا از فیلترا استفاده کن!</p>
        </div>
      </div>
    );
  }

  let distanceText = '';
  if (userLocation) {
    const d = haversine(userLocation.lat, userLocation.lng, place.lat, place.lon);
    distanceText = d < 1000 ? `${d} متر` : `${(d/1000).toFixed(1)} کیلومتر`;
  }

  return (
    <div className="detail-panel">
      <h3>📍 {place.name}</h3>
      <div className="detail-content">
        <div className="row"><span>دسته:</span><strong>{CAT_NAMES[place.cat] || place.cat}</strong></div>
        <div className="row"><span>مختصات:</span><strong>{place.lat.toFixed(5)} , {place.lon.toFixed(5)}</strong></div>
        {distanceText && <div className="row"><span>فاصله از تو:</span><strong style={{color:'#ff6b6b'}}>{distanceText}</strong></div>}
        <div className="row"><span>شناسه:</span><span style={{fontSize:'0.75rem',color:'#5c7a99'}}>{place.id}</span></div>
      </div>
      {nearby.length > 0 && (
        <div style={{marginTop:'1rem'}}>
          <h4 style={{color:'#00a8e8',fontSize:'0.8rem',marginBottom:'0.5rem'}}>📌 نزیک‌ترین جاها (۱.۵ کیلومتر)</h4>
          <div className="nearby-list">
            {nearby.map(n => (
              <div key={n.id} className="nearby-item">
                <span>{n.name}</span>
                <span className="dist">{n.distance} متر</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
