import { useEffect, useState } from 'react';
import { MapViewer } from './components/MapViewer';
import { GeoJsonUploader } from './components/GeoJsonUploader';
import {
  saveGeoJsonFiles,
  loadGeoJsonFiles,
  clearGeoJsonFiles
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

  function handleDelete(name: string) {
    const updated = { ...geojsons };
    delete updated[name];
    setGeojsons(updated);
    saveGeoJsonFiles(updated);
  }

  function handleClearAll() {
    setGeojsons({});
    clearGeoJsonFiles();
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">GeoJSON Viewer</h1>

      <GeoJsonUploader onUpload={handleUpload} />

      {Object.keys(geojsons).length > 0 && (
        <button
          onClick={handleClearAll}
          className="mb-6 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
        >
          Limpar todos os arquivos
        </button>
      )}

      {Object.keys(geojsons).length === 0 && (
        <p className="text-gray-500 italic">Nenhum arquivo carregado.</p>
      )}

      <div className="space-y-10 mt-8">
        {Object.entries(geojsons).map(([name, data]) => (
          <div key={name} className="p-4 bg-white border rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{name}</h2>
              <button
                onClick={() => handleDelete(name)}
                className="text-red-500 text-sm hover:underline"
              >
                Remover
              </button>
            </div>
            <MapViewer data={data} />
          </div>
        ))}
      </div>
    </main>
  );
}