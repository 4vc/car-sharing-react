import {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Car.module.css';
import PropTypes from "prop-types";

const Car = ({id, onCarPrice}) => {
  const [car, setCar] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios.get('db.json')
      .then(response => {
        const data = response.data;
        setCar(data.cars[id]);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
      });
  }, [id]);

  useEffect(() => {
    if (car) {
      axios.get('db.json')
        .then(response => {
          const data = response.data;
          const categoryData = data.categories.find(category => category.id === car.idCategory);
          setCategory(categoryData);
        })
        .catch(error => {
          console.error('Error fetching category data:', error);
        });

      onCarPrice(car.price);
    }
  }, [car, onCarPrice]);

  return (
    <div>
      {car && (
        <div key={car.id} className={styles.item}>
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
              {category && <p>{category.type}</p>}
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
