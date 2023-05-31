import {useEffect, useState} from 'react';
import styles from './AddCar.module.css'
import Header from '../../header/Header.jsx';
import Button from '../../button/Button.jsx';
import carService from '../../../services/CarService.js';
import categoryService from '../../../services/CategoryService.js';
import adminService from '../../../services/AdminService.js';

const AddCar = () => {
  const [cars, setCars] = useState({});
  const [categories, setCategories] = useState({});
  const [admin, setAdmin] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    carService.getAll().then(
      carsResponse => {
        setCars(carsResponse.data);
      }
    ).catch(error => {
      console.error('Error fetching cars data:', error);
    });

    categoryService.getAll().then(
      categoriesResponse => {
        setCategories(categoriesResponse.data);
      }
    ).catch(error => {
      console.error('Error fetching categories data:', error);
    });

    adminService.getById(localStorage.getItem('adminId')).then(
      adminResponse => {
        setAdmin(adminResponse.data);
      }
    ).catch(error => {
      console.error('Error fetching admin data:', error);
    });
  }, []);

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={styles.error}>{errorMessages.message}</div>
    );

  const renderForm = (
    <div className={styles.form}>
      <form>
        <div className={styles.formcontrol}>
          <input
            type='text'
            name='brand'
            id='brand'
            placeholder='Brand'
            required
          />
          {renderErrorMessage('brand')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type='text'
            name='model'
            id='model'
            placeholder='Model'
            required
          />
          {renderErrorMessage('model')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type='text'
            name='year'
            id='year'
            placeholder='Year'
            required
          />
          {renderErrorMessage('year')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type='number'
            name='price'
            id='price'
            min='0'
            placeholder='0'
            required
          />
          {renderErrorMessage('price')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type='text'
            name='category'
            id='category'
            placeholder='Category'
            required
          />
          {renderErrorMessage('category')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type='text'
            name='plate'
            id='plate'
            placeholder='Plate'
            required
          />
          {renderErrorMessage('plate')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type='file'
            name='image'
            id='image'
            required
          />
        </div>
      </form>
    </div>
  );

  const errors = {
    brand: 'Invalid brand',
    model: 'Invalid model',
    year: 'Invalid year',
    price: 'Invalid price',
    category: 'Invalid category',
    plate: 'Invalid plate',
  };

  const isValidPlate = (plate) => {
    for (const car of cars) {
      if (car.plate === plate) {
        return false;
      }
    }

    return true;
  };

  function getIdOfCategory(category) {
    let idCategory = 0;
    for (const c of categories) {
      if (c.name === category.value) {
        idCategory = c.id;
      }
    }
    return idCategory;
  }

  const handleAddMyCarClick = (event) => {
    event.preventDefault();

    let {brand, model, year, price, category, plate, image} = document.forms[0];
    let isValidInputtedData = false;

    if (
      !brand.value
      || !brand.value.trim().length
    ) {
      setErrorMessages({
        name: 'brand',
        message: errors.brand
      });
    } else if (
      !model.value
      || !model.value.trim().length
    ) {
      setErrorMessages({
        name: 'model',
        message: errors.model
      });
    } else if (
      !year.value
      || !year.value.trim().length
    ) {
      setErrorMessages({
        name: 'year',
        message: errors.year
      });
    } else if (
      !price.value
      || !price < 0
    ) {
      setErrorMessages({
        name: 'price',
        message: errors.price
      });
    } else if (
      !category.value
      || !category.value.trim().length
    ) {
      setErrorMessages({
        name: 'category',
        message: errors.category
      });
    } else if (
      !plate.value
      || !plate.value.trim().length
      || !isValidPlate(plate.value)
    ) {
      setErrorMessages({
        name: 'plate',
        message: errors.plate
      });
    } else {
      isValidInputtedData = true;
    }

    const saveCarWithImage = (file) => {
      const reader = new FileReader();

      reader.onload = () =>
        saveCar(
          brand.value, model.value, year.value, price.value, getIdOfCategory(category), plate.value,
          reader.result.split(',')[1]
        );

      reader.onerror = (error) =>
        console.error('Error reading the file:', error);

      reader.readAsDataURL(file);
    }

    if (isValidInputtedData) {
      if (image.files.length > 0) {
        saveCarWithImage(image.files[0]);
      } else {
        fetch('/src/assets/no-image.jpg')
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => saveCarWithImage(new Blob([arrayBuffer], {type: 'image/jpeg'})))
          .catch(error => console.error('Error loading default image:', error));
      }
    }
  };

  const saveCar = (
    brand, model, year, price, category, plate, carImage
  ) => {
    carService.save({
      brand: brand,
      model: model,
      year: year,
      price: Number(price),
      idCategory: category,
      plate: plate,
      available: 1,
      idAdmin: admin.id,
      image: carImage
    });

    window.location.href = '/cars';
  };

  const handleCancelClick = () => {
    window.location.href = '/admin';
  };

  return (
    <div>
      <Header/>
      <div className={styles.center}>
        <h1>Add New Car</h1>
        {renderForm}
        <Button onClick={handleAddMyCarClick} text={'Add'}/>
        <Button onClick={handleCancelClick} text={'Cancel'}/>
      </div>
    </div>
  );
};

export default AddCar;
