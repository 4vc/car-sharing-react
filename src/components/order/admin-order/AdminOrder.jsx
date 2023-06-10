import {useEffect, useState} from 'react';
import styles from './AdminOrder.module.css';
import Header from '../../header/Header.jsx';
import Button from '../../button/Button.jsx';
import orderService from '../../../services/OrderService.js';
import carService from '../../../services/CarService.js';
import statusService from "../../../services/StatusService.js";
import categoryService from "../../../services/CategoryService.js";
import Image from "../../image/Image.jsx";

const AdminOrder = () => {
  const [order, setOrder] = useState(null);
  const [cars, setCars] = useState([]);
  const [status, setStatus] = useState(null);
  const [car, setCar] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    carService.getAll().then(
      carsResponse => setCars(carsResponse.data)
    ).catch(error => {
      console.error('Error fetching cars data:', error);
    });
  }, []);

  useEffect(() => {
    const url = window.location.href.split('/');
    const id = url[url.length - 1];

    const filteredCars = cars.filter(car => car.idAdmin === Number(localStorage.getItem('adminId')));

    orderService.getById(id).then(
      orderResponse => {
        for (const car of filteredCars) {
          if (car.id === orderResponse.data.idCar) {
            setOrder(orderResponse.data);
          }
        }
      }
    ).catch(error => console.error('Error fetching orders data:', error))
  }, [cars]);

  useEffect(() => {
    if (order) {
      statusService.getById(order.idStatus).then(
        statusResponse => setStatus(statusResponse.data)
      ).catch(error => console.error('Error fetching status data:', error))
    }
  }, [order]);

  useEffect(() => {
    if (order) {
      carService.getById(order.idCar).then(
        carResponse => setCar(carResponse.data)
      ).catch(error => {
        console.error('Error fetching car data:', error);
      });
    }
  }, [order]);

  useEffect(() => {
    if (car) {
      categoryService.getById(car.idCategory).then(
        categoryResponse => setCategory(categoryResponse.data)
      ).catch(error => console.error('Error fetching category data:', error))
    }
  }, [car]);

  const handleEditOrder = () => {
    window.location.href = `/admin/orders/${order.id}/edit`;
  };

  const handleDeleteOrder = () => {
    orderService.delete(order.id)
      .then(() => window.location.href = `/admin/orders`)
      .catch(error => console.error('Error deleting order:', error));
  };

  const getFormattedDate = (date) => {
    date = new Date(date);

    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <div>
      <Header/>
      {!order && (<h1>Order Not Found!</h1>)}
      {order && status && car && category && (
        <div>
          <h1>Order №{order.id}</h1>
          <h3>Email: {order.email}</h3>
          <h3>Rental Date: {getFormattedDate(order.rentalDate)}</h3>
          <h3>Return Date: {getFormattedDate(order.returnDate)}</h3>
          <h3>Status: {status.name}</h3>
          <hr/>
          <Image imageBytes={car.image}/>
          <div>{`${car.brand} ${car.model} ${car.year}`}</div>
          <div>Plate: {car.plate}</div>
          <div>Category: {category.name}</div>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(car.price)}/<span> HOUR</span>
          <div className={styles.buttons}>
            <Button onClick={handleEditOrder} text={'Edit order'}/>
            <Button onClick={handleDeleteOrder} text={'Delete order'}/>
          </div>
        </div>
      )}
    </div>);
};

export default AdminOrder;
