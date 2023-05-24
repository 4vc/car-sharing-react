import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import adminService from '../../services/AdminService.js';

const Header = () => {
  const [admin, setAdmin] = useState(null);

  const adminId = Number(JSON.parse(localStorage.getItem('adminId')));

  useEffect(() => {
    if (adminId > 0) {
      adminService.getById(adminId).then(
        userResponse => setAdmin(userResponse.data)
      ).catch(error => console.error('Error fetching admin data:', error));
    }
  });

  const handleSignOut = () => {
    localStorage.removeItem('adminId');
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <a href={'/'}>
            <p>CAR</p>
            <p>SHARING</p>
          </a>
        </div>
        <div className={styles.links}>
          {!admin && (
            <React.Fragment>
              <a href={'sign-in'}>
                <img
                  height='48px'
                  src='/src/assets/sign-in.png'
                  alt='Sign In Icon'
                />
              </a>
            </React.Fragment>
          )}
          {admin && (
            <React.Fragment>
              <a href={'admin'}>
                <img
                  width='64px'
                  src='/src/assets/admin.png'
                  alt='Admin Icon'
                />
              </a>
              <a href={''} onClick={handleSignOut}>
                <img
                  height='48px'
                  src='/src/assets/sign-out.png'
                  alt='Sign Out Icon'
                />
              </a>
            </React.Fragment>
          )}
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  idOfLoggedUser: PropTypes.number,
};

export default Header;
