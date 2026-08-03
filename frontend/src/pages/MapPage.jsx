import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import L from 'leaflet';
import 'leaflet.markercluster';
import axios from 'axios';
import { setStats, setSelectedPlace, setUserLocation, setLoading, toggleLayer } from '../store';
import LayerSwitcher from '../components/LayerSwitcher';
import PlaceDetail from '../components/PlaceDetail';
import StatsPanel from '../components/StatsPanel';

const API = axios.create({ baseURL: '/api/v1', timeout: 15000 });

const CAT_COLORS = {
  bank: '#4CAF50', restaurant: '#FF9800', school: '#2196F3',
  pharmacy: '#9C27B0', fuel: '#F44336', cafe: '#795548',
  police: '#3F51B5', hospital: '#E91E63', atm: '#00BCD4',
  park: '#8BC34A', parking: '#607D8B', market: '#FF5722',
  hotel: '#673AB7', mosque: '#009688', bus_station: '#FFEB3B'
};

const CAT_NAMES = {
  bank: 'بانک', restaurant: 'رستوران', school: 'مدرسه', pharmacy: 'داروخونه',
  fuel: 'جایگاه سوخت', cafe: 'کافه', police: 'پلیس', hospital: 'بیمارستان',
  atm: 'خودپرداز', park: 'پارک', parking: 'پارکینگ', market: 'بازار',
  hotel: 'هتل', mosque: 'مسجد', bus_station: 'پایانه اتوبوس'
};

function createIcon(cat) {
  const color = CAT_COLORS[cat] || '#888';
  return L.divIcon({
    html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2.5px solid #fff;box-shadow:0 0 8px ${color}88;"></div>`,
    iconSize: [20, 20], className: 'custom-marker'
  });
}

function createUserIcon() {
  return L.divIcon({
    html: `<div style="background:#ff6b6b;width:18px;height:18px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 12px #ff6b6b;"></div>`,
    iconSize: [24, 24], className: 'user-marker'
  });
}

function MapController({ places, activeLayers, onMarkerClick }) {
  const map = useMap();
  const [clusterGroup, setClusterGroup] = useState(null);

  useEffect(() => {
    if (!map) return;
    const cg = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 55,
      disableClusteringAtZoom: 17,
      chunkedLoading: true
    });
    map.addLayer(cg);
    setClusterGroup(cg);
    return () => { map.removeLayer(cg); };
  }, [map]);

  useEffect(() => {
    if (!clusterGroup) return;
    clusterGroup.clearLayers();
    const filtered = activeLayers.includes('all') 
      ? places 
      : places.filter(p => activeLayers.includes(p.cat));
    const markers = filtered.map(p => {
      const m = L.marker([p.lat, p.lon], { icon: createIcon(p.cat) });
      m.bindPopup(`
        <div dir="rtl" style="min-width:180px;">
          <h4 style="color:#00a8e8;margin:0 0 8px;font-size:1rem;">${p.name}</h4>
          <p style="margin:4px 0;font-size:0.85rem;">${CAT_NAMES[p.cat] || p.cat}</p>
          <p style="margin:4px 0;font-size:0.75rem;color:#8da9c4;">📍 ${p.lat.toFixed(5)} , ${p.lon.toFixed(5)}</p>
        </div>
      `);
      m.on('click', () => onMarkerClick(p));
      return m;
    });
    clusterGroup.addLayers(markers);
    if (filtered.length > 0 && !activeLayers.includes('all')) {
      const group = L.featureGroup(markers);
      if (group.getBounds().isValid()) {
        map.fitBounds(group.getBounds().pad(0.15));
      }
    }
  }, [clusterGroup, places, activeLayers, map, onMarkerClick]);

  return null;
}

export default function MapPage() {
  const dispatch = useDispatch();
  const { center, zoom, activeLayers, selectedPlace, userLocation, isLoading } = useSelector(s => s.map);
  const [places, setPlaces] = useState([]);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    API.get('/places?limit=10000').then(res => {
      setPlaces(res.data.results || []);
      dispatch(setLoading(false));
    }).catch(() => dispatch(setLoading(false)));
    API.get('/stats').then(res => {
      if (res.data.success) dispatch(setStats(res.data));
    });
  }, [dispatch]);

  useEffect(() => {
    if (!userLocation) { setNearby([]); return; }
    API.get(`/nearby?lat=${userLocation.lat}&lon=${userLocation.lng}&radius=1500`)
      .then(res => { if (res.data.success) setNearby(res.data.results.slice(0, 5)); });
  }, [userLocation]);

  const handleMarkerClick = useCallback((place) => {
    dispatch(setSelectedPlace(place));
  }, [dispatch]);

  const handleGPS = () => {
    if (!navigator.geolocation) {
      dispatch(setError('مرورگرت موقعیت رو نمی‌شناسه!'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        dispatch(setUserLocation(loc));
      },
      err => dispatch(setError('دسترسی به موقعیت مجاز نیست برا!')),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="map-page">
      <aside className="sidebar">
        <div className="header">
          <h1>⚓ HDP BND</h1>
          <p className="tagline">نقشه هوشمند بندرعباس — ۶۷۶ مکان واقعی</p>
        </div>
        <StatsPanel />
        <div className="filter-section">
          <h3>🔍 فیلتر مکان‌ها</h3>
          <LayerSwitcher />
        </div>
        <div className="gps-section">
          <button className="gps-btn" onClick={handleGPS}>
            📍 پیدا کن موقعیت منو
          </button>
        </div>
        <PlaceDetail place={selectedPlace} nearby={nearby} userLocation={userLocation} />
        <div className="footer">
          <p>© ۲۰۲۴ HDP BND | داده‌ها از OpenStreetMap</p>
          <p style={{fontSize:'0.65rem',marginTop:'4px'}}>ساخته شده با ❤️ برای مردم بندرعباس</p>
        </div>
      </aside>
      <main className="map-wrap">
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner" />
          </div>
        )}
        <MapContainer center={center} zoom={zoom} style={{height:'100%',width:'100%'}} zoomControl={false}>
          <TileLayer
            attribution='&copy; OpenStreetMap | &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
            maxZoom={19}
          />
          <MapController places={places} activeLayers={activeLayers} onMarkerClick={handleMarkerClick} />
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={createUserIcon()}>
              <Popup>📍 تو اینجایی برا!</Popup>
            </Marker>
          )}
        </MapContainer>
      </main>
    </div>
  );
}
