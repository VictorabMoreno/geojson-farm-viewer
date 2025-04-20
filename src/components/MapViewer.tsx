import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import { GeoJsonObject, Feature } from 'geojson';
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
  function onEachFeature(feature: Feature, layer: L.Layer) {
    const props = feature.properties;
    if (!props) return;

    let content = '';

    if (props.name) content = `<strong>${props.name}</strong>`;
    else if (props.id) content = `<strong>ID:</strong> ${props.id}`;
    else if (props.matricula) content = `<strong>Matrícula:</strong> ${props.matricula}`;
    else
      content = Object.entries(props)
        .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
        .join('<br />');

    layer.bindPopup(content);
  }

  return (
    <MapContainer
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom
        style={{ height: '500px', width: '100%' }}
        className="relative z-0 rounded-xl shadow"
        >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={data} onEachFeature={onEachFeature} />
      <FitBounds data={data} />
    </MapContainer>
  );
}