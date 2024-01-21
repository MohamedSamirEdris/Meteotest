// MapComponent.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  data: any[]; // Replace 'any' with the type of your data
}

const MapComponent: React.FC<MapComponentProps> = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    // Handle the case where data is not defined or not an array
    return <p>No data available.</p>;
  }

  return (
    <MapContainer center={[46.94555, 7.37478]} zoom={13} style={{ height: '20vh', width: '20%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((station) => (
        <Marker key={station.properties.stationId} position={station.geometry.coordinates}>
          <Popup>
            <strong>{station.properties.name}</strong>
            <br />
            Temperature: {station.properties.temperature}
            <br />
            Humidity: {station.properties.relativeHumidity}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
