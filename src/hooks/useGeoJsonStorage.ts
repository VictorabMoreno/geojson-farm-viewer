import { useEffect, useState } from 'react';
import {
  saveGeoJson,
  loadAllGeoJsons,
  removeGeoJson,
  clearAllGeoJsons
} from '../shared/storage/geojsonStore';

export function useGeoJsonStorage() {
  const [geojsons, setGeojsons] = useState<Record<string, GeoJSON.GeoJsonObject>>({});

  useEffect(() => {
    loadAllGeoJsons().then(setGeojsons);
  }, []);

  async function addGeoJson(name: string, data: GeoJSON.GeoJsonObject) {
    await saveGeoJson(name, data);
    setGeojsons((prev) => ({ ...prev, [name]: data }));
  }

  async function deleteGeoJson(name: string) {
    await removeGeoJson(name);
    setGeojsons((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }

  async function clearAll() {
    await clearAllGeoJsons();
    setGeojsons({});
  }

  return {
    geojsons,
    addGeoJson,
    deleteGeoJson,
    clearAll
  };
}