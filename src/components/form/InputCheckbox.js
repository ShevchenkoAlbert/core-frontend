import React from 'react';
import PropTypes from 'prop-types';

const renderCheckbox = ({
  className,
  input,
  value,
  meta: { touched, error },
  children,
}) => (
  <label className="InputCheckbox">
    <input {...input} value={value} checked={input.value} type="checkbox" className={`InputCheckbox__checkbox ${className || ''}`} />
    <span className="InputCheckbox__checkboxUI " />
    <div className="InputCheckbox__content">
      {children || null}
    </div>
  </label>
);

renderCheckbox.defaultProps = {
  className: 'inputs',
  input: {},
  value: false,
};

renderCheckbox.propTypes = {
  className: PropTypes.string,
  value: PropTypes.bool,
  input: PropTypes.instanceOf(Object),
  meta: PropTypes.instanceOf(Object).isRequired,
};
export default renderCheckbox;
