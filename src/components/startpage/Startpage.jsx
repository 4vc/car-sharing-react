import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Startpage.module.css';
import Header from '../header/Header';
import Button from '../button/Button';
import Image from '../image/Image';
import carService from '../../services/CarService';
import categoryService from '../../services/CategoryService';
import Select from 'react-select';

const Startpage = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/stations')
      .then((response) => response.json())
      .then((data) => setStations(data))
      .catch((error) => console.log('Error fetching stations:', error));
  }, []);

  const handleStationChange = (selectedOption) => {
    setSelectedStation(selectedOption);
  };

  const getStationCoordinates = (stationId) => {
    const station = stations.find((s) => s.id === stationId);
    return station ? station.coordinates : null;
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    console.log('Clicked on coordinates:', lat, lng);
  };

  const redirectToCarsList = () => {
    if (selectedStation) {
      window.location.href = `/cars/${selectedStation.value}`;
    }
  };

  const StationMarker = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.flyTo(position, 15);
      }
    }, [map, position]);

    return position ? <Marker position={position} /> : null;
  };

  return (
    <div className={styles.content}>
      <div>
        <h1 className={styles.logo}>CAR SHARING</h1>
        <div className={styles.stationselect}>
        <Select
          id="station-select"
          value={selectedStation}
          options={stations.map((station) => ({
            value: station.id,
            label: station.name,
          }))}
          onChange={handleStationChange}
          placeholder="-- Select a station --"
        />
</div>
        <div style={{ height: '800px', width: '1080px' }}>
          <MapContainer
            center={[49.4285400, 32.0620700]} // Default center coordinates
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            onClick={handleMapClick}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <StationMarker position={getStationCoordinates(selectedStation?.value)} />
          </MapContainer>
        </div>
        <Button
          text="Go to Cars List"
          onClick={redirectToCarsList}
          disabled={!selectedStation}
        />
      </div>
    </div>
  );
};

export default Startpage;