import { createStore, get, set, del, keys, delMany } from 'idb-keyval';

const store = createStore('geojson-db', 'files');

export async function saveGeoJson(name: string, data: GeoJSON.GeoJsonObject) {
  await set(name, data, store);
}

export async function loadAllGeoJsons(): Promise<Record<string, GeoJSON.GeoJsonObject>> {
  const allKeys = await keys(store);
  const entries = await Promise.all(
    allKeys.map(async (key) => {
      const value = await get<GeoJSON.GeoJsonObject>(key as string, store);
      return [key as string, value] as const;
    })
  );

  return Object.fromEntries(entries);
}

export async function removeGeoJson(name: string) {
  await del(name, store);
}

export async function clearAllGeoJsons() {
  const allKeys = await keys(store);
  await delMany(allKeys, store);
}