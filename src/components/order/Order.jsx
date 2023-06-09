import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Order.module.css';
import Header from '../header/Header.jsx';
import DateTime from '../date-time/DateTime.jsx';
import Car from '../cars/car/Car.jsx';
import Button from '../button/Button.jsx';
import orderService from '../../services/OrderService.js';
import carService from '../../services/CarService.js';
import popupstyles from '../cars/car/Car.module.css';

const Order = () => {
  const [email, setEmail] = useState(null);
  const [rentalDate, setRentalDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [car, setCar] = useState(null);
  const [pricePerHour, setPricePerHour] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const carIdParam = searchParams.get('carId');
    if (carIdParam) {
      carService
        .getById(carIdParam)
        .then((carResponse) => {
          const car = carResponse.data;
          const coordinates = carResponse.data.coordinates.split(',');
          car.coordinates = [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
          setCar(car);
        })
        .catch((error) => console.error('Error fetching cars data:', error));
    }
  }, [location]);

  const handleForm = (event) => {
    event.preventDefault();

    let {email} = document.forms[0];

    if (email.value || email.value.trim().length) {
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
      adjustedHour,
      Number(date.minute),
      Number(date.second)
    ).getTime();
  };

  const handleButtonClick = () => {
    if (getTotalRentalPrice() <= 0 || !email || !email.trim().length) {
      return;
    }

    orderService.save({
      idCar: car.id,
      email: email,
      amountPrice: getTotalRentalPrice(),
      rentalDate: new Date(getMilliseconds(rentalDate)),
      returnDate: new Date(getMilliseconds(returnDate)),
      idStatus: 1,
    }).then(() => {
      car.available = 0;
      carService.update(car.id, car).then();
      alert('Order is in process!');
      window.location.href = '/';
    });
  };

  const getTotalRentalPrice = () => {
    if (!rentalDate || !returnDate) {
      return 0;
    }

    return (
      pricePerHour *
      Math.floor(
        (getMilliseconds(returnDate) - getMilliseconds(rentalDate)) /
        60 /
        60 /
        1000
      )
    );
  };

  return (
    <div className={styles.center}>
      <Header/>
      <div className={styles.header}>ORDER</div>
      <div className={styles.container}>
        <form className={styles.form} onInput={handleForm}>
          <div className={styles.formcontrol}>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
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
          {car && (
            <Car
              id={car.id}
              brand={car.brand}
              model={car.model}
              year={car.year}
              price={car.price}
              plate={car.plate}
              available={car.available}
              idAdmin={car.idAdmin}
              locationName={car.locationName}
              coordinates={car.coordinates}
              image={car.image}
              onCarPrice={handleCarPrice}
            />
          )}
          <div className={styles.price}>
            Total Rental Price:{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(getTotalRentalPrice())}
          </div>
        </div>
      </div>

      {car && (
        <div className={styles.map}>
          <MapContainer
            center={car.coordinates}
            zoom={15}
            style={{height: '400px', width: '100%'}}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="Map data © <a href=&quot;https://openstreetmap.org&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={car.coordinates}>
              <Popup>
                <div>
                  <div className={popupstyles.info}>
                    <h4>{car.brand}</h4>
                    <h4>{car.model}</h4>
                    <p>Year: {car.year}</p>
                    <p>Price: {car.price}</p>
                    <p>Plate: {car.plate}</p>
                    <p>Location: {car.locationName}</p>
                    <p>Coordinates: {car.coordinates}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      <Button text={'Proceed'} onClick={handleButtonClick}/>
    </div>
  );
};

export default Order;