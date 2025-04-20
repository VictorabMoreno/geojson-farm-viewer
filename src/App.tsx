import { MapViewer } from './components/MapViewer';
import { exampleGeoJson } from './shared/geojson/example.geojson';

export default function App() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">GeoJSON Viewer</h1>
      <MapViewer data={exampleGeoJson} />
    </main>
  );
}