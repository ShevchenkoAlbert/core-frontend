import React from 'react';
import PropTypes from 'prop-types';
import GradientButton from './GradientButton';


const Button = props => {
  return (
    <button
      className={`Button ${props.className}`}
      type={props.type}
      name={props.name}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
};


GradientButton.defaultProps = {
  type: '',
  name: '',
  className: '',
};


GradientButton.propsTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
};


export default Button;
