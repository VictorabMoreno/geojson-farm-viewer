import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import { GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapViewerProps {
  data: GeoJsonObject;
}

function FitBounds({ data }: { data: GeoJsonObject }) {
  const map = useMap();

  if ('features' in data && Array.isArray(data.features)) {
    const geoJsonLayer = L.geoJSON(data);
    const bounds = geoJsonLayer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds);
    }
  }

  return null;
}

export function MapViewer({ data }: MapViewerProps) {
  return (
    <MapContainer
  center={[0, 0]}
  zoom={2}
  scrollWheelZoom
  style={{ height: '500px', width: '100%' }} // 👈 ESTILO INLINE FUNCIONAL
  className="rounded-xl shadow"
>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={data} />
      <FitBounds data={data} />
    </MapContainer>
  );
}