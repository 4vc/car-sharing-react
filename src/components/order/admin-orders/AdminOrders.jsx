import {useEffect, useState} from 'react';
import styles from './AdminOrders.module.css';
import Header from '../../header/Header.jsx';
import Button from '../../button/Button.jsx';
import orderService from '../../../services/OrderService.js';
import carService from '../../../services/CarService.js';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    carService.getAll().then(
      carsResponse => setCars(carsResponse.data)
    ).catch(error => {
      console.error('Error fetching cars data:', error);
    });
  }, []);

  useEffect(() => {
    orderService.getAll().then(
      ordersResponse => {
        const filteredCars = cars.filter(car => car.idAdmin === Number(localStorage.getItem('adminId')));
        const orderList = [];

        for (const order of ordersResponse.data) {
          for (const car of filteredCars) {
            if (car.id === order.idCar) {
              orderList.push(order);
            }
          }
        }

        setOrders(orderList);
      }
    ).catch(error => console.error('Error fetching orders data:', error))
  }, [cars]);

  const handleButtonClick = (id) => {
    window.location.href = `/admin/orders/${id}`;
  };

  return (
    <div>
      <Header/>
      <div className={styles.container}>
        {orders.length <= 0 && (<h1>Orders Not Found!</h1>)}
        {orders.map(order => (
            <div key={order.id} className={styles.item}>
              <h1>Order №{order.id}</h1>
              <Button text='Show' onClick={() => {
                handleButtonClick(order.id)
              }}/>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
