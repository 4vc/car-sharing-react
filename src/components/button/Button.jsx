import PropTypes from 'prop-types';
import button from './Button.module.css'

const Button = ({text, onClick}) => {
  return (
    <div>
      <button className={button} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
