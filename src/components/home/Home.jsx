import {useEffect, useState} from 'react';
import styles from './Home.module.css';
import Header from '../header/Header.jsx';
import Button from '../button/Button.jsx';
import Image from '../image/Image.jsx';
import carService from '../../services/CarService.js';
import categoryService from '../../services/CategoryService.js';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);

  const adminId = Number(JSON.parse(localStorage.getItem('adminId')));

  const handleButtonClick = (carId) => {
    window.location.href = `/order?carId=${carId}`;
  };

  useEffect(() => {
    carService.getAll()
      .then(carsResponse => {

        for (let i = 0; i < carsResponse.data.length; i++) {
          const coordinates = carsResponse.data[i].coordinates.split(',');
          carsResponse.data[i].coordinates = [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
        }

        setCars(carsResponse.data);
      })
      .catch(error => {
        console.error('Error fetching cars data:', error);
      });
  }, []);

  useEffect(() => {
    categoryService.getAll()
      .then(categoriesResponse => {
        setCategories(categoriesResponse.data);
      })
      .catch(error => {
        console.error('Error fetching categories data:', error);
      });
  }, []);

  return (
    <div>
      <Header/>
      <div className={styles.header}>AVAILABLE CARS</div>
      <div className={styles.content}>
        <div>
          {(categories.length > 0) && cars.map(car => (
            <div key={car.id} className={styles.item}>
              <div>
                <p className={styles.year}>{car.year}</p>
                <p className={styles.brand}>{car.brand}</p>
                <p className={styles.model}>{car.model}</p>
                <Image imageBytes={car.image}/>
                <div className={styles.specification}>
                  <div className={styles.plate}>
                    <p>Plate:</p>
                    <p>{car.plate}</p>
                  </div>
                  <div className={styles.category}>
                    <p>Category:</p>
                    <p>{categories[car.idCategory - 1].name}</p>
                  </div>
                </div>
                <div className={styles.buy}>
                  <div className={styles.price}>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(car.price)}/<span> HOUR</span>
                  </div>
                  {!adminId && (<Button text={'Rent Now'} onClick={() => handleButtonClick(car.id)}/>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.mapContainer}>
        <MapContainer
          center={[49.4285400, 32.0620700]}
          zoom={12}
          style={{height: '400px', width: '100%'}}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {cars.map(car => (
            <Marker key={car.id} position={car.coordinates}>
              <Popup>
                <div>
                  <div>
                    <h4>{car.brand}</h4>
                    <h4>{car.model}</h4>
                    <Image imageBytes={car.image}/>
                    <p>Year: {car.year}</p>
                    <p>Price: {car.price}</p>
                    <p>Plate: {car.plate}</p>
                    <p>Location: {car.locationName}</p>
                    <p>Coordinates: {car.coordinates}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;