import PropTypes from 'prop-types';
import styles from './DateForm.module.css';

const DateForm = ({handleDateChange}) => {
  const generateDateOptions = () => {
    const options = [];
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    while (startDate <= endDate) {
      const date = startDate.toISOString().split('T')[0];
      const option = <option key={date} value={date}>{date}</option>;
      options.push(option);
      startDate.setDate(startDate.getDate() + 1);
    }

    return options;
  };

  return (
    <div className={styles.form}>
      <h3>Date</h3>
      <select name="date" onChange={handleDateChange}>
        <option value="">Select Date</option>
        {generateDateOptions()}
      </select>
    </div>
  );
};

DateForm.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
};

export default DateForm;
