import {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Homepage.module.css';
import Header from '../header/Header.jsx';
import Button from '../button/Button.jsx';

const Homepage = () => {
  const [carList, setCarList] = useState([]);

  const handleButtonClick = () => {
    window.location.href = '/order';
  };

  useEffect(() => {
    axios.get('db.json')
      .then(response => {
        const data = response.data;
        setCarList(data.cars);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
      });
  }, []);

  return (
    <div>
      <Header idOfLoggedUser={2}/>
      <div className={styles.header}>AVAILABLE CARS</div>
      <div className={styles.content}>
        <div>
          {carList.map(car => (
            <div key={car.id} className={styles.item}>
              <div>
                <p className={styles.year}>{car.year}</p>
                <p className={styles.brand}>{car.brand}</p>
                <p className={styles.model}>{car.model}</p>
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
                    <p>{car.idCategory}</p>
                  </div>
                </div>
                <div className={styles.buy}>
                  <div className={styles.price}>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(car.price)}/<span> HOUR</span>
                  </div>
                  <Button text={'Rent Now'} onClick={handleButtonClick}/>
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
