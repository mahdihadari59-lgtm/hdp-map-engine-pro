import { configureStore, createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    center: [27.1832, 56.2666],
    zoom: 13,
    activeLayers: ['all'],
    selectedPlace: null,
    stats: { total: 0, categories: [] },
    userLocation: null,
    isLoading: false,
    error: null
  },
  reducers: {
    setCenter: (s, a) => { s.center = a.payload; },
    setZoom: (s, a) => { s.zoom = a.payload; },
    toggleLayer: (s, a) => {
      const lid = a.payload;
      if (lid === 'all') {
        s.activeLayers = ['all'];
      } else {
        const withoutAll = s.activeLayers.filter(l => l !== 'all');
        if (withoutAll.includes(lid)) {
          const next = withoutAll.filter(l => l !== lid);
          s.activeLayers = next.length ? next : ['all'];
        } else {
          s.activeLayers = [...withoutAll, lid];
        }
      }
    },
    setSelectedPlace: (s, a) => { s.selectedPlace = a.payload; },
    setStats: (s, a) => { s.stats = a.payload; },
    setUserLocation: (s, a) => { s.userLocation = a.payload; },
    setLoading: (s, a) => { s.isLoading = a.payload; },
    setError: (s, a) => { s.error = a.payload; }
  }
});

export const { setCenter, setZoom, toggleLayer, setSelectedPlace, setStats, setUserLocation, setLoading, setError } = mapSlice.actions;
export const store = configureStore({ reducer: { map: mapSlice.reducer } });
