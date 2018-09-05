import React from 'react';
import PropTypes from 'prop-types';


const GradientButton = (props) => {
  const {
    className,
    type,
    name,
    onClick,
    disabled,
    text,
  } = props;

  return (
    <button
      className={`GradientButton  ${className}`}
      type={type || 'button'}
      name={name}
      onClick={onClick}
      disabled={disabled}
    >
      <span>
        {text}
      </span>
    </button>
  );
};


GradientButton.defaultProps = {
  type: 'button',
  name: '',
  onClick: () => {},
  className: '',
  disabled: false,
};


GradientButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};


export default GradientButton;
