import { useEffect, useState } from 'react';
import { MapViewer } from './components/MapViewer';
import { GeoJsonUploader } from './components/GeoJsonUploader';
import { ThemeToggle } from './components/ThemeToggle';
import { RawModal } from './components/RawModal';
import {
  saveGeoJson,
  loadAllGeoJsons,
  removeGeoJson,
  clearAllGeoJsons
} from './shared/storage/geojsonStore';

export default function App() {
  const [geojsons, setGeojsons] = useState<Record<string, GeoJSON.GeoJsonObject>>({});
  const [activeRaw, setActiveRaw] = useState<GeoJSON.GeoJsonObject | null>(null);

  useEffect(() => {
    loadAllGeoJsons().then(setGeojsons);
  }, []);

  function handleUpload(name: string, data: GeoJSON.GeoJsonObject) {
    const updated = { ...geojsons, [name]: data };
    setGeojsons(updated);
    saveGeoJson(name, data);
  }
  
  function handleDelete(name: string) {
    const updated = { ...geojsons };
    delete updated[name];
    setGeojsons(updated);
    removeGeoJson(name);
  }
  
  function handleClearAll() {
    setGeojsons({});
    clearAllGeoJsons();
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
    <main className="min-h-screen p-8 bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
      <ThemeToggle />

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
          <div key={name} className="p-4 bg-white dark:bg-gray-800 border rounded-lg shadow">
            <button
              onClick={() => setActiveRaw(data)}
              className="text-gray-600 dark:text-gray-300 text-sm hover:underline"
            >
              Ver dados
            </button>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{name}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(name)}
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  Baixar
                </button>
                <button
                  onClick={() => handleDelete(name)}
                  className="text-red-500 dark:text-red-400 text-sm hover:underline"
                >
                  Remover
                </button>
              </div>
            </div>

            <MapViewer data={data} />

            <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Tipo:</strong> {data.type}</p>
              {'features' in data && Array.isArray(data.features) && (
                <>
                  <p><strong>Total de features:</strong> {data.features.length}</p>

                  <div className="mt-3">
                    <p className="font-medium text-sm mb-1">Prévia de dados:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {data.features.slice(0, 5).map((f: any, idx: number) => (
                        <li key={idx}>
                          {Object.entries(f.properties || {})
                            .slice(0, 3)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(' | ')}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {activeRaw && (
        <RawModal open={!!activeRaw} onClose={() => setActiveRaw(null)} json={activeRaw} />
      )}
    </main>
  );
}