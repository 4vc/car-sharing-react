import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styles from './Order.module.css';
import Header from '../header/Header.jsx';
import DateTime from '../date-time/DateTime.jsx';
import Car from '../cars/car/Car.jsx';
import Button from '../button/Button.jsx';

const Order = () => {
  const [email, setEmail] = useState(null);
  const [rentalDate, setRentalDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [carId, setCarId] = useState(null);
  const [pricePerHour, setPricePerHour] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const carIdParam = searchParams.get('carId');
    if (carIdParam) {
      setCarId(parseInt(carIdParam));
    }
  }, [location]);

  const handleForm = (event) => {
    event.preventDefault();

    let {email} = document.forms[0];

    if (
      email.value
      || email.value.trim().length
    ) {
      setEmail(email.value);
    }
  };

  const handleRentalDate = (date) => {
    setRentalDate(date);
  };

  const handleReturnDate = (date) => {
    setReturnDate(date);
  };

  const handleCarPrice = (price) => {
    setPricePerHour(price);
  };

  const getMilliseconds = (date) => {
    let adjustedHour = Number(date.hour);
    if (date.meridiem === 'PM' && date.hour !== 12) {
      adjustedHour += 12;
    } else if (date.meridiem === 'AM' && date.hour === 12) {
      adjustedHour = 0;
    }

    return new Date(
      Number(date.year),
      Number(date.month) - 1,
      Number(date.date),
      adjustedHour + 3,
      Number(date.minute),
      Number(date.second)
    ).getTime();
  }

  const handleButtonClick = () => {
    if (getTotalRentalPrice() <= 0 || !email || !email.trim().length) {
      return;
    }

    alert(`Order is in process!`);
    window.location.href = '/';
  };

  const getTotalRentalPrice = () => {
    if (!rentalDate || !returnDate) {
      return 0;
    }

    return pricePerHour * Math.floor((getMilliseconds(returnDate) - getMilliseconds(rentalDate)) / 60 / 60 / 1000);
  }

  return (
    <div className={styles.center}>
      <Header/>
      <div className={styles.header}>ORDER</div>
      <div className={styles.container}>
        <form className={styles.form} onInput={handleForm}>
          <div className={styles.formcontrol}>
            <input
              type='text'
              name='email'
              id='email'
              placeholder='Email'
              required
            />
          </div>
        </form>
      </div>
      <div className={styles.container}>
        <div className={styles.container}>
          <div>
            <h3>Select Rental Date</h3>
            <DateTime onChangeDate={handleRentalDate}/>
          </div>
          <div>
            <h3>Select Return Date</h3>
            <DateTime onChangeDate={handleReturnDate}/>
          </div>
        </div>
        <div className={styles.car}>
          <div className={styles.summary}>Rental Summary</div>
          {carId && (
            <Car id={carId} onCarPrice={handleCarPrice}/>
          )}
          <div className={styles.price}>
            Total Rental Price: {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(getTotalRentalPrice())}
          </div>
        </div>
      </div>
      <Button text={'Proceed'} onClick={handleButtonClick}/>
    </div>
  );
};

export default Order;
