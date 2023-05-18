import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Homepage.module.css';

const Homepage = () => {
  const [carList, setCarList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('db.json')
      .then(response => {
        const data = response.data;
        setCarList(data.cars);
        setUser(data.users[1]);
      })
      .catch(error => {
        console.error('Error fetching car data:', error);
      });
  }, []);

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.user}>
          {user && (
            <React.Fragment>
              <a href={'#'} className={styles.name}><i className="fa-solid fa-user"></i> {`${user.firstName} ${user.lastName}`}</a>
            </React.Fragment>
          )}
        </div>
        
<div className={styles.logo}>
  <p>CAR</p> 
  <p>SHARING</p>
  </div>
      </nav>
      <div className={styles.header}>AVAILABLE CARS</div>
      <div className={styles.content}>
      <div>
        {carList.map(car => (
          <div key={car.id} className={styles.item}>
            <div className={styles.info}>
            <p className={styles.caryear}>{car.year}</p>
              <p className={styles.carbrand}>{car.brand}</p>
              <p className={styles.carmodel}>{car.model}</p>
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
              <div className={styles.rentprice}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(car.price)}/<span className={styles.day}> DAY</span>
              </div>
              <button className={styles.rentbutton}>
              Rent now
              </button>
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