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

  function handleDownload(name: string) {
    const content = JSON.stringify(geojsons[name], null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();

    URL.revokeObjectURL(url);
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
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(name)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Baixar
                </button>
                <button
                  onClick={() => handleDelete(name)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remover
                </button>
              </div>
            </div>

            <MapViewer data={data} />

            <div className="mt-4 text-sm text-gray-700">
              <p><strong>Tipo:</strong> {data.type}</p>
              {'features' in data && Array.isArray(data.features) && (
                <p><strong>Total de features:</strong> {data.features.length}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}