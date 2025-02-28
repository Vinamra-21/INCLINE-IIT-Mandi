export type DroughtData = {
  [date: string]: number;
};

export interface GeoJsonData {
  type: string;
  features: Array<{
    type: string;
    geometry: {
      type: string;
      coordinates: number[][];
    };
    properties: {
      [key: string]: any;
    };
  }>;
}

export type DroughtIndex = "spi" | "pdsi" | "spei";
export type SpatialScale = "location" | "state" | "district" | "basin";
export type TimeScale = "1month" | "3month" | "6month" | "12month";
