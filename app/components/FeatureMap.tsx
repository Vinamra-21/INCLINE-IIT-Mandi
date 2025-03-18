import { MapContainer, Marker, TileLayer, useMapEvents, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Icon, Layer, GeoJSON as LeafletGeoJSON } from "leaflet";
import { useState, useCallback } from "react";

interface MapContentProps {
  onMapClick?: (lat: number, lng: number) => void;
  params: Record<string, string>;
  geoJsonData?: GeoJSON.FeatureCollection;
  geoJsonStyle?: any
  onFeatureSelect?: (objectId: string) => void;
}

const customIcon = new Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => onMapClick?.(e.latlng.lat, e.latlng.lng),
  });
  return null;
}

export default function MapContent({
  onMapClick,
  params,
  geoJsonData,
  geoJsonStyle = { color: "#33ff88", weight: 3, opacity: 0.65 },
  onFeatureSelect,
}: MapContentProps) {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);

  const handleFeatureClick = useCallback(
    (feature: GeoJSON.Feature, layer: Layer) => {
      if (feature.properties && onFeatureSelect) {
        layer.on({
          click: () => {
            setSelectedFeatureId(feature.properties?.objectId);
            onFeatureSelect(feature.properties?.objectId);
          },
        });
      }
    },
    [onFeatureSelect, setSelectedFeatureId]
  );

  const getFeatureStyle = useCallback(
    (feature: any) => ({
      color: feature.properties?.objectId !== selectedFeatureId ? "#FF5733" : geoJsonStyle.color,
      weight: feature.properties?.objectId !== selectedFeatureId ? 5 : geoJsonStyle.weight,
      opacity: feature.properties?.objectId !== selectedFeatureId ? 1 : geoJsonStyle.opacity,
    }),
    [selectedFeatureId, geoJsonStyle]
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ width: "100%", height: "100%" }}>
        {/* Base Map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Click Handler (for user interactions) */}
        {params.spatial_scale === "location" && <MapClickHandler onMapClick={onMapClick} />}

        {/* Marker (if latitude and longitude are provided) */}
        {params.latitude && params.longitude && params.spatial_scale === 'location' && (
          <Marker position={[+params.latitude, +params.longitude]} icon={customIcon} />
        )}

        {/* GeoJSON Data */}
        {geoJsonData && <GeoJSON key={JSON.stringify(geoJsonData)} data={geoJsonData} style={getFeatureStyle} onEachFeature={handleFeatureClick} />}

      </MapContainer>
    </div>
  );
}
