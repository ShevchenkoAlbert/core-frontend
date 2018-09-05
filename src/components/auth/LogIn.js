import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { NotificationContainer } from 'react-notifications';
import Helmet from 'react-helmet';
import { config } from '../../env';
import AuthLoyaut from './AuthLoyaut';
import InputField from '../form/InputField';
import InputCheckbox from '../form/InputCheckbox';
import { redirectUrlHandler } from '../../helpers';
import { regPass, englishKeyboardLayout } from '../../store/constants';
import '../../../node_modules/react-notifications/lib/notifications.css';


class LogInForm extends Component {
  prepareLoginData = (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    return loginData;
  }

  submitLogin = (e) => {
    const { login } = this.props;
    const data = this.prepareLoginData(e);
    if (!data) {
      return;
    }
    data.redirect_url = redirectUrlHandler('/login/');
    login(data);
  }

  render() {
    const {
      handleSubmit,
      emailFieldVal,
      rememberFieldVal,
      passwordFieldVal,
    } = this.props;

    const isValid = Object.getOwnPropertyNames(validate({
      email: emailFieldVal,
      remember: rememberFieldVal,
      password: passwordFieldVal,
    })).length;

    return (
      <div className="logIn-page-wrapper">
        <Helmet>
          <title>
            ARTIFACTS | Log in
          </title>
        </Helmet>
        <AuthLoyaut>
          <div className="main-formSide auth__formSide_content">
            <h1 className="auth__formSide_title">
              Log In
            </h1>
            <h3 className="auth__formSide_subtitle">
              Need an ARTiFACTS account?
              {' '}

              <Link to={window.location.search ? `/signup/${window.location.search}` : '/signup'}>
                Create an account
              </Link>
            </h3>
            <NotificationContainer />
            <form onSubmit={handleSubmit(this.submitLogin)} className="sign-form auth__form">
              <div>
                <Field
                  name="email"
                  component={InputField}
                  id="sign-up-email"
                  text="Enter your email (ex. myemail@mail.com)"
                  type="text"
                  placeholder="Enter Email"
                  label="Email"
                />
                <Field
                  name="password"
                  component={InputField}
                  id="passwordSignUp"
                  text="Create your secure password"
                  type="password"
                  showPassValidation
                  placeholder="Enter Password"
                  label="Password"
                />
              </div>
              <div className="auth__middle">
                <div className="auth__checkPrivacy">
                  <Field className="auth__checkPrivacy_input" name="remember" component={InputCheckbox}>
                    <p className="auth__checkPrivacy_text">
                      Keep me logged in
                    </p>
                  </Field>
                </div>
                <div>
                  <Link className="auth__forgotpass-link" to="/forgotpass">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="auth__footer">
                <div className="auth__footer_inner">
                  <button
                    className="btn-inner"
                    type="submit"
                    disabled={isValid}
                  >
                    Log in
                  </button>
                  <span>
                    or
                  </span>
                  <a
                    className="btn-outer orcid-link"
                    href={config.ORCID_URL}
                  >
                    Log in via ORCID
                  </a>
                </div>
              </div>
            </form>
          </div>
        </AuthLoyaut>
      </div>
    );
  }
}

const validate = (values = {}) => {
  const errors = {};
  // email
  if (!values.email) {
    errors.email = 'Please enter your email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email isn\'t valid';
  }

  // password
  if (!values.password) {
    errors.password = true;
  } else if (!englishKeyboardLayout.test(values.password)) {
    errors.password = 'Please check that you use English keyboard layout and try again';
  } else if (!regPass.test(values.password)) {
    errors.password = true;
  }
  return errors;
};

LogInForm.defaultProps = {
  passwordFieldVal: '',
  emailFieldVal: '',
  rememberFieldVal: false,
};

LogInForm.propTypes = {
  login: PropTypes.func.isRequired,
  passwordFieldVal: PropTypes.string,
  rememberFieldVal: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  emailFieldVal: PropTypes.string,
};

const LogIn = reduxForm({
  form: 'loginFrom', // a unique name for this form
  validate,
})(LogInForm);

export default LogIn;
