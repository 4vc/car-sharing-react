import styles from './Admin.module.css'
import Header from '../header/Header.jsx';
import Button from '../button/Button.jsx';

const Admin = () => {
  const handleShowMyCars = () => {
    window.location.href = '/admin/cars';
  };

  const handleShowOrders = () => {
    window.location.href = '/admin/orders';
  };

  const handleAddMyCar = () => {
    window.location.href = '/admin/cars/add';
  };

  return (
    <div>
      <Header/>
      <div className={styles.buttons}>
        <Button onClick={handleShowMyCars} text={'Show my cars'}/>
        <Button onClick={handleShowOrders} text={'Show orders'}/>
        <Button onClick={handleAddMyCar} text={'Add new car'}/>
      </div>
    </div>
  );
};

export default Admin;
