import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './Header.module.css';

const Header = ({idOfLoggedUser}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('db.json')
      .then(response => {
        const data = response.data;
        setUser(data.users[idOfLoggedUser]);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [idOfLoggedUser]);

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.user}>
          {user && (
            <React.Fragment>
              <a href={'#'} className={styles.name}><i
                className="fa-solid fa-user"></i> {`${user.firstName} ${user.lastName}`}</a>
            </React.Fragment>
          )}
        </div>

        <div className={styles.logo}>
          <p>CAR</p>
          <p>SHARING</p>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  idOfLoggedUser: PropTypes.number,
};

export default Header;
