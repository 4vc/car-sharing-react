import {useEffect, useState} from 'react';
import styles from './AdminCars.module.css';
import carService from '../../../services/CarService.js';
import categoryService from '../../../services/CategoryService.js';
import Header from '../../header/Header.jsx';
import Image from '../../image/Image.jsx';
import Button from '../../button/Button.jsx';

const AdminCar = () => {
  const [car, setCar] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const url = window.location.href.split('/');
    const id = url[url.length - 1];

    carService.getById(id).then(
      carResponse => {
        if (Number(carResponse.data.idAdmin) === Number(localStorage.getItem('adminId'))) {
          setCar(carResponse.data);
        }
      }
    ).catch(error => {
      console.error('Error fetching car data:', error);
    });
  }, []);

  useEffect(() => {
    if (car) {
      categoryService.getById(car.idCategory)
        .then(categoryResponse => setCategory(categoryResponse.data))
        .catch(error => console.error('Error fetching category data:', error));
    }
  }, [car]);

  const handleEditCar = () => {
    window.location.href = `/admin/cars/${car.id}/edit`;
  };

  const handleDeleteCar = () => {
    carService.delete(car.id)
      .then(() => window.location.href = `/admin/cars`)
      .catch(error => console.error('Error deleting car:', error));
  };

  return (
    <div>
      <Header/>
      {!car && (<h1>Car Not Found!</h1>)}
      {car && category && (
        <div>
          <Image imageBytes={car.image}/>
          <div>{`${car.brand} ${car.model} ${car.year}`}</div>
          <div>Plate: {car.plate}</div>
          <div>Category: {category.name}</div>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(car.price)}/<span> HOUR</span>
          <div className={styles.buttons}>
            <Button onClick={handleEditCar} text={'Edit car'}/>
            <Button onClick={handleDeleteCar} text={'Delete car'}/>
          </div>
        </div>
      )}
    </div>);
};

export default AdminCar;
