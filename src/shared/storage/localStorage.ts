const STORAGE_KEY = 'geojson-files';

export function saveGeoJsonFiles(files: Record<string, GeoJSON.GeoJsonObject>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
}

export function loadGeoJsonFiles(): Record<string, GeoJSON.GeoJsonObject> {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function clearGeoJsonFiles() {
  localStorage.removeItem(STORAGE_KEY);
}