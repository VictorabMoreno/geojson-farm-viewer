import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapViewerProps {
  data: GeoJSON.GeoJsonObject;
}

export function MapViewer({ data }: MapViewerProps) {
  return (
    <MapContainer
      center={[-15.8, -47.9]} // centro genérico no Brasil
      zoom={14}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-xl shadow"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={data} />
    </MapContainer>
  );
}