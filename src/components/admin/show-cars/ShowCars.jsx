import {useEffect, useState} from 'react';
import styles from './ShowCars.module.css';
import carService from '../../../services/CarService.js';
import Header from '../../header/Header.jsx';
import Car from '../../cars/car/Car.jsx';
import Button from '../../button/Button.jsx';

const ShowCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    carService.getAll().then(
      carsResponse => {
        setCars(carsResponse.data);
      }
    ).catch(error => {
      console.error('Error fetching cars data:', error);
    });
  }, []);

  const handleButtonClick = (id) => {
    window.location.href = `/cars/${id}`;
  };

  const filteredCars = cars.filter(car => car.idAdmin === Number(localStorage.getItem('adminId')));

  return (
    <div>
      <Header/>
      <div className={styles.container}>
        {filteredCars.map(car => (
            <div key={car.id}>
              <Car id={car.id}/>
              <Button text='Show' onClick={() => {
                handleButtonClick(car.id)
              }}/>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ShowCars;
