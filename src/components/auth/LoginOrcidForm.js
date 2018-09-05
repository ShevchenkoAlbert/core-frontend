import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const validate = (values) => {
  const errors = {};
  // email
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email isn\'t valid';
  }
  return errors;
};

const renderInput = (
  {
    input, label, id, type, placeholder, meta: { touched, error },
  },
) => (
  <div>
    <label htmlFor={id}>
      {label}
    </label>
    <div>
      <input {...input} placeholder={placeholder} id={id} type={type} className="inputs" />
      {touched && (error && (
        <span className="error">
          {error}
        </span>
      ))}
    </div>
  </div>
);

class LoginOrcidForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} className="forgotpass-form">
        <div>
          <label htmlFor="email">
            <Field name="email" component={renderInput} id="email" type="text" placeholder="" label="Email" />
          </label>
        </div>
        <div className="forgotpass-footer">
          <button type="submit">
            Reset password
          </button>

          <Link className="forgot" to="/login">
            Return to login
          </Link>
        </div>
      </form>
    );
  }
}

renderInput.propTypes = {
  input: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
};

LoginOrcidForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'loginOrcidForm', // a unique name for this form
  validate,
})(LoginOrcidForm);
