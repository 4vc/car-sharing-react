import {forwardRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import PickyDateTime from 'react-picky-date-time';

const DateTime = forwardRef(({onChangeDate}, ref) => {
  const currentDateTime = new Date();

  const [dateTime, setDateTime] = useState({
    date: currentDateTime.getDate(),
    month: currentDateTime.getMonth() + 1,
    year: currentDateTime.getFullYear(),
    hour: currentDateTime.getHours() % 12 || 12,
    minute: currentDateTime.getMinutes(),
    second: currentDateTime.getSeconds(),
    meridiem: currentDateTime.getHours() >= 12 ? 'PM' : 'AM',
  });

  useEffect(() => {
    onChangeDate(dateTime);
  }, [dateTime, onChangeDate]);

  const {
    date,
    month,
    year,
    hour,
    minute,
    second,
    meridiem,
  } = dateTime;

  const onYearPicked = (res) => {
    let {year} = res;
    year = Number(year);
    setDateTime((prevState) => ({
      ...prevState,
      year,
    }));
  };

  const onMonthPicked = (res) => {
    let {month, year} = res;
    month = Number(month);
    year = Number(year);
    setDateTime((prevState) => ({
      ...prevState,
      month,
      year,
    }));
  };

  const onDatePicked = (res) => {
    let {date, month, year} = res;
    date = Number(date);
    month = Number(month);
    year = Number(year);
    setDateTime((prevState) => ({
      ...prevState,
      date,
      month,
      year,
    }));
  };

  const onResetDate = (res) => {
    const {date, month, year} = res;
    setDateTime((prevState) => ({
      ...prevState,
      date,
      month,
      year,
    }));
  };

  const onSecondChange = (res) => {
    const {value} = res;
    setDateTime((prevState) => ({
      ...prevState,
      second: value,
    }));
  };

  const onMinuteChange = (res) => {
    const {value} = res;
    setDateTime((prevState) => ({
      ...prevState,
      minute: value,
    }));
  };

  const onHourChange = (res) => {
    const {value} = res;
    setDateTime((prevState) => ({
      ...prevState,
      hour: value,
    }));
  };

  const onMeridiemChange = (res) => {
    setDateTime((prevState) => ({
      ...prevState,
      meridiem: res,
    }));
  };

  const formatTime = () => {
    const formattedHour = meridiem === 'AM' ? (hour % 12) || 12 : hour % 12 + 12;
    const paddedHour = formattedHour.toString().padStart(2, '0');
    const paddedMinute = minute.toString().padStart(2, '0');
    const paddedSecond = second.toString().padStart(2, '0');

    return `${paddedHour}:${paddedMinute}:${paddedSecond} ${meridiem}`;
  };

  return (
    <div>
      <PickyDateTime
        ref={ref}
        size='xs'
        mode={1}
        locale='en-us'
        show={true}
        defaultTime={formatTime()}
        defaultDate={`${month}/${date}/${year}`}
        onYearPicked={onYearPicked}
        onMonthPicked={onMonthPicked}
        onDatePicked={onDatePicked}
        onResetDate={onResetDate}
        onSecondChange={onSecondChange}
        onMinuteChange={onMinuteChange}
        onHourChange={onHourChange}
        onMeridiemChange={onMeridiemChange}
      />
    </div>
  );
});

DateTime.displayName = 'DateTime';

DateTime.propTypes = {
  onChangeDate: PropTypes.func.isRequired,
};

export default DateTime;
