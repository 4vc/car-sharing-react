import React, { useEffect, useState } from 'react';
import 'leaflet-css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const CarSharingMap = ({ carId }) => {
  const [cars, setCars] = useState([]);
  const [center, setCenter] = useState([49.444431, 32.059769]);

  useEffect(() => {
    fetch('http://localhost:8080/cars')
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });
  }, []);

  useEffect(() => { 
    const selectedCar = cars.find((car) => car.id === carId);
    if (selectedCar) {
      const [lat, lng] = selectedCar.coordinates.split(',').map(parseFloat);
      setCenter([lat, lng]);
    }
  }, [cars, carId]);

  return (
    <MapContainer center={center} zoom={10} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      />
      {cars.map((car) => (
        <Marker key={car.id} position={car.coordinates.split(',').map(parseFloat)}>
          <Popup>
            <div>
              <h4>{car.brand}</h4>
              <p>Model: {car.model}</p>
              <p>Year: {car.year}</p>
              <p>Price: {car.price}</p>
              <p>Plate: {car.plate}</p>
              <img src={car.image} alt={car.brand} style={{ width: '200px', height: 'auto' }} />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CarSharingMap;
