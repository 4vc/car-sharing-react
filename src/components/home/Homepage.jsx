import {useEffect, useState} from 'react';
import styles from './Homepage.module.css';
import Header from '../header/Header.jsx';
import Button from '../button/Button.jsx';
import Image from '../image/Image.jsx';
import carService from '../../services/CarService.js';
import categoryService from '../../services/CategoryService.js';

const Homepage = () => {
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleButtonClick = (carId) => {
    window.location.href = `/order?carId=${carId}`;
  };

  useEffect(() => {
    carService.getAll()
      .then(carsResponse => {
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
          {cars.map(car => (
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
                  <Button text={'Rent Now'} onClick={() => handleButtonClick(car.id)}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
