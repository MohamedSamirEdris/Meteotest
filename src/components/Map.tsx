import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface StationMapProps {
  selectedStation: {
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
  } | null;

  clickedCoordinates: any;
}

const StationMap = ({ selectedStation, clickedCoordinates }: StationMapProps) => {
  console.log("🚀 ~ StationMap ~ clickedCoordinates:", clickedCoordinates)
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    46.8182, 8.2275,
  ]);

  
  useEffect(() => {
    if (clickedCoordinates) {
      setMapCenter(clickedCoordinates);
    }
  }, [clickedCoordinates]);

  if (!selectedStation) {
    return (
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '50vh', width: '50%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        ;
      </MapContainer>
    );
  }
  

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{ height: '50vh', width: '50%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectedStation && (
        <Marker position={selectedStation.geometry.coordinates}>
          <Popup>{selectedStation.properties.name}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default StationMap;
