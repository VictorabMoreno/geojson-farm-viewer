import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

interface Props {
  files: Record<string, GeoJSON.GeoJsonObject>;
}

export function MultiMapViewer({ files }: Props) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const allLayers = Object.values(files).map((geojson) => L.geoJSON(geojson));
    const group = L.featureGroup(allLayers);
    if (group.getBounds().isValid()) {
      mapRef.current.fitBounds(group.getBounds());
    }
  }, [files]);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom
      style={{ height: '600px', width: '100%' }}
      className="rounded-xl shadow"
      whenCreated={(map) => (mapRef.current = map)}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.entries(files).map(([name, geojson], i) => (
        <GeoJSON key={i} data={geojson} />
      ))}
    </MapContainer>
  );
}