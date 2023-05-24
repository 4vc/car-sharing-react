import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Car.module.css';
import carService from '../../../services/CarService.js';
import categoryService from '../../../services/CategoryService.js';

const Car = ({id, onCarPrice = () => {}}) => {
  const [car, setCar] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    carService.getById(id)
      .then(carResponse => setCar(carResponse.data))
      .catch(error => console.error('Error fetching car data:', error));
  }, [id]);

  useEffect(() => {
    if (car) {
      categoryService.getById(car.idCategory)
        .then(categoryResponse => setCategory(categoryResponse.data))
        .catch(error => console.error('Error fetching category data:', error));

      onCarPrice(car.price);
    }
  }, [car, onCarPrice]);

  return (
    <div>
      {car && category && (
        <div className={styles.item}>
          <div className={styles.info}>
            <p className={styles.year}>{car.year}</p>
            <p className={styles.brand}>{car.brand}</p>
            <p className={styles.model}>{car.model}</p>
          </div>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${car.image})`,
            }}
          />
          <div className={styles.specification}>
            <div className={styles.plate}>
              <p>Plate:</p>
              <p>{car.plate}</p>
            </div>
            <div className={styles.category}>
              <p>Category:</p>
              <p>{category.name}</p>
            </div>
          </div>
          <div className={styles.buy}>
            <div className={styles.price}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(car.price)}/<span className={styles.day}> HOUR</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Car.propTypes = {
  id: PropTypes.number,
  onCarPrice: PropTypes.func,
};

export default Car;
