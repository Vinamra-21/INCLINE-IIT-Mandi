import React, { useRef, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  GeoJSON,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to handle map view updates
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Component to handle map clicks
function MapClickHandler({ onLocationUpdate }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationUpdate([lat, lng]);
    },
  });
  return null;
}

function HomeMap({
  center = [31.7754, 76.9861],
  zoom = 10,
  pinLocation = null,
  onLocationUpdate = null,
}) {
  const [indiaGeoJSON, setIndiaGeoJSON] = useState(null);

  useEffect(() => {
    // Load India GeoJSON
    fetch("/geojson/india.json")
      .then((response) => response.json())
      .then((data) => {
        setIndiaGeoJSON(data);
      })
      .catch((error) => {
        console.error("Failed to load India GeoJSON:", error);
      });
  }, []);

  // Style for India GeoJSON
  const geoJSONStyle = {
    fillColor: "#3b82f6",
    fillOpacity: 0.2,
    color: "#2563eb",
    weight: 2,
    opacity: 0.8,
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      attributionControl={false}>
      <ChangeView center={center} zoom={zoom} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* India GeoJSON */}
      {indiaGeoJSON && <GeoJSON data={indiaGeoJSON} style={geoJSONStyle} />}

      {/* Click handler */}
      {onLocationUpdate && (
        <MapClickHandler onLocationUpdate={onLocationUpdate} />
      )}

      {/* Location marker */}
      {pinLocation && (
        <Marker position={pinLocation} icon={customIcon}>
          <Popup>
            Lat: {pinLocation[0].toFixed(4)}, Lng: {pinLocation[1].toFixed(4)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default HomeMap;
