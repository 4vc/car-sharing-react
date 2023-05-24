import {useEffect, useState} from 'react';
import styles from './SignIn.module.css';
import Header from '../header/Header.jsx';
import Button from '../button/Button.jsx';
import adminService from '../../services/AdminService.js';

const SignIn = () => {
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
      <form>
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
      </form>
    </div>
  );

  const errors = {
    email: 'Invalid email',
    password: 'Invalid password'
  };

  const isValidAdmin = (email) => email.includes('@carsharing.com');

  const handleSignInClick = (event) => {
    event.preventDefault();

    let {email, password} = document.forms[0];
    let isValidInputtedData = true;

    const adminData = admins.find(
      (admin) => admin.email === email.value
    );

    if (adminData && isValidAdmin(adminData.email)) {
      if (adminData.password !== password.value) {
        isValidInputtedData = false;
        setErrorMessages(
          {
            name: 'password',
            message: errors.password
          }
        );
      }
    } else {
      isValidInputtedData = false;
      setErrorMessages(
        {
          name: 'email',
          message: errors.email
        }
      );
    }

    if (isValidInputtedData) {
      localStorage.setItem('adminId', JSON.stringify(adminData.id));
      window.location.href = '/';
    }
  };

  const handleSignUpClick = () => {
    window.location.href = '/sign-up';
  };

  return (
    <div>
      <Header/>
      <div className={styles.center}>
        <h1>Sign In</h1>
        {renderForm}
        <Button onClick={handleSignInClick} text={'Sign In'}/>
        <Button onClick={handleSignUpClick} text={'Sign Up'}/>
      </div>
    </div>
  );
};

export default SignIn;
