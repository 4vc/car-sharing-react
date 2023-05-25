import styles from './SignUp.module.css';
import {useEffect, useState} from 'react';
import Header from '../header/Header.jsx';
import Button from '../button/Button.jsx';
import adminService from '../../services/AdminService.js';

const SignUp = () => {
  const [admins, setAdmins] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    adminService.getAll().then(
      adminsResponse => {
        setAdmins(adminsResponse.data);
      }
    ).catch(error => {
      console.error('Error fetching admins data:', error);
    });
  }, []);

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={styles.error}>{errorMessages.message}</div>
    );

  const renderForm = (
    <div className={styles.form}>
      <form className={styles.form}>
        <div className={styles.formcontrol}>
          <input
            type='text'
            name='firstName'
            id='firstName'
            placeholder='First Name'
            required
          />
          {renderErrorMessage('firstName')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type='text'
            name='lastName'
            id='lastName'
            placeholder='Last Name'
            required
          />
          {renderErrorMessage('lastName')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type='text'
            name='email'
            id='email'
            placeholder='Email'
            required
          />
          {renderErrorMessage('email')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            required
          />
          {renderErrorMessage('password')}
        </div>
        <div className={styles.formcontrol}>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            placeholder='Confirm Password'
            required
          />
          {renderErrorMessage('confirmPassword')}
        </div>
      </form>
    </div>
  );

  const errors = {
    firstName: 'Invalid first name',
    lastName: 'Invalid last name',
    email: 'Invalid email',
    password: 'Invalid password',
    confirmPassword: 'Invalid confirm password'
  };

  const isValidEmail = (email) => {
    for (const admin of admins) {
      if (admin.email === email) {
        return false;
      }
    }

    return email.includes('@carsharing.com')
  }

  const handleSingUpClick = (event) => {
    event.preventDefault();

    let {firstName, lastName, email, password, confirmPassword} = document.forms[0];
    let isValidInputtedData = false;

    if (
      !firstName.value
      || !firstName.value.trim().length
    ) {
      setErrorMessages(
        {
          name: 'firstName',
          message: errors.firstName
        }
      );
    } else if (
      !lastName.value
      || !lastName.value.trim().length
    ) {
      setErrorMessages(
        {
          name: 'lastName',
          message: errors.lastName
        }
      );
    } else if (
      !email.value
      || !email.value.trim().length
      || !isValidEmail(email.value)
    ) {
      setErrorMessages(
        {
          name: 'email',
          message: errors.email
        }
      );
    } else if (
      !password.value
      || !password.value.trim().length
    ) {
      setErrorMessages(
        {
          name: 'password',
          message: errors.password
        }
      );
    } else if (
      !confirmPassword.value
      || !confirmPassword.value.trim().length
      || !(confirmPassword.value === password.value)
    ) {
      setErrorMessages(
        {
          name: 'confirmPassword',
          message: errors.confirmPassword
        }
      );
    } else {
      isValidInputtedData = true;
    }

    if (isValidInputtedData) {
      adminService.save({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
      });

      window.location.href = '/sign-in';
    }
  };

  const handleSingInClick = () => {
    window.location.href = '/sign-in';
  };

  return (
    <div>
      <Header/>
      <div className={styles.center}>
        <h1>Sign Up</h1>
        {renderForm}
        <Button onClick={handleSingUpClick} text={'Sign Up'}/>
        <Button onClick={handleSingInClick} text={'Sign In'}/>
      </div>
    </div>
  );
};

export default SignUp;
