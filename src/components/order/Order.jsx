import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import styles from './Order.module.css';
import Header from '../header/Header.jsx';
import DateForm from '../form-date/DateForm.jsx';
import TimeForm from '../form-time/TimeForm.jsx';
import Car from '../cars/car/Car.jsx';
import Button from '../button/Button.jsx';

const Order = () => {
  const [rentalDate, setRentalDate] = useState('');
  const [rentalTime, setRentalTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
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

  const handleRentalDateChange = (event) => {
    const selectedRentalDate = event.target.value;
    setRentalDate(selectedRentalDate);
  };

  const handleRentalTimeChange = (event) => {
    const selectedRentalTime = event.target.value;
    setRentalTime(selectedRentalTime);
  };

  const handleReturnDateChange = (event) => {
    const selectedReturnDate = event.target.value;
    setReturnDate(selectedReturnDate);
  };

  const handleReturnTimeChange = (event) => {
    const selectedReturnTime = event.target.value;
    setReturnTime(selectedReturnTime);
  };

  const handleCarPrice = (price) => {
    setPricePerHour(price);
  };

  const handleButtonClick = () => {
    if (getTotalRentalPrice() <= 0) {
      return;
    }

    alert(`Order is in process!`);
    window.location.href = '/';
  };

  const getTotalRentalPrice = () => {
    const isDateTime = rentalDate && rentalTime && returnDate && returnTime;

    if (!isDateTime) {
      return 0;
    }

    const rentalDateTimeString = `${rentalDate}T${rentalTime}`;
    const returnDateTimeString = `${returnDate}T${returnTime}`;
    const rentalDateTime = moment(rentalDateTimeString, 'YYYY-MM-DDThh:mm A').toDate();
    const returnDateTime = moment(returnDateTimeString, 'YYYY-MM-DDThh:mm A').toDate();

    return pricePerHour * (returnDateTime - rentalDateTime) / 60 / 60 / 1000;
  }

  return (
    <div>
      <Header idOfLoggedUser={2} />
      <div className={styles.header}>ORDER</div>
      <div className={styles.container}>
        <div className={styles.container}>
          <div>
            <h2>Rental Info</h2>
            <DateForm handleDateChange={handleRentalDateChange} />
            <TimeForm handleTimeChange={handleRentalTimeChange} />
          </div>
          <div>
            <h2>Return Info</h2>
            <DateForm handleDateChange={handleReturnDateChange} />
            <TimeForm handleTimeChange={handleReturnTimeChange} />
          </div>
        </div>
        <div className={styles.car}>
          <div className={styles.summary}>Rental Summary</div>
          {carId && (
            <Car id={carId} onCarPrice={handleCarPrice} />
          )}
          <div className={styles.price}>
            Total Rental Price: {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(getTotalRentalPrice())}
          </div>
          <Button text={'Proceed'} onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default Order;
