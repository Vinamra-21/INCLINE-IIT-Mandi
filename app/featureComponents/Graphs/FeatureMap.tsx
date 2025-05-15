import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Icon, Layer, GeoJSON as LeafletGeoJSON } from "leaflet";
import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { booleanPointInPolygon } from "@turf/turf";

const INDIA_BOUNDS = {
  north: 37.1,
  south: 6.5,
  west: 68.1,
  east: 97.4,
  padding: 0.2,
};

const isPointInIndia = (lat: number, lng: number) => {
  return (
    lat >= INDIA_BOUNDS.south - INDIA_BOUNDS.padding &&
    lat <= INDIA_BOUNDS.north + INDIA_BOUNDS.padding &&
    lng >= INDIA_BOUNDS.west - INDIA_BOUNDS.padding &&
    lng <= INDIA_BOUNDS.east + INDIA_BOUNDS.padding
  );
};

const handleMapError = (error: Error) => {
  console.error("Map error:", error);
  toast.error("An error occurred while loading the map");
};

const isValidCoordinate = (
  lat: string | undefined,
  lng: string | undefined
): boolean => {
  if (!lat || !lng) return false;
  const numLat = Number(lat);
  const numLng = Number(lng);
  return !isNaN(numLat) && !isNaN(numLng) && isPointInIndia(numLat, numLng);
};

interface MapContentProps {
  onMapClick?: (lat: number, lng: number, objectId: string) => void;
  params: {
    spatial_scale?: "location" | "district" | "state";
    latitude?: string;
    longitude?: string;
    [key: string]: string | undefined;
  };
  geoJsonData?: GeoJSON.FeatureCollection;
  geoJsonStyle?: any;
  onFeatureSelect?: (feature: any) => void;
}

const customIcon = new Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapClickHandler({
  onMapClick,
  geoJsonData,
}: {
  onMapClick?: (lat: number, lng: number, objectId: string) => void;
  geoJsonData?: GeoJSON.FeatureCollection;
}) {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;

      // First quick check with the bounding box
      if (!isPointInIndia(lat, lng)) {
        toast.error("Please select a location within India only.");
        return;
      }

      // If we have GeoJSON data, check if the point is within any feature
      if (geoJsonData && geoJsonData.features.length > 0) {
        // Create a GeoJSON Point from the clicked location
        const point = {
          type: "Point" as const,
          coordinates: [lng, lat], // GeoJSON uses [lng, lat] order
        };

        // Check if the point is inside any of the GeoJSON polygons
        const insideIndia = geoJsonData.features.some((feature) => {
          // Only check Polygon and MultiPolygon geometries
          if (
            feature.geometry.type === "Polygon" ||
            feature.geometry.type === "MultiPolygon"
          ) {
            return booleanPointInPolygon(point, feature.geometry);
          }
          return false;
        });

        if (insideIndia) {
          onMapClick?.(lat, lng, "0");
        } else {
          toast.error("Please select a location within India only.");
        }
      } else {
        // If we don't have GeoJSON data, fall back to the bounding box check
        onMapClick?.(lat, lng, "0");
      }
    },
  });
  return null;
}

const getObjId = (feature: GeoJSON.Feature) => {
  if (feature.properties) {
    return (
      feature.properties["OBJECTID"] ||
      feature.properties["objectid"] ||
      feature.properties["object"] ||
      feature.properties["id"] ||
      "0"
    ).toString();
  }
  return "0";
};

const getTooltipContent = (feature: GeoJSON.Feature): string => {
  if (!feature.properties) return "";
  return (
    feature.properties.Name ||
    feature.properties.distname ||
    feature.properties.BA_NAME ||
    ""
  );
};

export default function MapContent({
  onMapClick,
  params,
  geoJsonData,
  geoJsonStyle = {
    color: "#000000",
    weight: 1,
    opacity: 0.3,
    fillColor: "#000000",
    fillOpacity: 0.2,
  },
  onFeatureSelect,
}: MapContentProps) {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(
    null
  );
  const [hoveredFeatureId, setHoveredFeatureId] = useState<string | null>(null);

  const handleFeatureClick = useCallback(
    (feature: GeoJSON.Feature, layer: Layer) => {
      if (feature.properties) {
        const tooltip = getTooltipContent(feature);
        if (tooltip) {
          (layer as LeafletGeoJSON).bindTooltip(tooltip, {
            permanent: false,
            direction: "top",
            className: "bg-white px-2 py-1 rounded shadow",
          });
        }

        layer.on({
          click: () => {
            const objId = getObjId(feature);
            setSelectedFeatureId(objId);

            if (onFeatureSelect) {
              onFeatureSelect(feature);
            } else if (onMapClick && feature.geometry.type === "Point") {
              const coords = (feature.geometry as GeoJSON.Point).coordinates;
              onMapClick(coords[1], coords[0], objId); // Note: GeoJSON uses [lng, lat] order
            }
          },
          mouseover: () => {
            const objId = getObjId(feature);
            setHoveredFeatureId(objId);
          },
          mouseout: () => {
            setHoveredFeatureId(null);
          },
        });
      }
    },
    [onFeatureSelect, onMapClick, setSelectedFeatureId, setHoveredFeatureId]
  );

  const getFeatureStyle = useCallback(
    (feature: any) => {
      const objId = getObjId(feature);
      const isSelected = objId === selectedFeatureId;
      const isHovered = objId === hoveredFeatureId;

      return {
        color: isSelected
          ? "#ff69b4"
          : isHovered
          ? "#00bfff"
          : geoJsonStyle.color,
        weight: isSelected ? 2 : isHovered ? 1.5 : geoJsonStyle.weight,
        opacity: isSelected ? 0.9 : geoJsonStyle.opacity,
        fillColor: isSelected ? "#ff69b4" : isHovered ? "#00bfff" : "#000000",
        fillOpacity: isSelected ? 0.2 : isHovered ? 0.1 : 0.05,
        dashArray: undefined,
        zIndex: isSelected ? 1000 : isHovered ? 500 : 0,
      };
    },
    [selectedFeatureId, hoveredFeatureId, geoJsonStyle]
  );

  const shouldShowMarker =
    params.spatial_scale === "location" &&
    isValidCoordinate(params.latitude, params.longitude);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={4}
        style={{ width: "100%", height: "100%" }}
        className="h-full w-full z-0"
        // whenCreated={(map) => {
        //   map.on('error', (e) => handleMapError(e.error));
        // }}
      >
        {/* Base Map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Click Handler (for user interactions) */}
        {params.spatial_scale === "location" && (
          <MapClickHandler onMapClick={onMapClick} geoJsonData={geoJsonData} />
        )}

        {/* Marker (if latitude and longitude are provided) */}
        {shouldShowMarker && (
          <Marker
            position={[+params.latitude!, +params.longitude!]}
            icon={customIcon}
          />
        )}

        {/* GeoJSON Data */}
        {geoJsonData && (
          <GeoJSON
            key={JSON.stringify(geoJsonData)}
            data={geoJsonData}
            style={getFeatureStyle}
            onEachFeature={handleFeatureClick}
          />
        )}
      </MapContainer>
    </div>
  );
}
