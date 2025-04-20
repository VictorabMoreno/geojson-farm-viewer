import { useEffect, useState } from 'react';
import { MapViewer } from './components/MapViewer';
import { GeoJsonUploader } from './components/GeoJsonUploader';
import {
  saveGeoJsonFiles,
  loadGeoJsonFiles
} from './shared/storage/localStorage';

export default function App() {
  const [geojsons, setGeojsons] = useState<Record<string, GeoJSON.GeoJsonObject>>({});

  useEffect(() => {
    const stored = loadGeoJsonFiles();
    setGeojsons(stored);
  }, []);

  function handleUpload(name: string, data: GeoJSON.GeoJsonObject) {
    const updated = { ...geojsons, [name]: data };
    setGeojsons(updated);
    saveGeoJsonFiles(updated);
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">GeoJSON Viewer</h1>
      <GeoJsonUploader onUpload={handleUpload} />
      {Object.entries(geojsons).map(([name, data]) => (
        <div key={name} className="mb-8">
          <h2 className="text-lg font-semibold mb-2">{name}</h2>
          <MapViewer data={data} />
        </div>
      ))}
    </main>
  );
}