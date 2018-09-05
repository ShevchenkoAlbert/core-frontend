import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Field, reduxForm } from 'redux-form';
import { NotificationContainer } from 'react-notifications';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import AuthLoyaut from './AuthLoyaut';
import InputField from '../form/InputField';
import InputCheckbox from '../form/InputCheckbox';
import PasswordValidationInfo from './PasswordValidationInfo';
import NotificationMessageStatic from '../NotificationMessageStatic';
import { config } from '../../env';
import { isLogin, validatePassword, redirectUrlHandler } from '../../helpers';
import {
  regPass,
  englishKeyboardLayout,
} from '../../store/constants';
import '../../../node_modules/react-notifications/lib/notifications.css';

class SignUpForm extends Component {
  componentDidMount() {
    isLogin();
  }

  prepareSignUpData = (data) => {
    const signUpData = {
      given_name: data.name,
      email: data.email,
      password: data.password,
      family_name: data.surname,
    };
    return signUpData;
  };

  submitSignUp = (e) => {
    const { signup } = this.props;
    const data = this.prepareSignUpData(e);
    if (!data) {
      return;
    }
    data.redirect_url = redirectUrlHandler('/signup/');
    signup(data);
  }

  render() {
    const {
      handleSubmit,
      successConfirmMessage,
      passwordSignUp,
      nameSignUp,
      surnameSignUp,
      emailSignUp,
      email,
      checkPrivacySignUp,
    } = this.props;

    const isValid = Object.getOwnPropertyNames(validate({
      name: nameSignUp,
      surname: surnameSignUp,
      email: emailSignUp,
      password: passwordSignUp,
      checkPrivacy: checkPrivacySignUp,
    })).length;

    return (
      <div className="signUp-page-wrapper">
        <Helmet>
          <title>
            ARTIFACTS | Sign up
          </title>
        </Helmet>
        <AuthLoyaut>
          { successConfirmMessage
            ? (`We've sent a message to ${email}. Open it up and click Activate Account. We'll take it from there. `
            ) : (
              <div className="main-formSide auth__formSide_content">
                <p className="auth__formSide_highlightText">
                  Easy and Free!
                </p>
                <h1 className="auth__formSide_title">
                  Getting Started
                </h1>
                <h3 className="auth__formSide_subtitle">
                  Create an ARTiFACTS account to manage collaborative research projects, secure your ideas, and build your reputation in real time
                </h3>
                <NotificationContainer />
                <form onSubmit={handleSubmit(this.submitSignUp)} className="sign-form auth__form">
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
                      name="name"
                      component={InputField}
                      id="sign-up-name"
                      text="Your given name (ex. John)"
                      type="text"
                      placeholder="Enter Given Name"
                      label="Given name"
                      maxLength="25"
                      minLength="2"
                    />
                    <Field
                      name="surname"
                      component={InputField}
                      id="sign-up-surname"
                      text="Your family name (ex. Smith)"
                      type="text"
                      placeholder="Enter Family Name"
                      label="Family name"
                      maxLength="60"
                      minLength="2"
                    />
                    <Field
                      name="password"
                      component={InputField}
                      id="passwordSignUp"
                      text="Create your secure password"
                      type="password"
                      placeholder="Enter Password"
                      label="Password"
                      showPassValidation
                    />
                  </div>

                  {
                    validatePassword(passwordSignUp)
                      ? (
                        <div className="auth__PasswordValidation">
                          <NotificationMessageStatic text="Your password is secure and you're all set!" />
                        </div>
                      )
                      : (
                        <div className="auth__PasswordValidation">
                          <PasswordValidationInfo passwordText={passwordSignUp} />
                        </div>
                      )
                  }
                  <div className="sign-footer">
                    <div className="auth__checkPrivacy">
                      <Field className="auth__checkPrivacy_input" name="checkPrivacy" component={InputCheckbox}>
                        <p className="auth__checkPrivacy_text">
                          I read and agree to
                          <Link to="/participation-agreement" target="_blank">
                            Participation agreement
                          </Link>
                          &nbsp;and
                          <Link to="/privacy-policy" target="_blank">
                            Privacy Policy
                          </Link>
                          , including information on
                          <HashLink to="/privacy-policy#cookies-usage" target="_blank">
                            Cookie Use
                          </HashLink>
                          .
                        </p>
                      </Field>
                    </div>
                    <button
                      className="btn-inner"
                      type="submit"
                      disabled={isValid}
                    >
                      Get started
                    </button>
                  </div>
                </form>
                <div className="auth__footer">
                  <p className="auth__footer_title">
                    Already have an account?
                  </p>
                  <div className="auth__footer_inner">
                    <Link className="btn-outer" to={window.location.search ? `/login/${window.location.search}` : '/login'}>
                      Log in
                    </Link>
                    <span>
                      or
                    </span>
                    <a className="btn-outer orcid-link" href={config.ORCID_URL} target="_blank" rel="noopener noreferrer">
                      Log in via ORCID
                    </a>
                  </div>
                </div>
              </div>
            ) }
        </AuthLoyaut>
      </div>
    );
  }
}


const validate = (values, props) => {
  const errors = {};
  // name
  if (!values.name) {
    errors.name = 'Please enter your given name';
  }
  // surname
  if (!values.surname) {
    errors.surname = 'Please enter your family name';
  }

  // email
  if (!values.email) {
    errors.email = 'Please enter your email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a proper email address.';
  }

  // password
  if (!values.password) {
    errors.password = true;
  } else if (!englishKeyboardLayout.test(values.password)) {
    errors.password = 'Please check that you use English keyboard layout and try again';
  } else if (!regPass.test(values.password)) {
    errors.password = true;
  }

  if (!values.checkPrivacy) {
    errors.checkPrivacy = 'Required';
  }
  return errors;
};

SignUpForm.defaultProps = {
  emailSignUp: '',
  passwordSignUp: '',
  surnameSignUp: '',
  nameSignUp: '',
  checkPrivacySignUp: false,
};

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  successConfirmMessage: PropTypes.bool.isRequired,
  passwordSignUp: PropTypes.string,
  nameSignUp: PropTypes.string,
  surnameSignUp: PropTypes.string,
  emailSignUp: PropTypes.string,
  email: PropTypes.string.isRequired,
  checkPrivacySignUp: PropTypes.bool,
};

const SignUp = reduxForm({
  form: 'signUpForm', // a unique name for this form
  validate,
})(SignUpForm);

export default SignUp;
