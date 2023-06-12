import {useEffect, useState} from 'react';
import styles from './EditCar.module.css';
import Header from '../../header/Header.jsx';
import Button from '../../button/Button.jsx';
import carService from '../../../services/CarService.js';
import categoryService from '../../../services/CategoryService.js';

const EditCar = () => {
  const [car, setCar] = useState(null);
  const [cars, setCars] = useState({});
  const [categories, setCategories] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const url = window.location.href.split('/');
    const id = url[url.length - 2];

    carService.getById(id)
      .then((carResponse) => {
        if (Number(carResponse.data.idAdmin) === Number(localStorage.getItem('adminId'))) {
          setCar(carResponse.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });

    carService.getAll()
      .then((carsResponse) => {
        setCars(carsResponse.data);
      })
      .catch((error) => {
        console.error('Error fetching cars data:', error);
      });

    categoryService.getAll()
      .then((categoriesResponse) => {
        setCategories(categoriesResponse.data);
      })
      .catch((error) => {
        console.error('Error fetching categories data:', error);
      });
  }, []);

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={styles.error}>{errorMessages.message}</div>
    );

  const renderForm = car && (
    <div className={styles.form}>
      <form>
        <div className={styles.formcontrol}>
          <input
            type="text"
            name="brand"
            id="brand"
            defaultValue={car.brand}
            required
          />
          {renderErrorMessage('brand')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type="text"
            name="model"
            id="model"
            defaultValue={car.model}
            required
          />
          {renderErrorMessage('model')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type="text"
            name="year"
            id="year"
            defaultValue={car.year}
            required
          />
          {renderErrorMessage('year')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type="number"
            name="price"
            id="price"
            min="0"
            defaultValue={car.price}
            required
          />
          {renderErrorMessage('price')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type="text"
            name="category"
            id="category"
            defaultValue={categories[car.idCategory - 1].name}
            required
          />
          {renderErrorMessage('category')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type="text"
            name="plate"
            id="plate"
            defaultValue={car.plate}
            required
          />
          {renderErrorMessage('plate')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type="text"
            name="locationName"
            id="locationName"
            defaultValue={car.locationName}
            required
          />
          {renderErrorMessage('locationName')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type="text"
            name="coordinates"
            id="coordinates"
            defaultValue={car.coordinates}
            required
          />
          {renderErrorMessage('coordinates')}
        </div>
        <div className={styles.formcontrol}>
          <input type="file" name="image" id="image" required/>
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
    locationName: 'Invalid location name',
    coordinates: 'Invalid coordinates',
  };

  const isValidPlate = (plate) => {
    for (const c of cars) {
      if (c.id !== car.id && c.plate === plate) {
        return false;
      }
    }
    return true;
  };

  const isValidCategory = (category) => {
    let names = [];
    for (const c of categories) {
      names.push(c.name);
    }
    return names.includes(category);
  };

  const getIdOfCategory = (category) => {
    let idCategory = 0;
    for (const c of categories) {
      if (c.name === category.value) {
        idCategory = c.id;
      }
    }
    return idCategory;
  };

  const handleUpdateClick = (event) => {
    event.preventDefault();

    let {
      brand,
      model,
      year,
      price,
      category,
      plate,
      locationName,
      coordinates,
      image,
    } = document.forms[0];
    let isValidInputtedData = false;

    if (!brand.value || !brand.value.trim().length) {
      setErrorMessages({
        name: 'brand',
        message: errors.brand,
      });
    } else if (!model.value || !model.value.trim().length) {
      setErrorMessages({
        name: 'model',
        message: errors.model,
      });
    } else if (!year.value || !year.value.trim().length) {
      setErrorMessages({
        name: 'year',
        message: errors.year,
      });
    } else if (!price.value || price.value < 0) {
      setErrorMessages({
        name: 'price',
        message: errors.price,
      });
    } else if (
      !category.value ||
      !category.value.trim().length ||
      !isValidCategory(category.value)
    ) {
      setErrorMessages({
        name: 'category',
        message: errors.category,
      });
    } else if (
      !plate.value ||
      !plate.value.trim().length ||
      !isValidPlate(plate.value)
    ) {
      setErrorMessages({
        name: 'plate',
        message: errors.plate,
      });
    } else if (
      !locationName.value ||
      !locationName.value.trim().length
    ) {
      setErrorMessages({
        name: 'locationName',
        message: errors.locationName,
      });
    } else if (
      !coordinates.value ||
      !coordinates.value.trim().length
    ) {
      setErrorMessages({
        name: 'coordinates',
        message: errors.coordinates,
      });
    } else {
      isValidInputtedData = true;
    }

    const updateCarWithImage = (file) => {
      const reader = new FileReader();

      reader.onload = () =>
        updateCar(
          brand.value,
          model.value,
          year.value,
          price.value,
          getIdOfCategory(category),
          plate.value,
          locationName.value,
          coordinates.value,
          reader.result.split(',')[1]
        );

      reader.onerror = (error) =>
        console.error('Error reading the file:', error);

      reader.readAsDataURL(file);
    };

    if (isValidInputtedData) {
      if (image.files.length > 0) {
        updateCarWithImage(image.files[0]);
      } else {
        updateCar(
          brand.value,
          model.value,
          year.value,
          price.value,
          getIdOfCategory(category),
          plate.value,
          locationName.value,
          coordinates.value,
          car.image
        );
      }
    }
  };

  const updateCar = (
    brand,
    model,
    year,
    price,
    category,
    plate,
    locationName,
    coordinates,
    image
  ) => {
    carService.update(car.id, {
      brand: brand,
      model: model,
      year: year,
      price: Number(price),
      idCategory: category,
      plate: plate,
      available: 1,
      idAdmin: Number(localStorage.getItem('adminId')),
      locationName: locationName,
      coordinates: coordinates,
      image: image,
    });

    window.location.href = `/admin/cars/${car.id}`;
  };

  const handleCancelClick = () => {
    window.location.href = `/admin/cars/${car.id}`;
  };

  return (
    <div>
      <Header/>
      <div className={styles.center}>
        <h1>Edit Car</h1>
        {renderForm}
        <Button onClick={handleUpdateClick} text={'Update'}/>
        <Button onClick={handleCancelClick} text={'Cancel'}/>
      </div>
    </div>
  );
};

export default EditCar;