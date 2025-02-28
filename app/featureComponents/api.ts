import type {
  DroughtData,
  GeoJsonData,
  DroughtIndex,
  SpatialScale,
  TimeScale,
} from "./types";

export async function fetchDroughtData({
  lat,
  long,
  droughtIndex,
  spatialScale,
  timeScale,
}: {
  lat: number;
  long: number;
  droughtIndex: DroughtIndex;
  spatialScale: SpatialScale;
  timeScale: TimeScale;
}): Promise<DroughtData[]> {
  try {
    const response = await fetch(
      `/api/drought-data?lat=${lat}&long=${long}&index=${droughtIndex}&scale=${spatialScale}&time=${timeScale}`
    );
    if (!response.ok) throw new Error("Failed to fetch drought data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching drought data:", error);
    throw error;
  }
}

export async function fetchGeoJson({
  spatialScale,
  droughtIndex,
}: {
  spatialScale: SpatialScale;
  droughtIndex: DroughtIndex;
}): Promise<GeoJsonData> {
  try {
    const response = await fetch(
      `/api/geojson?scale=${spatialScale}&index=${droughtIndex}`
    );
    if (!response.ok) throw new Error("Failed to fetch GeoJSON data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching GeoJSON:", error);
    throw error;
  }
}
