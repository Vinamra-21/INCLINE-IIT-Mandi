import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define types for watershed data
interface WatershedData {
  watershed: GeoJSON.FeatureCollection;
  riverline: GeoJSON.FeatureCollection;
  stream_lat: number;
  stream_lng: number;
}

export default function MapContent({
  watershedData,
  onMapClick,
}: {
  watershedData: WatershedData | null;
  onMapClick?: (lat: number, lng: number) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const watershedLayerRef = useRef<L.GeoJSON | null>(null);
  const riverlineLayerRef = useRef<L.GeoJSON | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const clickMarkerRef = useRef<L.Marker | null>(null);
  const [clickPosition, setClickPosition] = useState<[number, number] | null>(
    null
  );

  // Initialize map once
  useEffect(() => {
    if (mapRef.current && !leafletMap.current) {
      // Create map instance
      leafletMap.current = L.map(mapRef.current).setView([28.6139, 77.209], 5);

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap.current);

      // Add click handler
      leafletMap.current.on("click", (e) => {
        const { lat, lng } = e.latlng;
        setClickPosition([lat, lng]);
        if (onMapClick) {
          onMapClick(lat, lng);
        }
      });
    }

    // Cleanup on unmount
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [onMapClick]);

  // Update click marker when click position changes
  useEffect(() => {
    if (!leafletMap.current || !clickPosition) return;

    const map = leafletMap.current;

    // Remove previous click marker if exists
    if (clickMarkerRef.current) {
      map.removeLayer(clickMarkerRef.current);
    }

    // Add new marker at click position
    clickMarkerRef.current = L.marker(clickPosition, {
      icon: L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: #ff3b30; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      }),
    })
      .addTo(map)
      .bindPopup(
        `Lat: ${clickPosition[0].toFixed(6)}, Lng: ${clickPosition[1].toFixed(
          6
        )}`
      )
      .openPopup();
  }, [clickPosition]);

  // Update map when watershed data changes
  useEffect(() => {
    if (!leafletMap.current || !watershedData) return;

    const map = leafletMap.current;

    // Clear previous watershed layers
    if (watershedLayerRef.current) {
      map.removeLayer(watershedLayerRef.current);
      watershedLayerRef.current = null;
    }

    if (riverlineLayerRef.current) {
      map.removeLayer(riverlineLayerRef.current);
      riverlineLayerRef.current = null;
    }

    if (markerRef.current) {
      map.removeLayer(markerRef.current);
      markerRef.current = null;
    }

    // Add watershed polygon layer
    watershedLayerRef.current = L.geoJSON(watershedData.watershed, {
      style: {
        color: "#0080ff",
        weight: 2,
        fillColor: "#0080ff",
        fillOpacity: 0.3,
      },
    }).addTo(map);

    // Add riverline layer
    riverlineLayerRef.current = L.geoJSON(watershedData.riverline, {
      style: {
        color: "#03A9F4",
        weight: 3,
      },
    }).addTo(map);

    // Add marker at stream point
    markerRef.current = L.marker(
      [watershedData.stream_lat, watershedData.stream_lng],
      {
        icon: L.divIcon({
          className: "outlet-icon",
          html: `<div style="background-color: #007AFF; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        }),
      }
    )
      .addTo(map)
      .bindPopup("Watershed Outlet Point")
      .openPopup();

    // Zoom to the watershed bounds
    if (watershedLayerRef.current.getBounds().isValid()) {
      map.fitBounds(watershedLayerRef.current.getBounds());
    } else {
      // If bounds invalid, center on stream point
      map.setView([watershedData.stream_lat, watershedData.stream_lng], 10);
    }
  }, [watershedData]);

  return (
    <div className="h-full w-full">
      <div ref={mapRef} className="h-full w-full" />
      {clickPosition && (
        <div className="absolute bottom-2 left-2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-lg text-xs shadow-md">
          Selected: Lat: {clickPosition[0].toFixed(6)}, Lng:{" "}
          {clickPosition[1].toFixed(6)}
        </div>
      )}
    </div>
  );
}
