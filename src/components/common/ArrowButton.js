import React from 'react';


const ArrowButton = props => {
  return (
    <div
      onClick={props.onClick}
      className={`ArrowButton ${props.className || ''}`}
    />
  );
};

export default ArrowButton;