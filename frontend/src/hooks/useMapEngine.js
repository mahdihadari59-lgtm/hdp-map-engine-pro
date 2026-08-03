import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStats, setLoading } from "../store";
import api from "../api/client";

export function useMapEngine() {
  const dispatch = useDispatch();
  const { center, zoom, activeLayers } = useSelector(s => s.map);
  const fetchStats = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await api.get("/traffic/stats");
      if (res.success) dispatch(setStats(res.data));
    } catch (e) { console.error(e); }
    finally { dispatch(setLoading(false)); }
  }, [dispatch]);
  useEffect(() => { fetchStats(); const i = setInterval(fetchStats, 30000); return () => clearInterval(i); }, [fetchStats]);
  return { center, zoom, activeLayers };
}
