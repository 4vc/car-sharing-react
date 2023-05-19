import PropTypes from 'prop-types';
import styles from './TimeForm.module.css';

const TimeForm = ({handleTimeChange}) => {

  const generateTimeOptions = () => {
    const options = [];
    const startTime = new Date();
    startTime.setHours(9, 0, 0);
    const endTime = new Date();
    endTime.setHours(18, 0, 0);

    while (startTime <= endTime) {
      const time = startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      const option = <option key={time} value={time}>{time}</option>;
      options.push(option);
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return options;
  };

  return (
    <div className={styles.form}>
      <h3>Time</h3>
      <select name="time" onChange={handleTimeChange}>
        <option value="">Select Time</option>
        {generateTimeOptions()}
      </select>
    </div>
  );
};

TimeForm.propTypes = {
  handleTimeChange: PropTypes.func.isRequired,
};

export default TimeForm;
