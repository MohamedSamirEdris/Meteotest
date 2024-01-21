export interface Station {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    stationId: string;
    name: string;
    dateObserved: string;
    temperature: number;
    relativeHumidity: number;
  };
}


