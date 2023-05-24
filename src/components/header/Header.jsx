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

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.user}>
          {user && (
            <React.Fragment>
              <a href={'#'}><i
                className="fa-solid fa-user"></i> {`${user.firstName} ${user.lastName}`}</a>
            </React.Fragment>
          )}
        </div>

        <div className={styles.logo}>
          <a href={'../'}>
          <p>CAR</p>
          <p>SHARING</p>
          </a>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  idOfLoggedUser: PropTypes.number,
};

export default Header;
