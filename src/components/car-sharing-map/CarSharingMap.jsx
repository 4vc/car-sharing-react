import React from 'react';
import 'leaflet-css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const CarSharingMap = () => {
  return (
    <MapContainer
      center={[49.444431, 32.059769]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={[49.444431, 32.059769]} />
    </MapContainer>
  );
};

export default CarSharingMap;